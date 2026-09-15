-- ============================================================
-- CLEANUP: Drop obsolete legacy tables
-- ============================================================
-- The old `scopes` table stored career data as JSON blobs.
-- It has been replaced by `scope_categories` + `scope_careers`
-- (normalized, relational tables).
--
-- The `kingdom_animalia` table was planned but never created
-- and is not used by any application code.
--
-- Run this ONLY after verifying no active code depends on these.
-- ============================================================

DROP TABLE IF EXISTS public.scopes;
DROP TABLE IF EXISTS public.kingdom_animalia;
