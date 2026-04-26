"use client";

import { Archive, Bell, Contact, FileText, ListChecks, NotebookText, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

const icons = {
  Tasks: ListChecks,
  Reminders: Bell,
  Documents: FileText,
  Notes: NotebookText,
  Contacts: Contact,
  Records: Archive
};

const tones = {
  sage: "bg-sage/12 text-sage",
  sky: "bg-skysoft/12 text-skysoft",
  plum: "bg-plum/12 text-plum",
  coral: "bg-coral/12 text-coral"
};

export function ModuleList({
  modules
}: {
  modules: ReadonlyArray<{ name: keyof typeof icons; count: number; tone: keyof typeof tones; description: string }>;
}) {
  const [selectedModule, setSelectedModule] = useState("Tasks");
  const [isManaging, setIsManaging] = useState(false);

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-ink dark:text-white">Admin modules</h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {isManaging ? "Module management mode is on." : `${selectedModule} selected.`}
          </p>
        </div>
        <button
          onClick={() => setIsManaging((value) => !value)}
          className="inline-flex items-center gap-2 rounded-md border border-line bg-white px-3 py-2 text-sm font-semibold text-ink dark:border-white/10 dark:bg-neutral-900 dark:text-white"
        >
          <SlidersHorizontal className="size-4" />
          {isManaging ? "Done" : "Manage"}
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {modules.map((module) => {
          const Icon = icons[module.name];
          return (
            <button
              key={module.name}
              onClick={() => setSelectedModule(module.name)}
              className="rounded-md border border-line bg-white p-4 text-left shadow-soft transition hover:-translate-y-0.5 hover:border-ink dark:border-white/10 dark:bg-neutral-900 dark:hover:border-white"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className={`grid size-10 place-items-center rounded-md ${tones[module.tone]}`}>
                  <Icon className="size-5" />
                </span>
                <span className="rounded-md bg-paper px-2.5 py-1 text-xs font-semibold text-neutral-600 dark:bg-white/10 dark:text-neutral-300">{module.count}</span>
              </div>
              <h3 className="text-base font-semibold text-ink dark:text-white">{module.name}</h3>
              <p className="mt-1 text-sm leading-6 text-neutral-500 dark:text-neutral-400">{module.description}</p>
              {selectedModule === module.name && <p className="mt-3 text-xs font-semibold text-sage">Selected</p>}
            </button>
          );
        })}
      </div>
    </section>
  );
}
