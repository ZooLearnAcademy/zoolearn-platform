-- ============================================================
-- ZooLearn Platform — FULL RESET & REBUILD
-- ============================================================
-- STEP 1: Paste this entire script into Supabase SQL Editor
-- STEP 2: Click "Run"
-- STEP 3: Come back and the seed scripts will auto-run
-- ============================================================


-- ─── STEP 1: Drop all existing tables ────────────────────────
-- Order matters: children before parents (FK constraints)

DROP TABLE IF EXISTS public.species          CASCADE;
DROP TABLE IF EXISTS public.classes          CASCADE;
DROP TABLE IF EXISTS public.phyla            CASCADE;
DROP TABLE IF EXISTS public.scope_careers    CASCADE;
DROP TABLE IF EXISTS public.scope_categories CASCADE;
DROP TABLE IF EXISTS public.scopes           CASCADE;
DROP TABLE IF EXISTS public.taxonomy_nodes   CASCADE;
DROP TABLE IF EXISTS public.page_content     CASCADE;
DROP TABLE IF EXISTS public.analytics_page_views CASCADE;
DROP TABLE IF EXISTS public.profiles         CASCADE;

-- Drop old functions/triggers
DROP FUNCTION IF EXISTS public.handle_new_user()   CASCADE;
DROP FUNCTION IF EXISTS public.handle_updated_at() CASCADE;


-- ─── STEP 2: Profiles ────────────────────────────────────────

CREATE TABLE public.profiles (
  user_id      UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name    TEXT,
  email        TEXT,
  avatar_url   TEXT,
  date_of_birth DATE,
  gender       TEXT,
  current_class TEXT,
  institution  TEXT,
  location     TEXT,
  role         TEXT        NOT NULL DEFAULT 'user',
  is_admin     BOOLEAN     NOT NULL DEFAULT false,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ
);

-- Auto-fill updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture')
  )
  ON CONFLICT (user_id) DO UPDATE SET
    avatar_url = COALESCE(EXCLUDED.avatar_url, profiles.avatar_url),
    full_name  = COALESCE(EXCLUDED.full_name,  profiles.full_name);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ─── STEP 3: ZooHub — Phyla ──────────────────────────────────
-- The browsable catalog for /zoohub

