"use client";

import type { QuizStatus } from "@/types/quiz";

const CONFIG: Record<
  QuizStatus,
  { label: string; classes: string; dot: string }
> = {
  published: {
    label: "Published",
    classes: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    dot: "bg-emerald-400",
  },
  draft: {
    label: "Draft",
    classes: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    dot: "bg-amber-400",
  },
  archived: {
    label: "Archived",
    classes: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    dot: "bg-slate-400",
  },
};

export function QuizStatusBadge({ status }: { status: QuizStatus }) {
  const { label, classes, dot } = CONFIG[status] ?? CONFIG.draft;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${classes}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}
