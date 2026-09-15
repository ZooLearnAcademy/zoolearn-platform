import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";

/**
 * GET /api/admin/verify
 * Returns { isAdmin: boolean } for the current session user.
 * Used by the admin login page to verify admin status client-side.
 */
export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ isAdmin: false });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("user_id", user.id)
      .single();

    return NextResponse.json({ isAdmin: (profile as any)?.is_admin === true });
  } catch {
    return NextResponse.json({ isAdmin: false });
  }
}
