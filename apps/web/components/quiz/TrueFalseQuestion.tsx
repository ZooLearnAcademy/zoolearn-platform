"use client";

import type { QuizOption } from "@/types/quiz";

interface TrueFalseQuestionProps {
  questionId: string;
  options: QuizOption[];
  selectedIds: string[];
  onChange: (selected: string[]) => void;
  disabled?: boolean;
}

export function TrueFalseQuestion({
  questionId,
  options,
  selectedIds,
  onChange,
  disabled,
}: TrueFalseQuestionProps) {
  const selected = selectedIds[0] ?? null;

  // True/False questions should have exactly 2 options
  const sorted = options.slice().sort((a, b) => a.sort_order - b.sort_order);

  return (
    <fieldset>
      <legend className="sr-only">True or False</legend>
      <div className="grid grid-cols-2 gap-3">
        {sorted.map((opt) => {
          const isSelected = opt.id === selected;
          const isTrue = opt.option_text.toLowerCase() === "true";
          return (
            <label
              key={opt.id}
              htmlFor={`${questionId}-${opt.id}`}
              className={`flex flex-col items-center justify-center gap-2 py-6 px-4 rounded-2xl border cursor-pointer transition-all ${
                isSelected
                  ? isTrue
                    ? "bg-emerald-500/10 border-emerald-500/40 shadow-sm shadow-emerald-500/10"
                    : "bg-red-500/10 border-red-500/40 shadow-sm shadow-red-500/10"
                  : "bg-white/[0.03] border-white/8 hover:bg-white/[0.06] hover:border-white/15"
              } ${disabled ? "cursor-default opacity-60" : ""}`}
            >
              <input
                type="radio"
                id={`${questionId}-${opt.id}`}
                name={`tf-${questionId}`}
                value={opt.id}
                checked={isSelected}
                onChange={() => !disabled && onChange([opt.id])}
                disabled={disabled}
                className="sr-only"
              />
              <span className="text-2xl">{isTrue ? "✓" : "✗"}</span>
              <span
                className={`text-base font-bold transition-colors ${
                  isSelected
                    ? isTrue
                      ? "text-emerald-300"
                      : "text-red-300"
                    : "text-slate-300"
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
