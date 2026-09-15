"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Eye,
  GearSix,
  Question,
  Globe,
  Archive,
  PaperPlaneTilt,
  ArrowLeft,
  SpinnerGap,
} from "@phosphor-icons/react";
import { QuizStatusBadge } from "./QuizStatusBadge";
import { QuizSettings } from "./QuizSettings";
import { QuestionList } from "./QuestionList";
import type { AdminQuizDetail, QuizStatus } from "@/types/quiz";

interface QuizBuilderProps {
  quiz: AdminQuizDetail;
}

export function QuizBuilder({ quiz: initial }: QuizBuilderProps) {
  const router = useRouter();
  const [quiz, setQuiz] = useState<AdminQuizDetail>(initial);
  const [tab, setTab] = useState<"questions" | "settings">("questions");
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusError, setStatusError] = useState("");

  const handleStatusChange = async (newStatus: QuizStatus) => {
    setStatusLoading(true);
    setStatusError("");
    try {
      const res = await fetch(`/api/admin/quiz/${quiz.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Status change failed");
      setQuiz((prev) => ({ ...prev, status: newStatus }));
      router.refresh();
    } catch (e: any) {
      setStatusError(e.message);
    } finally {
      setStatusLoading(false);
    }
  };

  const activeQuestions = quiz.questions?.filter((q) => q.is_active) ?? [];

  return (
    <div className="space-y-6">
      {/* Back + Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link
          href="/admin/quiz"
          className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors"
        >
          <ArrowLeft size={14} />
          Quiz Engine
        </Link>
        <span className="text-slate-700">/</span>
        <span className="text-slate-300 truncate">{quiz.title}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-black text-white">{quiz.title}</h1>
              <QuizStatusBadge status={quiz.status} />
            </div>
            <p className="text-slate-500 text-sm font-mono">{quiz.slug}</p>
          </div>
        </div>

        {/* Status actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {statusError && (
            <span className="text-red-400 text-xs">{statusError}</span>
          )}
          <Link
            href={`/admin/quiz/${quiz.id}/preview`}
            className="flex items-center gap-1.5 px-3 py-2 bg-white/5 border border-white/10 text-slate-300 text-sm font-medium rounded-xl hover:bg-white/10 hover:border-white/20 transition-all"
          >
            <Eye size={14} />
            Preview
          </Link>

          {quiz.status !== "published" && (
            <button
              onClick={() => handleStatusChange("published")}
              disabled={statusLoading || activeQuestions.length === 0}
              title={activeQuestions.length === 0 ? "Add at least one active question to publish" : ""}
              className="flex items-center gap-1.5 px-3 py-2 bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-sm font-semibold rounded-xl hover:bg-emerald-500/25 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              {statusLoading ? <SpinnerGap size={14} className="animate-spin" /> : <PaperPlaneTilt size={14} />}
              Publish
            </button>
          )}
          {quiz.status === "published" && (
            <button
              onClick={() => handleStatusChange("draft")}
              disabled={statusLoading}
              className="flex items-center gap-1.5 px-3 py-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-semibold rounded-xl hover:bg-amber-500/20 disabled:opacity-40 transition-all"
            >
              {statusLoading ? <SpinnerGap size={14} className="animate-spin" /> : <Globe size={14} />}
              Unpublish
            </button>
          )}
          {quiz.status !== "archived" && (
            <button
              onClick={() => handleStatusChange("archived")}
              disabled={statusLoading}
              className="flex items-center gap-1.5 px-3 py-2 bg-white/5 border border-white/10 text-slate-500 text-sm font-medium rounded-xl hover:text-slate-300 hover:bg-white/10 disabled:opacity-40 transition-all"
            >
              <Archive size={14} />
              Archive
            </button>
          )}
        </div>
      </div>

      {/* Quick stats */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: "Questions", value: quiz.questions?.length ?? 0, accent: "text-violet-400" },
          { label: "Active", value: activeQuestions.length, accent: "text-emerald-400" },
          { label: "Passing Score", value: `${quiz.passing_percentage}%`, accent: "text-amber-400" },
          {
            label: "Time Limit",
            value: quiz.time_limit_seconds
              ? `${Math.floor(quiz.time_limit_seconds / 60)}m`
              : "None",
            accent: "text-blue-400",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/8 rounded-xl"
          >
            <span className={`text-sm font-bold ${s.accent}`}>{s.value}</span>
            <span className="text-xs text-slate-500">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Embed hint */}
      <div className="flex items-center gap-2 bg-white/[0.02] border border-white/8 rounded-xl px-4 py-3">
        <code className="text-xs text-slate-400 flex-1 truncate">
          {`<QuizEmbed quizId="${quiz.id}" />`}
        </code>
        <button
          onClick={() => navigator.clipboard.writeText(`<QuizEmbed quizId="${quiz.id}" />`)}
          className="text-xs text-slate-600 hover:text-slate-300 transition-colors shrink-0"
        >
          Copy
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/8">
        {(["questions", "settings"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-all -mb-px ${
              tab === t
                ? "border-violet-500 text-violet-400"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            {t === "questions" ? <Question size={14} /> : <GearSix size={14} />}
            {t === "questions" ? "Questions" : "Settings"}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      {tab === "questions" && (
        <QuestionList quizId={quiz.id} questions={quiz.questions ?? []} />
      )}
      {tab === "settings" && (
        <QuizSettings quiz={quiz} onSaved={(updated) => setQuiz((prev) => ({ ...prev, ...updated }))} />
      )}
    </div>
  );
}
