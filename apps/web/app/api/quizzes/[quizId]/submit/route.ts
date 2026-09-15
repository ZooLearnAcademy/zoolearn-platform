/**
 * POST /api/quizzes/[quizId]/submit
 *
 * Secure server-side quiz scoring endpoint.
 * - Validates quiz exists and is published
 * - Validates all questionIds and optionIds belong to this quiz
 * - Loads correct answers using service-role client (never sent to client)
 * - Returns ONLY { score, total, percentage, passed }
 * - Never trusts any score from the client
 */
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin-client";
import type { QuizAnswer } from "@/types/quiz";

type Params = { params: Promise<{ quizId: string }> };

export async function POST(req: Request, { params }: Params) {
  try {
    const { quizId } = await params;

    // ── 1. Parse and basic-validate request body ─────────────
    let body: { answers: QuizAnswer[] };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { answers } = body;
    if (!Array.isArray(answers)) {
      return NextResponse.json({ error: "answers must be an array" }, { status: 400 });
    }

    // ── 2. Load quiz server-side (service role bypasses RLS) ──
    const admin = createAdminClient();

    const { data: quiz, error: quizError } = await admin
      .from("quizzes")
      .select("id, status, passing_percentage")
      .eq("id", quizId)
      .single();

    if (quizError || !quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    if ((quiz as any).status !== "published") {
      return NextResponse.json({ error: "This quiz is not currently available" }, { status: 403 });
    }

    // ── 3. Load ALL active questions for this quiz ────────────
    const { data: questions, error: qErr } = await admin
      .from("quiz_questions")
      .select("id, points, is_required")
      .eq("quiz_id", quizId)
      .eq("is_active", true);

    if (qErr) return NextResponse.json({ error: "Failed to load quiz" }, { status: 500 });

    const questionMap = new Map(
      (questions ?? []).map((q: any) => [q.id, q])
    );

    // ── 4. Load ALL options for this quiz (with is_correct) ───
    const questionIds = Array.from(questionMap.keys());
    if (questionIds.length === 0) {
      return NextResponse.json({ error: "Quiz has no active questions" }, { status: 422 });
    }

    const { data: options, error: oErr } = await admin
      .from("quiz_options")
      .select("id, question_id, is_correct")
      .in("question_id", questionIds);

    if (oErr) return NextResponse.json({ error: "Failed to load quiz" }, { status: 500 });

    // Map: optionId → { question_id, is_correct }
    const optionMap = new Map(
      (options ?? []).map((o: any) => [o.id, o])
    );

    // ── 5. Validate each submitted answer ─────────────────────
    const submittedQuestionIds = new Set<string>();

    for (const answer of answers) {
      if (typeof answer.questionId !== "string") {
        return NextResponse.json({ error: "Invalid questionId in answers" }, { status: 400 });
      }
      if (!questionMap.has(answer.questionId)) {
        return NextResponse.json(
          { error: `Question ${answer.questionId} does not belong to this quiz` },
          { status: 400 }
        );
      }
      if (submittedQuestionIds.has(answer.questionId)) {
        return NextResponse.json(
          { error: `Duplicate answer for question ${answer.questionId}` },
          { status: 400 }
        );
      }
      submittedQuestionIds.add(answer.questionId);

      if (!Array.isArray(answer.selectedOptionIds)) {
        return NextResponse.json({ error: "selectedOptionIds must be an array" }, { status: 400 });
      }

      for (const optId of answer.selectedOptionIds) {
        if (typeof optId !== "string") {
          return NextResponse.json({ error: "Invalid option ID" }, { status: 400 });
        }
        const option = optionMap.get(optId);
        if (!option) {
          return NextResponse.json(
            { error: `Option ${optId} not found in this quiz` },
            { status: 400 }
          );
        }
        if ((option as any).question_id !== answer.questionId) {
          return NextResponse.json(
            { error: `Option ${optId} does not belong to question ${answer.questionId}` },
            { status: 400 }
          );
        }
      }
    }

    // ── 6. Score calculation ──────────────────────────────────
    let earnedPoints = 0;
    let totalPoints = 0;

    for (const [questionId, question] of questionMap) {
      const q = question as any;
      totalPoints += q.points;

      const answer = answers.find((a) => a.questionId === questionId);
      if (!answer || answer.selectedOptionIds.length === 0) continue;

      // Get all correct option IDs for this question
      const correctOptionIds = new Set(
        (options ?? [])
          .filter((o: any) => o.question_id === questionId && o.is_correct)
          .map((o: any) => o.id)
      );

      const selectedIds = new Set(answer.selectedOptionIds);

      // All selected must be correct AND all correct must be selected
      const allSelectedAreCorrect = [...selectedIds].every((id) => correctOptionIds.has(id));
      const allCorrectAreSelected = [...correctOptionIds].every((id) => selectedIds.has(id));

      if (allSelectedAreCorrect && allCorrectAreSelected && correctOptionIds.size > 0) {
        earnedPoints += q.points;
      }
    }

    const percentage =
      totalPoints === 0 ? 0 : Math.round((earnedPoints / totalPoints) * 100);

    const passed = percentage >= (quiz as any).passing_percentage;

    // ── 7. Return result (no correct-answer data) ─────────────
    return NextResponse.json({
      score: earnedPoints,
      total: totalPoints,
      percentage,
      passed,
    });
  } catch (err: any) {
    console.error("[quiz/submit] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
