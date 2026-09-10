"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { Input } from "@workspace/ui/components/input";
import { cn } from "@workspace/ui/lib/utils";
import type { QuizQuestion, UserResponse, QuizResultSummary } from "@/types/quiz";
import {
  CheckCircle,
  XCircle,
  WarningCircle,
  TrendUp,
  ArrowCounterClockwise,
  BookOpen,
  MagnifyingGlass,
  Sparkle,
  ArrowRight
} from "@phosphor-icons/react";
import Link from "next/link";

interface QuizResultsViewProps {
  questions: QuizQuestion[];
  userResponses: Record<number, UserResponse>;
  results: QuizResultSummary;
  examTitle: string;
  onRetake: () => void;
}

export function QuizResultsView({
  questions,
  userResponses,
  results,
  examTitle,
  onRetake
}: QuizResultsViewProps) {
  const [filterType, setFilterType] = useState<"all" | "correct" | "incorrect" | "unattempted">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getQuestionResult = (q: QuizQuestion) => {
    const resp = userResponses[q.id];
    const isAttempted = resp && resp.selectedOptionIndex !== null && resp.selectedOptionIndex !== undefined;
    const isCorrect = isAttempted && resp.selectedOptionIndex === q.correctAnswerIndex;
    const isIncorrect = isAttempted && resp.selectedOptionIndex !== q.correctAnswerIndex;

    return {
      isAttempted,
      isCorrect,
      isIncorrect,
      selectedOptionIndex: isAttempted ? resp.selectedOptionIndex : null,
      marks: isCorrect ? 4 : isIncorrect ? -1 : 0
    };
  };

  const filteredQuestions = questions.filter((q) => {
    const res = getQuestionResult(q);

    if (filterType === "correct" && !res.isCorrect) return false;
    if (filterType === "incorrect" && !res.isIncorrect) return false;
    if (filterType === "unattempted" && res.isAttempted) return false;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        q.question.toLowerCase().includes(term) ||
        q.topic.toLowerCase().includes(term) ||
        q.unit.toLowerCase().includes(term) ||
        q.chapter.toLowerCase().includes(term) ||
        q.qNumber.toString() === term
      );
    }

    return true;
  });

  const optionLetters = ["(1)", "(2)", "(3)", "(4)"];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 py-6 px-3 sm:px-6">
      
      {/* ================= HERO SCORECARD ================= */}
      <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-card via-card to-emerald-500/5 p-6 sm:p-10 shadow-lg">
        {/* Glow orb */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <Badge variant="outline" className="text-xs font-mono uppercase bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300">
              Exam Complete • Official Scorecard
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground">
              {examTitle}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
              Performance analysis calculated using standard NEET marking scheme: +4 for correct, -1 for negative, 0 for unattempted.
            </p>
          </div>

          {/* Primary Score Ring / Badge */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 min-w-[200px] text-center shadow-xs">
            <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
              Total Score
            </span>
            <div className="mt-1 flex items-baseline justify-center gap-1">
              <span className="text-4xl sm:text-5xl font-black text-emerald-600 dark:text-emerald-400">
                {results.score}
              </span>
              <span className="text-base sm:text-lg font-bold text-muted-foreground">
                / {results.maxScore}
              </span>
            </div>
            <span className="mt-1.5 text-xs font-bold text-muted-foreground">
              {results.percentage.toFixed(1)}% Marks Scored
            </span>
          </div>
        </div>

        {/* 4 Stat Metric Cards */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-6 border-t border-border/60">
          <div className="rounded-xl border border-emerald-500/30 bg-card p-3.5 shadow-2xs">
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
              <CheckCircle className="h-4 w-4" />
              <span>Correct</span>
            </div>
            <div className="mt-1 text-2xl font-black text-foreground">
              {results.totalCorrect}
            </div>
            <span className="text-[11px] text-muted-foreground font-mono">
              +{results.totalCorrect * 4} Marks
            </span>
          </div>

          <div className="rounded-xl border border-rose-500/30 bg-card p-3.5 shadow-2xs">
            <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 text-xs font-bold">
              <XCircle className="h-4 w-4" />
              <span>Incorrect</span>
            </div>
            <div className="mt-1 text-2xl font-black text-foreground">
              {results.totalIncorrect}
            </div>
            <span className="text-[11px] text-muted-foreground font-mono">
              -{results.totalIncorrect * 1} Marks (Negative)
            </span>
          </div>

          <div className="rounded-xl border border-border bg-card p-3.5 shadow-2xs">
            <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-bold">
              <WarningCircle className="h-4 w-4" />
              <span>Unattempted</span>
            </div>
            <div className="mt-1 text-2xl font-black text-foreground">
              {results.totalUnattempted}
            </div>
            <span className="text-[11px] text-muted-foreground font-mono">
              0 Marks
            </span>
          </div>

          <div className="rounded-xl border border-border bg-card p-3.5 shadow-2xs">
            <div className="flex items-center gap-1.5 text-primary text-xs font-bold">
              <TrendUp className="h-4 w-4" />
              <span>Accuracy</span>
            </div>
            <div className="mt-1 text-2xl font-black text-foreground">
              {results.accuracy.toFixed(1)}%
            </div>
            <span className="text-[11px] text-muted-foreground font-mono">
              Time: {formatTime(results.timeTakenSeconds)}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-end gap-3 pt-2">
          <Button
            variant="outline"
            onClick={onRetake}
            className="rounded-xl text-xs sm:text-sm font-semibold border-border gap-1.5"
          >
            <ArrowCounterClockwise className="h-3.5 w-3.5" />
            Retake Test
          </Button>

          <Link href="/modules/11th">
            <Button
              variant="default"
              className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold gap-1.5 shadow-xs"
            >
              Explore Biology Modules
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* ================= UNIT PERFORMANCE BREAKDOWN ================= */}
      <Card className="rounded-2xl border-border/80 bg-card shadow-xs">
        <CardHeader className="p-5 pb-3 border-b border-border/60">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <TrendUp className="h-4 w-4 text-emerald-600" />
            <span>Unit-Wise Performance Matrix</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground font-bold">
                <th className="py-2.5 px-3">Unit Name</th>
                <th className="py-2.5 px-3 text-center">Questions</th>
                <th className="py-2.5 px-3 text-center text-emerald-600">Correct</th>
                <th className="py-2.5 px-3 text-center text-rose-600">Incorrect</th>
                <th className="py-2.5 px-3 text-center">Skipped</th>
                <th className="py-2.5 px-3 text-right">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {results.unitStats.map((u, i) => (
                <tr key={i} className="hover:bg-muted/30 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-foreground">
                    {u.unit || "General Biology"}
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono">{u.total}</td>
                  <td className="py-2.5 px-3 text-center font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {u.correct}
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono font-bold text-rose-600 dark:text-rose-400">
                    {u.incorrect}
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono text-muted-foreground">
                    {u.unattempted}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-foreground">
                    {u.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* ================= QUESTION-BY-QUESTION DETAILED SOLUTIONS ================= */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg sm:text-xl font-black tracking-tight text-foreground flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-emerald-600" />
              <span>Comprehensive Solution Key &amp; Explanations</span>
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Review correct answers, explanations, and your submitted choices for all 90 questions.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search topic or question..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 text-xs h-9 rounded-xl border-border"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={filterType === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("all")}
            className="rounded-xl text-xs font-bold"
          >
            All Questions ({questions.length})
          </Button>

          <Button
            variant={filterType === "correct" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("correct")}
            className="rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
          >
            Correct ({results.totalCorrect})
          </Button>

          <Button
            variant={filterType === "incorrect" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("incorrect")}
            className="rounded-xl text-xs font-bold text-rose-700 dark:text-rose-300 border-rose-500/30"
          >
            Incorrect ({results.totalIncorrect})
          </Button>

          <Button
            variant={filterType === "unattempted" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("unattempted")}
            className="rounded-xl text-xs font-bold text-muted-foreground border-border"
          >
            Unattempted ({results.totalUnattempted})
          </Button>
        </div>

        {/* Questions Cards List */}
        <div className="space-y-5 pt-2">
          {filteredQuestions.map((q) => {
            const res = getQuestionResult(q);

            return (
              <Card
                key={q.id}
                className={cn(
                  "rounded-2xl border p-5 sm:p-7 shadow-xs transition-all",
                  res.isCorrect
                    ? "border-emerald-500/40 bg-emerald-500/5"
                    : res.isIncorrect
                    ? "border-rose-500/40 bg-rose-500/5"
                    : "border-border/80 bg-card"
                )}
              >
                {/* Header with question number and status */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs bg-muted px-2.5 py-1 rounded-md">
                      Q{q.qNumber}
                    </span>
                    <Badge variant="outline" className="text-[11px] font-medium">
                      {q.chapter || q.unit}
                    </Badge>
                    <span className="text-[11px] font-bold text-muted-foreground">
                      {q.difficulty}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div>
                    {res.isCorrect ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-0.5 text-xs font-bold text-white shadow-2xs">
                        <CheckCircle className="h-3.5 w-3.5" />
                        +4 Marks (Correct)
                      </span>
                    ) : res.isIncorrect ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-rose-600 px-3 py-0.5 text-xs font-bold text-white shadow-2xs">
                        <XCircle className="h-3.5 w-3.5" />
                        -1 Mark (Incorrect)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-200 dark:bg-slate-800 px-3 py-0.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                        Skipped (0 Marks)
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Statement */}
                <div className="mt-4 text-sm sm:text-base font-medium text-foreground whitespace-pre-line leading-relaxed">
                  {q.question}
                </div>

                {/* Optional Table */}
                {q.table && q.table.length > 0 && (
                  <div className="mt-3 overflow-x-auto rounded-xl border border-border/80 bg-muted/20">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-border bg-muted/60 text-muted-foreground font-bold">
                          {q.table[0]?.map((header, idx) => (
                            <th key={idx} className="py-2 px-3">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60">
                        {q.table.slice(1).map((row, rIdx) => (
                          <tr key={rIdx}>
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="py-2 px-3 font-medium text-foreground">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Choices breakdown */}
                <div className="mt-4 grid grid-cols-1 gap-2">
                  {q.choices.map((choice, optIdx) => {
                    const isUserChoice = res.selectedOptionIndex === optIdx;
                    const isCorrectAnswer = q.correctAnswerIndex === optIdx;

                    let cardStyle = "border-border/60 bg-muted/20 text-muted-foreground";

                    if (isCorrectAnswer) {
                      cardStyle = "border-emerald-600 bg-emerald-500/15 text-emerald-950 dark:text-emerald-100 font-bold ring-1 ring-emerald-600";
                    } else if (isUserChoice && !isCorrectAnswer) {
                      cardStyle = "border-rose-600 bg-rose-500/15 text-rose-950 dark:text-rose-100 font-bold ring-1 ring-rose-600";
                    }

                    return (
                      <div
                        key={optIdx}
                        className={cn(
                          "flex items-center justify-between rounded-xl border p-3 text-xs sm:text-sm transition-colors",
                          cardStyle
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono font-bold opacity-80">
                            {optionLetters[optIdx]}
                          </span>
                          <span>{choice}</span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 text-xs font-bold">
                          {isCorrectAnswer && (
                            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                              <CheckCircle className="h-3.5 w-3.5" />
                              Correct Answer
                            </span>
                          )}
                          {isUserChoice && !isCorrectAnswer && (
                            <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
                              <XCircle className="h-3.5 w-3.5" />
                              Your Selection
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Detailed NCERT Explanation Box */}
                <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-xs sm:text-sm space-y-1.5">
                  <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300 font-bold">
                    <Sparkle className="h-4 w-4" />
                    <span>NCERT Explanation &amp; Key Concept</span>
                  </div>

                  {q.topic && (
                    <div className="text-xs text-muted-foreground">
                      <strong>Topic Focus:</strong> {q.topic}
                    </div>
                  )}

                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed pt-1">
                    {q.explanation}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
