import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { getAdminQuizDetail } from "@/lib/supabase/quiz-admin";
import { QuestionEditor } from "@/components/admin/quiz/QuestionEditor";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ quizId: string; questionId: string }> };

export async function generateMetadata({ params }: Props) {
  const { quizId } = await params;
  const quiz = await getAdminQuizDetail(quizId).catch(() => null);
  return { title: quiz ? `Edit Question — ${quiz.title}` : "Question Editor" };
}

export default async function QuestionEditorPage({ params }: Props) {
  const { quizId, questionId } = await params;

  const quiz = await getAdminQuizDetail(quizId).catch(() => null);
  if (!quiz) notFound();

  const question = quiz.questions?.find((q) => q.id === questionId);
  if (!question) notFound();

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto space-y-6">
      {/* Back */}
      <Link
        href={`/admin/quiz/${quizId}`}
        className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors text-sm"
      >
        <ArrowLeft size={14} />
        Back to {quiz.title}
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white mb-1">Edit Question</h1>
        <p className="text-slate-400 text-sm">
          Question {(quiz.questions?.findIndex((q) => q.id === questionId) ?? 0) + 1} of{" "}
          {quiz.questions?.length ?? 0}
        </p>
      </div>

      <div className="bg-white/[0.02] border border-white/8 rounded-2xl p-6">
        <QuestionEditor question={question} quizId={quizId} />
      </div>
    </div>
  );
}
