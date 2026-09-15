import { NextResponse } from "next/server";
import { getPublishedQuiz } from "@/lib/supabase/quiz-public";

type Params = { params: Promise<{ quizId: string }> };

export async function GET(req: Request, { params }: Params) {
  try {
    const { quizId } = await params;
    if (!quizId) {
      return NextResponse.json({ error: "quizId is required" }, { status: 400 });
    }

    const payload = await getPublishedQuiz(quizId);
    if (!payload) {
      return NextResponse.json(
        { error: "Quiz not found or not published" },
        { status: 404 }
      );
    }

    return NextResponse.json(payload);
  } catch (error) {
    console.error("Error fetching published quiz:", error);
    return NextResponse.json(
      { error: "Failed to fetch quiz" },
      { status: 500 }
    );
  }
}
