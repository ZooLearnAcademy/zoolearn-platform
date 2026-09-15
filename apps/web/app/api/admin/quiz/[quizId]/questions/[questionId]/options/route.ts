import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { createOption, updateOption, deleteOption } from "@/lib/supabase/quiz-admin";

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

/** POST /api/admin/quiz/[quizId]/questions/[questionId]/options — Create option */
export async function POST(req: Request, { params }: Params) {
  try {
    const user = await requireAdmin();
    if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { questionId } = await params;
    const body = await req.json();
    const { option_text, is_correct } = body;

    if (!option_text?.trim()) {
      return NextResponse.json({ error: "option_text is required" }, { status: 400 });
    }

    const option = await createOption({
      question_id: questionId,
      option_text: option_text.trim(),
      is_correct: is_correct ?? false,
    });

    return NextResponse.json({ option }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/** PATCH /api/admin/quiz/[quizId]/questions/[questionId]/options?optionId=... — Update option */
export async function PATCH(req: Request, { params: _params }: Params) {
  try {
    const user = await requireAdmin();
    if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const url = new URL(req.url);
    const optionId = url.searchParams.get("optionId");

    if (!optionId) {
      return NextResponse.json({ error: "optionId query param required" }, { status: 400 });
    }

    const body = await req.json();
    const option = await updateOption(optionId, body);
    return NextResponse.json({ option });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/** DELETE /api/admin/quiz/[quizId]/questions/[questionId]/options?optionId=... — Delete option */
export async function DELETE(req: Request, { params: _params }: Params) {
  try {
    const user = await requireAdmin();
    if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const url = new URL(req.url);
    const optionId = url.searchParams.get("optionId");

    if (!optionId) {
      return NextResponse.json({ error: "optionId query param required" }, { status: 400 });
    }

    await deleteOption(optionId);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
