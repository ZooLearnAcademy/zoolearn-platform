import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import {
  upsertScopeCategory,
  deleteScopeCategory,
  upsertScopeCareer,
  deleteScopeCareer,
  toggleScopeCategoryActive,
  toggleScopeCareerActive,
} from "@/lib/supabase/scope-admin";

async function verifyAdmin() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("user_id", user.id)
    .single();
  return (profile as any)?.is_admin === true;
}

export async function POST(request: NextRequest) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const { action, data } = await request.json();

  try {
    if (action === "upsert-category") {
      await upsertScopeCategory(data);
    } else if (action === "upsert-career") {
      await upsertScopeCareer(data);
    } else {
      return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
    return NextResponse.json({ message: "Saved." });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const { action, id, is_active } = await request.json();

  try {
    if (action === "toggle-category") {
      await toggleScopeCategoryActive(id, is_active);
    } else if (action === "toggle-career") {
      await toggleScopeCareerActive(id, is_active);
    } else {
      return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
    return NextResponse.json({ message: "Updated." });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const { action, id } = await request.json();

  try {
    if (action === "delete-category") {
      await deleteScopeCategory(id);
    } else if (action === "delete-career") {
      await deleteScopeCareer(id);
    } else {
      return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
    return NextResponse.json({ message: "Deleted." });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
