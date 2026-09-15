"use client";

import { useEffect, useState, useCallback } from "react";
import { Timer, Warning } from "@phosphor-icons/react";

interface QuizTimerProps {
  totalSeconds: number;
  onExpire: () => void;
}

export function QuizTimer({ totalSeconds, onExpire }: QuizTimerProps) {
  const [remaining, setRemaining] = useState(totalSeconds);

  useEffect(() => {
    if (remaining <= 0) {
      onExpire();
      return;
    }
    const id = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          onExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const display = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  const isWarning = remaining <= 60; // last 60s
  const isDanger = remaining <= 30;  // last 30s

  return (
    <div
      className={`flex items-center gap-1.5 text-sm font-mono font-semibold px-3 py-1.5 rounded-xl border transition-colors ${
        isDanger
          ? "bg-red-500/10 border-red-500/30 text-red-400 animate-pulse"
          : isWarning
          ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
          : "bg-white/5 border-white/10 text-slate-300"
      }`}
    >
      {isDanger ? (
        <Warning size={14} weight="fill" className="shrink-0" />
      ) : (
        <Timer size={14} className="shrink-0" />
      )}
      {display}
    </div>
  );
}
