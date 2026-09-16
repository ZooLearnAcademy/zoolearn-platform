import React from "react";
import type { Metadata } from "next";
import { getPublishedQuizzes } from "@/lib/supabase/quiz-public";
import { QuizPortalView } from "@/components/quiz/quiz-portal-view";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Interactive Quiz Hub & CBT Examination Center | ZooLearn",
  description:
    "Explore dynamic quizzes, chapter masterclasses, and official NEET CBT mock simulations created and published by ZooLearn educators.",
};

export default async function QuizPage() {
  let adminQuizzes: Awaited<ReturnType<typeof getPublishedQuizzes>> = [];
  try {
    adminQuizzes = await getPublishedQuizzes();
  } catch (err) {
    console.error("Error loading admin quizzes for portal:", err);
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-emerald-500/20 selection:text-emerald-300">
      <Navbar />
      <main className="flex-1">
        <QuizPortalView adminQuizzes={adminQuizzes} />
      </main>
      <Footer />
    </div>
  );
}
