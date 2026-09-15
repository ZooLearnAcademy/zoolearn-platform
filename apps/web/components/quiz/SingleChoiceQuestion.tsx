"use client";

import type { QuizOption } from "@/types/quiz";

interface SingleChoiceQuestionProps {
  questionId: string;
  options: QuizOption[];
  selectedIds: string[];
  onChange: (selected: string[]) => void;
  disabled?: boolean;
}

export function SingleChoiceQuestion({
  questionId,
  options,
  selectedIds,
  onChange,
  disabled,
}: SingleChoiceQuestionProps) {
  const selected = selectedIds[0] ?? null;

  return (
    <fieldset>
      <legend className="sr-only">Select one answer</legend>
      <div className="space-y-2.5" role="radiogroup">
        {options.map((opt, i) => {
          const isSelected = opt.id === selected;
          const letter = String.fromCharCode(65 + i); // A, B, C...
          return (
            <label
              key={opt.id}
              htmlFor={`${questionId}-${opt.id}`}
              className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all group ${
                isSelected
                  ? "bg-violet-500/10 border-violet-500/40 shadow-sm shadow-violet-500/10"
                  : "bg-white/[0.03] border-white/8 hover:bg-white/[0.06] hover:border-white/15"
              } ${disabled ? "cursor-default opacity-60" : ""}`}
            >
              <input
                type="radio"
                id={`${questionId}-${opt.id}`}
                name={`question-${questionId}`}
                value={opt.id}
                checked={isSelected}
                onChange={() => !disabled && onChange([opt.id])}
                disabled={disabled}
                className="sr-only"
              />
              {/* Letter badge */}
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                  isSelected
                    ? "bg-violet-500 text-white"
                    : "bg-white/5 text-slate-500 group-hover:text-slate-300"
                }`}
              >
                {letter}
              </div>
              {/* Option text */}
              <span
                className={`text-sm leading-relaxed transition-colors ${
                  isSelected ? "text-white font-medium" : "text-slate-300"
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
