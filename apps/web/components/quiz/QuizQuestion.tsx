"use client";

import { SingleChoiceQuestion } from "./SingleChoiceQuestion";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { TrueFalseQuestion } from "./TrueFalseQuestion";
import type { QuizQuestion } from "@/types/quiz";

interface QuizQuestionProps {
  question: QuizQuestion;
  selectedIds: string[];
  onChange: (selected: string[]) => void;
  disabled?: boolean;
}

export function QuizQuestion({
  question,
  selectedIds,
  onChange,
  disabled,
}: QuizQuestionProps) {
  const sharedProps = {
    questionId: question.id,
    options: question.options,
    selectedIds,
    onChange,
    disabled,
  };

  return (
    <div className="space-y-5">
      {/* Question text */}
      <div>
        <p className="text-white text-base md:text-lg font-semibold leading-relaxed">
          {question.question_text}
        </p>
        {question.is_required && (
          <span className="text-[10px] text-slate-600 uppercase tracking-widest font-semibold mt-1 block">
            Required
          </span>
        )}
      </div>

      {/* Answer input */}
      {question.question_type === "single_choice" && (
        <SingleChoiceQuestion {...sharedProps} />
      )}
      {question.question_type === "multiple_choice" && (
        <MultipleChoiceQuestion {...sharedProps} />
      )}
      {question.question_type === "true_false" && (
        <TrueFalseQuestion {...sharedProps} />
      )}
    </div>
  );
}
