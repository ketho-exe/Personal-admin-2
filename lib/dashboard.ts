import type { AdminItem, DashboardSummary } from "@/lib/types";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

function dateOnly(value: Date | string): Date {
  const date = typeof value === "string" ? new Date(`${value}T00:00:00Z`) : value;
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

function daysBetween(start: Date | string, end: Date | string): number {
  return Math.round((dateOnly(end).getTime() - dateOnly(start).getTime()) / DAY_IN_MS);
}

function isActive(item: AdminItem): boolean {
  return !["done", "cancelled", "archived"].includes(item.status);
}

function byDueDate(left: AdminItem, right: AdminItem): number {
  return (left.dueDate ?? left.expiresAt ?? "").localeCompare(right.dueDate ?? right.expiresAt ?? "");
}

export function createDashboardSummary(items: AdminItem[], now = new Date()): DashboardSummary {
  const activeItems = items.filter(isActive);

  const today = activeItems
    .filter((item) => item.dueDate && daysBetween(now, item.dueDate) === 0)
    .sort(byDueDate);

  const overdue = activeItems
    .filter((item) => item.dueDate && daysBetween(now, item.dueDate) < 0)
    .sort(byDueDate);

  const upcoming = activeItems
    .filter((item) => item.dueDate && daysBetween(now, item.dueDate) > 0 && daysBetween(now, item.dueDate) <= 30)
    .sort(byDueDate);

  const documentsNeedingAttention = activeItems
    .filter((item) => item.type === "document" && item.expiresAt && daysBetween(now, item.expiresAt) >= 0 && daysBetween(now, item.expiresAt) <= 30)
    .sort((left, right) => (left.expiresAt ?? "").localeCompare(right.expiresAt ?? ""));

  const recentlyUpdated = [...items]
    .filter((item) => item.updatedAt)
    .sort((left, right) => (right.updatedAt ?? "").localeCompare(left.updatedAt ?? ""))
    .slice(0, 6);

  return { today, overdue, upcoming, documentsNeedingAttention, recentlyUpdated };
}
