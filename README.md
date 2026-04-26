# Personal Admin

A Supabase-ready personal life admin dashboard for tasks, reminders, documents, notes, contacts, records, and upcoming responsibilities.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth, Postgres, Row Level Security, and Storage
- Vitest for focused domain tests

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the environment file:

```bash
cp .env.example .env.local
```

3. Fill in:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

4. Run the app:

```bash
npm run dev
```

## Supabase Setup

Open the Supabase SQL editor and run:

```text
supabase/schema.sql
```

The script is intentionally destructive. It drops and recreates the `public` schema, rebuilds the application tables, enables RLS, creates policies, and resets the private `documents` storage bucket.

## Verification

```bash
npm test -- --run
npm run build
```

## Repository Handoff

When you provide the new GitHub repository URL, this project can be initialized as a git repo, committed, and pushed to that remote.
