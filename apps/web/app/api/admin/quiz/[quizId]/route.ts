import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { getAdminQuizDetail, updateQuiz, deleteQuiz } from "@/lib/supabase/quiz-admin";

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

type Params = { params: Promise<{ quizId: string }> };

/** GET /api/admin/quiz/[quizId] — Get quiz detail */
export async function GET(_req: Request, { params }: Params) {
  try {
    const user = await requireAdmin();
    if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { quizId } = await params;
    const quiz = await getAdminQuizDetail(quizId);
    if (!quiz) return NextResponse.json({ error: "Quiz not found" }, { status: 404 });

    return NextResponse.json({ quiz });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/** PATCH /api/admin/quiz/[quizId] — Update quiz */
export async function PATCH(req: Request, { params }: Params) {
  try {
    const user = await requireAdmin();
    if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { quizId } = await params;
    const body = await req.json();

    // Sanitise slug if provided
    if (body.slug) {
      body.slug = body.slug.toLowerCase().replace(/[^a-z0-9-]/g, "-");
    }

    const quiz = await updateQuiz(quizId, body);
    return NextResponse.json({ quiz });
  } catch (err: any) {
    if (err.message?.includes("unique")) {
      return NextResponse.json({ error: "A quiz with this slug already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/** DELETE /api/admin/quiz/[quizId] — Delete quiz (cascades) */
export async function DELETE(_req: Request, { params }: Params) {
  try {
    const user = await requireAdmin();
    if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { quizId } = await params;
    await deleteQuiz(quizId);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
