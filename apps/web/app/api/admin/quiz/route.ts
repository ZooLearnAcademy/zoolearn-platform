import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { getAdminQuizList, createQuiz } from "@/lib/supabase/quiz-admin";

async function requireAdmin() {
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

/** GET /api/admin/quiz — List all quizzes */
export async function GET() {
  try {
    const user = await requireAdmin();
    if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const quizzes = await getAdminQuizList();
    return NextResponse.json({ quizzes });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/** POST /api/admin/quiz — Create a quiz */
export async function POST(req: Request) {
  try {
    const user = await requireAdmin();
    if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const body = await req.json();
    const { title, description, slug, instructions, passing_percentage, time_limit_seconds, status } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: "title and slug are required" }, { status: 400 });
    }
    if (typeof passing_percentage !== "number" || passing_percentage < 0 || passing_percentage > 100) {
      return NextResponse.json({ error: "passing_percentage must be 0–100" }, { status: 400 });
    }

    const quiz = await createQuiz({
      title,
      description,
      slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
      instructions,
      passing_percentage,
      time_limit_seconds: time_limit_seconds ?? null,
      status: status ?? "draft",
    });

    return NextResponse.json({ quiz }, { status: 201 });
  } catch (err: any) {
    // Unique slug violation
    if (err.message?.includes("unique")) {
      return NextResponse.json({ error: "A quiz with this slug already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
