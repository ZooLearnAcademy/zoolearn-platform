import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { QuizSettings } from "@/components/admin/quiz/QuizSettings";

export const metadata = {
  title: "New Quiz — ZooLearn Admin",
};

export default function NewQuizPage() {
  return (
    <div className="p-6 md:p-10 max-w-2xl mx-auto space-y-8">
      {/* Back */}
      <Link
        href="/admin/quiz"
        className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors text-sm"
      >
        <ArrowLeft size={14} />
        Back to Quiz Engine
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white mb-1">Create Quiz</h1>
        <p className="text-slate-400 text-sm">
          Start with the basic settings. You&apos;ll add questions after creating.
        </p>
      </div>

      <div className="bg-white/[0.02] border border-white/8 rounded-2xl p-6">
        <QuizSettings isCreate />
      </div>
    </div>
  );
}
