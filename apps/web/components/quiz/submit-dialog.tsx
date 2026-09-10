"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { Warning } from "@phosphor-icons/react";
import type { QuestionStatus, QuizQuestion, UserResponse } from "@/types/quiz";

interface SubmitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  questions: QuizQuestion[];
  userResponses: Record<number, UserResponse>;
  remainingSeconds: number;
  onConfirmSubmit: () => void;
}

export function SubmitDialog({
  open,
  onOpenChange,
  questions,
  userResponses,
  remainingSeconds,
  onConfirmSubmit
}: SubmitDialogProps) {
  const counts = {
    answered: 0,
    not_answered: 0,
    marked_for_review: 0,
    answered_marked_for_review: 0,
    not_visited: 0
  };

  questions.forEach((q) => {
    const resp = userResponses[q.id];
    const status: QuestionStatus = resp?.status || "not_visited";
    counts[status]++;
  });

  const minutesLeft = Math.floor(remainingSeconds / 60);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl border-border bg-card p-6 shadow-2xl">
        <DialogHeader className="space-y-2 text-left">
          <div className="flex items-center gap-2.5 text-foreground">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Warning className="h-5 w-5" />
            </div>
            <DialogTitle className="text-lg font-bold">
              Submit Examination?
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
            Please review your question attempt summary before final submission. Once submitted, your score will be computed.
          </DialogDescription>
        </DialogHeader>

        {/* NPTEL Exam Summary Table */}
        <div className="my-3 overflow-hidden rounded-xl border border-border/80 text-xs">
          <table className="w-full text-left">
            <thead className="bg-muted/60 text-muted-foreground font-bold border-b border-border">
              <tr>
                <th className="py-2.5 px-3">Status Category</th>
                <th className="py-2.5 px-3 text-right">No. of Questions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              <tr>
                <td className="py-2 px-3 flex items-center gap-2 font-medium">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
                  <span>Answered</span>
                </td>
                <td className="py-2 px-3 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {counts.answered}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 flex items-center gap-2 font-medium">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                  <span>Not Answered (Visited)</span>
                </td>
                <td className="py-2 px-3 text-right font-mono font-bold text-rose-600 dark:text-rose-400">
                  {counts.not_answered}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 flex items-center gap-2 font-medium">
                  <span className="h-2.5 w-2.5 rounded-full bg-purple-600" />
                  <span>Marked for Review</span>
                </td>
                <td className="py-2 px-3 text-right font-mono font-bold text-purple-600 dark:text-purple-400">
                  {counts.marked_for_review}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 flex items-center gap-2 font-medium">
                  <span className="h-2.5 w-2.5 rounded-full bg-purple-600 ring-2 ring-emerald-400" />
                  <span>Answered &amp; Marked for Review</span>
                </td>
                <td className="py-2 px-3 text-right font-mono font-bold text-purple-600 dark:text-purple-400">
                  {counts.answered_marked_for_review}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 flex items-center gap-2 font-medium">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-400" />
                  <span>Not Visited</span>
                </td>
                <td className="py-2 px-3 text-right font-mono font-bold text-muted-foreground">
                  {counts.not_visited}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {minutesLeft > 5 && (
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-xs text-amber-800 dark:text-amber-300">
            <strong>Notice:</strong> You still have <strong>{minutesLeft} minutes</strong> remaining. You can go back and review any marked questions.
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0 pt-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-xl text-xs font-semibold"
          >
            Resume Test
          </Button>
          <Button
            variant="default"
            onClick={onConfirmSubmit}
            className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
          >
            Yes, Final Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
