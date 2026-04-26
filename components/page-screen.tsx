"use client";

import { useMemo, useState } from "react";
import { Bell, CalendarDays, CheckCircle2, FileText, Plus, Search, SlidersHorizontal } from "lucide-react";
import type { AdminItem, AdminItemType } from "@/lib/types";
import { formatShortDate } from "@/lib/utils";

type PageScreenProps = {
  title: string;
  eyebrow: string;
  description: string;
  sections: readonly string[];
  items: AdminItem[];
  itemTypes: AdminItemType[];
  primaryAction: string;
};

const typeIcons = {
  task: CheckCircle2,
  reminder: Bell,
  document: FileText,
  note: FileText,
  contact: SlidersHorizontal,
  record: SlidersHorizontal,
  event: CalendarDays
};

export function PageScreen({ title, eyebrow, description, sections, items, itemTypes, primaryAction }: PageScreenProps) {
  const [activeSection, setActiveSection] = useState(sections[0]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState(`${title} ready`);
  const [isCreating, setIsCreating] = useState(false);

  const filteredItems = useMemo(() => {
    const lowerQuery = query.toLowerCase().trim();
    return items.filter((item) => {
      const typeMatches = itemTypes.includes(item.type);
      const queryMatches = !lowerQuery || `${item.title} ${item.description ?? ""} ${item.category ?? ""}`.toLowerCase().includes(lowerQuery);
      return typeMatches && queryMatches;
    });
  }, [items, itemTypes, query]);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-5 pb-24 sm:px-6 lg:px-8 lg:pb-8">
      <section className="rounded-md border border-line bg-white p-5 shadow-soft dark:border-white/10 dark:bg-neutral-900">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="mb-2 inline-flex rounded-md bg-paper px-2.5 py-1 text-xs font-semibold text-neutral-600 dark:bg-white/10 dark:text-neutral-300">{eyebrow}</p>
            <h1 className="text-3xl font-semibold tracking-normal text-ink dark:text-white sm:text-4xl">{title}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-600 dark:text-neutral-300">{description}</p>
          </div>
          <button
            onClick={() => {
              setIsCreating((value) => !value);
              setStatus(`${primaryAction} ${isCreating ? "closed" : "opened"}`);
            }}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-ink px-4 text-sm font-semibold text-white shadow-soft dark:bg-white dark:text-ink"
          >
            <Plus className="size-4" />
            {primaryAction}
          </button>
        </div>
      </section>

      <section className="grid gap-3 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="rounded-md border border-line bg-white p-4 shadow-soft dark:border-white/10 dark:bg-neutral-900">
          <h2 className="text-sm font-semibold text-ink dark:text-white">Views</h2>
          <div className="mt-3 grid gap-2">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => {
                  setActiveSection(section);
                  setStatus(`${section} view selected`);
                }}
                className={`rounded-md px-3 py-2 text-left text-sm font-medium transition ${
                  activeSection === section
                    ? "bg-ink text-white dark:bg-white dark:text-ink"
                    : "bg-paper text-neutral-600 hover:bg-neutral-100 dark:bg-white/5 dark:text-neutral-300 dark:hover:bg-white/10"
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-md border border-line bg-white p-4 shadow-soft dark:border-white/10 dark:bg-neutral-900">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-sm font-semibold text-ink dark:text-white">{activeSection}</h2>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{status}</p>
            </div>
            <div className="relative sm:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setStatus(event.target.value ? `Filtering ${title.toLowerCase()}` : `${title} ready`);
                }}
                className="h-10 w-full rounded-md border border-line bg-white pl-9 pr-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-ink dark:border-white/10 dark:bg-neutral-950 dark:text-white dark:focus:border-white"
                placeholder={`Search ${title.toLowerCase()}...`}
              />
            </div>
          </div>

          {isCreating && (
            <div className="mt-4 rounded-md border border-line bg-paper p-4 dark:border-white/10 dark:bg-white/5">
              <p className="text-sm font-semibold text-ink dark:text-white">{primaryAction}</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <input className="h-10 rounded-md border border-line bg-white px-3 text-sm dark:border-white/10 dark:bg-neutral-950 dark:text-white" placeholder="Title" />
                <input className="h-10 rounded-md border border-line bg-white px-3 text-sm dark:border-white/10 dark:bg-neutral-950 dark:text-white" placeholder="Date or reference" />
              </div>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setStatus("Draft saved locally for Supabase wiring");
                }}
                className="mt-3 rounded-md bg-sage px-3 py-2 text-sm font-semibold text-white"
              >
                Save draft
              </button>
            </div>
          )}

          <div className="mt-4 grid gap-3">
            {filteredItems.map((item) => {
              const Icon = typeIcons[item.type];
              return (
                <article key={item.id} className="rounded-md border border-line bg-paper/70 p-3 dark:border-white/10 dark:bg-white/5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 gap-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-md bg-white text-sage dark:bg-neutral-950">
                        <Icon className="size-5" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-ink dark:text-white">{item.title}</p>
                        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{item.description ?? item.category ?? "Personal admin item"}</p>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-md bg-white px-2 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-950 dark:text-neutral-300">
                      {formatShortDate(item.dueDate ?? item.expiresAt)}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
