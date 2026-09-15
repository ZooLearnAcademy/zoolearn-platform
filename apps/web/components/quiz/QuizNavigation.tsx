"use client";

import { SpinnerGap, ArrowLeft, ArrowRight, PaperPlaneTilt } from "@phosphor-icons/react";

interface QuizNavigationProps {
  currentIndex: number;
  totalQuestions: number;
  isSubmitting: boolean;
  canSubmit: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export function QuizNavigation({
  currentIndex,
  totalQuestions,
  isSubmitting,
  canSubmit,
  onPrev,
  onNext,
  onSubmit,
}: QuizNavigationProps) {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;

  return (
    <div className="flex items-center justify-between gap-3">
      {/* Prev */}
      <button
        onClick={onPrev}
        disabled={isFirst || isSubmitting}
        className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-slate-300 text-sm font-medium rounded-xl hover:bg-white/10 hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <ArrowLeft size={15} />
        Previous
      </button>

      {/* Next or Submit */}
      {isLast ? (
        <button
          onClick={onSubmit}
          disabled={isSubmitting || !canSubmit}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-semibold rounded-xl hover:from-violet-400 hover:to-purple-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-violet-500/25"
        >
          {isSubmitting ? (
            <>
              <SpinnerGap size={15} className="animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <PaperPlaneTilt size={15} />
              Submit Quiz
            </>
          )}
        </button>
      ) : (
        <button
          onClick={onNext}
          disabled={isSubmitting}
          className="flex items-center gap-2 px-5 py-2.5 bg-violet-500/15 border border-violet-500/25 text-violet-400 text-sm font-semibold rounded-xl hover:bg-violet-500/25 disabled:opacity-30 transition-all"
        >
          Next
          <ArrowRight size={15} />
        </button>
      )}
    </div>
  );
}
