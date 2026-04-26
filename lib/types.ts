export type AdminItemType = "task" | "reminder" | "document" | "note" | "contact" | "record" | "event";
export type AdminStatus = "open" | "in_progress" | "waiting" | "done" | "cancelled" | "archived";
export type AdminPriority = "low" | "medium" | "high" | "urgent";

export type AdminItem = {
  id: string;
  type: AdminItemType;
  title: string;
  status: AdminStatus;
  dueDate?: string;
  priority: AdminPriority;
  category?: string;
  tags?: string[];
  expiresAt?: string;
  updatedAt?: string;
  description?: string;
};

export type DashboardSummary = {
  today: AdminItem[];
  overdue: AdminItem[];
  upcoming: AdminItem[];
  documentsNeedingAttention: AdminItem[];
  recentlyUpdated: AdminItem[];
};
