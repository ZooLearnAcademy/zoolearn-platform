import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye } from "@phosphor-icons/react/dist/ssr";
import { getQuizForPreview } from "@/lib/supabase/quiz-public";
import { QuizRenderer } from "@/components/quiz/QuizRenderer";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ quizId: string }> };

export async function generateMetadata({ params }: Props) {
  const { quizId } = await params;
  const payload = await getQuizForPreview(quizId).catch(() => null);
  return { title: payload ? `Preview: ${payload.quiz.title}` : "Quiz Preview" };
}

export default async function QuizPreviewPage({ params }: Props) {
  const { quizId } = await params;
  const payload = await getQuizForPreview(quizId).catch(() => null);
  if (!payload) notFound();

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Admin preview banner */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-amber-400 text-sm font-medium">
          <Eye size={15} weight="duotone" />
          Admin Preview — This quiz may not be published yet
        </div>
        <Link
          href={`/admin/quiz/${quizId}`}
          className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors"
        >
          <ArrowLeft size={13} />
          Back to Builder
        </Link>
      </div>

      {/* Quiz UI */}
      <div className="py-10">
        <QuizRenderer payload={payload} quizId={quizId} />
      </div>
    </div>
  );
}
