-- ============================================================
-- ZooLearn Platform — Row Level Security (RLS) Policies
-- ============================================================
-- HOW TO USE:
--   1. Run schema.sql FIRST
--   2. Then paste and run this file in Supabase SQL Editor
--
-- NOTE: This script is IDEMPOTENT — safe to run multiple times.
-- ============================================================


-- ─── Enable RLS on all tables ────────────────────────────────

ALTER TABLE public.profiles         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.phyla            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.species          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scope_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scope_careers    ENABLE ROW LEVEL SECURITY;


-- ─── Profiles: Users can only access their own ───────────────

DROP POLICY IF EXISTS "users_select_own_profile" ON public.profiles;
CREATE POLICY "users_select_own_profile"
ON public.profiles FOR SELECT TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "users_insert_own_profile" ON public.profiles;
CREATE POLICY "users_insert_own_profile"
ON public.profiles FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "users_update_own_profile" ON public.profiles;
CREATE POLICY "users_update_own_profile"
ON public.profiles FOR UPDATE TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);


-- ─── ZooHub Content: Public read access ──────────────────────

DROP POLICY IF EXISTS "Public read phyla" ON public.phyla;
CREATE POLICY "Public read phyla"
ON public.phyla FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Public read classes" ON public.classes;
CREATE POLICY "Public read classes"
ON public.classes FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Public read species" ON public.species;
CREATE POLICY "Public read species"
ON public.species FOR SELECT
USING (true);


-- ─── Scope Content: Public read access ───────────────────────

DROP POLICY IF EXISTS "Public read scope_categories" ON public.scope_categories;
CREATE POLICY "Public read scope_categories"
ON public.scope_categories FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Public read scope_careers" ON public.scope_careers;
CREATE POLICY "Public read scope_careers"
ON public.scope_careers FOR SELECT
USING (true);


-- ─── Auto-create profile on signup ───────────────────────────

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email, avatar_url, created_at)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name'),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'avatar_url', NEW.raw_user_meta_data ->> 'picture'),
    NOW()
  )
  ON CONFLICT (user_id) DO UPDATE SET
    avatar_url = COALESCE(EXCLUDED.avatar_url, public.profiles.avatar_url),
    full_name  = COALESCE(EXCLUDED.full_name, public.profiles.full_name);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
