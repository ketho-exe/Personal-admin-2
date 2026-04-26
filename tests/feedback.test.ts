import { describe, expect, it } from "vitest";
import { createActionFeedback } from "@/lib/feedback";

describe("createActionFeedback", () => {
  it("creates direct feedback for saved drafts", () => {
    expect(createActionFeedback("Task", "Book dentist")).toBe('Saved Task draft: "Book dentist"');
  });

  it("creates direct feedback when a user selects an existing item", () => {
    expect(createActionFeedback("Document", "Passport scan", "selected")).toBe('Selected Document: "Passport scan"');
  });
});
