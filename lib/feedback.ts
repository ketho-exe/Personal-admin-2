export type FeedbackVerb = "saved" | "selected" | "opened" | "updated";

export function createActionFeedback(entity: string, label: string, verb: FeedbackVerb = "saved") {
  const cleanLabel = label.trim() || "Untitled";
  const prefix = verb === "saved" ? "Saved" : verb === "selected" ? "Selected" : verb === "opened" ? "Opened" : "Updated";
  const suffix = verb === "saved" ? " draft" : "";

  return `${prefix} ${entity}${suffix}: "${cleanLabel}"`;
}
