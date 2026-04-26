import { describe, expect, it } from "vitest";
import { appRoutes, pageContent } from "@/lib/navigation";

describe("appRoutes", () => {
  it("provides real routes for every main navigation item", () => {
    expect(appRoutes.map((route) => route.href)).toEqual([
      "/",
      "/tasks",
      "/reminders",
      "/calendar",
      "/documents",
      "/notes",
      "/contacts",
      "/records",
      "/search",
      "/tags",
      "/settings"
    ]);
  });
});

describe("pageContent", () => {
  it("has unique content for each routed page", () => {
    const titles = Object.values(pageContent).map((page) => page.title);
    expect(new Set(titles).size).toBe(titles.length);
    expect(pageContent["/documents"].sections).toContain("Expiring documents");
    expect(pageContent["/tasks"].sections).toContain("Recurring tasks");
    expect(pageContent["/settings"].sections).toContain("Workspace members");
  });
});
