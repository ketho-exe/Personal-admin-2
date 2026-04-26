import { Bell, CalendarDays, FileText, Home, ListChecks, Menu, Plus, Search, Settings, Tags, Users } from "lucide-react";
import type { ReactNode } from "react";

const navigation = [
  { name: "Dashboard", icon: Home },
  { name: "Tasks", icon: ListChecks },
  { name: "Reminders", icon: Bell },
  { name: "Calendar", icon: CalendarDays },
  { name: "Documents", icon: FileText },
  { name: "Contacts", icon: Users },
  { name: "Tags", icon: Tags },
  { name: "Settings", icon: Settings }
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-line bg-white/78 px-4 py-5 backdrop-blur lg:block">
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="grid size-10 place-items-center rounded-md bg-ink text-sm font-semibold text-white">PA</div>
          <div>
            <p className="text-sm font-semibold text-ink">Personal Admin</p>
            <p className="text-xs text-neutral-500">Life OS dashboard</p>
          </div>
        </div>
        <nav className="space-y-1">
          {navigation.map((item) => (
            <button
              key={item.name}
              className="flex h-10 w-full items-center gap-3 rounded-md px-3 text-left text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-ink first:bg-ink first:text-white"
            >
              <item.icon className="size-4" aria-hidden="true" />
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-line bg-paper/86 backdrop-blur">
          <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
            <button className="grid size-10 place-items-center rounded-md border border-line bg-white text-ink lg:hidden" aria-label="Open menu">
              <Menu className="size-5" />
            </button>
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
              <input
                className="h-10 w-full rounded-md border border-line bg-white pl-9 pr-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-ink"
                placeholder="Search tasks, documents, notes, contacts..."
              />
            </div>
            <button className="grid size-10 place-items-center rounded-md border border-line bg-white text-ink" aria-label="Notifications">
              <Bell className="size-5" />
            </button>
            <button className="inline-flex h-10 items-center gap-2 rounded-md bg-ink px-3 text-sm font-semibold text-white shadow-soft">
              <Plus className="size-4" />
              <span className="hidden sm:inline">Quick add</span>
            </button>
          </div>
        </header>
        {children}
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line bg-white/94 px-2 py-2 backdrop-blur lg:hidden">
        {navigation.slice(0, 5).map((item) => (
          <button key={item.name} className="flex flex-col items-center gap-1 rounded-md py-1.5 text-[11px] font-medium text-neutral-600 first:text-ink">
            <item.icon className="size-5" />
            {item.name === "Dashboard" ? "Home" : item.name}
          </button>
        ))}
      </nav>
    </div>
  );
}
