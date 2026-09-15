"use server";

/**
 * Auth Server Actions
 * ─────────────────────────────────────────────────────────────
 * All Supabase auth calls live here — they run exclusively on
 * the server so the browser never touches auth APIs directly.
 */

import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { headers } from "next/headers";

// ─── Shared result type ───────────────────────────────────────

export interface AuthResult {
  success: boolean;
  error?: string;
  /** For signup — the email that needs to be verified */
  email?: string;
  /** For Google OAuth — the URL to redirect to */
  redirectUrl?: string;
}

// ─── Helper: current origin ───────────────────────────────────

async function getOrigin(): Promise<string> {
  const headersList = await headers();
  const host = headersList.get("host") ?? "localhost:3000";
  const proto = headersList.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}

// ─── Login with email + password ─────────────────────────────

export async function signInAction(
  email: string,
  password: string
): Promise<AuthResult> {
  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch {
    return { success: false, error: "An unexpected error occurred." };
  }
}

// ─── Sign up with email + password ───────────────────────────

export async function signUpAction(
  email: string,
  password: string,
  fullName: string
): Promise<AuthResult> {
  try {
    const supabase = await createSupabaseServerClient();
    const origin = await getOrigin();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${origin}/auth/callback?next=/dashboard`,
      },
    });

    if (error) return { success: false, error: error.message };
    return { success: true, email };
  } catch {
    return { success: false, error: "An unexpected error occurred." };
  }
}

// ─── Forgot password ─────────────────────────────────────────

export async function forgotPasswordAction(
  email: string
): Promise<AuthResult> {
  try {
    const supabase = await createSupabaseServerClient();
    const origin = await getOrigin();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/auth/callback?type=recovery`,
    });

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch {
    return { success: false, error: "An unexpected error occurred." };
  }
}

// ─── Google OAuth — returns redirect URL ─────────────────────

export async function googleSignInAction(): Promise<AuthResult> {
  try {
    const supabase = await createSupabaseServerClient();
    const origin = await getOrigin();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback?next=/dashboard`,
        skipBrowserRedirect: true, // We handle the redirect on the client
      },
    });

    if (error || !data?.url) {
      return { success: false, error: error?.message ?? "Could not start Google sign-in." };
    }

    return { success: true, redirectUrl: data.url };
  } catch {
    return { success: false, error: "An unexpected error occurred." };
  }
}
