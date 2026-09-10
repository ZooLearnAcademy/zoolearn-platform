"use client";

import React from "react";
import { Badge } from "@workspace/ui/components/badge";
import { Card, CardContent } from "@workspace/ui/components/card";
import { cn } from "@workspace/ui/lib/utils";
import { Check, Sparkle, Tag, ShieldCheck } from "@phosphor-icons/react";
import type { QuizQuestion, QuestionStatus } from "@/types/quiz";

interface QuestionCardProps {
  question: QuizQuestion;
  currentIndex: number;
  totalQuestions: number;
  selectedOptionIndex: number | null;
  status: QuestionStatus;
  onSelectOption: (optionIndex: number) => void;
}

export function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  selectedOptionIndex,
  status,
  onSelectOption
}: QuestionCardProps) {
  const optionLabels = ["(1)", "(2)", "(3)", "(4)"];
  const optionLetters = ["A", "B", "C", "D"];

  const getDifficultyColor = (diff: string) => {
    switch (diff.toLowerCase()) {
      case "easy":
        return "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300";
      case "moderate":
        return "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300";
      case "hard":
        return "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300";
      default:
        return "border-slate-500/30 bg-slate-500/10 text-slate-700 dark:text-slate-300";
    }
  };

  return (
    <Card className="w-full rounded-3xl border border-border/80 bg-card/95 backdrop-blur-md shadow-sm overflow-hidden transition-all">
      {/* Top Metadata Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 bg-gradient-to-r from-muted/30 via-background to-emerald-500/5 px-5 py-3 sm:px-7">
        <div className="flex flex-wrap items-center gap-2">
          {/* Question Index Pill */}
          <div className="flex items-center gap-1.5 rounded-xl bg-primary/10 border border-primary/20 px-3 py-1 font-mono text-xs font-black text-primary">
            <span>QUESTION {question.qNumber}</span>
            <span className="text-muted-foreground font-normal">/ {totalQuestions}</span>
          </div>

          {question.unit && (
            <Badge variant="secondary" className="text-[11px] font-semibold max-w-[240px] truncate rounded-lg">
              {question.unit}
            </Badge>
          )}

          {question.chapter && (
            <Badge variant="outline" className="hidden sm:inline-flex text-[11px] text-muted-foreground border-border/70 rounded-lg">
              {question.chapter}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Difficulty Badge */}
          <span
            className={cn(
              "inline-flex items-center rounded-lg border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
              getDifficultyColor(question.difficulty)
            )}
          >
            {question.difficulty}
          </span>

          {/* NEET Marking Scheme Pill */}
          <div className="flex items-center gap-1.5 rounded-lg border border-border/80 bg-muted/40 px-2.5 py-0.5 text-[10px] font-mono font-bold">
            <span className="text-emerald-600 dark:text-emerald-400 font-black">+4.0</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-rose-600 dark:text-rose-400 font-black">-1.0</span>
          </div>
        </div>
      </div>

      <CardContent className="p-5 sm:p-8 space-y-6">
        {/* Question Statement */}
        <div className="space-y-4">
          {question.topic && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <Sparkle className="h-3.5 w-3.5" weight="fill" />
              <span>{question.topic}</span>
            </div>
          )}

          <div className="text-base sm:text-lg md:text-xl font-semibold leading-relaxed text-foreground whitespace-pre-line tracking-tight">
            {question.question}
          </div>

          {/* Optional Matching Table */}
          {question.table && question.table.length > 0 && (
            <div className="mt-4 overflow-x-auto rounded-2xl border border-border/80 bg-muted/20 shadow-2xs">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/60 text-muted-foreground font-bold">
                    {question.table[0]?.map((header, idx) => (
                      <th key={idx} className="py-3 px-4 font-black">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {question.table.slice(1).map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-muted/40 transition-colors">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="py-2.5 px-4 font-medium text-foreground">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Options List (A, B, C, D) */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-bold uppercase tracking-wider">
            <span>Select one correct choice:</span>
            <span className="text-[11px] font-mono normal-case font-normal">
              Click to select or change option
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {question.choices.map((choice, optIdx) => {
              const isSelected = selectedOptionIndex === optIdx;

              return (
                <div
                  key={optIdx}
                  onClick={() => onSelectOption(optIdx)}
                  className={cn(
                    "group relative flex items-center gap-3.5 rounded-2xl border p-4 sm:p-4.5 text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer select-none",
                    isSelected
                      ? "border-emerald-500 bg-gradient-to-r from-emerald-500/15 via-emerald-500/5 to-transparent text-foreground shadow-sm ring-2 ring-emerald-500/30 font-semibold"
                      : "border-border/70 bg-card hover:border-emerald-500/40 hover:bg-muted/40 hover:translate-x-0.5 text-foreground"
                  )}
                >
                  {/* Option Badge Letter / Circle */}
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-mono font-black text-xs transition-all shadow-2xs",
                      isSelected
                        ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-emerald-500/30 scale-105"
                        : "bg-muted text-muted-foreground group-hover:bg-emerald-100 group-hover:text-emerald-800 dark:group-hover:bg-emerald-950/60 dark:group-hover:text-emerald-300"
                    )}
                  >
                    {isSelected ? <Check className="h-4 w-4" weight="bold" /> : optionLetters[optIdx]}
                  </div>

                  {/* Option Text */}
                  <div className="flex-1 leading-relaxed">
                    <span className="font-mono text-muted-foreground mr-2 font-normal">
                      {optionLabels[optIdx]}
                    </span>
                    <span className={isSelected ? "text-foreground font-bold" : "text-foreground/90"}>
                      {choice}
                    </span>
                  </div>

                  {/* Selected Indicator Pill */}
                  {isSelected && (
                    <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-mono">
                      Selected
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
