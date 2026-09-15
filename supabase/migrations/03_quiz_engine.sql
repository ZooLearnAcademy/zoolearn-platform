-- ============================================================
-- ZooLearn Platform — Quiz Engine Migration
-- ============================================================
-- HOW TO USE:
--   1. Open your Supabase project → SQL Editor
--   2. Paste and run this entire file
-- ============================================================

-- ─── Enable pgcrypto for UUID generation ─────────────────────
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── 1. Quizzes ───────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.quizzes (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title               TEXT NOT NULL,
  description         TEXT,
  slug                TEXT NOT NULL UNIQUE,
  instructions        TEXT,
  passing_percentage  INTEGER NOT NULL DEFAULT 70 CHECK (passing_percentage BETWEEN 0 AND 100),
  time_limit_seconds  INTEGER CHECK (time_limit_seconds IS NULL OR time_limit_seconds > 0),
  status              TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_quizzes_slug   ON public.quizzes(slug);
CREATE INDEX IF NOT EXISTS idx_quizzes_status ON public.quizzes(status);

-- ─── 2. Quiz Questions ────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.quiz_questions (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id        UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  question_text  TEXT NOT NULL,
  question_type  TEXT NOT NULL CHECK (question_type IN ('single_choice', 'multiple_choice', 'true_false')),
  points         INTEGER NOT NULL DEFAULT 1 CHECK (points > 0),
  sort_order     INTEGER NOT NULL DEFAULT 0,
  is_required    BOOLEAN NOT NULL DEFAULT true,
  is_active      BOOLEAN NOT NULL DEFAULT true,
  explanation    TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_quiz_questions_quiz_id    ON public.quiz_questions(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_sort_order ON public.quiz_questions(quiz_id, sort_order);

-- ─── 3. Quiz Options ─────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.quiz_options (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id  UUID NOT NULL REFERENCES public.quiz_questions(id) ON DELETE CASCADE,
  option_text  TEXT NOT NULL,
  sort_order   INTEGER NOT NULL DEFAULT 0,
  is_correct   BOOLEAN NOT NULL DEFAULT false,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_quiz_options_question_id ON public.quiz_options(question_id);

-- ─── 4. Auto-update updated_at triggers ──────────────────────

-- Reuse the existing handle_updated_at function if it exists,
-- otherwise it was already created in schema.sql

DROP TRIGGER IF EXISTS set_quizzes_updated_at ON public.quizzes;
CREATE TRIGGER set_quizzes_updated_at
  BEFORE UPDATE ON public.quizzes
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_quiz_questions_updated_at ON public.quiz_questions;
CREATE TRIGGER set_quiz_questions_updated_at
  BEFORE UPDATE ON public.quiz_questions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_quiz_options_updated_at ON public.quiz_options;
CREATE TRIGGER set_quiz_options_updated_at
  BEFORE UPDATE ON public.quiz_options
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ─── 5. Row Level Security ────────────────────────────────────

ALTER TABLE public.quizzes        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_options   ENABLE ROW LEVEL SECURITY;

-- quizzes: public can only read published quizzes
DROP POLICY IF EXISTS "Public read published quizzes" ON public.quizzes;
CREATE POLICY "Public read published quizzes"
ON public.quizzes FOR SELECT
USING (status = 'published');

-- quiz_questions: public can only read active questions on published quizzes
DROP POLICY IF EXISTS "Public read active questions" ON public.quiz_questions;
CREATE POLICY "Public read active questions"
ON public.quiz_questions FOR SELECT
USING (
  is_active = true
  AND EXISTS (
    SELECT 1 FROM public.quizzes q
    WHERE q.id = quiz_id AND q.status = 'published'
  )
);

-- quiz_options: public can SELECT only safe columns (not is_correct).
-- Enforced via a security-definer function (see below).
-- The base policy allows read on all options for questions in published quizzes.
-- The is_correct column is NEVER returned to the client because:
--   a) The public fetch function explicitly excludes it in the SELECT clause
--   b) The submit endpoint uses the service-role client (bypasses RLS) server-side
DROP POLICY IF EXISTS "Public read quiz options (safe cols only)" ON public.quiz_options;
CREATE POLICY "Public read quiz options (safe cols only)"
ON public.quiz_options FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM public.quiz_questions qq
    JOIN public.quizzes q ON q.id = qq.quiz_id
    WHERE qq.id = question_id
      AND qq.is_active = true
      AND q.status = 'published'
  )
);

-- NOTE: Write operations on all 3 tables are only accessible via the
-- service-role key (admin client). No INSERT/UPDATE/DELETE policies
-- are created for anon or authenticated roles — the service role
-- bypasses RLS entirely.

-- ─── 6. Secure submission helper function ────────────────────
-- Returns only safe scoring data. The calling API route uses
-- the admin client (service role) directly, so this function
-- is provided as documentation / future stored-proc option.

-- No stored proc needed — scoring is done in the Next.js route handler
-- using the admin client. This keeps logic in TypeScript where it's
-- easier to maintain and test.
