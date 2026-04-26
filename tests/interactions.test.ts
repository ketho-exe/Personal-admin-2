import { describe, expect, it } from "vitest";
import { createQuickCaptureMessage, getNextTheme } from "@/lib/interactions";

describe("getNextTheme", () => {
  it("toggles between light and dark modes", () => {
    expect(getNextTheme("light")).toBe("dark");
    expect(getNextTheme("dark")).toBe("light");
  });
});

describe("createQuickCaptureMessage", () => {
  it("creates a readable confirmation for typed quick capture content", () => {
    expect(createQuickCaptureMessage("Task", "Book dentist")).toBe('Task captured: "Book dentist"');
  });

  it("asks for content when quick capture is empty", () => {
    expect(createQuickCaptureMessage("Note", "   ")).toBe("Type something to capture a note.");
  });
});
