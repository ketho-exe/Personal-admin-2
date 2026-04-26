import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppShell } from "@/components/app-shell";
import { getCurrentUser } from "@/lib/supabase/server";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Personal Admin",
  description: "A Supabase-ready personal life admin dashboard."
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { user, isConfigured } = await getCurrentUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <AppShell userEmail={user?.email ?? null} isSupabaseConfigured={isConfigured}>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
