export type QuestionStatus =
  | "not_visited"
  | "not_answered"
  | "answered"
  | "marked_for_review"
  | "answered_marked_for_review";

export interface QuizQuestion {
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

export interface UserResponse {
  questionId: number;
  selectedOptionIndex: number | null;
  status: QuestionStatus;
  timeSpentSeconds?: number;
}

export interface QuizExamData {
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
  questions: QuizQuestion[];
}

export interface UnitStat {
  unit: string;
  total: number;
  correct: number;
  incorrect: number;
  unattempted: number;
  score: number;
}

export interface QuizResultSummary {
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
  unitStats: UnitStat[];
}
