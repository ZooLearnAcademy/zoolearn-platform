"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Trash,
  PencilSimple,
  ArrowUp,
  ArrowDown,
  Copy,
  SpinnerGap,
  ToggleLeft,
  ToggleRight,
  CheckCircle,
  FileCsv,
} from "@phosphor-icons/react";
import type { AdminQuizQuestion, QuestionType } from "@/types/quiz";
import { QuestionCSVImport } from "./QuestionCSVImport";

const TYPE_LABELS: Record<QuestionType, string> = {
  single_choice: "Single Choice",
  multiple_choice: "Multiple Choice",
  true_false: "True / False",
};

interface QuestionListProps {
  quizId: string;
  questions: AdminQuizQuestion[];
}

export function QuestionList({ quizId, questions: initial }: QuestionListProps) {
  const router = useRouter();
  const [questions, setQuestions] = useState<AdminQuizQuestion[]>(initial);
  const [adding, setAdding] = useState(false);
  const [showCsvImport, setShowCsvImport] = useState(false);
  const [newText, setNewText] = useState("");
  const [newType, setNewType] = useState<QuestionType>("single_choice");
  const [newPoints, setNewPoints] = useState(1);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const refreshFromServer = () => router.refresh();

  // ── Add question ────────────────────────────────────────────
  const handleAdd = async () => {
    if (!newText.trim()) return;
    setLoadingId("__new__");
    setError("");
    try {
      const res = await fetch(`/api/admin/quiz/${quizId}/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question_text: newText.trim(),
          question_type: newType,
          points: newPoints,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to add question");
      setQuestions((prev) => [...prev, { ...data.question, options: [] }]);
      setNewText("");
      setNewType("single_choice");
      setNewPoints(1);
      setAdding(false);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoadingId(null);
    }
  };

  // ── Delete question ─────────────────────────────────────────
  const handleDelete = async (questionId: string, text: string) => {
    if (!confirm(`Delete "${text.substring(0, 50)}..."?`)) return;
    setLoadingId(questionId);
    setError("");
    try {
      const res = await fetch(`/api/admin/quiz/${quizId}/questions/${questionId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Delete failed");
      }
      setQuestions((prev) => prev.filter((q) => q.id !== questionId));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoadingId(null);
    }
  };

  // ── Duplicate question ──────────────────────────────────────
  const handleDuplicate = async (questionId: string) => {
    setLoadingId(questionId + "__dup__");
    setError("");
    try {
      const res = await fetch(`/api/admin/quiz/${quizId}/questions/${questionId}`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Duplicate failed");
      setQuestions((prev) => [...prev, { ...data.question, options: [] }]);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoadingId(null);
    }
  };

  // ── Toggle active ───────────────────────────────────────────
  const handleToggleActive = async (q: AdminQuizQuestion) => {
    setLoadingId(q.id + "__toggle__");
    try {
      const res = await fetch(`/api/admin/quiz/${quizId}/questions/${q.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !q.is_active }),
      });
      if (!res.ok) throw new Error("Toggle failed");
      setQuestions((prev) =>
        prev.map((item) =>
          item.id === q.id ? { ...item, is_active: !q.is_active } : item
        )
      );
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoadingId(null);
    }
  };

  // ── Reorder ─────────────────────────────────────────────────
  const handleMove = async (index: number, direction: "up" | "down") => {
    const newQ = [...questions];
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= newQ.length) return;
    [newQ[index], newQ[target]] = [newQ[target]!, newQ[index]!];
    setQuestions(newQ);

    try {
      await fetch(`/api/admin/quiz/${quizId}/questions/reorder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds: newQ.map((q) => q.id) }),
      });
    } catch {
      // revert on failure
      refreshFromServer();
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all text-sm";

  return (
    <div className="space-y-3">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      {questions.length === 0 && !adding && (
        <div className="text-center py-10 text-slate-500 text-sm border border-white/8 rounded-2xl bg-white/[0.02]">
          No questions yet. Add one below.
        </div>
      )}

      {/* Question cards */}
      {questions.map((q, i) => (
        <div
          key={q.id}
          className={`relative border rounded-2xl p-4 transition-all ${
            q.is_active
              ? "bg-white/[0.03] border-white/8 hover:border-white/15"
              : "bg-white/[0.01] border-white/5 opacity-50"
          }`}
        >
          {/* Loading overlay */}
          {(loadingId === q.id || loadingId === q.id + "__dup__" || loadingId === q.id + "__toggle__") && (
            <div className="absolute inset-0 bg-black/30 rounded-2xl flex items-center justify-center z-10">
              <SpinnerGap size={20} className="text-violet-400 animate-spin" />
            </div>
          )}

          <div className="flex items-start gap-3">
            {/* Number */}
            <div className="w-7 h-7 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 text-xs font-bold shrink-0 mt-0.5">
              {i + 1}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium leading-snug line-clamp-2 mb-1.5">
                {q.question_text}
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="px-2 py-0.5 bg-white/5 rounded-md">{TYPE_LABELS[q.question_type]}</span>
                <span>{q.points} pt{q.points !== 1 ? "s" : ""}</span>
                <span className="flex items-center gap-1">
                  <CheckCircle size={11} className={q.is_active ? "text-emerald-400" : "text-slate-600"} weight="fill" />
                  {q.options.length} option{q.options.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 shrink-0">
              {/* Reorder */}
              <button
                onClick={() => handleMove(i, "up")}
                disabled={i === 0}
                className="p-1.5 text-slate-600 hover:text-slate-300 disabled:opacity-20 hover:bg-white/5 rounded-lg transition-all"
                title="Move up"
              >
                <ArrowUp size={13} />
              </button>
              <button
                onClick={() => handleMove(i, "down")}
                disabled={i === questions.length - 1}
                className="p-1.5 text-slate-600 hover:text-slate-300 disabled:opacity-20 hover:bg-white/5 rounded-lg transition-all"
                title="Move down"
              >
                <ArrowDown size={13} />
              </button>

              {/* Toggle active */}
              <button
                onClick={() => handleToggleActive(q)}
                className="p-1.5 text-slate-600 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-all"
                title={q.is_active ? "Deactivate" : "Activate"}
              >
                {q.is_active ? <ToggleRight size={15} weight="fill" /> : <ToggleLeft size={15} />}
              </button>

              {/* Edit */}
              <a
                href={`/admin/quiz/${quizId}/questions/${q.id}`}
                className="p-1.5 text-slate-600 hover:text-violet-400 hover:bg-violet-500/10 rounded-lg transition-all"
                title="Edit question"
              >
                <PencilSimple size={13} />
              </a>

              {/* Duplicate */}
              <button
                onClick={() => handleDuplicate(q.id)}
                className="p-1.5 text-slate-600 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                title="Duplicate"
              >
                <Copy size={13} />
              </button>

              {/* Delete */}
              <button
                onClick={() => handleDelete(q.id, q.question_text)}
                disabled={loadingId === q.id}
                className="p-1.5 text-slate-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                title="Delete"
              >
                <Trash size={13} />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Add question form */}
      {adding ? (
        <div className="border border-violet-500/20 bg-violet-500/5 rounded-2xl p-4 space-y-3">
          <p className="text-sm font-semibold text-violet-400">New Question</p>
          <textarea
            autoFocus
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Enter question text..."
            rows={2}
            className={inputClass + " resize-none"}
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Type</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as QuestionType)}
                className={inputClass}
              >
                <option value="single_choice">Single Choice</option>
                <option value="multiple_choice">Multiple Choice</option>
                <option value="true_false">True / False</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Points</label>
              <input
                type="number"
                min={1}
                value={newPoints}
                onChange={(e) => setNewPoints(parseInt(e.target.value) || 1)}
                className={inputClass}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              disabled={loadingId === "__new__" || !newText.trim()}
              className="flex items-center gap-1.5 px-4 py-2 bg-violet-500/20 border border-violet-500/30 text-violet-400 text-sm font-semibold rounded-xl hover:bg-violet-500/30 disabled:opacity-50 transition-all"
            >
              {loadingId === "__new__" ? (
                <SpinnerGap size={14} className="animate-spin" />
              ) : (
                <Plus size={14} weight="bold" />
              )}
              Add Question
            </button>
            <button
              onClick={() => { setAdding(false); setNewText(""); }}
              className="px-4 py-2 text-slate-400 hover:text-white text-sm rounded-xl hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {/* CSV Import panel */}
          {showCsvImport && (
            <QuestionCSVImport
              quizId={quizId}
              onImported={() => {
                setShowCsvImport(false);
                router.refresh();
              }}
            />
          )}

          {/* Bottom action bar */}
          <div className="flex gap-2">
            <button
              onClick={() => { setAdding(true); setShowCsvImport(false); }}
              className="flex-1 flex items-center justify-center gap-2 py-3 border border-dashed border-white/15 rounded-2xl text-slate-500 hover:text-violet-400 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all text-sm font-medium"
            >
              <Plus size={15} weight="bold" />
              Add Question
            </button>
            <button
              onClick={() => { setShowCsvImport((v) => !v); setAdding(false); }}
              className={`flex items-center gap-2 px-4 py-3 border border-dashed rounded-2xl text-sm font-medium transition-all ${
                showCsvImport
                  ? "border-violet-500/40 text-violet-400 bg-violet-500/5"
                  : "border-white/15 text-slate-500 hover:text-violet-400 hover:border-violet-500/30 hover:bg-violet-500/5"
              }`}
            >
              <FileCsv size={16} />
              Import CSV
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
