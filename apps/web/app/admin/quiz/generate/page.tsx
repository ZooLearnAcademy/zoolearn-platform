import { KeywordQuizGenerator } from "@/components/admin/quiz/KeywordQuizGenerator";
import Link from "next/link";
import { ArrowLeft, Sparkle } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
  title: "Generate Quiz from Keywords | ZooLearn Admin",
};

export default function GenerateQuizPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/8">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            href="/admin/quiz"
            className="flex items-center gap-1.5 text-slate-500 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft size={15} />
            Back to Quizzes
          </Link>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-violet-500/15 border border-violet-500/25 flex items-center justify-center">
              <Sparkle size={14} weight="fill" className="text-violet-400" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white leading-none">Generate from Keywords</h1>
              <p className="text-[11px] text-slate-600 leading-none mt-0.5">Auto-build a quiz from tagged questions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-400 text-xs font-semibold mb-4">
            <Sparkle size={12} weight="fill" />
            Keyword-Powered Quiz Builder
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight mb-2">
            Generate a Quiz from Keywords
          </h2>
          <p className="text-slate-400 text-sm max-w-lg">
            Tag questions with keywords (e.g. <code className="text-violet-400 bg-violet-500/10 px-1 rounded">mitosis</code>,{" "}
            <code className="text-violet-400 bg-violet-500/10 px-1 rounded">cell-cycle</code>) and instantly generate a focused quiz
            by selecting those keywords. Choose your source quizzes and pick random or sequential order.
          </p>
        </div>

        <KeywordQuizGenerator />
      </div>
    </div>
  );
}
