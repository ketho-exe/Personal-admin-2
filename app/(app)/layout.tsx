import { AppShell } from "@/components/app-shell";
import { getCurrentUser } from "@/lib/supabase/server";

export default async function MainAppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { user, isConfigured } = await getCurrentUser();

  return (
    <AppShell userEmail={user?.email ?? null} isSupabaseConfigured={isConfigured}>
      {children}
    </AppShell>
  );
}
