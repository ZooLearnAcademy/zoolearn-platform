"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { SpinnerGap, Warning, CheckCircle, X, Tag } from "@phosphor-icons/react";
import { OptionEditor } from "./OptionEditor";
import type { AdminQuizQuestion, QuestionType } from "@/types/quiz";

interface QuestionEditorProps {
  question: AdminQuizQuestion;
  quizId: string;
}

const TYPE_OPTIONS: { value: QuestionType; label: string; desc: string }[] = [
  { value: "single_choice", label: "Single Choice", desc: "One correct answer" },
  { value: "multiple_choice", label: "Multiple Choice", desc: "Multiple correct answers" },
  { value: "true_false", label: "True / False", desc: "Two-option question" },
];

export function QuestionEditor({ question: initial, quizId }: QuestionEditorProps) {
  const router = useRouter();
  const [question, setQuestion] = useState<AdminQuizQuestion>(initial);
  const [questionText, setQuestionText] = useState(initial.question_text);
  const [questionType, setQuestionType] = useState<QuestionType>(initial.question_type);
  const [points, setPoints] = useState(String(initial.points));
  const [explanation, setExplanation] = useState(initial.explanation ?? "");
  const [isRequired, setIsRequired] = useState(initial.is_required);
  const [isActive, setIsActive] = useState(initial.is_active);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Keywords
  const [keywords, setKeywords] = useState<string[]>(initial.keywords ?? []);
  const [kwInput, setKwInput] = useState("");

  const addKw = useCallback(() => {
    const kw = kwInput.trim().toLowerCase();
    if (!kw || keywords.includes(kw)) { setKwInput(""); return; }
    setKeywords((p) => [...p, kw]);
    setKwInput("");
  }, [kwInput, keywords]);

  const removeKw = (kw: string) => setKeywords((p) => p.filter((k) => k !== kw));

  const handleKwKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addKw(); }
    if (e.key === "Backspace" && !kwInput && keywords.length > 0) setKeywords((p) => p.slice(0, -1));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch(`/api/admin/quiz/${quizId}/questions/${initial.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question_text: questionText,
          question_type: questionType,
          points: parseInt(points) || 1,
          explanation: explanation || null,
          is_required: isRequired,
          is_active: isActive,
          keywords,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Save failed");
      setQuestion((prev) => ({ ...prev, ...data.question }));
      setSuccess(true);
      router.refresh();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all text-sm";

  return (
    <div className="space-y-8">
      {/* Question form */}
      <form onSubmit={handleSave} className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Question Settings</h2>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-semibold rounded-xl hover:from-violet-400 hover:to-purple-500 disabled:opacity-50 transition-all shadow-lg shadow-violet-500/20"
          >
            {loading ? <SpinnerGap size={15} className="animate-spin" /> : null}
            Save Question
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3">
            <Warning size={14} weight="fill" />
            {error}
          </div>
        )}
        {success && (
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm rounded-xl px-4 py-3">
            <CheckCircle size={14} weight="fill" />
            Question saved.
          </div>
        )}

        {/* Question text */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Question *</label>
          <textarea
            required
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Enter question text..."
            rows={3}
            className={inputClass + " resize-none"}
          />
        </div>

        {/* Question type */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Question Type *</label>
          <div className="grid grid-cols-3 gap-2">
            {TYPE_OPTIONS.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setQuestionType(t.value)}
                className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
                  questionType === t.value
                    ? "bg-violet-500/15 border-violet-500/40 text-violet-300"
                    : "bg-white/[0.02] border-white/8 text-slate-400 hover:border-white/20 hover:text-white"
                }`}
              >
                <span className="text-xs font-semibold">{t.label}</span>
                <span className="text-[10px] opacity-60 mt-0.5">{t.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Points + toggles */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Points</label>
            <input
              type="number"
              min={1}
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col justify-end pb-0.5">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div
                onClick={() => setIsRequired(!isRequired)}
                className={`w-9 h-5 rounded-full transition-all flex items-center px-0.5 cursor-pointer ${
                  isRequired ? "bg-violet-500" : "bg-white/10"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full transition-all ${
                    isRequired ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </div>
              <span className="text-sm text-slate-300">Required</span>
            </label>
          </div>
          <div className="flex flex-col justify-end pb-0.5">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div
                onClick={() => setIsActive(!isActive)}
                className={`w-9 h-5 rounded-full transition-all flex items-center px-0.5 cursor-pointer ${
                  isActive ? "bg-emerald-500" : "bg-white/10"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full transition-all ${
                    isActive ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </div>
              <span className="text-sm text-slate-300">Active</span>
            </label>
          </div>
        </div>

        {/* Explanation */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Explanation <span className="text-slate-600 font-normal">(optional — shown after quiz)</span>
          </label>
          <textarea
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            placeholder="Explain the correct answer..."
            rows={2}
            className={inputClass + " resize-none"}
          />
        </div>

        {/* Keywords */}
        <div>
          <label className="flex items-center gap-1.5 text-sm font-medium text-slate-300 mb-1.5">
            <Tag size={13} className="text-violet-400" />
            Keywords
            <span className="text-slate-600 font-normal">(min 1 recommended — used for quiz generation)</span>
          </label>
          <div className="flex flex-wrap gap-2 p-3 bg-white/[0.03] border border-white/10 rounded-xl min-h-[48px]">
            {keywords.map((kw) => (
              <span key={kw} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-violet-500/15 border border-violet-500/25 text-violet-300 text-xs font-semibold rounded-lg">
                {kw}
                <button type="button" onClick={() => removeKw(kw)} className="text-violet-500 hover:text-violet-200 transition-colors">
                  <X size={10} weight="bold" />
                </button>
              </span>
            ))}
            <input
              value={kwInput}
              onChange={(e) => setKwInput(e.target.value)}
              onKeyDown={handleKwKey}
              onBlur={addKw}
              placeholder={keywords.length === 0 ? "Type keyword, press Enter…" : "Add more…"}
              className="flex-1 min-w-[120px] bg-transparent text-sm text-white placeholder-slate-700 outline-none"
            />
          </div>
          <p className="text-[11px] text-slate-600 mt-1">
            Press <kbd className="bg-white/5 px-1 rounded text-slate-500">Enter</kbd> or <kbd className="bg-white/5 px-1 rounded text-slate-500">,</kbd> to add.
          </p>
        </div>
      </form>

      {/* Divider */}
      <div className="border-t border-white/8" />

      {/* Options */}
      <OptionEditor question={question} quizId={quizId} />
    </div>
  );
}
