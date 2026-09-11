"use client";

import React, { useState, useMemo } from "react";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import {
  BookOpen,
  SquaresFour,
  Flag,
  Lightning,
  CaretRight,
  CaretDown,
  CheckCircle,
  BookmarkSimple,
  ArrowRight,
  ListNumbers,
  Folders
} from "@phosphor-icons/react";
import type { QuestionStatus, QuizQuestion, UserResponse } from "@/types/quiz";

interface QuestionPaletteProps {
  questions: QuizQuestion[];
  userResponses: Record<number, UserResponse>;
  currentQuestionIndex: number;
  onSelectQuestion: (index: number) => void;
  className?: string;
}


export function QuestionPalette({
  questions,
  userResponses,
  currentQuestionIndex,
  onSelectQuestion,
  className
}: QuestionPaletteProps) {
  // 3 Distinct Views: "chapters" (ZooLearn syllabus tree) | "grid" (clean compact grid) | "review" (flagged/skipped)
  const [activeTab, setActiveTab] = useState<"chapters" | "grid" | "review">("chapters");
  const [activeRangeIdx, setActiveRangeIdx] = useState<number>(0);

  // Group questions by Syllabus Units
  const unitsData = useMemo(() => {
    const map = new Map<string, QuizQuestion[]>();
    questions.forEach((q) => {
      const u = q.unit || "General Biology";
      if (!map.has(u)) map.set(u, []);
      map.get(u)!.push(q);
    });

    return Array.from(map.entries()).map(([unitName, qList]) => {
      let answeredCount = 0;
      let reviewCount = 0;
      let skippedCount = 0;

      qList.forEach((q) => {
        const s = userResponses[q.id]?.status;
        if (s === "answered" || s === "answered_marked_for_review") answeredCount++;
        if (s === "marked_for_review" || s === "answered_marked_for_review") reviewCount++;
        if (s === "not_answered") skippedCount++;
      });

      return {
        unitName,
        questions: qList,
        total: qList.length,
        answeredCount,
        reviewCount,
        skippedCount,
        percent: Math.round((answeredCount / qList.length) * 100)
      };
    });
  }, [questions, userResponses]);

  // Determine which unit the current question belongs to
  const currentQuestion = questions[currentQuestionIndex];
  const currentUnitName = currentQuestion?.unit || "";

  // Set default expanded unit to current question's unit
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null);

  // Auto-expand current unit when question changes if in chapters mode
  React.useEffect(() => {
    if (currentUnitName && !expandedUnit) {
      setExpandedUnit(currentUnitName);
    }
  }, [currentUnitName, expandedUnit]);

  // Overall counts
  const counts = useMemo(() => {
    const res = {
      answered: 0,
      not_answered: 0,
      marked_for_review: 0,
      answered_marked_for_review: 0,
      not_visited: 0
    };

    questions.forEach((q) => {
      const resp = userResponses[q.id];
      const status: QuestionStatus = resp?.status || "not_visited";
      res[status]++;
    });

    return res;
  }, [questions, userResponses]);

  const totalAttempted = counts.answered + counts.answered_marked_for_review;
  const totalFlagged = counts.marked_for_review + counts.answered_marked_for_review;
  const totalSkipped = counts.not_answered;
  const progressPercent = Math.round((totalAttempted / Math.max(questions.length, 1)) * 100);

  // 6 question ranges of 15 questions each
  const ranges = [
    { label: "1–15", start: 0, end: 15 },
    { label: "16–30", start: 15, end: 30 },
    { label: "31–45", start: 30, end: 45 },
    { label: "46–60", start: 45, end: 60 },
    { label: "61–75", start: 60, end: 75 },
    { label: "76–90", start: 75, end: 90 }
  ];

  // Auto-sync range with current question index
  React.useEffect(() => {
    const rangeIdx = ranges.findIndex(
      (r) => currentQuestionIndex >= r.start && currentQuestionIndex < r.end
    );
    if (rangeIdx !== -1) {
      setActiveRangeIdx(rangeIdx);
    }
  }, [currentQuestionIndex]);

  // Filtered review questions
  const reviewQuestions = useMemo(() => {
    return questions.filter((q) => {
      const s = userResponses[q.id]?.status;
      return (
        s === "marked_for_review" ||
        s === "answered_marked_for_review" ||
        s === "not_answered"
      );
    });
  }, [questions, userResponses]);

  // Jump to next unanswered question
  const handleNextUnanswered = () => {
    for (let i = currentQuestionIndex + 1; i < questions.length; i++) {
      const q = questions[i];
      if (!q) continue;
      const s = userResponses[q.id]?.status || "not_visited";
      if (s === "not_visited" || s === "not_answered") {
        onSelectQuestion(i);
        return;
      }
    }
    for (let i = 0; i <= currentQuestionIndex; i++) {
      const q = questions[i];
      if (!q) continue;
      const s = userResponses[q.id]?.status || "not_visited";
      if (s === "not_visited" || s === "not_answered") {
        onSelectQuestion(i);
        return;
      }
    }
  };

  // Jump to next flagged question
  const handleNextFlagged = () => {
    for (let i = currentQuestionIndex + 1; i < questions.length; i++) {
      const q = questions[i];
      if (!q) continue;
      const s = userResponses[q.id]?.status;
      if (s === "marked_for_review" || s === "answered_marked_for_review") {
        onSelectQuestion(i);
        return;
      }
    }
    for (let i = 0; i <= currentQuestionIndex; i++) {
      const q = questions[i];
      if (!q) continue;
      const s = userResponses[q.id]?.status;
      if (s === "marked_for_review" || s === "answered_marked_for_review") {
        onSelectQuestion(i);
        return;
      }
    }
  };

  // Clean, modern pill styling (NOT giant bloated circles!)
  const getPillClasses = (status: QuestionStatus, isCurrent: boolean) => {
    const base =
      "relative h-8 w-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-all cursor-pointer select-none ";

    let activeEffect = "";
    if (isCurrent) {
      activeEffect =
        "ring-2 ring-emerald-500 ring-offset-2 ring-offset-background scale-110 z-10 font-black shadow-sm ";
    }

    switch (status) {
      case "answered":
        return (
          base +
          activeEffect +
          "bg-emerald-600 text-white hover:bg-emerald-700 shadow-2xs"
        );
      case "not_answered":
        return (
          base +
          activeEffect +
          "bg-rose-500 text-white hover:bg-rose-600 shadow-2xs"
        );
      case "marked_for_review":
        return (
          base +
          activeEffect +
          "bg-purple-600 text-white hover:bg-purple-700 shadow-2xs"
        );
      case "answered_marked_for_review":
        return (
          base +
          activeEffect +
          "bg-purple-600 text-white ring-1.5 ring-emerald-400 hover:bg-purple-700 shadow-2xs"
        );
      case "not_visited":
      default:
        return (
          base +
          activeEffect +
          "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700/80"
        );
    }
  };

  return (
    <aside
      className={cn(
        "w-full rounded-3xl border border-slate-200/90 bg-white/95 p-4 shadow-xs backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/95 space-y-4 font-sans select-none flex flex-col",
        className
      )}
    >
      {/* ================= HEADER MATCHING ZOOLEARN SIDEBAR ================= */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="flex aspect-square size-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#00897b] to-[#00bfa5] text-white shadow-xs">
            <BookOpen className="size-4.5" weight="bold" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-extrabold text-sm text-slate-800 dark:text-slate-100">
              NEET 2020 Exam
            </span>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              Biology • 90 Questions
            </span>
          </div>
        </div>

        <Badge
          variant="secondary"
          className="font-mono text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/60 font-bold"
        >
          {progressPercent}% Done
        </Badge>
      </div>

      {/* ================= PROGRESS BAR & SUMMARY ================= */}
      <div className="space-y-1.5">
        <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex shadow-inner">
          <div
            style={{ width: `${progressPercent}%` }}
            className="h-full bg-gradient-to-r from-emerald-500 to-[#00bfa5] transition-all duration-300"
          />
        </div>

        {/* Minimal High-Yield Stats */}
        <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400 pt-0.5">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-600" />
            <strong className="text-slate-800 dark:text-slate-200">{totalAttempted}</strong> Answered
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-purple-600" />
            <strong className="text-slate-800 dark:text-slate-200">{totalFlagged}</strong> Review
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-500" />
            <strong className="text-slate-800 dark:text-slate-200">{totalSkipped}</strong> Skipped
          </span>
        </div>
      </div>

      {/* ================= NAVIGATION TABS ================= */}
      <div className="flex items-center gap-1 rounded-2xl bg-slate-100/80 p-1 dark:bg-slate-800/80 text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveTab("chapters")}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl transition-all cursor-pointer text-xs",
            activeTab === "chapters"
              ? "bg-white text-[#00695c] font-black shadow-xs dark:bg-slate-900 dark:text-emerald-300"
              : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
          )}
        >
          <Folders className="h-3.5 w-3.5" weight="bold" />
          <span>By Units</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("grid")}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl transition-all cursor-pointer text-xs",
            activeTab === "grid"
              ? "bg-white text-[#00695c] font-black shadow-xs dark:bg-slate-900 dark:text-emerald-300"
              : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
          )}
        >
          <ListNumbers className="h-3.5 w-3.5" weight="bold" />
          <span>Grid (90)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("review")}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl transition-all cursor-pointer text-xs",
            activeTab === "review"
              ? "bg-white text-purple-700 font-black shadow-xs dark:bg-slate-900 dark:text-purple-300"
              : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
          )}
        >
          <Flag className="h-3.5 w-3.5" weight="bold" />
          <span>Review</span>
          {totalFlagged > 0 && (
            <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
          )}
        </button>
      </div>

      {/* ================= TAB 1: BY CHAPTERS (ZOOLEARN CURRICULUM TREE) ================= */}
      {activeTab === "chapters" && (
        <div className="flex-1 overflow-y-auto max-h-[380px] space-y-2 pr-1 [scrollbar-width:thin]">
          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 px-1">
            Browse authentic questions organized by NCERT units:
          </div>

          {unitsData.map((unit) => {
            const isExpanded = expandedUnit === unit.unitName;
            const isCurrentUnit = currentUnitName === unit.unitName;

            return (
              <div
                key={unit.unitName}
                className={cn(
                  "rounded-2xl border transition-all overflow-hidden",
                  isCurrentUnit
                    ? "border-emerald-500/50 bg-[#e0f2f1]/30 dark:bg-emerald-950/20"
                    : "border-slate-200/80 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700 bg-white/60 dark:bg-slate-900/60"
                )}
              >
                {/* Unit Accordion Trigger */}
                <div
                  onClick={() => setExpandedUnit(isExpanded ? null : unit.unitName)}
                  className="flex items-center justify-between p-3 cursor-pointer select-none transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                >
                  <div className="flex-1 pr-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100 line-clamp-1">
                        {unit.unitName}
                      </span>
                      {isCurrentUnit && (
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 shrink-0" />
                      )}
                    </div>

                    <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                      <span>
                        {unit.answeredCount}/{unit.total} Answered
                      </span>
                      <span>•</span>
                      <span>{unit.percent}%</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {unit.reviewCount > 0 && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300">
                        {unit.reviewCount} 🚩
                      </span>
                    )}
                    {isExpanded ? (
                      <CaretDown className="h-3.5 w-3.5 text-slate-400" />
                    ) : (
                      <CaretRight className="h-3.5 w-3.5 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Question Pills */}
                {isExpanded && (
                  <div className="p-3 pt-1 border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/50">
                    <div className="flex flex-wrap gap-1.5">
                      {unit.questions.map((q) => {
                        const origIdx = questions.findIndex((item) => item.id === q.id);
                        const isCurrent = currentQuestionIndex === origIdx;
                        const resp = userResponses[q.id];
                        const status: QuestionStatus = resp?.status || "not_visited";

                        return (
                          <button
                            key={q.id}
                            type="button"
                            onClick={() => onSelectQuestion(origIdx)}
                            title={`Question ${q.qNumber}`}
                            className={getPillClasses(status, isCurrent)}
                          >
                            <span>{q.qNumber}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ================= TAB 2: CLEAN SEQUENTIAL GRID (WITH RANGE SELECTOR) ================= */}
      {activeTab === "grid" && (
        <div className="flex-1 overflow-y-auto max-h-[380px] space-y-3 pr-1 [scrollbar-width:thin]">
          {/* 6 Clean Range Pills (No big scroll!) */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-1">
              Select Question Range:
            </span>
            <div className="grid grid-cols-3 gap-1">
              {ranges.map((range, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setActiveRangeIdx(idx);
                    onSelectQuestion(range.start);
                  }}
                  className={cn(
                    "py-1.5 px-2 rounded-xl font-mono text-xs font-bold transition-all text-center cursor-pointer",
                    activeRangeIdx === idx
                      ? "bg-[#00897b] text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  )}
                >
                  Q{range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active 15 Question Pills in neat 5x3 card */}
          <div className="rounded-2xl border border-slate-200/90 bg-slate-50/60 p-3 dark:border-slate-800 dark:bg-slate-900/60">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/60 dark:border-slate-800/60 text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>Questions {ranges[activeRangeIdx]?.label}</span>
              <span className="text-[10px] font-normal text-slate-400 font-mono">15 Questions</span>
            </div>

            <div className="grid grid-cols-5 gap-2 justify-items-center">
              {questions
                .slice(ranges[activeRangeIdx]?.start, ranges[activeRangeIdx]?.end)
                .map((q) => {
                  const origIdx = questions.findIndex((item) => item.id === q.id);
                  const isCurrent = currentQuestionIndex === origIdx;
                  const resp = userResponses[q.id];
                  const status: QuestionStatus = resp?.status || "not_visited";

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => onSelectQuestion(origIdx)}
                      title={`Question ${q.qNumber}`}
                      className={getPillClasses(status, isCurrent)}
                    >
                      <span>{q.qNumber}</span>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: REVIEW QUEUE (FLAGGED & SKIPPED) ================= */}
      {activeTab === "review" && (
        <div className="flex-1 overflow-y-auto max-h-[380px] space-y-2 pr-1 [scrollbar-width:thin]">
          {reviewQuestions.length === 0 ? (
            <div className="py-10 text-center space-y-2 text-slate-500">
              <CheckCircle className="size-8 text-emerald-600 mx-auto" weight="fill" />
              <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                All Caught Up!
              </p>
              <p className="text-[11px]">
                You have no questions marked for review or skipped.
              </p>
            </div>
          ) : (
            <>
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 px-1">
                <strong>{reviewQuestions.length}</strong> questions needing attention:
              </div>

              <div className="space-y-1.5">
                {reviewQuestions.map((q) => {
                  const origIdx = questions.findIndex((item) => item.id === q.id);
                  const isCurrent = currentQuestionIndex === origIdx;
                  const resp = userResponses[q.id];
                  const status: QuestionStatus = resp?.status || "not_visited";
                  const isFlagged =
                    status === "marked_for_review" ||
                    status === "answered_marked_for_review";

                  return (
                    <div
                      key={q.id}
                      onClick={() => onSelectQuestion(origIdx)}
                      className={cn(
                        "flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer select-none",
                        isCurrent
                          ? "border-emerald-500 bg-[#e0f2f1]/80 dark:bg-emerald-950/40 shadow-2xs"
                          : "border-slate-200/80 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={cn(
                            "flex h-7 w-7 items-center justify-center rounded-lg font-mono text-xs font-bold text-white shrink-0",
                            isFlagged ? "bg-purple-600" : "bg-rose-500"
                          )}
                        >
                          {q.qNumber}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-slate-800 dark:text-slate-100 line-clamp-1">
                            {q.chapter || q.topic}
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {isFlagged ? "Marked for Review" : "Skipped"}
                          </span>
                        </div>
                      </div>

                      <ArrowRight className="size-3.5 text-slate-400" />
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}

      {/* ================= BOTTOM SMART ACTIONS ================= */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleNextUnanswered}
          className="rounded-xl text-xs font-bold h-9 gap-1 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 cursor-pointer"
        >
          <Lightning className="size-3.5 text-emerald-600" weight="fill" />
          <span>Next Skipped</span>
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleNextFlagged}
          disabled={totalFlagged === 0}
          className="rounded-xl text-xs font-bold h-9 gap-1 text-purple-700 dark:text-purple-300 border-purple-500/30 hover:bg-purple-50 dark:hover:bg-purple-950/30 cursor-pointer disabled:opacity-40"
        >
          <Flag className="size-3.5 text-purple-600" weight="fill" />
          <span>Next Flagged ({totalFlagged})</span>
        </Button>
      </div>
    </aside>
  );
}
