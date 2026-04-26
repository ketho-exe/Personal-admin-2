import { LockKeyhole } from "lucide-react";
import { signInWithPassword, signUpWithPassword } from "@/app/auth/actions";
import { getSupabaseConfigStatus } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export default async function AuthPage({ searchParams }: { searchParams: Promise<{ message?: string }> }) {
  const params = await searchParams;
  const status = getSupabaseConfigStatus();

  return (
    <main className="grid min-h-screen bg-paper px-4 py-6 dark:bg-neutral-950 lg:grid-cols-[0.9fr_1.1fr] lg:px-0 lg:py-0">
      <section className="flex flex-col justify-between rounded-md bg-ink p-6 text-white shadow-soft dark:bg-neutral-900 lg:rounded-none lg:p-10">
        <div>
          <div className="grid size-12 place-items-center rounded-md bg-white text-base font-bold text-ink">PA</div>
          <h1 className="mt-8 max-w-xl text-4xl font-semibold tracking-normal">Your private personal admin workspace</h1>
          <p className="mt-4 max-w-lg text-sm leading-6 text-white/68">
            Sign in with Supabase Auth to manage tasks, reminders, documents, notes, contacts, records, and settings from one protected place.
          </p>
        </div>
        <div className="mt-8 grid gap-3 text-sm text-white/78">
          <p className="rounded-md bg-white/10 p-3">Secure email/password authentication</p>
          <p className="rounded-md bg-white/10 p-3">Automatic personal workspace creation</p>
          <p className="rounded-md bg-white/10 p-3">Private document storage policies ready in SQL</p>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-2xl flex-col justify-center gap-5 py-8 lg:px-12">
        <div>
          <p className="mb-2 inline-flex items-center gap-2 rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-neutral-600 shadow-soft dark:bg-white/10 dark:text-neutral-300">
            <LockKeyhole className="size-3.5 text-sage" />
            Supabase Auth
          </p>
          <h2 className="text-3xl font-semibold text-ink dark:text-white">Sign in or create an account</h2>
          <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
            New users get a workspace from the database trigger in `supabase/schema.sql`.
          </p>
          {!status.isConfigured && (
            <p className="mt-4 rounded-md border border-coral/30 bg-coral/10 p-3 text-sm font-medium text-coral">
              Missing Supabase env vars: {status.missing.join(", ")}
            </p>
          )}
          {params.message && <p className="mt-4 rounded-md border border-line bg-white p-3 text-sm text-neutral-700 shadow-soft dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">{params.message}</p>}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <form action={signInWithPassword} className="rounded-md border border-line bg-white p-5 shadow-soft dark:border-white/10 dark:bg-neutral-900">
            <h3 className="text-base font-semibold text-ink dark:text-white">Sign in</h3>
          <div className="mt-4 grid gap-3">
            <input name="email" type="email" required className="h-10 rounded-md border border-line bg-white px-3 text-sm dark:border-white/10 dark:bg-neutral-950 dark:text-white" placeholder="Email" />
            <input name="password" type="password" required className="h-10 rounded-md border border-line bg-white px-3 text-sm dark:border-white/10 dark:bg-neutral-950 dark:text-white" placeholder="Password" />
            <button className="h-10 rounded-md bg-ink px-3 text-sm font-semibold text-white dark:bg-white dark:text-ink">Sign in</button>
          </div>
        </form>

          <form action={signUpWithPassword} className="rounded-md border border-line bg-white p-5 shadow-soft dark:border-white/10 dark:bg-neutral-900">
            <h3 className="text-base font-semibold text-ink dark:text-white">Create account</h3>
          <div className="mt-4 grid gap-3">
            <input name="email" type="email" required className="h-10 rounded-md border border-line bg-white px-3 text-sm dark:border-white/10 dark:bg-neutral-950 dark:text-white" placeholder="Email" />
            <input name="password" type="password" minLength={6} required className="h-10 rounded-md border border-line bg-white px-3 text-sm dark:border-white/10 dark:bg-neutral-950 dark:text-white" placeholder="Password" />
            <button className="h-10 rounded-md bg-sage px-3 text-sm font-semibold text-white">Create account</button>
          </div>
        </form>
        </div>
      </section>
    </main>
  );
}
