"use client";

import { AlertTriangle, CalendarClock, CheckCircle2, FileWarning, Pin, Sparkles } from "lucide-react";
import { useState } from "react";
import { createQuickCaptureMessage, type QuickCaptureKind } from "@/lib/interactions";
import type { DashboardSummary } from "@/lib/types";
import { formatShortDate } from "@/lib/utils";

function SummaryCard({
  title,
  value,
  detail,
  icon: Icon,
  tone
}: {
  title: string;
  value: number;
  detail: string;
  icon: typeof CheckCircle2;
  tone: string;
}) {
  return (
    <section className="rounded-md border border-line bg-white p-4 shadow-soft dark:border-white/10 dark:bg-neutral-900">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{title}</p>
        <span className={`grid size-9 place-items-center rounded-md ${tone}`}>
          <Icon className="size-4" />
        </span>
      </div>
      <p className="text-3xl font-semibold text-ink dark:text-white">{value}</p>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{detail}</p>
    </section>
  );
}

function ItemList({ title, items }: { title: string; items: DashboardSummary[keyof DashboardSummary] }) {
  return (
    <section className="rounded-md border border-line bg-white p-4 shadow-soft dark:border-white/10 dark:bg-neutral-900">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-ink dark:text-white">{title}</h2>
        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{items.length}</span>
      </div>
      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="rounded-md border border-dashed border-line p-4 text-sm text-neutral-500 dark:border-white/10 dark:text-neutral-400">Nothing needs attention here.</p>
        ) : (
          items.map((item) => (
            <article key={item.id} className="rounded-md border border-line bg-paper/70 p-3 dark:border-white/10 dark:bg-white/5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink dark:text-white">{item.title}</p>
                  <p className="mt-1 text-xs capitalize text-neutral-500 dark:text-neutral-400">
                    {item.type} - {item.category ?? "General"}
                  </p>
                </div>
                <span className="shrink-0 rounded-md bg-white px-2 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-950 dark:text-neutral-300">
                  {formatShortDate(item.dueDate ?? item.expiresAt)}
                </span>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export function Dashboard({ summary }: { summary: DashboardSummary }) {
  const [isPinned, setIsPinned] = useState(false);
  const [quickCapture, setQuickCapture] = useState("");
  const [captureMessage, setCaptureMessage] = useState("Choose a capture type when you are ready.");

  function capture(kind: QuickCaptureKind) {
    const message = createQuickCaptureMessage(kind, quickCapture);
    setCaptureMessage(message);
    if (quickCapture.trim()) {
      setQuickCapture("");
    }
  }

  return (
    <div className="space-y-6 pb-24 lg:pb-0">
      <section className="grid gap-4 lg:grid-cols-[1.4fr_0.6fr] lg:items-stretch">
        <div className="rounded-md border border-line bg-white p-5 shadow-soft dark:border-white/10 dark:bg-neutral-900">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="mb-2 inline-flex items-center gap-2 rounded-md bg-paper px-2.5 py-1 text-xs font-semibold text-neutral-600 dark:bg-white/10 dark:text-neutral-300">
                <Sparkles className="size-3.5 text-sage" />
                Today, Sunday 26 April
              </p>
              <h1 className="max-w-2xl text-3xl font-semibold tracking-normal text-ink dark:text-white sm:text-4xl">Your personal admin command centre</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                Tasks, reminders, documents, notes, contacts, and records are ready to connect to Supabase.
              </p>
              {isPinned && <p className="mt-3 text-sm font-medium text-sage">Dashboard overview pinned.</p>}
            </div>
            <button
              onClick={() => setIsPinned((value) => !value)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-sage px-4 text-sm font-semibold text-white"
            >
              <Pin className="size-4" />
              {isPinned ? "Pinned" : "Pin item"}
            </button>
          </div>
        </div>

        <div className="rounded-md border border-line bg-ink p-5 text-white shadow-soft">
          <p className="text-sm text-white/68">Quick capture</p>
          <textarea
            value={quickCapture}
            onChange={(event) => setQuickCapture(event.target.value)}
            className="mt-3 min-h-28 w-full resize-none rounded-md border border-white/15 bg-white/10 p-3 text-sm text-white outline-none placeholder:text-white/45"
            placeholder="Add a task, reminder, note, or document..."
          />
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs font-medium">
            {["Task", "Reminder", "Note"].map((item) => (
              <button key={item} onClick={() => capture(item as QuickCaptureKind)} className="rounded-md bg-white/10 px-2 py-2 text-white transition hover:bg-white/16">
                {item}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-white/68">{captureMessage}</p>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard title="Due today" value={summary.today.length} detail="Tasks and reminders" icon={CheckCircle2} tone="bg-sage/15 text-sage" />
        <SummaryCard title="Overdue" value={summary.overdue.length} detail="Needs follow-up" icon={AlertTriangle} tone="bg-coral/15 text-coral" />
        <SummaryCard title="Upcoming" value={summary.upcoming.length} detail="Next 30 days" icon={CalendarClock} tone="bg-skysoft/15 text-skysoft" />
        <SummaryCard title="Documents" value={summary.documentsNeedingAttention.length} detail="Expiry attention" icon={FileWarning} tone="bg-plum/15 text-plum" />
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <ItemList title="Today" items={summary.today} />
        <ItemList title="Overdue" items={summary.overdue} />
        <ItemList title="Upcoming" items={summary.upcoming} />
      </section>
    </div>
  );
}
