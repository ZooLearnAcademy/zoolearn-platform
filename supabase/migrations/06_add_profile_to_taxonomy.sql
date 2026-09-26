-- Add profile JSONB column to taxonomy_nodes table
ALTER TABLE public.taxonomy_nodes 
ADD COLUMN profile JSONB DEFAULT '{}'::jsonb;
