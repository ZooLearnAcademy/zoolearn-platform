"use client";

import { Button } from "@workspace/ui/components/button";
import { ArrowLeft, ArrowRight, BookmarkSimple, ArrowCounterClockwise, Check } from "@phosphor-icons/react";

interface QuizActionsProps {
  currentIndex: number;
  totalQuestions: number;
  hasSelection: boolean;
  onPrevious: () => void;
  onClearResponse: () => void;
  onMarkForReviewAndNext: () => void;
  onSaveAndNext: () => void;
}

export function QuizActions({
  currentIndex,
  totalQuestions,
  hasSelection,
  onPrevious,
  onClearResponse,
  onMarkForReviewAndNext,
  onSaveAndNext
}: QuizActionsProps) {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-3xl border border-border/80 bg-card/95 backdrop-blur-md p-4 sm:p-5 shadow-sm">
      {/* Left: Previous & Clear */}
      <div className="flex items-center gap-2.5 w-full sm:w-auto">
        <Button
          variant="outline"
          size="default"
          onClick={onPrevious}
          disabled={isFirst}
          className="rounded-2xl text-xs sm:text-sm font-bold flex-1 sm:flex-none border-border/80 hover:bg-muted shadow-2xs"
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" weight="bold" />
          Previous
        </Button>

        <Button
          variant="outline"
          size="default"
          onClick={onClearResponse}
          disabled={!hasSelection}
          className="rounded-2xl text-xs sm:text-sm font-semibold text-muted-foreground hover:text-destructive hover:border-destructive/40 flex-1 sm:flex-none"
        >
          <ArrowCounterClockwise className="h-4 w-4 mr-1.5" />
          Clear Choice
        </Button>
      </div>

      {/* Right: Mark for Review & Save & Next */}
      <div className="flex items-center gap-2.5 w-full sm:w-auto">
        <Button
          variant="outline"
          size="default"
          onClick={onMarkForReviewAndNext}
          className="rounded-2xl border-purple-500/40 text-purple-700 dark:text-purple-300 hover:bg-purple-500/10 font-bold text-xs sm:text-sm flex-1 sm:flex-none shadow-2xs"
        >
          <BookmarkSimple className="h-4 w-4 mr-1.5" weight="bold" />
          Mark for Review &amp; Next
        </Button>

        <Button
          variant="default"
          size="default"
          onClick={onSaveAndNext}
          className="rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm px-6 shadow-md shadow-emerald-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex-1 sm:flex-none"
        >
          <span>{isLast ? "Save Response" : "Save & Next"}</span>
          {!isLast ? (
            <ArrowRight className="h-4 w-4 ml-1.5" weight="bold" />
          ) : (
            <Check className="h-4 w-4 ml-1.5" weight="bold" />
          )}
        </Button>
      </div>
    </div>
  );
}
