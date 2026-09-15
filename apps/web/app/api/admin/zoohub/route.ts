import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { createAdminClient } from "@/lib/supabase/admin-client";
import { revalidatePath } from "next/cache";

async function verifyAdminRequest() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("user_id", user.id)
    .single();
  return (profile as any)?.is_admin === true ? user : null;
}

// ── POST — Add or Edit ──────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const adminUser = await verifyAdminRequest();
  if (!adminUser) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const body = await request.json();
  const { mode, editTarget, editType, name, slug, subtitle, scientific_name, phylum_slug, class_slug, sort_order } = body;

  if (!name || !slug) {
    return NextResponse.json({ error: "Name and slug are required." }, { status: 400 });
  }

  const admin = createAdminClient();

  try {
    if (mode === "add-phylum") {
      // Check slug uniqueness
      const { data: existing } = await admin.from("phyla").select("slug").eq("slug", slug).single();
      if (existing) return NextResponse.json({ error: "A phylum with this slug already exists." }, { status: 409 });

      const { error } = await admin.from("phyla").insert({
        slug,
        name,
        subtitle: subtitle || null,
        sort_order: parseInt(sort_order) || 0,
      });
      if (error) throw error;

    } else if (mode === "add-class") {
      if (!phylum_slug) return NextResponse.json({ error: "Parent phylum is required." }, { status: 400 });

      const { data: existing } = await admin.from("classes").select("slug").eq("slug", slug).single();
      if (existing) return NextResponse.json({ error: "A class with this slug already exists." }, { status: 409 });

      const { error } = await admin.from("classes").insert({
        slug,
        class_name: name,
        phylum_slug,
        sort_order: parseInt(sort_order) || 0,
      });
      if (error) throw error;

    } else if (mode === "add-species") {
      if (!phylum_slug) return NextResponse.json({ error: "Parent phylum is required." }, { status: 400 });

      const { data: existing } = await admin.from("species").select("slug").eq("slug", slug).single();
      if (existing) return NextResponse.json({ error: "A species with this slug already exists." }, { status: 409 });

      const { error } = await admin.from("species").insert({
        slug,
        name,
        scientific_name: scientific_name || null,
        phylum_slug,
        class_slug: class_slug || null,
        sort_order: parseInt(sort_order) || 0,
        introduction: [],
        features: {},
        classification: {},
        size_structure: [],
        ecology: [],
        economy: [],
      });
      if (error) throw error;

    } else if (mode === "edit") {
      if (!editTarget || !editType) {
        return NextResponse.json({ error: "Missing edit target." }, { status: 400 });
      }

      if (editType === "phylum") {
        const { error } = await admin.from("phyla").update({
          name,
          subtitle: subtitle || null,
          sort_order: parseInt(sort_order) || 0,
        }).eq("slug", editTarget);
        if (error) throw error;

      } else if (editType === "class") {
        const { error } = await admin.from("classes").update({
          class_name: name,
          phylum_slug: phylum_slug || undefined,
          sort_order: parseInt(sort_order) || 0,
        }).eq("slug", editTarget);
        if (error) throw error;

      } else if (editType === "species") {
        const { error } = await admin.from("species").update({
          name,
          scientific_name: scientific_name || null,
          phylum_slug: phylum_slug || undefined,
          class_slug: class_slug || null,
          sort_order: parseInt(sort_order) || 0,
        }).eq("slug", editTarget);
        if (error) throw error;
      }
    }

    revalidatePath("/taxonomy");
    revalidatePath("/admin/taxonomy");
    return NextResponse.json({ message: "Saved successfully." });

  } catch (err: any) {
    console.error("[taxonomy api] error:", err);
    return NextResponse.json({ error: err.message || "Database error." }, { status: 500 });
  }
}

// ── DELETE ──────────────────────────────────────────────────────────────────

export async function DELETE(request: NextRequest) {
  const adminUser = await verifyAdminRequest();
  if (!adminUser) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const { slug, type } = await request.json();
  if (!slug || !type) return NextResponse.json({ error: "Missing slug or type." }, { status: 400 });

  const admin = createAdminClient();

  try {
    if (type === "phylum") {
      // Safety: check for children
      const { count: classCount } = await admin
        .from("classes")
        .select("*", { count: "exact", head: true })
        .eq("phylum_slug", slug);
      const { count: speciesCount } = await admin
        .from("species")
        .select("*", { count: "exact", head: true })
        .eq("phylum_slug", slug);

      if ((classCount ?? 0) > 0 || (speciesCount ?? 0) > 0) {
        return NextResponse.json({
          error: `Cannot delete. This phylum has ${classCount} class(es) and ${speciesCount} species. Please remove them first.`,
        }, { status: 409 });
      }
      const { error } = await admin.from("phyla").delete().eq("slug", slug);
      if (error) throw error;

    } else if (type === "class") {
      const { count: speciesCount } = await admin
        .from("species")
        .select("*", { count: "exact", head: true })
        .eq("class_slug", slug);

      if ((speciesCount ?? 0) > 0) {
        return NextResponse.json({
          error: `Cannot delete. This class has ${speciesCount} species. Please remove them first.`,
        }, { status: 409 });
      }
      const { error } = await admin.from("classes").delete().eq("slug", slug);
      if (error) throw error;

    } else if (type === "species") {
      const { error } = await admin.from("species").delete().eq("slug", slug);
      if (error) throw error;
    }

    revalidatePath("/taxonomy");
    revalidatePath("/admin/taxonomy");
    return NextResponse.json({ message: "Deleted successfully." });

  } catch (err: any) {
    console.error("[taxonomy api] delete error:", err);
    return NextResponse.json({ error: err.message || "Database error." }, { status: 500 });
  }
}
