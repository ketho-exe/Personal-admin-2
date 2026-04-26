import { LockKeyhole } from "lucide-react";
import { signInWithPassword, signUpWithPassword } from "@/app/auth/actions";
import { getSupabaseConfigStatus } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export default async function AuthPage({ searchParams }: { searchParams: Promise<{ message?: string }> }) {
  const params = await searchParams;
  const status = getSupabaseConfigStatus();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-8 pb-24 sm:px-6 lg:px-8">
      <section className="rounded-md border border-line bg-white p-5 shadow-soft dark:border-white/10 dark:bg-neutral-900">
        <p className="mb-2 inline-flex items-center gap-2 rounded-md bg-paper px-2.5 py-1 text-xs font-semibold text-neutral-600 dark:bg-white/10 dark:text-neutral-300">
          <LockKeyhole className="size-3.5 text-sage" />
          Supabase Auth
        </p>
        <h1 className="text-3xl font-semibold text-ink dark:text-white">Sign in to Personal Admin</h1>
        <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
          Use Supabase email and password auth. New users automatically get a personal workspace from the database trigger in `supabase/schema.sql`.
        </p>
        {!status.isConfigured && (
          <p className="mt-4 rounded-md border border-coral/30 bg-coral/10 p-3 text-sm font-medium text-coral">
            Missing Supabase env vars: {status.missing.join(", ")}
          </p>
        )}
        {params.message && <p className="mt-4 rounded-md border border-line bg-paper p-3 text-sm text-neutral-700 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">{params.message}</p>}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <form action={signInWithPassword} className="rounded-md border border-line bg-white p-5 shadow-soft dark:border-white/10 dark:bg-neutral-900">
          <h2 className="text-base font-semibold text-ink dark:text-white">Sign in</h2>
          <div className="mt-4 grid gap-3">
            <input name="email" type="email" required className="h-10 rounded-md border border-line bg-white px-3 text-sm dark:border-white/10 dark:bg-neutral-950 dark:text-white" placeholder="Email" />
            <input name="password" type="password" required className="h-10 rounded-md border border-line bg-white px-3 text-sm dark:border-white/10 dark:bg-neutral-950 dark:text-white" placeholder="Password" />
            <button className="h-10 rounded-md bg-ink px-3 text-sm font-semibold text-white dark:bg-white dark:text-ink">Sign in</button>
          </div>
        </form>

        <form action={signUpWithPassword} className="rounded-md border border-line bg-white p-5 shadow-soft dark:border-white/10 dark:bg-neutral-900">
          <h2 className="text-base font-semibold text-ink dark:text-white">Create account</h2>
          <div className="mt-4 grid gap-3">
            <input name="email" type="email" required className="h-10 rounded-md border border-line bg-white px-3 text-sm dark:border-white/10 dark:bg-neutral-950 dark:text-white" placeholder="Email" />
            <input name="password" type="password" minLength={6} required className="h-10 rounded-md border border-line bg-white px-3 text-sm dark:border-white/10 dark:bg-neutral-950 dark:text-white" placeholder="Password" />
            <button className="h-10 rounded-md bg-sage px-3 text-sm font-semibold text-white">Create account</button>
          </div>
        </form>
      </section>
    </main>
  );
}
