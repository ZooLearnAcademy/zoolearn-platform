import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";

export async function POST(req: Request) {
  try {
    const supabase = await createSupabaseServerClient();

    // Ensure user is an admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: adminCheck } = await supabase
      .from("admins")
      .select("id")
      .eq("id", user.id)
      .single();

    if (!adminCheck) {
      return NextResponse.json({ error: "Forbidden - Admin access required" }, { status: 403 });
    }

    const body = await req.json();
    const { mode, id, label, rank, common_name, parent_id, sort_order, is_active } = body;

    if (!mode || !label || !rank) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (mode === "add") {
      // Create new node
      if (!id) {
        return NextResponse.json({ error: "Missing ID for new node" }, { status: 400 });
      }

      const { error } = await supabase.from("taxonomy_nodes").insert({
        id,
        label,
        rank,
        common_name: common_name || null,
        parent_id: parent_id || null,
        sort_order: parseInt(sort_order) || 0,
        is_active: is_active ?? true,
      });

      if (error) {
        console.error("Supabase insert error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ success: true });
    } else if (mode === "edit") {
      // Update existing node
      if (!id) {
        return NextResponse.json({ error: "Missing ID for update" }, { status: 400 });
      }

      const { error } = await supabase
        .from("taxonomy_nodes")
        .update({
          label,
          common_name: common_name || null,
          sort_order: parseInt(sort_order) || 0,
          is_active: is_active ?? true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) {
        console.error("Supabase update error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
  } catch (err: any) {
    console.error("API Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const supabase = await createSupabaseServerClient();

    // Ensure admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { data: adminCheck } = await supabase.from("admins").select("id").eq("id", user.id).single();
    if (!adminCheck) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    // Attempt to delete
    const { error } = await supabase
      .from("taxonomy_nodes")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Supabase delete error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
