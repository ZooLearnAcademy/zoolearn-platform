import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { createAdminClient } from "@/lib/supabase/admin-client";

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

/**
 * POST /api/admin/quiz/generate-from-keywords
 * Body: {
 *   title: string,
 *   slug: string,
 *   passing_percentage: number,
 *   keywords: string[],          // filter questions matching ANY keyword
 *   sourceQuizIds: string[],     // pull from these quizzes only
 *   order: "random" | "sequential",
 *   maxQuestions?: number        // optional cap
 * }
 */
export async function POST(req: Request) {
  try {
    const user = await requireAdmin();
    if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const body = await req.json();
    const {
      title,
      slug,
      passing_percentage = 60,
      keywords,
      sourceQuizIds,
      order = "sequential",
      maxQuestions,
    } = body as {
      title: string;
      slug: string;
      passing_percentage?: number;
      keywords: string[];
      sourceQuizIds: string[];
      order: "random" | "sequential";
      maxQuestions?: number;
    };

    // ── Validate
    if (!title?.trim()) return NextResponse.json({ error: "title is required" }, { status: 400 });
    if (!slug?.trim()) return NextResponse.json({ error: "slug is required" }, { status: 400 });
    if (!Array.isArray(keywords) || keywords.length === 0)
      return NextResponse.json({ error: "At least one keyword is required" }, { status: 400 });
    if (!Array.isArray(sourceQuizIds) || sourceQuizIds.length === 0)
      return NextResponse.json({ error: "At least one source quiz must be selected" }, { status: 400 });

    const admin = createAdminClient();

    // ── Check slug uniqueness
    const { data: existing } = await admin.from("quizzes").select("id").eq("slug", slug.trim()).single();
    if (existing) return NextResponse.json({ error: `Slug "${slug}" is already taken` }, { status: 409 });

    // ── Fetch matching questions from selected quizzes
    // Use Supabase array overlap operator (&&) to match ANY keyword
    const { data: matchingQuestions, error: qErr } = await admin
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
        keywords,
        quiz_options ( id, option_text, sort_order, is_correct )
      `)
      .in("quiz_id", sourceQuizIds)
      .eq("is_active", true)
      .overlaps("keywords", keywords);  // PostgreSQL && array overlap

    if (qErr) return NextResponse.json({ error: qErr.message }, { status: 500 });
    if (!matchingQuestions || matchingQuestions.length === 0) {
      return NextResponse.json({ error: "No questions found matching the given keywords in the selected quizzes" }, { status: 404 });
    }

    // ── Apply order
    let orderedQuestions = [...matchingQuestions];
    if (order === "random") {
      orderedQuestions = orderedQuestions.sort(() => Math.random() - 0.5);
    }
    // "sequential" keeps DB order (sort_order within each quiz)

    // ── Apply max cap
    if (maxQuestions && maxQuestions > 0) {
      orderedQuestions = orderedQuestions.slice(0, maxQuestions);
    }

    // ── Create the new quiz
    const { data: newQuiz, error: quizErr } = await admin
      .from("quizzes")
      .insert({
        title: title.trim(),
        slug: slug.trim(),
        description: `Auto-generated from keywords: ${keywords.join(", ")}`,
        passing_percentage,
        status: "draft",
      })
      .select()
      .single();

    if (quizErr || !newQuiz) return NextResponse.json({ error: quizErr?.message ?? "Failed to create quiz" }, { status: 500 });

    const newQuizId = (newQuiz as any).id;

    // ── Copy questions + options into the new quiz
    let inserted = 0;
    for (let i = 0; i < orderedQuestions.length; i++) {
      const q = orderedQuestions[i]!;

      const { data: newQ, error: nqErr } = await admin
        .from("quiz_questions")
        .insert({
          quiz_id: newQuizId,
          question_text: q.question_text,
          question_type: q.question_type,
          points: q.points,
          sort_order: i,
          is_required: q.is_required,
          is_active: true,
          explanation: q.explanation,
          keywords: q.keywords,
        })
        .select("id")
        .single();

      if (nqErr || !newQ) continue;

      const opts = (q as any).quiz_options ?? [];
      if (opts.length > 0) {
        await admin.from("quiz_options").insert(
          opts.map((o: any, idx: number) => ({
            question_id: (newQ as any).id,
            option_text: o.option_text,
            sort_order: idx,
            is_correct: o.is_correct,
          }))
        );
      }
      inserted++;
    }

    return NextResponse.json({
      success: true,
      quizId: newQuizId,
      slug: slug.trim(),
      questionsInserted: inserted,
    }, { status: 201 });

  } catch (err: any) {
    console.error("[generate-from-keywords] Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
