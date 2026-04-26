import type { AdminItem } from "@/lib/types";

export const sampleItems: AdminItem[] = [
  {
    id: "task-passport",
    type: "task",
    title: "Renew passport application",
    description: "Check countersignature requirements and submit the renewal form.",
    status: "in_progress",
    dueDate: "2026-04-26",
    priority: "urgent",
    category: "Identity",
    tags: ["renewal", "forms"],
    updatedAt: "2026-04-26T09:30:00Z"
  },
  {
    id: "reminder-gp",
    type: "reminder",
    title: "Call GP about referral letter",
    status: "open",
    dueDate: "2026-04-26",
    priority: "high",
    category: "Health",
    tags: ["phone"],
    updatedAt: "2026-04-25T17:20:00Z"
  },
  {
    id: "document-licence",
    type: "document",
    title: "Driving licence",
    status: "open",
    dueDate: "2026-05-10",
    expiresAt: "2026-05-10",
    priority: "high",
    category: "Identity",
    tags: ["document", "expiry"],
    updatedAt: "2026-04-24T12:05:00Z"
  },
  {
    id: "task-dentist",
    type: "task",
    title: "Book dentist appointment",
    status: "open",
    dueDate: "2026-04-22",
    priority: "medium",
    category: "Health",
    tags: ["appointment"],
    updatedAt: "2026-04-22T08:15:00Z"
  },
  {
    id: "note-moving",
    type: "note",
    title: "Moving checklist",
    status: "open",
    priority: "medium",
    category: "Home",
    tags: ["checklist"],
    updatedAt: "2026-04-23T18:45:00Z"
  },
  {
    id: "contact-solicitor",
    type: "contact",
    title: "Solicitor contact details",
    status: "open",
    priority: "low",
    category: "Contacts",
    tags: ["reference"],
    updatedAt: "2026-04-21T10:00:00Z"
  },
  {
    id: "record-car",
    type: "record",
    title: "Car MOT reference",
    status: "open",
    dueDate: "2026-05-18",
    priority: "medium",
    category: "Vehicle",
    tags: ["record", "renewal"],
    updatedAt: "2026-04-20T11:40:00Z"
  },
  {
    id: "event-dentist",
    type: "event",
    title: "Dentist appointment",
    description: "Calendar appointment with travel time and reminder.",
    status: "open",
    dueDate: "2026-05-03",
    priority: "medium",
    category: "Health",
    tags: ["calendar", "appointment"],
    updatedAt: "2026-04-19T09:15:00Z"
  },
  {
    id: "document-passport",
    type: "document",
    title: "Passport scan",
    description: "Identity document stored in private Supabase Storage.",
    status: "open",
    dueDate: "2026-05-22",
    expiresAt: "2026-05-22",
    priority: "urgent",
    category: "Identity",
    tags: ["document", "expiry"],
    updatedAt: "2026-04-18T14:05:00Z"
  },
  {
    id: "note-application",
    type: "note",
    title: "Application follow-up template",
    description: "Reusable wording for chasing applications and reference numbers.",
    status: "open",
    priority: "low",
    category: "Templates",
    tags: ["template", "admin"],
    updatedAt: "2026-04-17T16:25:00Z"
  },
  {
    id: "contact-gp",
    type: "contact",
    title: "GP surgery",
    description: "Reception number, online portal, and referral notes.",
    status: "open",
    priority: "high",
    category: "Health",
    tags: ["healthcare", "phone"],
    updatedAt: "2026-04-16T10:10:00Z"
  }
];

export const modules = [
  { name: "Tasks", count: 18, tone: "sage", description: "One-off and recurring actions" },
  { name: "Reminders", count: 9, tone: "sky", description: "Timed nudges and admin follow-ups" },
  { name: "Documents", count: 24, tone: "plum", description: "Secure files, expiry dates, references" },
  { name: "Notes", count: 12, tone: "coral", description: "Checklists, templates, personal details" },
  { name: "Contacts", count: 7, tone: "sage", description: "People and organisations" },
  { name: "Records", count: 11, tone: "sky", description: "Reference numbers and life admin facts" }
] as const;
