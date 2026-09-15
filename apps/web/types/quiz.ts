// ============================================================
// Quiz Engine — TypeScript Types
// ============================================================
// Public types (safe for client): NO is_correct field.
// Admin types: include is_correct for server-side operations only.
// Never import AdminQuizOption/AdminQuizQuestion in client components.
// ============================================================

// ─── Enums ───────────────────────────────────────────────────

export type QuizStatus = "draft" | "published" | "archived";

export type QuestionType =
  | "single_choice"
  | "multiple_choice"
  | "true_false";

// ─── Public Client Types (safe — no correct answers) ─────────

export interface Quiz {
  id: string;
  title: string;
  description: string | null;
  slug: string;
  instructions: string | null;
  passing_percentage: number;
  time_limit_seconds: number | null;
  status: QuizStatus;
  created_at: string;
  updated_at: string;
}

/** A single answer option — is_correct intentionally omitted */
export interface QuizOption {
  id: string;
  question_id: string;
  option_text: string;
  sort_order: number;
}

/** A question with its safe options (no correct answers) */
export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question_text: string;
  question_type: QuestionType;
  points: number;
  sort_order: number;
  is_required: boolean;
  explanation: string | null;
  options: QuizOption[];
}

/** Full quiz payload sent to the Quiz UI */
export interface PublicQuizPayload {
  quiz: Quiz;
  questions: QuizQuestion[];
}

// ─── Admin-Only Types (server-side only) ─────────────────────

/** Admin view of an option — includes is_correct */
export interface AdminQuizOption {
  id: string;
  question_id: string;
  option_text: string;
  sort_order: number;
  is_correct: boolean;
  created_at: string;
  updated_at: string;
}

/** Admin view of a question — includes is_active and admin options */
export interface AdminQuizQuestion {
  id: string;
  quiz_id: string;
  question_text: string;
  question_type: QuestionType;
  points: number;
  sort_order: number;
  is_required: boolean;
  is_active: boolean;
  explanation: string | null;
  keywords: string[];
  options: AdminQuizOption[];
  created_at: string;
  updated_at: string;
}

/** Full admin quiz detail */
export interface AdminQuizDetail extends Quiz {
  questions: AdminQuizQuestion[];
  _count?: { questions: number };
}

/** Quiz row in admin list (no questions) */
export interface AdminQuizListItem extends Quiz {
  question_count: number;
}

// ─── Submission Types ─────────────────────────────────────────

/** One question's answer submitted by the user */
export interface QuizAnswer {
  questionId: string;
  selectedOptionIds: string[];
}

/** Full quiz submission payload */
export interface QuizSubmission {
  quizId: string;
  answers: QuizAnswer[];
}

/** Server response after scoring — only safe data */
export interface QuizResult {
  score: number;
  total: number;
  percentage: number;
  passed: boolean;
}

// ─── Form / CRUD Input Types ──────────────────────────────────

export interface CreateQuizInput {
  title: string;
  description?: string;
  slug: string;
  instructions?: string;
  passing_percentage: number;
  time_limit_seconds?: number | null;
  status?: QuizStatus;
}

export interface UpdateQuizInput extends Partial<CreateQuizInput> {}

export interface CreateQuestionInput {
  quiz_id: string;
  question_text: string;
  question_type: QuestionType;
  points?: number;
  sort_order?: number;
  is_required?: boolean;
  is_active?: boolean;
  explanation?: string;
  keywords?: string[];
}

export interface UpdateQuestionInput extends Partial<Omit<CreateQuestionInput, "quiz_id">> {}

export interface CreateOptionInput {
  question_id: string;
  option_text: string;
  sort_order?: number;
  is_correct?: boolean;
}

export interface UpdateOptionInput extends Partial<Omit<CreateOptionInput, "question_id">> {}
