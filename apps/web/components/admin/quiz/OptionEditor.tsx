"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Trash,
  SpinnerGap,
  Warning,
  CheckCircle,
  Circle,
} from "@phosphor-icons/react";
import type { AdminQuizOption, AdminQuizQuestion, QuestionType } from "@/types/quiz";

interface OptionEditorProps {
  question: AdminQuizQuestion;
  quizId: string;
}

export function OptionEditor({ question: initial, quizId }: OptionEditorProps) {
  const router = useRouter();
  const [question, setQuestion] = useState<AdminQuizQuestion>(initial);
  const [newOptionText, setNewOptionText] = useState("");
  const [addingOption, setAddingOption] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const isSingleType = question.question_type === "single_choice" || question.question_type === "true_false";

  // ── Add option ──────────────────────────────────────────────
  const handleAddOption = async () => {
    if (!newOptionText.trim()) return;
    setLoadingId("__new__");
    setError("");
    try {
      const res = await fetch(
        `/api/admin/quiz/${quizId}/questions/${question.id}/options`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ option_text: newOptionText.trim(), is_correct: false }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to add option");
      setQuestion((prev) => ({ ...prev, options: [...prev.options, data.option] }));
      setNewOptionText("");
      setAddingOption(false);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoadingId(null);
    }
  };

  // ── Toggle correct ──────────────────────────────────────────
  const handleToggleCorrect = async (opt: AdminQuizOption) => {
    setLoadingId(opt.id);
    setError("");
    try {
      // For single_choice / true_false: flip others off first (optimistic)
      let newOptions = question.options;
      if (isSingleType) {
        newOptions = question.options.map((o) => ({ ...o, is_correct: false }));
      }
      newOptions = newOptions.map((o) =>
        o.id === opt.id ? { ...o, is_correct: !opt.is_correct } : o
      );

      // Update all affected options via API
      const updates = [];
      if (isSingleType && opt.is_correct === false) {
        // Turn off all others
        for (const o of question.options.filter((o) => o.id !== opt.id && o.is_correct)) {
          updates.push(
            fetch(
              `/api/admin/quiz/${quizId}/questions/${question.id}/options?optionId=${o.id}`,
              {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ is_correct: false }),
              }
            )
          );
        }
      }
      updates.push(
        fetch(
          `/api/admin/quiz/${quizId}/questions/${question.id}/options?optionId=${opt.id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ is_correct: !opt.is_correct }),
          }
        )
      );

      await Promise.all(updates);
      setQuestion((prev) => ({ ...prev, options: newOptions }));
    } catch (e: any) {
      setError(e.message);
      router.refresh();
    } finally {
      setLoadingId(null);
    }
  };

  // ── Update option text (inline edit) ────────────────────────
  const handleUpdateText = async (opt: AdminQuizOption, text: string) => {
    if (!text.trim() || text === opt.option_text) return;
    try {
      await fetch(
        `/api/admin/quiz/${quizId}/questions/${question.id}/options?optionId=${opt.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ option_text: text.trim() }),
        }
      );
      setQuestion((prev) => ({
        ...prev,
        options: prev.options.map((o) =>
          o.id === opt.id ? { ...o, option_text: text.trim() } : o
        ),
      }));
    } catch {
      setError("Failed to update option");
    }
  };

  // ── Delete option ───────────────────────────────────────────
  const handleDeleteOption = async (opt: AdminQuizOption) => {
    if (!confirm(`Delete this option?`)) return;
    setLoadingId(opt.id + "__del__");
    setError("");
    try {
      const res = await fetch(
        `/api/admin/quiz/${quizId}/questions/${question.id}/options?optionId=${opt.id}`,
        { method: "DELETE" }
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Delete failed");
      }
      setQuestion((prev) => ({
        ...prev,
        options: prev.options.filter((o) => o.id !== opt.id),
      }));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoadingId(null);
    }
  };

  const inputClass =
    "flex-1 px-3 py-2 bg-transparent border-0 text-white placeholder-slate-500 focus:outline-none text-sm";

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-300">Answer Options</p>
        {isSingleType ? (
          <span className="text-xs text-slate-500">Only one correct answer</span>
        ) : (
          <span className="text-xs text-slate-500">Multiple correct answers allowed</span>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl px-3 py-2">
          <Warning size={13} weight="fill" className="shrink-0" />
          {error}
        </div>
      )}

      {question.options.length === 0 && (
        <p className="text-xs text-slate-600 text-center py-4">No options yet.</p>
      )}

      {/* Option rows */}
      <div className="space-y-2">
        {question.options
          .slice()
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((opt) => (
            <div
              key={opt.id}
              className={`relative flex items-center gap-2 border rounded-xl transition-all ${
                opt.is_correct
                  ? "bg-emerald-500/5 border-emerald-500/20"
                  : "bg-white/[0.02] border-white/8"
              }`}
            >
              {/* Correct toggle */}
              <button
                onClick={() => handleToggleCorrect(opt)}
                disabled={loadingId === opt.id}
                className="p-2.5 shrink-0 transition-colors"
                title={opt.is_correct ? "Mark incorrect" : "Mark correct"}
              >
                {loadingId === opt.id ? (
                  <SpinnerGap size={16} className="text-violet-400 animate-spin" />
                ) : opt.is_correct ? (
                  <CheckCircle size={18} weight="fill" className="text-emerald-400" />
                ) : (
                  <Circle size={18} className="text-slate-600 hover:text-slate-400" />
                )}
              </button>

              {/* Editable text */}
              <input
                defaultValue={opt.option_text}
                onBlur={(e) => handleUpdateText(opt, e.target.value)}
                className={inputClass}
                placeholder="Option text..."
              />

              {opt.is_correct && (
                <span className="text-xs text-emerald-500 font-semibold pr-2 shrink-0">
                  Correct
                </span>
              )}

              {/* Delete */}
              <button
                onClick={() => handleDeleteOption(opt)}
                disabled={loadingId === opt.id + "__del__"}
                className="p-2.5 text-slate-700 hover:text-red-400 transition-colors shrink-0"
              >
                {loadingId === opt.id + "__del__" ? (
                  <SpinnerGap size={14} className="animate-spin" />
                ) : (
                  <Trash size={14} />
                )}
              </button>
            </div>
          ))}
      </div>

      {/* Add option */}
      {addingOption ? (
        <div className="flex items-center gap-2 bg-violet-500/5 border border-violet-500/20 rounded-xl p-2">
          <input
            autoFocus
            value={newOptionText}
            onChange={(e) => setNewOptionText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddOption()}
            placeholder="Type option text and press Enter..."
            className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none px-2 py-1"
          />
          <button
            onClick={handleAddOption}
            disabled={loadingId === "__new__" || !newOptionText.trim()}
            className="px-3 py-1.5 bg-violet-500/20 text-violet-400 text-xs font-semibold rounded-lg hover:bg-violet-500/30 disabled:opacity-50 transition-all"
          >
            {loadingId === "__new__" ? <SpinnerGap size={12} className="animate-spin" /> : "Add"}
          </button>
          <button
            onClick={() => { setAddingOption(false); setNewOptionText(""); }}
            className="px-2 py-1.5 text-slate-500 text-xs rounded-lg hover:text-white transition-colors"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setAddingOption(true)}
          className="w-full flex items-center justify-center gap-1.5 py-2 border border-dashed border-white/10 rounded-xl text-slate-600 hover:text-violet-400 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all text-xs font-medium"
        >
          <Plus size={12} weight="bold" />
          Add Option
        </button>
      )}
    </div>
  );
}
