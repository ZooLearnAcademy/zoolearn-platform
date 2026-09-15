-- ============================================================
-- ZooLearn Platform — Taxonomy Tree Dedicated Table
-- ============================================================
-- The taxonomy_nodes table stores the FULL hierarchical
-- classification tree for Kingdom Animalia (8 ranks):
--   Kingdom → Phylum → Class → Sub-Class →
--   Order → Family → Genus → Species
--
-- This is SEPARATE from the ZooHub tables (phyla/classes/species)
-- which only store 3-level data for the browsable catalog.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.taxonomy_nodes (
  id TEXT PRIMARY KEY,                         -- e.g. "animalia_porifera_calcarea"
  label TEXT NOT NULL,                         -- Display name: "Calcarea"
  rank TEXT NOT NULL,                          -- "Kingdom","Phylum","Class","Sub-Class","Order","Family","Genus","Species"
  common_name TEXT,                            -- Optional common name
  parent_id TEXT REFERENCES public.taxonomy_nodes(id) ON DELETE CASCADE,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_taxonomy_nodes_parent   ON public.taxonomy_nodes(parent_id);
CREATE INDEX IF NOT EXISTS idx_taxonomy_nodes_rank     ON public.taxonomy_nodes(rank);
CREATE INDEX IF NOT EXISTS idx_taxonomy_nodes_active   ON public.taxonomy_nodes(is_active);

ALTER TABLE public.taxonomy_nodes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read taxonomy_nodes" ON public.taxonomy_nodes;
CREATE POLICY "Public read taxonomy_nodes"
ON public.taxonomy_nodes FOR SELECT
USING (true);
