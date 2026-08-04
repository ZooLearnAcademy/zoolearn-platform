import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const type = searchParams.get("type"); // "recovery" for password reset links
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // ── Sync user data to profiles table on every sign-in ──
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const metadata = user.user_metadata || {};
        const fullName = metadata.full_name || metadata.name || user.email?.split("@")[0];
        const avatarUrl = metadata.avatar_url || metadata.picture || null;
        
        await supabase.from("profiles").upsert({
          user_id: user.id,
          full_name: fullName,
          email: user.email,
          avatar_url: avatarUrl,
        }, {
          onConflict: "user_id"
        });
      }

      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";
      const baseUrl = isLocalEnv
        ? origin
        : forwardedHost
        ? `https://${forwardedHost}`
        : origin;

      // Password reset links come back with type=recovery
      // Send them to the reset password page instead of the dashboard
      if (type === "recovery") {
        return NextResponse.redirect(`${baseUrl}/auth/reset-password`);
      }

      return NextResponse.redirect(`${baseUrl}${next}`);
    }
  }

  // Redirect to login with an error message if the code exchange fails
  return NextResponse.redirect(`${origin}/login?error=auth_callback_error`);
}
