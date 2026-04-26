import { Archive, Bell, Contact, FileText, ListChecks, NotebookText } from "lucide-react";

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
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-ink">Admin modules</h2>
        <button className="rounded-md border border-line bg-white px-3 py-2 text-sm font-semibold text-ink">Manage</button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {modules.map((module) => {
          const Icon = icons[module.name];
          return (
            <article key={module.name} className="rounded-md border border-line bg-white p-4 shadow-soft">
              <div className="mb-5 flex items-center justify-between">
                <span className={`grid size-10 place-items-center rounded-md ${tones[module.tone]}`}>
                  <Icon className="size-5" />
                </span>
                <span className="rounded-md bg-paper px-2.5 py-1 text-xs font-semibold text-neutral-600">{module.count}</span>
              </div>
              <h3 className="text-base font-semibold text-ink">{module.name}</h3>
              <p className="mt-1 text-sm leading-6 text-neutral-500">{module.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
