"use client";

interface QuizProgressProps {
  currentIndex: number;
  totalQuestions: number;
  answeredIndices: Set<number>;
  onNavigate: (index: number) => void;
}

export function QuizProgress({
  currentIndex,
  totalQuestions,
  answeredIndices,
  onNavigate,
}: QuizProgressProps) {
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  return (
    <div className="space-y-3">
      {/* Progress bar */}
      <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-violet-500 to-purple-400 rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Number dots — only show if ≤ 20 questions to avoid overflow */}
      {totalQuestions <= 20 && (
        <div className="flex items-center gap-1.5 flex-wrap">
          {Array.from({ length: totalQuestions }, (_, i) => (
            <button
              key={i}
              onClick={() => onNavigate(i)}
              aria-label={`Go to question ${i + 1}`}
              className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all ${
                i === currentIndex
                  ? "bg-violet-500 text-white shadow-lg shadow-violet-500/30"
                  : answeredIndices.has(i)
                  ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
                  : "bg-white/5 text-slate-500 hover:bg-white/10 hover:text-slate-300 border border-white/8"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
