import { describe, expect, it } from "vitest";
import { getSupabaseConfigStatus } from "@/lib/supabase/config";

describe("getSupabaseConfigStatus", () => {
  it("reports missing Supabase auth config without throwing", () => {
    expect(getSupabaseConfigStatus(undefined, undefined)).toEqual({
      isConfigured: false,
      missing: ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"]
    });
  });

  it("reports configured Supabase auth when URL and anon key exist", () => {
    expect(getSupabaseConfigStatus("https://example.supabase.co", "anon-key")).toEqual({
      isConfigured: true,
      missing: []
    });
  });
});
