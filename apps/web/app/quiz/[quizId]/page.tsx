import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedQuiz, getQuizForPreview } from "@/lib/supabase/quiz-public";
import { QuizRenderer } from "@/components/quiz/QuizRenderer";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ quizId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { quizId } = await params;
  const payload = await getPublishedQuiz(quizId).catch(() => null);
  return {
    title: payload ? `${payload.quiz.title} | ZooLearn Quiz` : "Zoology Quiz | ZooLearn",
    description:
      payload?.quiz.description ??
      "Test your understanding of zoological taxonomy, morphology, and animal biology with interactive tests on ZooLearn.",
  };
}

export default async function PublicQuizPlayPage({ params }: Props) {
  const { quizId } = await params;
  
  // Try to load the published quiz; if preview mode or admin-client access works, load it
  let payload = await getPublishedQuiz(quizId).catch(() => null);
  if (!payload) {
    // Fallback attempt to see if it exists as previewable
    payload = await getQuizForPreview(quizId).catch(() => null);
  }

  if (!payload || !payload.quiz) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-emerald-500/20 selection:text-emerald-300">
      <Navbar />
      <main className="flex-1 py-10 md:py-16">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuizRenderer payload={payload} quizId={quizId} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
