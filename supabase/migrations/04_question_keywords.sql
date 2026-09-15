-- ============================================================
-- ZooLearn Platform — Question Keywords Migration
-- ============================================================
-- HOW TO USE:
--   1. Open your Supabase project → SQL Editor
--   2. Paste and run this entire file
-- ============================================================

-- Add keywords array column to quiz_questions
ALTER TABLE public.quiz_questions
  ADD COLUMN IF NOT EXISTS keywords TEXT[] NOT NULL DEFAULT '{}';

-- Index for keyword search (GIN index on array)
CREATE INDEX IF NOT EXISTS idx_quiz_questions_keywords
  ON public.quiz_questions USING GIN (keywords);
