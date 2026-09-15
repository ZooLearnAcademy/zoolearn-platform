import React from "react";
import type { Metadata } from "next";
import { CBTQuizView } from "@/components/quiz/cbt/cbt-quiz-view";
import neet2020Data from "@/data/neet-2020-quiz.json";
import type { CbtQuizExamData } from "@/types/quiz-cbt";

export const metadata: Metadata = {
  title: "NEET 2020 Biology Official CBT Examination | ZooLearn",
  description:
    "Experience the real-time Computer Based Test (CBT) and NPTEL-style examination platform with authentic NEET 2020 Biology questions, live timer, 90-question palette, and detailed NCERT explanations.",
};

export default function Neet2020QuizPage() {
  return <CBTQuizView examData={neet2020Data as unknown as CbtQuizExamData} />;
}
