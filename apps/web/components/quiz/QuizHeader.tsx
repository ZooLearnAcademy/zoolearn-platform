"use client";

import { QuizTimer } from "./QuizTimer";
import type { Quiz } from "@/types/quiz";

interface QuizHeaderProps {
  quiz: Quiz;
  currentIndex: number;
  totalQuestions: number;
  onTimerExpire?: () => void;
}

export function QuizHeader({
  quiz,
  currentIndex,
  totalQuestions,
  onTimerExpire,
}: QuizHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div>
        <h1 className="text-lg font-bold text-white leading-tight">{quiz.title}</h1>
        <p className="text-slate-500 text-sm mt-0.5">
          Question {currentIndex + 1} of {totalQuestions}
        </p>
      </div>

      {quiz.time_limit_seconds && onTimerExpire && (
        <QuizTimer
          totalSeconds={quiz.time_limit_seconds}
          onExpire={onTimerExpire}
        />
      )}
    </div>
  );
}
