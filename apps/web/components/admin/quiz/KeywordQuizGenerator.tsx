"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkle,
  X,
  Plus,
  CheckSquare,
  Square,
  Shuffle,
  SortAscending,
  ArrowRight,
  SpinnerGap,
  Warning,
  CheckCircle,
  Tag,
  ListChecks,
} from "@phosphor-icons/react";

interface QuizOption {
  id: string;
  title: string;
  question_count: number;
}

export function KeywordQuizGenerator() {
  const router = useRouter();

  // ── Form state
  const [quizTitle, setQuizTitle] = useState("");
  const [quizSlug, setQuizSlug] = useState("");
  const [passingPct, setPassingPct] = useState(60);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [kwInput, setKwInput] = useState("");
  const [order, setOrder] = useState<"random" | "sequential">("sequential");
  const [maxQuestions, setMaxQuestions] = useState<number | "">("");
  const [selectedQuizIds, setSelectedQuizIds] = useState<string[]>([]);

  // ── Data
  const [quizzes, setQuizzes] = useState<QuizOption[]>([]);
  const [loadingQuizzes, setLoadingQuizzes] = useState(true);

  // ── Status
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{ quizId: string; slug: string; count: number } | null>(null);

  // ── Auto-slug from title
  useEffect(() => {
    setQuizSlug(quizTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
  }, [quizTitle]);

  // ── Load published quizzes for selection
  useEffect(() => {
    fetch("/api/admin/quiz")
      .then((r) => r.json())
      .then((data) => {
        setQuizzes(data.quizzes ?? []);
        setLoadingQuizzes(false);
      })
      .catch(() => setLoadingQuizzes(false));
  }, []);

  // ── Keyword tag input
  const addKeyword = useCallback(() => {
    const kw = kwInput.trim().toLowerCase();
    if (!kw || keywords.includes(kw)) { setKwInput(""); return; }
    setKeywords((prev) => [...prev, kw]);
    setKwInput("");
  }, [kwInput, keywords]);

  const removeKeyword = (kw: string) => setKeywords((prev) => prev.filter((k) => k !== kw));

  const handleKwKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addKeyword(); }
    if (e.key === "Backspace" && !kwInput && keywords.length > 0) {
      setKeywords((prev) => prev.slice(0, -1));
    }
  };

  // ── Quiz selection
  const toggleQuiz = (id: string) =>
    setSelectedQuizIds((prev) => prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]);

  const selectAll = () => setSelectedQuizIds(quizzes.map((q) => q.id));
  const deselectAll = () => setSelectedQuizIds([]);

  // ── Generate
  const handleGenerate = async () => {
    setError("");
    if (!quizTitle.trim()) { setError("Quiz title is required"); return; }
    if (keywords.length === 0) { setError("Add at least one keyword"); return; }
    if (selectedQuizIds.length === 0) { setError("Select at least one source quiz"); return; }

    setGenerating(true);
    try {
      const res = await fetch("/api/admin/quiz/generate-from-keywords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: quizTitle.trim(),
          slug: quizSlug,
          passing_percentage: passingPct,
          keywords,
          sourceQuizIds: selectedQuizIds,
          order,
          maxQuestions: maxQuestions !== "" ? Number(maxQuestions) : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Generation failed");
      setSuccess({ quizId: data.quizId, slug: data.slug, count: data.questionsInserted });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setGenerating(false);
    }
  };

  // ── Success state
  if (success) {
    return (
      <div className="max-w-lg mx-auto mt-12 text-center space-y-6">
        <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto">
          <CheckCircle size={28} weight="fill" className="text-emerald-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Quiz Generated!</h2>
          <p className="text-slate-400 text-sm">
            <span className="text-white font-semibold">{success.count}</span> questions matched and added to your new quiz.
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => router.push(`/admin/quiz/${success.quizId}`)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-semibold rounded-xl hover:from-violet-400 hover:to-purple-500 transition-all shadow-lg shadow-violet-500/20"
          >
            Open Quiz <ArrowRight size={14} />
          </button>
          <button
            onClick={() => { setSuccess(null); setQuizTitle(""); setKeywords([]); setSelectedQuizIds([]); }}
            className="px-5 py-2.5 text-slate-400 hover:text-white text-sm rounded-xl hover:bg-white/5 transition-all"
          >
            Generate Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">

      {/* ── Section 1: Quiz Details */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-white/8">
          <ListChecks size={16} className="text-violet-400" />
          <h2 className="text-sm font-semibold text-white">Quiz Details</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Quiz Title <span className="text-red-400">*</span></label>
            <input
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              placeholder="e.g. Cell Biology Quick Quiz"
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Slug</label>
            <input
              value={quizSlug}
              onChange={(e) => setQuizSlug(e.target.value)}
              placeholder="cell-biology-quick-quiz"
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-400 font-mono placeholder-slate-700 focus:outline-none focus:border-violet-500/60 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Passing % <span className="text-slate-600">(default 60)</span></label>
            <input
              type="number" min={1} max={100}
              value={passingPct}
              onChange={(e) => setPassingPct(Number(e.target.value))}
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500/60 transition-all"
            />
          </div>
        </div>
      </section>

      {/* ── Section 2: Keywords */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 pb-3 border-b border-white/8">
          <Tag size={16} className="text-violet-400" />
          <h2 className="text-sm font-semibold text-white">Keywords <span className="text-red-400">*</span></h2>
          <span className="text-xs text-slate-600 ml-1">— min 1 required. Questions matching ANY keyword will be included.</span>
        </div>

        <div className="flex flex-wrap gap-2 p-3 bg-white/[0.03] border border-white/10 rounded-xl min-h-[52px]">
          {keywords.map((kw) => (
            <span key={kw} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-violet-500/15 border border-violet-500/25 text-violet-300 text-xs font-semibold rounded-lg">
              {kw}
              <button onClick={() => removeKeyword(kw)} className="text-violet-500 hover:text-violet-200 transition-colors">
                <X size={11} weight="bold" />
              </button>
            </span>
          ))}
          <input
            value={kwInput}
            onChange={(e) => setKwInput(e.target.value)}
            onKeyDown={handleKwKeyDown}
            onBlur={addKeyword}
            placeholder={keywords.length === 0 ? "Type a keyword and press Enter…" : "Add more…"}
            className="flex-1 min-w-[140px] bg-transparent text-sm text-white placeholder-slate-700 outline-none"
          />
        </div>
        <p className="text-[11px] text-slate-600">Press <kbd className="bg-white/5 px-1 rounded text-slate-500">Enter</kbd> or <kbd className="bg-white/5 px-1 rounded text-slate-500">,</kbd> to add. <kbd className="bg-white/5 px-1 rounded text-slate-500">Backspace</kbd> to remove last.</p>
      </section>

      {/* ── Section 3: Source Quizzes */}
      <section className="space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-white/8">
          <div className="flex items-center gap-2">
            <CheckSquare size={16} className="text-violet-400" />
            <h2 className="text-sm font-semibold text-white">Source Quizzes <span className="text-red-400">*</span></h2>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={selectAll} className="text-[11px] text-violet-400 hover:text-violet-300 transition-colors font-semibold">Select All</button>
            <span className="text-slate-700">·</span>
            <button onClick={deselectAll} className="text-[11px] text-slate-500 hover:text-slate-300 transition-colors">None</button>
          </div>
        </div>

        {loadingQuizzes ? (
          <div className="flex items-center gap-2 text-slate-600 text-sm py-4">
            <SpinnerGap size={16} className="animate-spin" /> Loading quizzes…
          </div>
        ) : quizzes.length === 0 ? (
          <p className="text-slate-600 text-sm py-4">No quizzes found. Create some quizzes with questions first.</p>
        ) : (
          <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
            {quizzes.map((quiz) => {
              const selected = selectedQuizIds.includes(quiz.id);
              return (
                <button
                  key={quiz.id}
                  onClick={() => toggleQuiz(quiz.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all ${
                    selected
                      ? "bg-violet-500/10 border-violet-500/30 text-white"
                      : "bg-white/[0.02] border-white/8 text-slate-400 hover:border-white/15 hover:text-slate-300"
                  }`}
                >
                  {selected
                    ? <CheckSquare size={16} weight="fill" className="text-violet-400 shrink-0" />
                    : <Square size={16} className="text-slate-700 shrink-0" />}
                  <span className="flex-1 text-sm font-medium truncate">{quiz.title}</span>
                  <span className="text-xs text-slate-600 shrink-0">{quiz.question_count} Q</span>
                </button>
              );
            })}
          </div>
        )}
        {selectedQuizIds.length > 0 && (
          <p className="text-[11px] text-slate-600">{selectedQuizIds.length} quiz{selectedQuizIds.length !== 1 ? "zes" : ""} selected</p>
        )}
      </section>

      {/* ── Section 4: Options */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-white/8">
          <Sparkle size={16} className="text-violet-400" />
          <h2 className="text-sm font-semibold text-white">Generation Options</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Order toggle */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2">Question Order</label>
            <div className="flex gap-2">
              {([
                { value: "sequential", label: "Sequential", icon: SortAscending },
                { value: "random", label: "Random", icon: Shuffle },
              ] as const).map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setOrder(value)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                    order === value
                      ? "bg-violet-500/15 border-violet-500/40 text-violet-300"
                      : "bg-white/[0.02] border-white/8 text-slate-500 hover:border-white/15 hover:text-slate-300"
                  }`}
                >
                  <Icon size={14} weight={order === value ? "fill" : "regular"} />
                  {label}
                </button>
              ))}
            </div>
          </div>
          {/* Max questions */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Max Questions <span className="text-slate-600">(leave blank for all)</span></label>
            <input
              type="number" min={1}
              value={maxQuestions}
              onChange={(e) => setMaxQuestions(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="e.g. 20"
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-700 focus:outline-none focus:border-violet-500/60 transition-all"
            />
          </div>
        </div>
      </section>

      {/* ── Error */}
      {error && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3">
          <Warning size={15} weight="fill" className="shrink-0" />
          {error}
        </div>
      )}

      {/* ── Generate button */}
      <button
        onClick={handleGenerate}
        disabled={generating}
        className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold rounded-xl hover:from-violet-400 hover:to-purple-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xl shadow-violet-500/20 text-sm"
      >
        {generating ? (
          <><SpinnerGap size={16} className="animate-spin" /> Generating Quiz…</>
        ) : (
          <><Sparkle size={16} weight="fill" /> Generate Quiz from Keywords</>
        )}
      </button>
    </div>
  );
}
