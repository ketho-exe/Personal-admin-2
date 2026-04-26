import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseConfigStatus } from "@/lib/supabase/config";

export async function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const status = getSupabaseConfigStatus(supabaseUrl, supabaseAnonKey);

  if (!status.isConfigured || !supabaseUrl || !supabaseAnonKey) {
    throw new Error(`Missing Supabase config: ${status.missing.join(", ")}`);
  }

  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Server components cannot always write cookies; middleware can refresh sessions.
        }
      }
    }
  });
}

export async function getCurrentUser() {
  const status = getSupabaseConfigStatus();

  if (!status.isConfigured) {
    return { user: null, isConfigured: false };
  }

  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return { user: data.user, isConfigured: true };
}
