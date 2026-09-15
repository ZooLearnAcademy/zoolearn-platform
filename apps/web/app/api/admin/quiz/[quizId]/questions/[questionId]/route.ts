import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { updateQuestion, deleteQuestion, duplicateQuestion } from "@/lib/supabase/quiz-admin";

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

type Params = { params: Promise<{ quizId: string; questionId: string }> };

/** PATCH /api/admin/quiz/[quizId]/questions/[questionId] — Update question */
export async function PATCH(req: Request, { params }: Params) {
  try {
    const user = await requireAdmin();
    if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { questionId } = await params;
    const body = await req.json();

    if (body.question_type) {
      const validTypes = ["single_choice", "multiple_choice", "true_false"];
      if (!validTypes.includes(body.question_type)) {
        return NextResponse.json({ error: "Invalid question_type" }, { status: 400 });
      }
    }

    const question = await updateQuestion(questionId, body);
    return NextResponse.json({ question });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/** DELETE /api/admin/quiz/[quizId]/questions/[questionId] — Delete question */
export async function DELETE(_req: Request, { params }: Params) {
  try {
    const user = await requireAdmin();
    if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { questionId } = await params;
    await deleteQuestion(questionId);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/** POST /api/admin/quiz/[quizId]/questions/[questionId] — Duplicate question */
export async function POST(_req: Request, { params }: Params) {
  try {
    const user = await requireAdmin();
    if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { questionId } = await params;
    const question = await duplicateQuestion(questionId);
    return NextResponse.json({ question }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
