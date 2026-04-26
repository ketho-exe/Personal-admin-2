"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSupabaseConfigStatus } from "@/lib/supabase/config";

function getOrigin() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export async function signInWithPassword(formData: FormData) {
  const status = getSupabaseConfigStatus();

  if (!status.isConfigured) {
    redirect(`/auth?message=${encodeURIComponent(`Missing ${status.missing.join(" and ")}`)}`);
  }

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/auth?message=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signUpWithPassword(formData: FormData) {
  const status = getSupabaseConfigStatus();

  if (!status.isConfigured) {
    redirect(`/auth?message=${encodeURIComponent(`Missing ${status.missing.join(" and ")}`)}`);
  }

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${getOrigin()}/auth/callback`
    }
  });

  if (error) {
    redirect(`/auth?message=${encodeURIComponent(error.message)}`);
  }

  redirect("/auth?message=Check your email to confirm your account.");
}

export async function signOut() {
  const status = getSupabaseConfigStatus();

  if (status.isConfigured) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }

  revalidatePath("/", "layout");
  redirect("/auth");
}
