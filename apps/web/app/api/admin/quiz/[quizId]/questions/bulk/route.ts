import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { createAdminClient } from "@/lib/supabase/admin-client";
import type { QuestionType } from "@/types/quiz";

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

interface BulkQuestionRow {
  question_text: string;
  question_type: QuestionType;
  points: number;
  is_required: boolean;
  explanation?: string;
  keywords?: string[];
  options: Array<{ text: string; is_correct: boolean }>;
}

type Params = { params: Promise<{ quizId: string }> };

/**
 * POST /api/admin/quiz/[quizId]/questions/bulk
 * Body: { questions: BulkQuestionRow[] }
 * Creates multiple questions and their options in a single call.
 */
export async function POST(req: Request, { params }: Params) {
  try {
    const user = await requireAdmin();
    if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { quizId } = await params;
    const body = await req.json();
    const { questions } = body as { questions: BulkQuestionRow[] };

    if (!Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json({ error: "questions array is required" }, { status: 400 });
    }
    if (questions.length > 200) {
      return NextResponse.json({ error: "Maximum 200 questions per import" }, { status: 400 });
    }

    const validTypes: QuestionType[] = ["single_choice", "multiple_choice", "true_false"];

    // Validate rows
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i]!;
      if (!q.question_text?.trim()) {
        return NextResponse.json({ error: `Row ${i + 1}: question_text is required` }, { status: 400 });
      }
      if (!validTypes.includes(q.question_type)) {
        return NextResponse.json(
          { error: `Row ${i + 1}: invalid question_type "${q.question_type}"` },
          { status: 400 }
        );
      }
      if (!Array.isArray(q.options) || q.options.length === 0) {
        return NextResponse.json({ error: `Row ${i + 1}: at least one option is required` }, { status: 400 });
      }
    }

    // Get current max sort_order
    const admin = createAdminClient();
    const { count: existingCount } = await admin
      .from("quiz_questions")
      .select("*", { count: "exact", head: true })
      .eq("quiz_id", quizId);

    let startOrder = existingCount ?? 0;
    const results: { questionId: string; optionCount: number }[] = [];

    // Insert each question + options
    for (const q of questions) {
      const { data: newQ, error: qErr } = await admin
        .from("quiz_questions")
        .insert({
          quiz_id: quizId,
          question_text: q.question_text.trim(),
          question_type: q.question_type,
          points: q.points ?? 1,
          sort_order: startOrder++,
          is_required: q.is_required ?? true,
          is_active: true,
          explanation: q.explanation?.trim() || null,
          keywords: q.keywords ?? [],
        })
        .select("id")
        .single();

      if (qErr || !newQ) {
        return NextResponse.json({ error: `Failed to insert question: ${qErr?.message}` }, { status: 500 });
      }

      const questionId = (newQ as any).id;

      if (q.options.length > 0) {
        const optionRows = q.options.map((o, idx) => ({
          question_id: questionId,
          option_text: o.text.trim(),
          sort_order: idx,
          is_correct: o.is_correct,
        }));

        const { error: oErr } = await admin.from("quiz_options").insert(optionRows);
        if (oErr) {
          return NextResponse.json({ error: `Failed to insert options: ${oErr.message}` }, { status: 500 });
        }
      }

      results.push({ questionId, optionCount: q.options.length });
    }

    return NextResponse.json({
      success: true,
      imported: results.length,
      results,
    }, { status: 201 });
  } catch (err: any) {
    console.error("[bulk import] Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
