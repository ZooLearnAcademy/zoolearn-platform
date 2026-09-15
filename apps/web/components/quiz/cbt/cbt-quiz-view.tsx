"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import type { CbtQuizExamData, CbtUserResponse, CbtQuestionStatus, CbtQuizResultSummary, CbtUnitStat } from "@/types/quiz-cbt";
import { CbtQuizHeader } from "./cbt-quiz-header";
import { CbtQuestionCard } from "./cbt-question-card";
import { CbtQuestionPalette } from "./cbt-question-palette";
import { CbtQuizActions } from "./cbt-quiz-actions";
import { CbtSubmitDialog } from "./cbt-submit-dialog";
import { CbtQuizResultsView } from "./cbt-quiz-results-view";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@workspace/ui/components/sheet";
import { Button } from "@workspace/ui/components/button";
import { SquaresFour } from "@phosphor-icons/react";

interface CBTQuizViewProps {
  examData: CbtQuizExamData;
}

const STORAGE_KEY = "zoolearn_cbt_neet_2020_v1";

export function CBTQuizView({ examData }: CBTQuizViewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userResponses, setUserResponses] = useState<Record<number, CbtUserResponse>>({});
  const [remainingSeconds, setRemainingSeconds] = useState<number>(examData.durationMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState<boolean>(false);
  const [isMobilePaletteOpen, setIsMobilePaletteOpen] = useState<boolean>(false);

  // Load initial state from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.userResponses) setUserResponses(parsed.userResponses);
        if (parsed.remainingSeconds && parsed.remainingSeconds > 0) setRemainingSeconds(parsed.remainingSeconds);
        if (parsed.currentQuestionIndex !== undefined) setCurrentQuestionIndex(parsed.currentQuestionIndex);
        if (parsed.isSubmitted) setIsSubmitted(parsed.isSubmitted);
      }
    } catch (e) {
      console.error("Failed to load quiz session", e);
    }
  }, []);

  // Save state to localStorage whenever changed
  useEffect(() => {
    if (!isSubmitted) {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            userResponses,
            remainingSeconds,
            currentQuestionIndex,
            isSubmitted
          })
        );
      } catch (e) {
        console.error("Failed to persist quiz session", e);
      }
    }
  }, [userResponses, remainingSeconds, currentQuestionIndex, isSubmitted]);

  // Handle Final Submit
  const handleFinalSubmit = useCallback(() => {
    setIsSubmitDialogOpen(false);
    setIsSubmitted(true);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;

    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, handleFinalSubmit]);

  const currentQuestion = examData.questions[currentQuestionIndex] || examData.questions[0]!;
  const currentResponse = userResponses[currentQuestion.id];
  const selectedOptionIndex = currentResponse?.selectedOptionIndex ?? null;
  const currentStatus: CbtQuestionStatus = currentResponse?.status ?? "not_visited";

  // Mark current question as visited if not visited yet
  useEffect(() => {
    setUserResponses((prev) => {
      const existing = prev[currentQuestion.id];
      if (!existing || existing.status === "not_visited") {
        return {
          ...prev,
          [currentQuestion.id]: {
            questionId: currentQuestion.id,
            selectedOptionIndex: existing?.selectedOptionIndex ?? null,
            status: "not_answered"
          }
        };
      }
      return prev;
    });
  }, [currentQuestion.id]);

  // Handle Option Selection
  const handleSelectOption = (optionIndex: number) => {
    setUserResponses((prev) => {
      const existing = prev[currentQuestion.id];
      return {
        ...prev,
        [currentQuestion.id]: {
          questionId: currentQuestion.id,
          selectedOptionIndex: optionIndex,
          status: existing?.status === "marked_for_review" || existing?.status === "answered_marked_for_review"
            ? "answered_marked_for_review"
            : "answered"
        }
      };
    });
  };

  // Handle Clear Response
  const handleClearResponse = () => {
    setUserResponses((prev) => {
      const existing = prev[currentQuestion.id];
      return {
        ...prev,
        [currentQuestion.id]: {
          questionId: currentQuestion.id,
          selectedOptionIndex: null,
          status: existing?.status === "answered_marked_for_review" ? "marked_for_review" : "not_answered"
        }
      };
    });
  };

  // Handle Save & Next
  const handleSaveAndNext = () => {
    setUserResponses((prev) => {
      const existing = prev[currentQuestion.id];
      const hasAns = existing && existing.selectedOptionIndex !== null && existing.selectedOptionIndex !== undefined;

      return {
        ...prev,
        [currentQuestion.id]: {
          questionId: currentQuestion.id,
          selectedOptionIndex: existing?.selectedOptionIndex ?? null,
          status: hasAns ? "answered" : "not_answered"
        }
      };
    });

    if (currentQuestionIndex < examData.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  // Handle Mark for Review & Next
  const handleMarkForReviewAndNext = () => {
    setUserResponses((prev) => {
      const existing = prev[currentQuestion.id];
      const hasAns = existing && existing.selectedOptionIndex !== null && existing.selectedOptionIndex !== undefined;

      return {
        ...prev,
        [currentQuestion.id]: {
          questionId: currentQuestion.id,
          selectedOptionIndex: existing?.selectedOptionIndex ?? null,
          status: hasAns ? "answered_marked_for_review" : "marked_for_review"
        }
      };
    });

    if (currentQuestionIndex < examData.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  // Handle Previous
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Handle direct selection from Question Palette
  const handleSelectFromPalette = (index: number) => {
    setCurrentQuestionIndex(index);
    setIsMobilePaletteOpen(false);
  };

  // Handle Retake Test
  const handleRetake = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
    setUserResponses({});
    setRemainingSeconds(examData.durationMinutes * 60);
    setCurrentQuestionIndex(0);
    setIsSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Count answered questions for header
  const answeredCount = useMemo(() => {
    return Object.values(userResponses).filter(
      (r) => r.status === "answered" || r.status === "answered_marked_for_review"
    ).length;
  }, [userResponses]);

  // Compute Results Summary
  const resultsSummary: CbtQuizResultSummary = useMemo(() => {
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;

    const unitMap: Record<string, { total: number; correct: number; incorrect: number; unattempted: number; score: number }> = {};

    examData.questions.forEach((q) => {
      const uName = q.unit || "General Biology";
      if (!unitMap[uName]) {
        unitMap[uName] = { total: 0, correct: 0, incorrect: 0, unattempted: 0, score: 0 };
      }
      unitMap[uName].total++;

      const resp = userResponses[q.id];
      const hasSelected = resp && resp.selectedOptionIndex !== null && resp.selectedOptionIndex !== undefined;

      if (!hasSelected) {
        unattempted++;
        unitMap[uName].unattempted++;
      } else if (resp.selectedOptionIndex === q.correctAnswerIndex) {
        correct++;
        unitMap[uName].correct++;
        unitMap[uName].score += 4;
      } else {
        incorrect++;
        unitMap[uName].incorrect++;
        unitMap[uName].score -= 1;
      }
    });

    const totalAttempted = correct + incorrect;
    const score = correct * 4 - incorrect * 1;
    const maxScore = examData.questions.length * 4;
    const percentage = Math.max(0, (score / maxScore) * 100);
    const accuracy = totalAttempted > 0 ? (correct / totalAttempted) * 100 : 0;
    const timeTakenSeconds = examData.durationMinutes * 60 - remainingSeconds;

    const unitStats: CbtUnitStat[] = Object.entries(unitMap).map(([unit, stats]) => ({
      unit,
      ...stats
    }));

    return {
      score,
      maxScore,
      percentage,
      accuracy,
      totalQuestions: examData.questions.length,
      totalAttempted,
      totalCorrect: correct,
      totalIncorrect: incorrect,
      totalUnattempted: unattempted,
      timeTakenSeconds,
      unitStats
    };
  }, [examData, userResponses, remainingSeconds]);

  // If exam is submitted, render full results review
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 font-sans">
        <CbtQuizResultsView
          questions={examData.questions}
          userResponses={userResponses}
          results={resultsSummary}
          examTitle={examData.title}
          onRetake={handleRetake}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 font-sans flex flex-col selection:bg-emerald-500/20 selection:text-emerald-900">
      
      {/* Sticky Header with Timer & Submit */}
      <CbtQuizHeader
        title={examData.title}
        examCode={examData.examCode}
        remainingSeconds={remainingSeconds}
        totalQuestions={examData.totalQuestions}
        answeredCount={answeredCount}
        onSubmitClick={() => setIsSubmitDialogOpen(true)}
      />

      {/* Main Testing Workspace */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-3 sm:px-6 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* Left Column: Active Question + Actions */}
          <div className="lg:col-span-8 space-y-4">
            <CbtQuestionCard
              question={currentQuestion}
              currentIndex={currentQuestionIndex}
              totalQuestions={examData.totalQuestions}
              selectedOptionIndex={selectedOptionIndex}
              status={currentStatus}
              onSelectOption={handleSelectOption}
            />

            <CbtQuizActions
              currentIndex={currentQuestionIndex}
              totalQuestions={examData.totalQuestions}
              hasSelection={selectedOptionIndex !== null}
              onPrevious={handlePrevious}
              onClearResponse={handleClearResponse}
              onMarkForReviewAndNext={handleMarkForReviewAndNext}
              onSaveAndNext={handleSaveAndNext}
            />

            {/* Mobile Palette Trigger Bar */}
            <div className="lg:hidden flex items-center justify-between p-3 rounded-xl border border-border/80 bg-card shadow-xs">
              <span className="text-xs font-bold text-muted-foreground">
                Question {currentQuestionIndex + 1} of {examData.totalQuestions}
              </span>

              <Sheet open={isMobilePaletteOpen} onOpenChange={setIsMobilePaletteOpen}>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl text-xs gap-1.5 font-bold"
                  onClick={() => setIsMobilePaletteOpen(true)}
                >
                  <SquaresFour className="h-4 w-4 text-emerald-600" />
                  <span>Open Question Palette</span>
                </Button>
                <SheetContent side="right" className="w-[320px] sm:w-[400px] p-4 overflow-y-auto">
                  <SheetHeader className="pb-2">
                    <SheetTitle className="text-base font-bold">Question Palette</SheetTitle>
                  </SheetHeader>
                  <CbtQuestionPalette
                    questions={examData.questions}
                    userResponses={userResponses}
                    currentQuestionIndex={currentQuestionIndex}
                    onSelectQuestion={handleSelectFromPalette}
                    className="border-none shadow-none p-0"
                  />
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Right Column: Desktop Sticky Question Palette */}
          <div className="hidden lg:block lg:col-span-4 sticky top-20">
            <CbtQuestionPalette
              questions={examData.questions}
              userResponses={userResponses}
              currentQuestionIndex={currentQuestionIndex}
              onSelectQuestion={handleSelectFromPalette}
            />
          </div>

        </div>
      </main>

      {/* Submit Confirmation Dialog */}
      <CbtSubmitDialog
        open={isSubmitDialogOpen}
        onOpenChange={setIsSubmitDialogOpen}
        questions={examData.questions}
        userResponses={userResponses}
        remainingSeconds={remainingSeconds}
        onConfirmSubmit={handleFinalSubmit}
      />
    </div>
  );
}
