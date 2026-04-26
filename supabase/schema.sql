-- DESTRUCTIVE SUPABASE REBUILD SCRIPT
-- This script deletes the existing application data model in public, recreates it,
-- resets the app document storage bucket metadata, and replaces related policies.
-- Run only against a project you are prepared to wipe.

begin;

drop schema if exists public cascade;
create schema public;

grant usage on schema public to postgres, anon, authenticated, service_role;
grant all on schema public to postgres, service_role;
alter default privileges in schema public grant all on tables to postgres, service_role;
alter default privileges in schema public grant select, insert, update, delete on tables to authenticated;
alter default privileges in schema public grant usage, select on sequences to authenticated;
alter default privileges in schema public grant execute on functions to authenticated;

create extension if not exists pgcrypto with schema extensions;
create extension if not exists citext with schema extensions;

create type public.member_role as enum ('owner', 'admin', 'member', 'viewer');
create type public.item_status as enum ('not_started', 'in_progress', 'waiting', 'done', 'cancelled', 'archived');
create type public.item_priority as enum ('low', 'medium', 'high', 'urgent');
create type public.recurrence_frequency as enum ('none', 'daily', 'weekly', 'monthly', 'yearly', 'custom');
create type public.notification_status as enum ('scheduled', 'sent', 'dismissed', 'cancelled');
create type public.activity_action as enum ('created', 'updated', 'completed', 'archived', 'deleted', 'uploaded', 'linked');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  timezone text not null default 'Europe/London',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.workspace_members (
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role public.member_role not null default 'member',
  invited_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  primary key (workspace_id, user_id)
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null,
  color text not null default '#7f9c8d',
  created_at timestamptz not null default now(),
  unique (workspace_id, name)
);

create table public.tags (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null,
  color text not null default '#7a99b8',
  created_at timestamptz not null default now(),
  unique (workspace_id, name)
);

