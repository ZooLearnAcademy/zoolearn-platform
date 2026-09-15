import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { createQuestion } from "@/lib/supabase/quiz-admin";

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

/** POST /api/admin/quiz/[quizId]/questions — Create a question */
export async function POST(req: Request, { params }: Params) {
  try {
    const user = await requireAdmin();
    if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { quizId } = await params;
    const body = await req.json();
    const { question_text, question_type, points, is_required, is_active, explanation } = body;

    if (!question_text || !question_type) {
      return NextResponse.json({ error: "question_text and question_type are required" }, { status: 400 });
    }

    const validTypes = ["single_choice", "multiple_choice", "true_false"];
    if (!validTypes.includes(question_type)) {
      return NextResponse.json({ error: "Invalid question_type" }, { status: 400 });
    }

    const question = await createQuestion({
      quiz_id: quizId,
      question_text,
      question_type,
      points: points ?? 1,
      is_required: is_required ?? true,
      is_active: is_active ?? true,
      explanation: explanation ?? undefined,
    });

    return NextResponse.json({ question }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
