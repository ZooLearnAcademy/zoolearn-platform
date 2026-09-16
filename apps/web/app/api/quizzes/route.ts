import { NextResponse } from "next/server";
import { getPublishedQuizzes } from "@/lib/supabase/quiz-public";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const quizzes = await getPublishedQuizzes();
    return NextResponse.json({ quizzes });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to fetch quizzes" },
      { status: 500 }
    );
  }
}
