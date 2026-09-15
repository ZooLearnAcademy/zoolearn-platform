import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { getUserGrowthData } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  // Verify admin
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json([], { status: 401 });

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("user_id", user.id)
    .single();
  if ((profile as any)?.is_admin !== true) return NextResponse.json([], { status: 403 });

  const range = request.nextUrl.searchParams.get("range") ?? "30d";
  try {
    const data = await getUserGrowthData(range);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([]);
  }
}
