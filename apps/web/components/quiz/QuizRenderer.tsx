"use client";

import { useState, useCallback } from "react";
import { QuizHeader } from "./QuizHeader";
import { QuizProgress } from "./QuizProgress";
import { QuizQuestion } from "./QuizQuestion";
import { QuizNavigation } from "./QuizNavigation";
import { QuizResult } from "./QuizResult";
import type { PublicQuizPayload, QuizAnswer, QuizResult as QuizResultType } from "@/types/quiz";

type State = "intro" | "questions" | "submitting" | "result";

interface QuizRendererProps {
  payload: PublicQuizPayload;
  quizId: string;
}

export function QuizRenderer({ payload, quizId }: QuizRendererProps) {
  const { quiz, questions } = payload;
  const [state, setState] = useState<State>(quiz.instructions ? "intro" : "questions");
  const [currentIndex, setCurrentIndex] = useState(0);
  // answers: questionId → selectedOptionIds[]
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [result, setResult] = useState<QuizResultType | null>(null);
  const [submitError, setSubmitError] = useState("");
  const [timerKey, setTimerKey] = useState(0); // reset timer on retry

  const currentQuestion = questions[currentIndex];
  const answeredIndices = new Set(
    questions.map((q, i) => (answers[q.id]?.length ? i : -1)).filter((i) => i >= 0)
  );

  // Required unanswered count
  const requiredUnanswered = questions.filter(
    (q) => q.is_required && !answers[q.id]?.length
  ).length;
  const canSubmit = requiredUnanswered === 0;

  const handleAnswer = useCallback(
    (questionId: string, selected: string[]) => {
      setAnswers((prev) => ({ ...prev, [questionId]: selected }));
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    setState("submitting");
    setSubmitError("");
    try {
      const payload: { quizId: string; answers: QuizAnswer[] } = {
        quizId,
        answers: questions.map((q) => ({
          questionId: q.id,
          selectedOptionIds: answers[q.id] ?? [],
        })),
      };

      const res = await fetch(`/api/quizzes/${quizId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Submission failed");

      setResult(data as QuizResultType);
      setState("result");
    } catch (e: any) {
      setSubmitError(e.message);
      setState("questions"); // return to quiz on error
    }
  }, [quizId, questions, answers]);

  const handleTimerExpire = useCallback(() => {
    handleSubmit();
  }, [handleSubmit]);

  const handleRetry = () => {
    setAnswers({});
    setResult(null);
    setSubmitError("");
    setCurrentIndex(0);
    setTimerKey((k) => k + 1);
    setState(quiz.instructions ? "intro" : "questions");
  };

  // ── INTRO SCREEN ──────────────────────────────────────────────
  if (state === "intro") {
    return (
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-[#111118] border border-white/8 rounded-3xl p-8 space-y-6">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 bg-violet-500/10 rounded-2xl flex items-center justify-center mx-auto">
              <span className="text-2xl">📝</span>
            </div>
            <h2 className="text-2xl font-black text-white">{quiz.title}</h2>
            {quiz.description && (
              <p className="text-slate-400 text-sm">{quiz.description}</p>
            )}
          </div>

          <div className="space-y-2 text-sm text-slate-400">
            <div className="flex justify-between py-2 border-b border-white/5">
              <span>Questions</span>
              <span className="text-white font-semibold">{questions.length}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span>Passing score</span>
              <span className="text-white font-semibold">{quiz.passing_percentage}%</span>
            </div>
            {quiz.time_limit_seconds && (
              <div className="flex justify-between py-2 border-b border-white/5">
                <span>Time limit</span>
                <span className="text-white font-semibold">
                  {Math.floor(quiz.time_limit_seconds / 60)} minutes
                </span>
              </div>
            )}
          </div>

          {quiz.instructions && (
            <div className="bg-violet-500/5 border border-violet-500/15 rounded-2xl p-4">
              <p className="text-sm text-slate-300 font-medium mb-1">Instructions</p>
              <p className="text-sm text-slate-400 leading-relaxed">{quiz.instructions}</p>
            </div>
          )}

          <button
            onClick={() => setState("questions")}
            className="w-full py-3.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold rounded-2xl hover:from-violet-400 hover:to-purple-500 transition-all shadow-lg shadow-violet-500/25 text-sm"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  // ── RESULT SCREEN ─────────────────────────────────────────────
  if (state === "result" && result) {
    return (
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-[#111118] border border-white/8 rounded-3xl p-8">
          <QuizResult quiz={quiz} result={result} onRetry={handleRetry} />
        </div>
      </div>
    );
  }

  // ── QUESTIONS ─────────────────────────────────────────────────
  if (!currentQuestion) return null;

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="bg-[#111118] border border-white/8 rounded-3xl overflow-hidden">
        {/* Top bar */}
        <div className="px-6 pt-6 pb-0 space-y-4 border-b border-white/5 pb-5">
          <QuizHeader
            quiz={quiz}
            currentIndex={currentIndex}
            totalQuestions={questions.length}
            onTimerExpire={quiz.time_limit_seconds ? handleTimerExpire : undefined}
            key={timerKey}
          />
          <QuizProgress
            currentIndex={currentIndex}
            totalQuestions={questions.length}
            answeredIndices={answeredIndices}
            onNavigate={(i) => setCurrentIndex(i)}
          />
        </div>

        {/* Question body */}
        <div className="p-6 min-h-[280px]">
          <QuizQuestion
            question={currentQuestion}
            selectedIds={answers[currentQuestion.id] ?? []}
            onChange={(selected) => handleAnswer(currentQuestion.id, selected)}
            disabled={state === "submitting"}
          />
        </div>

        {/* Error */}
        {submitError && (
          <div className="px-6 py-3 bg-red-500/10 border-t border-red-500/20 text-red-400 text-sm">
            {submitError}
          </div>
        )}

        {/* Navigation */}
        <div className="px-6 py-5 border-t border-white/5">
          {/* Required unanswered warning */}
          {!canSubmit && currentIndex === questions.length - 1 && (
            <p className="text-amber-400 text-xs mb-3">
              {requiredUnanswered} required question{requiredUnanswered !== 1 ? "s" : ""} not yet answered.
            </p>
          )}
          <QuizNavigation
            currentIndex={currentIndex}
            totalQuestions={questions.length}
            isSubmitting={state === "submitting"}
            canSubmit={canSubmit}
            onPrev={() => setCurrentIndex((i) => Math.max(0, i - 1))}
            onNext={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
