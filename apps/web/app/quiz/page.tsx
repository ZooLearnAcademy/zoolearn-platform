import React from "react";
import { Metadata } from "next";
import { CBTQuizView } from "@/components/quiz/cbt-quiz-view";
import neet2020Data from "@/data/neet-2020-quiz.json";
import type { QuizExamData } from "@/types/quiz";

export const metadata: Metadata = {
  title: "NEET 2020 Biology Official CBT Examination | ZooLearn",
  description: "Experience the real-time Computer Based Test (CBT) and NPTEL-style examination platform with authentic NEET 2020 Biology questions, live timer, 90-question palette, and detailed NCERT explanations."
};

export default function QuizPage() {
  return <CBTQuizView examData={neet2020Data as unknown as QuizExamData} />;
}
