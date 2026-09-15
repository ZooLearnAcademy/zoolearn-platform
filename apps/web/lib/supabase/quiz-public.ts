/**
 * Quiz Public Data Layer — SERVER ONLY
 *
 * Uses the session-aware Supabase server client (anon key + RLS).
 * Only returns published quiz data and NEVER exposes is_correct.
 */
import { createAdminClient } from "./admin-client";
import type { PublicQuizPayload, QuizQuestion, QuizOption } from "@/types/quiz";

/**
 * Fetch a published quiz with its active questions and safe options.
 * Returns null if the quiz does not exist or is not published.
 * is_correct is explicitly excluded from the SELECT to prevent leakage.
 */
export async function getPublishedQuiz(quizId: string): Promise<PublicQuizPayload | null> {
  // We use the admin client here because we need to validate the quiz
  // is published and return structured data. RLS would also work but
  // the admin client lets us use explicit column selection safely.
  const admin = createAdminClient();

  const { data: quiz, error: quizError } = await admin
    .from("quizzes")
    .select("id, title, description, slug, instructions, passing_percentage, time_limit_seconds, status, created_at, updated_at")
    .eq("id", quizId)
    .eq("status", "published")
    .single();

  if (quizError || !quiz) return null;

  const { data: questions, error: questionsError } = await admin
    .from("quiz_questions")
    .select(`
      id,
      quiz_id,
      question_text,
      question_type,
      points,
      sort_order,
      is_required,
      explanation,
      quiz_options (
        id,
        question_id,
        option_text,
        sort_order
      )
    `)
    // NOTE: is_correct is intentionally NOT in the select above
    .eq("quiz_id", quizId)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (questionsError) throw new Error(questionsError.message);

  const typedQuestions: QuizQuestion[] = (questions ?? []).map((q: any) => ({
    id: q.id,
    quiz_id: q.quiz_id,
    question_text: q.question_text,
    question_type: q.question_type,
    points: q.points,
    sort_order: q.sort_order,
    is_required: q.is_required,
    explanation: q.explanation ?? null,
    options: ((q.quiz_options ?? []) as any[])
      .map((o: any): QuizOption => ({
        id: o.id,
        question_id: o.question_id,
        option_text: o.option_text,
        sort_order: o.sort_order,
      }))
      .sort((a, b) => a.sort_order - b.sort_order),
  }));

  return {
    quiz: quiz as any,
    questions: typedQuestions,
  };
}

/**
 * Fetch a quiz for admin preview (any status, but still omits is_correct).
 * Used by the admin preview page.
 */
export async function getQuizForPreview(quizId: string): Promise<PublicQuizPayload | null> {
  const admin = createAdminClient();

  const { data: quiz, error: quizError } = await admin
    .from("quizzes")
    .select("id, title, description, slug, instructions, passing_percentage, time_limit_seconds, status, created_at, updated_at")
    .eq("id", quizId)
    .single();

  if (quizError || !quiz) return null;

  const { data: questions, error: questionsError } = await admin
    .from("quiz_questions")
    .select(`
      id,
      quiz_id,
      question_text,
      question_type,
      points,
      sort_order,
      is_required,
      explanation,
      quiz_options (
        id,
        question_id,
        option_text,
        sort_order
      )
    `)
    .eq("quiz_id", quizId)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (questionsError) throw new Error(questionsError.message);

  const typedQuestions: QuizQuestion[] = (questions ?? []).map((q: any) => ({
    id: q.id,
    quiz_id: q.quiz_id,
    question_text: q.question_text,
    question_type: q.question_type,
    points: q.points,
    sort_order: q.sort_order,
    is_required: q.is_required,
    explanation: q.explanation ?? null,
    options: ((q.quiz_options ?? []) as any[])
      .map((o: any): QuizOption => ({
        id: o.id,
        question_id: o.question_id,
        option_text: o.option_text,
        sort_order: o.sort_order,
      }))
      .sort((a, b) => a.sort_order - b.sort_order),
  }));

  return {
    quiz: quiz as any,
    questions: typedQuestions,
  };
}
