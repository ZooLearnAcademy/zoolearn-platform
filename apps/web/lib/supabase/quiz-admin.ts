/**
 * Quiz Admin Data Layer — SERVER ONLY
 *
 * Uses the service-role Supabase client to bypass RLS.
 * All functions are safe to call from Route Handlers and Server Actions.
 * NEVER import this in client components.
 */
import { createAdminClient } from "./admin-client";
import type {
  AdminQuizDetail,
  AdminQuizListItem,
  CreateQuizInput,
  UpdateQuizInput,
  CreateQuestionInput,
  UpdateQuestionInput,
  CreateOptionInput,
  UpdateOptionInput,
} from "@/types/quiz";

// ─── Quiz CRUD ────────────────────────────────────────────────

/** Get all quizzes with question count for the admin list. */
export async function getAdminQuizList(): Promise<AdminQuizListItem[]> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("quizzes")
    .select(`
      *,
      quiz_questions(count)
    `)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (data ?? []).map((q: any) => ({
    ...q,
    question_count: q.quiz_questions?.[0]?.count ?? 0,
  }));
}

/** Get a single quiz with all questions and options (admin view). */
export async function getAdminQuizDetail(quizId: string): Promise<AdminQuizDetail | null> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("quizzes")
    .select(`
      *,
      quiz_questions (
        *,
        quiz_options (*)
      )
    `)
    .eq("id", quizId)
    .order("sort_order", { referencedTable: "quiz_questions", ascending: true })
    .order("sort_order", { referencedTable: "quiz_questions.quiz_options", ascending: true })
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // not found
    throw new Error(error.message);
  }

  if (!data) return null;

  // Remap Supabase table-name keys: quiz_questions → questions, quiz_options → options
  const raw = data as any;
  const questions = (raw.quiz_questions ?? []).map((q: any) => ({
    ...q,
    options: (q.quiz_options ?? []).sort((a: any, b: any) => a.sort_order - b.sort_order),
  }));

  return {
    ...raw,
    questions,
  } as AdminQuizDetail;
}

