import { describe, expect, it } from "vitest";
import { createDashboardSummary } from "@/lib/dashboard";
import type { AdminItem } from "@/lib/types";

describe("createDashboardSummary", () => {
  it("groups urgent personal admin items into today, overdue, upcoming, and document attention buckets", () => {
    const items: AdminItem[] = [
      { id: "task-1", type: "task", title: "Book dentist", status: "open", dueDate: "2026-04-26", priority: "high" },
      { id: "task-2", type: "task", title: "Renew licence", status: "open", dueDate: "2026-04-20", priority: "urgent" },
      { id: "reminder-1", type: "reminder", title: "Call GP", status: "open", dueDate: "2026-05-02", priority: "medium" },
      { id: "document-1", type: "document", title: "Passport", status: "open", dueDate: "2026-05-12", priority: "high", expiresAt: "2026-05-12" },
      { id: "task-3", type: "task", title: "Done thing", status: "done", dueDate: "2026-04-26", priority: "low" }
    ];

    const summary = createDashboardSummary(items, new Date("2026-04-26T10:00:00Z"));

    expect(summary.today.map((item) => item.title)).toEqual(["Book dentist"]);
    expect(summary.overdue.map((item) => item.title)).toEqual(["Renew licence"]);
    expect(summary.upcoming.map((item) => item.title)).toEqual(["Call GP", "Passport"]);
    expect(summary.documentsNeedingAttention.map((item) => item.title)).toEqual(["Passport"]);
  });
});