CREATE TABLE public.phyla (
  slug       TEXT        PRIMARY KEY,
  name       TEXT        NOT NULL,
  subtitle   TEXT,
  sort_order INTEGER     NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ─── STEP 4: ZooHub — Classes ────────────────────────────────

CREATE TABLE public.classes (
  slug        TEXT        PRIMARY KEY,
  class_name  TEXT        NOT NULL,
  phylum_slug TEXT        NOT NULL REFERENCES public.phyla(slug) ON DELETE CASCADE,
  sort_order  INTEGER     NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_classes_phylum ON public.classes(phylum_slug);


-- ─── STEP 5: ZooHub — Species ────────────────────────────────

CREATE TABLE public.species (
  id              SERIAL      PRIMARY KEY,
  slug            TEXT        NOT NULL UNIQUE,
  name            TEXT        NOT NULL,
  scientific_name TEXT,
  description     TEXT,
  image           TEXT,
  model_3d        TEXT,
  introduction    JSONB       NOT NULL DEFAULT '[]',
  features        JSONB       NOT NULL DEFAULT '{}',
  classification  JSONB       NOT NULL DEFAULT '{}',
  size_structure  JSONB       NOT NULL DEFAULT '[]',
  ecology         JSONB       NOT NULL DEFAULT '[]',
  economy         JSONB       NOT NULL DEFAULT '[]',
  phylum_slug     TEXT        NOT NULL REFERENCES public.phyla(slug) ON DELETE CASCADE,
  class_slug      TEXT        REFERENCES public.classes(slug) ON DELETE SET NULL,
  sort_order      INTEGER     NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_species_phylum ON public.species(phylum_slug);
CREATE INDEX idx_species_class  ON public.species(class_slug);


-- ─── STEP 6: Taxonomy Tree ───────────────────────────────────
-- Dedicated 8-rank tree: Kingdom→Phylum→Class→Sub-Class→Order→Family→Genus→Species
-- SEPARATE from ZooHub tables

CREATE TABLE public.taxonomy_nodes (
  id          TEXT        PRIMARY KEY,
  label       TEXT        NOT NULL,
  rank        TEXT        NOT NULL,
  common_name TEXT,
  parent_id   TEXT        REFERENCES public.taxonomy_nodes(id) ON DELETE CASCADE,
  sort_order  INTEGER     NOT NULL DEFAULT 0,
  is_active   BOOLEAN     NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_taxonomy_nodes_parent ON public.taxonomy_nodes(parent_id);
CREATE INDEX idx_taxonomy_nodes_rank   ON public.taxonomy_nodes(rank);


-- ─── STEP 7: Scope Categories ────────────────────────────────

CREATE TABLE public.scope_categories (
  id          TEXT        PRIMARY KEY,
  name        TEXT        NOT NULL,
  short_name  TEXT,
  description TEXT,
  icon_name   TEXT,
  salary_range TEXT,
  gradient    TEXT,
  color       TEXT,
  sort_order  INTEGER     NOT NULL DEFAULT 0,
  is_active   BOOLEAN     NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ─── STEP 8: Scope Careers ───────────────────────────────────

CREATE TABLE public.scope_careers (
  id             TEXT        PRIMARY KEY,
  title          TEXT        NOT NULL,
  description    TEXT,
  category_id    TEXT        REFERENCES public.scope_categories(id) ON DELETE SET NULL,
  badge          TEXT,
  secondary_badge TEXT,
  salary         TEXT,
  salary_min     INTEGER,
  salary_max     INTEGER,
  bsc            TEXT[]      NOT NULL DEFAULT '{}',
  msc            TEXT[]      NOT NULL DEFAULT '{}',
  phd            TEXT[]      NOT NULL DEFAULT '{}',
  is_top_choice  BOOLEAN     NOT NULL DEFAULT false,
  top_sectors    TEXT[]      NOT NULL DEFAULT '{}',
  key_skills     TEXT[]      NOT NULL DEFAULT '{}',
  sort_order     INTEGER     NOT NULL DEFAULT 0,
  is_active      BOOLEAN     NOT NULL DEFAULT true,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_scope_careers_category ON public.scope_careers(category_id);


-- ─── STEP 9: Row Level Security ──────────────────────────────

ALTER TABLE public.profiles         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.phyla            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.species          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.taxonomy_nodes   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scope_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scope_careers    ENABLE ROW LEVEL SECURITY;

-- Profiles: users see only their own
CREATE POLICY "users_select_own" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "users_insert_own" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "users_update_own" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- All public content: anyone can read
CREATE POLICY "public_read_phyla"            ON public.phyla            FOR SELECT USING (true);
CREATE POLICY "public_read_classes"          ON public.classes          FOR SELECT USING (true);
CREATE POLICY "public_read_species"          ON public.species          FOR SELECT USING (true);
CREATE POLICY "public_read_taxonomy_nodes"   ON public.taxonomy_nodes   FOR SELECT USING (true);
CREATE POLICY "public_read_scope_categories" ON public.scope_categories FOR SELECT USING (true);
CREATE POLICY "public_read_scope_careers"    ON public.scope_careers    FOR SELECT USING (true);


-- ─── STEP 10: Notify PostgREST to reload schema ──────────────
NOTIFY pgrst, 'reload schema';

-- ============================================================
-- Done! Now run the seed scripts:
--   node scripts/seed-zoohub.cjs
--   node scripts/seed-scopes.cjs
--   node scripts/seed-taxonomy.cjs
-- ============================================================