/** Create a new quiz. Returns the created quiz row. */
export async function createQuiz(input: CreateQuizInput) {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("quizzes")
    .insert({
      title: input.title,
      description: input.description ?? null,
      slug: input.slug,
      instructions: input.instructions ?? null,
      passing_percentage: input.passing_percentage,
      time_limit_seconds: input.time_limit_seconds ?? null,
      status: input.status ?? "draft",
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

/** Update an existing quiz. */
export async function updateQuiz(quizId: string, input: UpdateQuizInput) {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("quizzes")
    .update({
      ...(input.title !== undefined && { title: input.title }),
      ...(input.description !== undefined && { description: input.description }),
      ...(input.slug !== undefined && { slug: input.slug }),
      ...(input.instructions !== undefined && { instructions: input.instructions }),
      ...(input.passing_percentage !== undefined && { passing_percentage: input.passing_percentage }),
      ...(input.time_limit_seconds !== undefined && { time_limit_seconds: input.time_limit_seconds }),
      ...(input.status !== undefined && { status: input.status }),
    })
    .eq("id", quizId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

/** Delete a quiz (cascades to questions and options). */
export async function deleteQuiz(quizId: string) {
  const admin = createAdminClient();
  const { error } = await admin.from("quizzes").delete().eq("id", quizId);
  if (error) throw new Error(error.message);
}

// ─── Question CRUD ────────────────────────────────────────────

/** Create a new question. Returns the created row. */
export async function createQuestion(input: CreateQuestionInput) {
  const admin = createAdminClient();

  // Auto-assign sort_order if not provided
  let sortOrder = input.sort_order;
  if (sortOrder === undefined) {
    const { count } = await admin
      .from("quiz_questions")
      .select("*", { count: "exact", head: true })
      .eq("quiz_id", input.quiz_id);
    sortOrder = (count ?? 0);
  }

  const { data, error } = await admin
    .from("quiz_questions")
    .insert({
      quiz_id: input.quiz_id,
      question_text: input.question_text,
      question_type: input.question_type,
      points: input.points ?? 1,
      sort_order: sortOrder,
      is_required: input.is_required ?? true,
      is_active: input.is_active ?? true,
      explanation: input.explanation ?? null,
      keywords: input.keywords ?? [],
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

/** Update a question. */
export async function updateQuestion(questionId: string, input: UpdateQuestionInput) {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("quiz_questions")
    .update({
      ...(input.question_text !== undefined && { question_text: input.question_text }),
      ...(input.question_type !== undefined && { question_type: input.question_type }),
      ...(input.points !== undefined && { points: input.points }),
      ...(input.sort_order !== undefined && { sort_order: input.sort_order }),
      ...(input.is_required !== undefined && { is_required: input.is_required }),
      ...(input.is_active !== undefined && { is_active: input.is_active }),
      ...(input.explanation !== undefined && { explanation: input.explanation }),
      ...(input.keywords !== undefined && { keywords: input.keywords }),
    })
    .eq("id", questionId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

/** Delete a question (cascades to options). */
export async function deleteQuestion(questionId: string) {
  const admin = createAdminClient();
  const { error } = await admin.from("quiz_questions").delete().eq("id", questionId);
  if (error) throw new Error(error.message);
}

/** Batch reorder questions by setting sort_order from ordered IDs. */
export async function reorderQuestions(quizId: string, orderedIds: string[]) {
  const admin = createAdminClient();
  const updates = orderedIds.map((id, index) =>
    admin
      .from("quiz_questions")
      .update({ sort_order: index })
      .eq("id", id)
      .eq("quiz_id", quizId)
  );
  await Promise.all(updates);
}

/** Duplicate a question and its options (new UUIDs via Supabase default). */
export async function duplicateQuestion(questionId: string) {
  const admin = createAdminClient();

  // Fetch source question
  const { data: source, error: qErr } = await admin
    .from("quiz_questions")
    .select("*, quiz_options(*)")
    .eq("id", questionId)
    .single();

  if (qErr || !source) throw new Error(qErr?.message ?? "Question not found");

  // Get max sort_order to append at end
  const { count } = await admin
    .from("quiz_questions")
    .select("*", { count: "exact", head: true })
    .eq("quiz_id", (source as any).quiz_id);

  // Insert copy of question
  const { data: newQ, error: insertErr } = await admin
    .from("quiz_questions")
    .insert({
      quiz_id: (source as any).quiz_id,
      question_text: `${(source as any).question_text} (copy)`,
      question_type: (source as any).question_type,
      points: (source as any).points,
      sort_order: count ?? 0,
      is_required: (source as any).is_required,
      is_active: (source as any).is_active,
      explanation: (source as any).explanation,
    })
    .select()
    .single();

  if (insertErr || !newQ) throw new Error(insertErr?.message ?? "Failed to duplicate");

  // Copy options
  const options = (source as any).quiz_options ?? [];
  if (options.length > 0) {
    const optionInserts = options.map((o: any) => ({
      question_id: (newQ as any).id,
      option_text: o.option_text,
      sort_order: o.sort_order,
      is_correct: o.is_correct,
    }));
    await admin.from("quiz_options").insert(optionInserts);
  }

  return newQ;
}

// ─── Option CRUD ──────────────────────────────────────────────

/** Create a new option. */
export async function createOption(input: CreateOptionInput) {
  const admin = createAdminClient();

  let sortOrder = input.sort_order;
  if (sortOrder === undefined) {
    const { count } = await admin
      .from("quiz_options")
      .select("*", { count: "exact", head: true })
      .eq("question_id", input.question_id);
    sortOrder = count ?? 0;
  }

  const { data, error } = await admin
    .from("quiz_options")
    .insert({
      question_id: input.question_id,
      option_text: input.option_text,
      sort_order: sortOrder,
      is_correct: input.is_correct ?? false,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

/** Update an option. */
export async function updateOption(optionId: string, input: UpdateOptionInput) {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("quiz_options")
    .update({
      ...(input.option_text !== undefined && { option_text: input.option_text }),
      ...(input.sort_order !== undefined && { sort_order: input.sort_order }),
      ...(input.is_correct !== undefined && { is_correct: input.is_correct }),
    })
    .eq("id", optionId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

/** Delete an option. */
export async function deleteOption(optionId: string) {
  const admin = createAdminClient();
  const { error } = await admin.from("quiz_options").delete().eq("id", optionId);
  if (error) throw new Error(error.message);
}
