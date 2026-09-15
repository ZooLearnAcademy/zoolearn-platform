"use client";

import { Clock, ShieldCheck, CheckCircle } from "@phosphor-icons/react";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { cn } from "@workspace/ui/lib/utils";

interface CbtQuizHeaderProps {
  title: string;
  examCode: string;
  remainingSeconds: number;
  totalQuestions: number;
  answeredCount: number;
  onSubmitClick: () => void;
  candidateName?: string;
  rollNumber?: string;
}

export function CbtQuizHeader({
  title,
  examCode,
  remainingSeconds,
  totalQuestions,
  answeredCount,
  onSubmitClick,
  candidateName = "NEET Aspirant",
  rollNumber = "NEET-2020-UG-8821"
}: CbtQuizHeaderProps) {
  const hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;

  const isLowTime = remainingSeconds <= 600; // < 10 minutes
  const isCriticalTime = remainingSeconds <= 180; // < 3 minutes

  const formatDigits = (n: number) => n.toString().padStart(2, "0");

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/95 backdrop-blur-md shadow-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2.5 sm:px-6">
        
        {/* Left: Exam Brand & Info */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-xs">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-black tracking-tight text-foreground line-clamp-1">
                {title}
              </h1>
              <Badge variant="outline" className="hidden sm:inline-flex text-[10px] font-mono uppercase bg-muted/60">
                {examCode}
              </Badge>
            </div>
            <span className="text-[11px] text-muted-foreground">
              National Testing Agency (NTA) • Computer Based Test (CBT)
            </span>
          </div>
        </div>

        {/* Center: Live Countdown Timer */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div
            className={cn(
              "flex items-center gap-2 rounded-xl px-3 py-1.5 font-mono text-xs sm:text-sm font-bold border transition-colors shadow-2xs",
              isCriticalTime
                ? "border-destructive/60 bg-destructive/10 text-destructive animate-pulse"
                : isLowTime
                ? "border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                : "border-border bg-card text-foreground"
            )}
          >
            <Clock className={cn("h-4 w-4 shrink-0", isCriticalTime && "animate-spin")} />
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-1.5">
              <span className="text-[10px] uppercase text-muted-foreground font-sans hidden sm:inline">
                Time Left:
              </span>
              <span className="tracking-wider">
                {hours > 0 ? `${formatDigits(hours)}:` : ""}
                {formatDigits(minutes)}:{formatDigits(seconds)}
              </span>
            </div>
          </div>

          {/* Answered Progress Pill */}
          <div className="hidden md:flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
            <span>
              {answeredCount}/{totalQuestions} Answered
            </span>
          </div>
        </div>

        {/* Right: Candidate Profile & Submit */}
        <div className="flex items-center gap-2.5">
          {/* Candidate Profile Details (NPTEL Style) */}
          <div className="hidden lg:flex flex-col text-right leading-tight">
            <span className="text-xs font-bold text-foreground">{candidateName}</span>
            <span className="text-[10px] font-mono text-muted-foreground">{rollNumber}</span>
          </div>

          {/* Submit Exam Button */}
          <Button
            onClick={onSubmitClick}
            variant="default"
            size="sm"
            className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-4 shadow-sm hover:scale-[1.02] transition-transform"
          >
            Submit Test
          </Button>
        </div>

      </div>
    </header>
  );
}
