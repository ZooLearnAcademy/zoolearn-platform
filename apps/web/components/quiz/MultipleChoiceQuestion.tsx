"use client";

import type { QuizOption } from "@/types/quiz";

interface MultipleChoiceQuestionProps {
  questionId: string;
  options: QuizOption[];
  selectedIds: string[];
  onChange: (selected: string[]) => void;
  disabled?: boolean;
}

export function MultipleChoiceQuestion({
  questionId,
  options,
  selectedIds,
  onChange,
  disabled,
}: MultipleChoiceQuestionProps) {
  const selectedSet = new Set(selectedIds);

  const toggle = (optId: string) => {
    if (disabled) return;
    const next = new Set(selectedSet);
    if (next.has(optId)) {
      next.delete(optId);
    } else {
      next.add(optId);
    }
    onChange(Array.from(next));
  };

  return (
    <fieldset>
      <legend className="sr-only">Select all that apply</legend>
      <p className="text-xs text-slate-500 mb-3">Select all that apply</p>
      <div className="space-y-2.5">
        {options.map((opt, i) => {
          const isChecked = selectedSet.has(opt.id);
          const letter = String.fromCharCode(65 + i);
          return (
            <label
              key={opt.id}
              htmlFor={`${questionId}-${opt.id}`}
              className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all group ${
                isChecked
                  ? "bg-violet-500/10 border-violet-500/40 shadow-sm shadow-violet-500/10"
                  : "bg-white/[0.03] border-white/8 hover:bg-white/[0.06] hover:border-white/15"
              } ${disabled ? "cursor-default opacity-60" : ""}`}
            >
              <input
                type="checkbox"
                id={`${questionId}-${opt.id}`}
                value={opt.id}
                checked={isChecked}
                onChange={() => toggle(opt.id)}
                disabled={disabled}
                className="sr-only"
              />
              {/* Checkbox visual */}
              <div
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                  isChecked
                    ? "bg-violet-500 border-violet-500"
                    : "border-white/20 group-hover:border-white/40"
                }`}
              >
                {isChecked && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              {/* Letter badge */}
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                  isChecked
                    ? "bg-violet-500 text-white"
                    : "bg-white/5 text-slate-500 group-hover:text-slate-300"
                }`}
              >
                {letter}
              </div>
              <span
                className={`text-sm leading-relaxed transition-colors ${
                  isChecked ? "text-white font-medium" : "text-slate-300"
                }`}
              >
                {opt.option_text}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
