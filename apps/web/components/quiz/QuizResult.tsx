"use client";

import { ArrowCounterClockwise, SealCheck, XCircle } from "@phosphor-icons/react";
import type { QuizResult as QuizResultType, Quiz } from "@/types/quiz";

interface QuizResultProps {
  quiz: Quiz;
  result: QuizResultType;
  onRetry: () => void;
}

export function QuizResult({ quiz, result, onRetry }: QuizResultProps) {
  const { score, total, percentage, passed } = result;

  const scoreColor =
    percentage >= 80
      ? "text-emerald-400"
      : percentage >= 60
      ? "text-amber-400"
      : "text-red-400";

  const ringColor =
    percentage >= 80
      ? "stroke-emerald-500"
      : percentage >= 60
      ? "stroke-amber-500"
      : "stroke-red-500";

  const circumference = 2 * Math.PI * 44; // r=44
  const dashOffset = circumference * (1 - percentage / 100);

  return (
    <div className="flex flex-col items-center text-center space-y-8 py-6">
      {/* Icon */}
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${passed ? "bg-emerald-500/10" : "bg-red-500/10"}`}>
        {passed ? (
          <SealCheck size={36} weight="duotone" className="text-emerald-400" />
        ) : (
          <XCircle size={36} weight="duotone" className="text-red-400" />
        )}
      </div>

      <div>
        <p className="text-slate-400 text-sm uppercase tracking-widest font-semibold mb-1">
          Quiz Completed
        </p>
        <h2 className="text-2xl font-black text-white">{quiz.title}</h2>
      </div>

      {/* Circular progress */}
      <div className="relative w-40 h-40">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Track */}
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="8"
          />
          {/* Fill */}
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            className={ringColor}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{ transition: "stroke-dashoffset 0.8s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-black ${scoreColor}`}>{percentage}%</span>
          <span className="text-slate-500 text-xs mt-1">
            {score} / {total} pts
          </span>
        </div>
      </div>

      {/* Pass/fail message */}
      <div
        className={`rounded-2xl border px-6 py-4 max-w-sm ${
          passed
            ? "bg-emerald-500/5 border-emerald-500/20"
            : "bg-red-500/5 border-red-500/20"
        }`}
      >
        {passed ? (
          <p className="text-emerald-300 text-sm font-medium">
            ✓ Great job! Your score is enough to pass this quiz.
            <span className="text-slate-500 text-xs block mt-1">
              Required: {quiz.passing_percentage}%
            </span>
          </p>
        ) : (
          <p className="text-red-300 text-sm font-medium">
            Your score is not enough to pass this quiz.
            <span className="text-slate-500 text-xs block mt-1">
              Required: {quiz.passing_percentage}% · You scored: {percentage}%
            </span>
          </p>
        )}
      </div>

      {/* Retry */}
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-slate-300 text-sm font-semibold rounded-xl hover:bg-white/10 hover:border-white/20 hover:text-white transition-all"
      >
        <ArrowCounterClockwise size={16} />
        Try Again
      </button>
    </div>
  );
}
