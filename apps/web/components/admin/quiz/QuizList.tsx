"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  PencilSimple,
  Trash,
  Question,
  Clock,
  Target,
  ArrowRight,
} from "@phosphor-icons/react";
import { QuizStatusBadge } from "./QuizStatusBadge";
import type { AdminQuizListItem } from "@/types/quiz";

interface QuizListProps {
  quizzes: AdminQuizListItem[];
}

export function QuizList({ quizzes }: QuizListProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleDelete = async (quizId: string, title: string) => {
    if (!confirm(`Delete quiz "${title}"? This will also delete all questions and options.`)) return;
    setDeletingId(quizId);
    setError("");
    try {
      const res = await fetch(`/api/admin/quiz/${quizId}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Delete failed");
      }
      router.refresh();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm">
            {quizzes.length} {quizzes.length === 1 ? "quiz" : "quizzes"} total
          </p>
        </div>
        <Link
          href="/admin/quiz/new"
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-semibold rounded-xl hover:from-violet-400 hover:to-purple-500 transition-all shadow-lg shadow-violet-500/20"
        >
          <Plus size={16} weight="bold" />
          New Quiz
        </Link>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      {quizzes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border border-white/8 rounded-2xl bg-white/[0.02]">
          <div className="w-14 h-14 bg-violet-500/10 rounded-2xl flex items-center justify-center mb-4">
            <Question size={28} className="text-violet-400" weight="duotone" />
          </div>
          <p className="text-white font-semibold mb-1">No quizzes yet</p>
          <p className="text-slate-500 text-sm mb-6">Create your first quiz to get started.</p>
          <Link
            href="/admin/quiz/new"
            className="flex items-center gap-2 px-4 py-2 bg-violet-500/15 border border-violet-500/20 text-violet-400 text-sm font-semibold rounded-xl hover:bg-violet-500/25 transition-all"
          >
            <Plus size={15} weight="bold" />
            Create Quiz
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="group flex items-center gap-4 bg-white/[0.03] border border-white/8 rounded-2xl p-5 hover:border-white/15 hover:bg-white/[0.05] transition-all"
            >
              {/* Icon */}
              <div className="w-10 h-10 bg-violet-500/10 rounded-xl flex items-center justify-center shrink-0">
                <Question size={20} className="text-violet-400" weight="duotone" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-white font-semibold truncate">{quiz.title}</span>
                  <QuizStatusBadge status={quiz.status} />
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Question size={12} />
                    {quiz.question_count} question{quiz.question_count !== 1 ? "s" : ""}
                  </span>
                  <span className="flex items-center gap-1">
                    <Target size={12} />
                    {quiz.passing_percentage}% to pass
                  </span>
                  {quiz.time_limit_seconds && (
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {Math.floor(quiz.time_limit_seconds / 60)}m limit
                    </span>
                  )}
                  <span className="font-mono text-slate-600">{quiz.slug}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/admin/quiz/${quiz.id}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-slate-300 text-xs font-medium rounded-lg hover:bg-white/10 hover:border-white/20 hover:text-white transition-all"
                >
                  <PencilSimple size={13} />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(quiz.id, quiz.title)}
                  disabled={deletingId === quiz.id}
                  className="p-1.5 text-slate-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all disabled:opacity-50"
                >
                  <Trash size={15} />
                </button>
                <Link
                  href={`/admin/quiz/${quiz.id}`}
                  className="p-1.5 text-slate-600 group-hover:text-slate-300 transition-colors"
                >
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
