-- ============================================================
-- ZooLearn Platform — Complete Database Schema
-- ============================================================
-- HOW TO USE:
--   1. Open your Supabase project → SQL Editor
--   2. Paste and run this entire file
--   3. Then run rls_policies.sql
-- ============================================================


-- ─── 1. Profiles ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.profiles (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  avatar_url TEXT,
  date_of_birth DATE,
  gender VARCHAR(20),
  current_class VARCHAR(100),
  institution VARCHAR(150),
  location VARCHAR(150),
  role VARCHAR(20) DEFAULT 'user',
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ
);

-- Auto-update updated_at on profile changes
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();


-- ─── 2. ZooHub Content: Phyla ────────────────────────────────
-- Used by both ZooHub (browsable catalog) and Taxonomy Tree (visual tree).

CREATE TABLE IF NOT EXISTS public.phyla (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  subtitle TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);


-- ─── 3. ZooHub Content: Classes ──────────────────────────────

CREATE TABLE IF NOT EXISTS public.classes (
  slug TEXT PRIMARY KEY,
  class_name TEXT NOT NULL,
  phylum_slug TEXT NOT NULL REFERENCES public.phyla(slug) ON DELETE CASCADE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_classes_phylum ON public.classes(phylum_slug);


-- ─── 4. ZooHub Content: Species ──────────────────────────────

CREATE TABLE IF NOT EXISTS public.species (
  id SERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  scientific_name TEXT,
  description TEXT,
  image TEXT,
  model_3d TEXT,
  introduction JSONB DEFAULT '[]'::jsonb,
  features JSONB DEFAULT '{}'::jsonb,
  classification JSONB DEFAULT '{}'::jsonb,
  size_structure JSONB DEFAULT '[]'::jsonb,
  ecology JSONB DEFAULT '[]'::jsonb,
  economy JSONB DEFAULT '[]'::jsonb,
  phylum_slug TEXT NOT NULL REFERENCES public.phyla(slug) ON DELETE CASCADE,
  class_slug TEXT REFERENCES public.classes(slug) ON DELETE SET NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_species_phylum ON public.species(phylum_slug);
CREATE INDEX IF NOT EXISTS idx_species_class ON public.species(class_slug);


-- ─── 5. Scope Categories ────────────────────────────────────
-- Career scope categories (e.g. "Wildlife & Ecology", "Marine Sciences")

CREATE TABLE IF NOT EXISTS public.scope_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT,
  description TEXT,
  icon_name TEXT,
  salary_range TEXT,
  gradient TEXT,
  color TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);


-- ─── 6. Scope Careers ───────────────────────────────────────
-- Individual career items within scope categories

CREATE TABLE IF NOT EXISTS public.scope_careers (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category_id TEXT REFERENCES public.scope_categories(id) ON DELETE SET NULL,
  badge TEXT,
  secondary_badge TEXT,
  salary TEXT,
  salary_min INTEGER,
  salary_max INTEGER,
  bsc TEXT[] DEFAULT '{}',
  msc TEXT[] DEFAULT '{}',
  phd TEXT[] DEFAULT '{}',
  is_top_choice BOOLEAN DEFAULT false,
  top_sectors TEXT[] DEFAULT '{}',
  key_skills TEXT[] DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_scope_careers_category ON public.scope_careers(category_id);
