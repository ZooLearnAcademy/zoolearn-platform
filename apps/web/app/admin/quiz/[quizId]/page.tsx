import { notFound } from "next/navigation";
import { getAdminQuizDetail } from "@/lib/supabase/quiz-admin";
import { QuizBuilder } from "@/components/admin/quiz/QuizBuilder";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ quizId: string }> };

export async function generateMetadata({ params }: Props) {
  const { quizId } = await params;
  const quiz = await getAdminQuizDetail(quizId).catch(() => null);
  return { title: quiz ? `${quiz.title} — Quiz Admin` : "Quiz — Admin" };
}

export default async function QuizBuilderPage({ params }: Props) {
  const { quizId } = await params;
  const quiz = await getAdminQuizDetail(quizId).catch(() => null);
  if (!quiz) notFound();

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <QuizBuilder quiz={quiz} />
    </div>
  );
}
