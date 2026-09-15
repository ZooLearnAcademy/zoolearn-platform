import { Question, Sparkle } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { getAdminQuizList } from "@/lib/supabase/quiz-admin";
import { QuizList } from "@/components/admin/quiz/QuizList";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Quiz Engine — ZooLearn Admin",
};

export default async function AdminQuizPage() {
  let quizzes: Awaited<ReturnType<typeof getAdminQuizList>> = [];
  try {
    quizzes = await getAdminQuizList();
  } catch { /* will show empty state */ }

  const published = quizzes.filter((q) => q.status === "published").length;
  const draft = quizzes.filter((q) => q.status === "draft").length;

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          <span className="text-xs text-violet-400 font-medium uppercase tracking-widest">
            Live Database
          </span>
        </div>
        <h1 className="text-2xl font-black text-white mb-1">Quiz Engine</h1>
        <p className="text-slate-400 text-sm">
          Create and manage quizzes. Embed anywhere with{" "}
          <code className="text-violet-400 text-xs bg-violet-500/10 px-1.5 py-0.5 rounded">
            {"<QuizEmbed quizId=\"...\" />"}
          </code>
        </p>

        {/* Quick counts */}
        <div className="flex flex-wrap gap-3 mt-4">
          {[
            { label: "Total Quizzes", value: quizzes.length, color: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
            { label: "Published", value: published, color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
            { label: "Draft", value: draft, color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
          ].map((s) => (
            <div
              key={s.label}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-sm font-bold ${s.color}`}
            >
              {s.value.toLocaleString()} {s.label}
            </div>
          ))}
        </div>

        {/* Generate from Keywords button */}
        <div className="mt-4">
          <Link
            href="/admin/quiz/generate"
            className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/25 text-violet-400 text-sm font-semibold rounded-xl hover:bg-violet-500/20 hover:border-violet-500/40 transition-all"
          >
            <Sparkle size={14} weight="fill" />
            Generate Quiz from Keywords
          </Link>
        </div>
      </div>

      <QuizList quizzes={quizzes} />
    </div>
  );
}
