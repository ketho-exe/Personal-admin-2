export type SupabaseConfigStatus = {
  isConfigured: boolean;
  missing: string[];
};

export function getSupabaseConfigStatus(
  supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
): SupabaseConfigStatus {
  const missing = [
    !supabaseUrl ? "NEXT_PUBLIC_SUPABASE_URL" : null,
    !supabaseAnonKey ? "NEXT_PUBLIC_SUPABASE_ANON_KEY" : null
  ].filter((value): value is string => Boolean(value));

  return {
    isConfigured: missing.length === 0,
    missing
  };
}
