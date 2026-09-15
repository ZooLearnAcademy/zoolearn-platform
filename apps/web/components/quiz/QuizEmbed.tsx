"use client";

/**
 * QuizEmbed — The primary developer API for embedding quizzes.
 *
 * Usage:
 *   import { QuizEmbed } from "@/components/quiz";
 *   // or
 *   import QuizEmbed from "./quiz";
 *   <QuizEmbed quizId="QUIZ_UUID_HERE" />
 *
 * The component fetches the published quiz and renders it completely.
 * Works seamlessly in both Server and Client components.
 */
import { useEffect, useState } from "react";
import { QuizRenderer } from "./QuizRenderer";
import type { PublicQuizPayload } from "@/types/quiz";

export interface QuizEmbedProps {
  /** UUID of the published quiz to embed */
  quizId: string;
  /** Optional CSS class for the container */
  className?: string;
  /** Optional preloaded payload (for SSR / server-fetched cases) */
  initialPayload?: PublicQuizPayload | null;
}

export function QuizEmbed({ quizId, className, initialPayload }: QuizEmbedProps) {
  const [payload, setPayload] = useState<PublicQuizPayload | null>(initialPayload ?? null);
  const [loading, setLoading] = useState(!initialPayload);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialPayload) {
      setPayload(initialPayload);
      setLoading(false);
      return;
    }

    if (!quizId) {
      setError("No quiz ID provided");
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    fetch(`/api/quizzes/${encodeURIComponent(quizId)}`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Quiz not available or unpublished");
        }
        return res.json() as Promise<PublicQuizPayload>;
      })
      .then((data) => {
        if (isMounted) {
          setPayload(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Failed to load quiz");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [quizId, initialPayload]);

  if (loading) {
    return (
      <div className={`my-8 ${className ?? ""}`}>
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-[#111118] border border-white/10 rounded-3xl p-8 text-center animate-pulse">
            <div className="h-6 w-32 bg-white/10 rounded mx-auto mb-4" />
            <div className="h-4 w-48 bg-white/5 rounded mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !payload) {
    return (
      <div className={`my-8 ${className ?? ""}`}>
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-[#111118] border border-white/10 rounded-3xl p-8 text-center">
            <p className="text-2xl mb-3">📋</p>
            <p className="text-slate-400 text-sm">
              Quiz not available. It may be unpublished or the ID is incorrect.
            </p>
            <code className="text-xs text-slate-600 mt-2 block font-mono">{quizId}</code>
          </div>
        </div>
      </div>
    );
  }

  if (payload.questions.length === 0) {
    return (
      <div className={`my-8 ${className ?? ""}`}>
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-[#111118] border border-white/10 rounded-3xl p-8 text-center">
            <p className="text-2xl mb-3">📋</p>
            <p className="text-slate-400 text-sm">
              This quiz has no questions yet.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`my-8 ${className ?? ""}`}>
      <QuizRenderer payload={payload} quizId={quizId} />
    </div>
  );
}

export default QuizEmbed;
