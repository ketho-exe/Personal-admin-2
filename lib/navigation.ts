export type AppRoute = {
  name: string;
  href: string;
};

export const appRoutes: AppRoute[] = [
  { name: "Dashboard", href: "/" },
  { name: "Tasks", href: "/tasks" },
  { name: "Reminders", href: "/reminders" },
  { name: "Calendar", href: "/calendar" },
  { name: "Documents", href: "/documents" },
  { name: "Notes", href: "/notes" },
  { name: "Contacts", href: "/contacts" },
  { name: "Records", href: "/records" },
  { name: "Search", href: "/search" },
  { name: "Tags", href: "/tags" },
  { name: "Settings", href: "/settings" }
];

export const pageContent = {
  "/tasks": {
    title: "Tasks",
    eyebrow: "Work queue",
    description: "Manage one-off tasks, recurring life admin, priorities, due dates, and linked records.",
    sections: ["Today", "Upcoming", "Overdue", "Recurring tasks", "Completed"]
  },
  "/reminders": {
    title: "Reminders",
    eyebrow: "Timed nudges",
    description: "Schedule follow-ups for appointments, documents, calls, applications, and recurring checks.",
    sections: ["Due today", "Scheduled", "Document reminders", "Dismissed"]
  },
  "/calendar": {
    title: "Calendar",
    eyebrow: "Upcoming view",
    description: "See appointments, deadlines, reminders, document expiries, and life admin events in date order.",
    sections: ["This week", "Next 30 days", "Appointments", "Expiry dates"]
  },
  "/documents": {
    title: "Documents",
    eyebrow: "Secure records",
    description: "Track important files, expiry dates, review dates, categories, and storage references.",
    sections: ["Recently uploaded", "Expiring documents", "Identity", "Health", "Home"]
  },
  "/notes": {
    title: "Notes",
    eyebrow: "Personal knowledge",
    description: "Keep checklists, templates, appointment notes, instructions, and reference information organised.",
    sections: ["Pinned notes", "Checklists", "Templates", "Recently updated"]
  },
  "/contacts": {
    title: "Contacts",
    eyebrow: "People and organisations",
    description: "Store trusted contacts, organisations, phone numbers, emails, and notes for admin follow-up.",
    sections: ["Important contacts", "Healthcare", "Home services", "Government"]
  },
  "/records": {
    title: "Records",
    eyebrow: "Reference vault",
    description: "Save reference numbers, personal records, vehicle details, account references, and admin facts.",
    sections: ["Pinned records", "Vehicle", "Identity", "Applications"]
  },
  "/search": {
    title: "Search",
    eyebrow: "Find anything",
    description: "Search across tasks, reminders, documents, notes, contacts, records, categories, and tags.",
    sections: ["All results", "Tasks", "Documents", "Notes", "Contacts"]
  },
  "/tags": {
    title: "Tags",
    eyebrow: "Organisation",
    description: "Create and manage labels that connect tasks, notes, contacts, documents, and records.",
    sections: ["Active tags", "Categories", "Linked items", "Unused tags"]
  },
  "/settings": {
    title: "Settings",
    eyebrow: "Preferences",
    description: "Manage profile details, workspace members, notification defaults, theme, and account settings.",
    sections: ["Profile", "Workspace members", "Notifications", "Appearance"]
  }
} as const;
