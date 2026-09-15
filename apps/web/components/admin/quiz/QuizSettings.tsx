"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SpinnerGap, Warning, CheckCircle } from "@phosphor-icons/react";
import type { Quiz, QuizStatus } from "@/types/quiz";

interface QuizSettingsProps {
  quiz?: Quiz;
  onSaved?: (quiz: Quiz) => void;
  /** If true, shows the full form in "create" mode */
  isCreate?: boolean;
}

export function QuizSettings({ quiz, onSaved, isCreate = false }: QuizSettingsProps) {
  const router = useRouter();
  const [title, setTitle] = useState(quiz?.title ?? "");
  const [description, setDescription] = useState(quiz?.description ?? "");
  const [slug, setSlug] = useState(quiz?.slug ?? "");
  const [instructions, setInstructions] = useState(quiz?.instructions ?? "");
  const [passingPct, setPassingPct] = useState(String(quiz?.passing_percentage ?? 70));
  const [timeLimitMins, setTimeLimitMins] = useState(
    quiz?.time_limit_seconds ? String(Math.floor(quiz.time_limit_seconds / 60)) : ""
  );
  const [status, setStatus] = useState<QuizStatus>(quiz?.status ?? "draft");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const autoSlug = (t: string) =>
    t
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

  const handleTitleChange = (v: string) => {
    setTitle(v);
    if (!quiz) setSlug(autoSlug(v)); // auto-fill slug only on create
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const pct = parseInt(passingPct);
    if (isNaN(pct) || pct < 0 || pct > 100) {
      setError("Passing percentage must be 0–100");
      setLoading(false);
      return;
    }

    const body = {
      title,
      description: description || null,
      slug,
      instructions: instructions || null,
      passing_percentage: pct,
      time_limit_seconds: timeLimitMins ? parseInt(timeLimitMins) * 60 : null,
      status,
    };

    try {
      const url = quiz ? `/api/admin/quiz/${quiz.id}` : "/api/admin/quiz";
      const method = quiz ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Save failed");

      setSuccess(true);
      if (onSaved) {
        onSaved(data.quiz);
      } else if (isCreate) {
        router.push(`/admin/quiz/${data.quiz.id}`);
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all text-sm";
  const labelClass = "block text-sm font-medium text-slate-300 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3">
          <Warning size={15} weight="fill" className="shrink-0" />
          {error}
        </div>
      )}
      {success && !isCreate && (
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm rounded-xl px-4 py-3">
          <CheckCircle size={15} weight="fill" className="shrink-0" />
          Settings saved successfully.
        </div>
      )}

      {/* Title */}
      <div>
        <label className={labelClass}>Quiz Title *</label>
        <input
          required
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="e.g. JavaScript Fundamentals"
          className={inputClass}
        />
      </div>

      {/* Slug */}
      <div>
        <label className={labelClass}>Slug *</label>
        <input
          required
          value={slug}
          onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}
          placeholder="javascript-fundamentals"
          className={inputClass + " font-mono"}
        />
        <p className="text-xs text-slate-600 mt-1">
          Used in the embed ID and API URL. Lowercase letters, numbers, hyphens only.
        </p>
      </div>

      {/* Description */}
      <div>
        <label className={labelClass}>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief description of this quiz"
          rows={2}
          className={inputClass + " resize-none"}
        />
      </div>

      {/* Instructions */}
      <div>
        <label className={labelClass}>Instructions (optional)</label>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="e.g. Read each question carefully before answering."
          rows={2}
          className={inputClass + " resize-none"}
        />
      </div>

      {/* Passing % + Time Limit */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Passing Percentage *</label>
          <div className="relative">
            <input
              required
              type="number"
              min={0}
              max={100}
              value={passingPct}
              onChange={(e) => setPassingPct(e.target.value)}
              className={inputClass + " pr-8"}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">%</span>
          </div>
        </div>
        <div>
          <label className={labelClass}>Time Limit (minutes)</label>
          <input
            type="number"
            min={1}
            value={timeLimitMins}
            onChange={(e) => setTimeLimitMins(e.target.value)}
            placeholder="None"
            className={inputClass}
          />
          <p className="text-xs text-slate-600 mt-1">Leave blank for no timer.</p>
        </div>
      </div>

      {/* Status */}
      <div>
        <label className={labelClass}>Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as QuizStatus)}
          className={inputClass}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-semibold rounded-xl hover:from-violet-400 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-violet-500/20"
      >
        {loading && <SpinnerGap size={16} className="animate-spin" />}
        {isCreate ? "Create Quiz" : "Save Settings"}
      </button>
    </form>
  );
}
