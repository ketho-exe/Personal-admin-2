"use client";

import { Bell, CalendarDays, Check, FileText, Home, ListChecks, Menu, Moon, Plus, Search, Settings, Sun, Tags, Users, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { getNextTheme, type ThemeMode } from "@/lib/interactions";
import { cn } from "@/lib/utils";

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
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [toast, setToast] = useState("Ready");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme") as ThemeMode | null;
    const initialTheme = storedTheme === "dark" || storedTheme === "light" ? storedTheme : "light";
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  function chooseSection(section: string) {
    setActiveSection(section);
    setIsMenuOpen(false);
    setToast(`${section} selected`);
  }

  function toggleTheme() {
    const nextTheme = getNextTheme(theme);
    setTheme(nextTheme);
    window.localStorage.setItem("theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    setToast(`${nextTheme === "dark" ? "Dark" : "Light"} mode enabled`);
  }

  return (
    <div className="min-h-screen text-ink dark:text-white">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 border-r border-line bg-white/95 px-4 py-5 backdrop-blur transition dark:border-white/10 dark:bg-neutral-950/95 lg:block",
          isMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="grid size-10 place-items-center rounded-md bg-ink text-sm font-semibold text-white">PA</div>
          <div>
            <p className="text-sm font-semibold text-ink dark:text-white">Personal Admin</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Life OS dashboard</p>
          </div>
        </div>
        <nav className="space-y-1">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => chooseSection(item.name)}
              className={cn(
                "flex h-10 w-full items-center gap-3 rounded-md px-3 text-left text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-ink dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white",
                activeSection === item.name && "bg-ink text-white hover:bg-ink hover:text-white dark:bg-white dark:text-ink"
              )}
            >
              <item.icon className="size-4" aria-hidden="true" />
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-line bg-paper/86 backdrop-blur dark:border-white/10 dark:bg-neutral-950/86">
          <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setIsMenuOpen((value) => !value)}
              className="grid size-10 place-items-center rounded-md border border-line bg-white text-ink dark:border-white/10 dark:bg-neutral-900 dark:text-white lg:hidden"
              aria-label="Open menu"
            >
              {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setToast(event.target.value ? `Searching for "${event.target.value}"` : "Search cleared");
                }}
                className="h-10 w-full rounded-md border border-line bg-white pl-9 pr-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-ink dark:border-white/10 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
                placeholder="Search tasks, documents, notes, contacts..."
              />
            </div>
            <button
              onClick={toggleTheme}
              className="grid size-10 place-items-center rounded-md border border-line bg-white text-ink dark:border-white/10 dark:bg-neutral-900 dark:text-white"
              aria-label="Toggle light and dark mode"
            >
              {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </button>
            <button
              onClick={() => {
                setIsNotificationsOpen((value) => !value);
                setToast("Notification centre opened");
              }}
              className="grid size-10 place-items-center rounded-md border border-line bg-white text-ink dark:border-white/10 dark:bg-neutral-900 dark:text-white"
              aria-label="Notifications"
            >
              <Bell className="size-5" />
            </button>
            <button
              onClick={() => {
                setIsQuickAddOpen(true);
                setToast("Quick add opened");
              }}
              className="inline-flex h-10 items-center gap-2 rounded-md bg-ink px-3 text-sm font-semibold text-white shadow-soft dark:bg-white dark:text-ink"
            >
              <Plus className="size-4" />
              <span className="hidden sm:inline">Quick add</span>
            </button>
          </div>
          <div className="border-t border-line bg-white/70 px-4 py-2 text-xs font-medium text-neutral-600 dark:border-white/10 dark:bg-neutral-900/70 dark:text-neutral-300 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-7xl items-center gap-2">
              <Check className="size-3.5 text-sage" />
              <span>{toast}</span>
              {activeSection !== "Dashboard" && <span className="hidden sm:inline">· Showing {activeSection} context</span>}
            </div>
          </div>
        </header>
        {isNotificationsOpen && (
          <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
            <section className="rounded-md border border-line bg-white p-4 shadow-soft dark:border-white/10 dark:bg-neutral-900">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-ink dark:text-white">Notification centre</h2>
                <button onClick={() => setIsNotificationsOpen(false)} className="rounded-md p-1 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-white/10" aria-label="Close notifications">
                  <X className="size-4" />
                </button>
              </div>
              <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">You have 2 reminders due today and 1 overdue task needing attention.</p>
            </section>
          </div>
        )}
        {children}
      </div>

      {isQuickAddOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/40 px-4 backdrop-blur">
          <section className="w-full max-w-md rounded-md border border-line bg-white p-5 shadow-soft dark:border-white/10 dark:bg-neutral-950">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-ink dark:text-white">Quick add</h2>
              <button onClick={() => setIsQuickAddOpen(false)} className="rounded-md p-1 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-white/10" aria-label="Close quick add">
                <X className="size-4" />
              </button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {["Task", "Reminder", "Note", "Document", "Contact", "Record"].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setToast(`${item} quick add selected`);
                    setIsQuickAddOpen(false);
                  }}
                  className="rounded-md border border-line px-3 py-3 text-sm font-semibold text-ink hover:bg-paper dark:border-white/10 dark:text-white dark:hover:bg-white/10"
                >
                  {item}
                </button>
              ))}
            </div>
          </section>
        </div>
      )}

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line bg-white/94 px-2 py-2 backdrop-blur dark:border-white/10 dark:bg-neutral-950/94 lg:hidden">
        {navigation.slice(0, 5).map((item) => (
          <button
            key={item.name}
            onClick={() => chooseSection(item.name)}
            className={cn(
              "flex flex-col items-center gap-1 rounded-md py-1.5 text-[11px] font-medium text-neutral-600 dark:text-neutral-300",
              activeSection === item.name && "text-ink dark:text-white"
            )}
          >
            <item.icon className="size-5" />
            {item.name === "Dashboard" ? "Home" : item.name}
          </button>
        ))}
      </nav>
    </div>
  );
}