create table public.contacts (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  organisation text,
  email extensions.citext,
  phone text,
  address text,
  notes text,
  pinned boolean not null default false,
  archived_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.notes (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  category_id uuid references public.categories(id) on delete set null,
  title text not null,
  body text not null default '',
  pinned boolean not null default false,
  archived_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.documents (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  category_id uuid references public.categories(id) on delete set null,
  title text not null,
  description text,
  storage_bucket text not null default 'documents',
  storage_path text not null,
  mime_type text,
  size_bytes bigint,
  issue_date date,
  expiry_date date,
  review_date date,
  pinned boolean not null default false,
  archived_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  category_id uuid references public.categories(id) on delete set null,
  title text not null,
  description text,
  status public.item_status not null default 'not_started',
  priority public.item_priority not null default 'medium',
  due_date date,
  due_time time,
  completed_at timestamptz,
  recurrence_frequency public.recurrence_frequency not null default 'none',
  recurrence_interval integer not null default 1 check (recurrence_interval > 0),
  recurrence_days integer[] not null default '{}',
  recurrence_until date,
  linked_document_id uuid references public.documents(id) on delete set null,
  linked_contact_id uuid references public.contacts(id) on delete set null,
  linked_note_id uuid references public.notes(id) on delete set null,
  pinned boolean not null default false,
  archived_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.reminders (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  title text not null,
  body text,
  remind_at timestamptz not null,
  status public.notification_status not null default 'scheduled',
  task_id uuid references public.tasks(id) on delete cascade,
  document_id uuid references public.documents(id) on delete cascade,
  note_id uuid references public.notes(id) on delete cascade,
  contact_id uuid references public.contacts(id) on delete cascade,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    num_nonnulls(task_id, document_id, note_id, contact_id) <= 1
  )
);

create table public.calendar_events (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  title text not null,
  description text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  location text,
  linked_task_id uuid references public.tasks(id) on delete set null,
  linked_contact_id uuid references public.contacts(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.personal_records (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  category_id uuid references public.categories(id) on delete set null,
  title text not null,
  record_type text not null default 'general',
  value text,
  secure_notes text,
  pinned boolean not null default false,
  archived_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.item_tags (
  id uuid primary key default gen_random_uuid(),
  tag_id uuid not null references public.tags(id) on delete cascade,
  task_id uuid references public.tasks(id) on delete cascade,
  document_id uuid references public.documents(id) on delete cascade,
  note_id uuid references public.notes(id) on delete cascade,
  contact_id uuid references public.contacts(id) on delete cascade,
  record_id uuid references public.personal_records(id) on delete cascade,
  created_at timestamptz not null default now(),
  check (num_nonnulls(task_id, document_id, note_id, contact_id, record_id) = 1)
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  body text,
  status public.notification_status not null default 'scheduled',
  scheduled_for timestamptz,
  sent_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.activity_log (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  actor_id uuid references public.profiles(id) on delete set null,
  action public.activity_action not null,
  entity_type text not null,
  entity_id uuid,
  summary text not null,
  created_at timestamptz not null default now()
);

create table public.user_settings (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  default_workspace_id uuid references public.workspaces(id) on delete set null,
  theme text not null default 'system' check (theme in ('light', 'dark', 'system')),
  week_starts_on integer not null default 1 check (week_starts_on between 0 and 6),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.is_workspace_member(target_workspace_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.workspace_members wm
    where wm.workspace_id = target_workspace_id
      and wm.user_id = auth.uid()
  );
$$;

create or replace function public.has_workspace_role(target_workspace_id uuid, allowed_roles public.member_role[])
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.workspace_members wm
    where wm.workspace_id = target_workspace_id
      and wm.user_id = auth.uid()
      and wm.role = any(allowed_roles)
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  new_workspace_id uuid;
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;

  insert into public.workspaces (name, owner_id)
  values ('Personal Admin', new.id)
  returning id into new_workspace_id;

  insert into public.workspace_members (workspace_id, user_id, role)
  values (new_workspace_id, new.id, 'owner');

  insert into public.user_settings (user_id, default_workspace_id)
  values (new.id, new_workspace_id)
  on conflict (user_id) do update set default_workspace_id = excluded.default_workspace_id;

  insert into public.categories (workspace_id, name, color)
  values
    (new_workspace_id, 'Identity', '#7b638d'),
    (new_workspace_id, 'Health', '#7f9c8d'),
    (new_workspace_id, 'Home', '#7a99b8'),
    (new_workspace_id, 'Vehicle', '#c86f5e'),
    (new_workspace_id, 'General', '#202124');

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create trigger touch_profiles_updated_at before update on public.profiles for each row execute function public.touch_updated_at();
create trigger touch_workspaces_updated_at before update on public.workspaces for each row execute function public.touch_updated_at();
create trigger touch_contacts_updated_at before update on public.contacts for each row execute function public.touch_updated_at();
create trigger touch_notes_updated_at before update on public.notes for each row execute function public.touch_updated_at();
create trigger touch_documents_updated_at before update on public.documents for each row execute function public.touch_updated_at();
create trigger touch_tasks_updated_at before update on public.tasks for each row execute function public.touch_updated_at();
create trigger touch_reminders_updated_at before update on public.reminders for each row execute function public.touch_updated_at();
create trigger touch_calendar_events_updated_at before update on public.calendar_events for each row execute function public.touch_updated_at();
create trigger touch_personal_records_updated_at before update on public.personal_records for each row execute function public.touch_updated_at();
create trigger touch_user_settings_updated_at before update on public.user_settings for each row execute function public.touch_updated_at();

create index workspace_members_user_id_idx on public.workspace_members(user_id);
create index categories_workspace_id_idx on public.categories(workspace_id);
create index tags_workspace_id_idx on public.tags(workspace_id);
create index tasks_workspace_due_idx on public.tasks(workspace_id, due_date, status);
create index tasks_workspace_priority_idx on public.tasks(workspace_id, priority, status);
create index reminders_workspace_remind_at_idx on public.reminders(workspace_id, remind_at, status);
create index documents_workspace_expiry_idx on public.documents(workspace_id, expiry_date);
create index notes_workspace_updated_idx on public.notes(workspace_id, updated_at desc);
create index contacts_workspace_name_idx on public.contacts(workspace_id, name);
create index records_workspace_updated_idx on public.personal_records(workspace_id, updated_at desc);
create index events_workspace_starts_idx on public.calendar_events(workspace_id, starts_at);
create index notifications_user_status_idx on public.notifications(user_id, status, scheduled_for);
create index activity_workspace_created_idx on public.activity_log(workspace_id, created_at desc);
create unique index item_tags_task_unique_idx on public.item_tags(tag_id, task_id) where task_id is not null;
create unique index item_tags_document_unique_idx on public.item_tags(tag_id, document_id) where document_id is not null;
create unique index item_tags_note_unique_idx on public.item_tags(tag_id, note_id) where note_id is not null;
create unique index item_tags_contact_unique_idx on public.item_tags(tag_id, contact_id) where contact_id is not null;
create unique index item_tags_record_unique_idx on public.item_tags(tag_id, record_id) where record_id is not null;

alter table public.profiles enable row level security;
alter table public.workspaces enable row level security;
alter table public.workspace_members enable row level security;
alter table public.categories enable row level security;
alter table public.tags enable row level security;
alter table public.contacts enable row level security;
alter table public.notes enable row level security;
alter table public.documents enable row level security;
alter table public.tasks enable row level security;
alter table public.reminders enable row level security;
alter table public.calendar_events enable row level security;
alter table public.personal_records enable row level security;
alter table public.item_tags enable row level security;
alter table public.notifications enable row level security;
alter table public.activity_log enable row level security;
alter table public.user_settings enable row level security;

create policy "Profiles are visible to the owner" on public.profiles for select using (id = auth.uid());
create policy "Profiles can update themselves" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());

create policy "Members can view workspaces" on public.workspaces for select using (public.is_workspace_member(id));
create policy "Owners can update workspaces" on public.workspaces for update using (public.has_workspace_role(id, array['owner', 'admin']::public.member_role[]));

create policy "Members can view memberships" on public.workspace_members for select using (public.is_workspace_member(workspace_id));
create policy "Owners can manage memberships" on public.workspace_members for all using (public.has_workspace_role(workspace_id, array['owner', 'admin']::public.member_role[])) with check (public.has_workspace_role(workspace_id, array['owner', 'admin']::public.member_role[]));

create policy "Members can read categories" on public.categories for select using (public.is_workspace_member(workspace_id));
create policy "Members can write categories" on public.categories for all using (public.is_workspace_member(workspace_id)) with check (public.is_workspace_member(workspace_id));

create policy "Members can read tags" on public.tags for select using (public.is_workspace_member(workspace_id));
create policy "Members can write tags" on public.tags for all using (public.is_workspace_member(workspace_id)) with check (public.is_workspace_member(workspace_id));

create policy "Members can manage contacts" on public.contacts for all using (public.is_workspace_member(workspace_id)) with check (public.is_workspace_member(workspace_id));
create policy "Members can manage notes" on public.notes for all using (public.is_workspace_member(workspace_id)) with check (public.is_workspace_member(workspace_id));
create policy "Members can manage documents" on public.documents for all using (public.is_workspace_member(workspace_id)) with check (public.is_workspace_member(workspace_id));
create policy "Members can manage tasks" on public.tasks for all using (public.is_workspace_member(workspace_id)) with check (public.is_workspace_member(workspace_id));
create policy "Members can manage reminders" on public.reminders for all using (public.is_workspace_member(workspace_id)) with check (public.is_workspace_member(workspace_id));
create policy "Members can manage calendar events" on public.calendar_events for all using (public.is_workspace_member(workspace_id)) with check (public.is_workspace_member(workspace_id));
create policy "Members can manage records" on public.personal_records for all using (public.is_workspace_member(workspace_id)) with check (public.is_workspace_member(workspace_id));
create policy "Members can manage item tags" on public.item_tags for all using (
  exists (select 1 from public.tags t where t.id = tag_id and public.is_workspace_member(t.workspace_id))
) with check (
  exists (select 1 from public.tags t where t.id = tag_id and public.is_workspace_member(t.workspace_id))
);
create policy "Users can manage own notifications" on public.notifications for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "Members can read activity" on public.activity_log for select using (public.is_workspace_member(workspace_id));
create policy "Members can create activity" on public.activity_log for insert with check (public.is_workspace_member(workspace_id));
create policy "Users can manage settings" on public.user_settings for all using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "Workspace members can read document files" on storage.objects;
drop policy if exists "Workspace members can upload document files" on storage.objects;
drop policy if exists "Workspace members can update document files" on storage.objects;
drop policy if exists "Workspace members can delete document files" on storage.objects;

delete from storage.objects where bucket_id = 'documents';
delete from storage.buckets where id = 'documents';

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'documents',
  'documents',
  false,
  52428800,
  array[
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/webp',
    'text/plain',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
);

create policy "Workspace members can read document files"
on storage.objects for select
using (
  bucket_id = 'documents'
  and public.is_workspace_member((storage.foldername(name))[1]::uuid)
);

create policy "Workspace members can upload document files"
on storage.objects for insert
with check (
  bucket_id = 'documents'
  and public.is_workspace_member((storage.foldername(name))[1]::uuid)
);

create policy "Workspace members can update document files"
on storage.objects for update
using (
  bucket_id = 'documents'
  and public.is_workspace_member((storage.foldername(name))[1]::uuid)
)
with check (
  bucket_id = 'documents'
  and public.is_workspace_member((storage.foldername(name))[1]::uuid)
);

create policy "Workspace members can delete document files"
on storage.objects for delete
using (
  bucket_id = 'documents'
  and public.is_workspace_member((storage.foldername(name))[1]::uuid)
);

commit;
