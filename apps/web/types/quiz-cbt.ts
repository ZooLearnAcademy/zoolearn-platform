/**
 * CBT (Computer Based Test) Quiz Types
 *
 * These types are used exclusively by the NEET 2020 CBT exam simulation system.
 * They are separate from the Supabase-backed quiz types in `types/quiz.ts`.
 */

export type CbtQuestionStatus =
  | "not_visited"
  | "not_answered"
  | "answered"
  | "marked_for_review"
  | "answered_marked_for_review";

export interface CbtQuizQuestion {
  id: number;
  qNumber: number;
  unit: string;
  chapter: string;
  specification: string;
  difficulty: "Easy" | "Moderate" | "Hard" | string;
  question: string;
  table: string[][] | null;
  choices: string[];
  correctAnswerIndex: number;
  answerText: string;
  topic: string;
  explanation: string;
}

export interface CbtUserResponse {
  questionId: number;
  selectedOptionIndex: number | null;
  status: CbtQuestionStatus;
  timeSpentSeconds?: number;
}

export interface CbtQuizExamData {
  title: string;
  subtitle: string;
  examCode: string;
  year: number;
  totalQuestions: number;
  durationMinutes: number;
  markingScheme: {
    correct: number;
    incorrect: number;
    unattempted: number;
  };
  maxMarks: number;
  questions: CbtQuizQuestion[];
}

export interface CbtUnitStat {
  unit: string;
  total: number;
  correct: number;
  incorrect: number;
  unattempted: number;
  score: number;
}

export interface CbtQuizResultSummary {
  score: number;
  maxScore: number;
  percentage: number;
  accuracy: number;
  totalQuestions: number;
  totalAttempted: number;
  totalCorrect: number;
  totalIncorrect: number;
  totalUnattempted: number;
  timeTakenSeconds: number;
  unitStats: CbtUnitStat[];
}
