-- Add description column to taxonomy_nodes table
ALTER TABLE public.taxonomy_nodes 
ADD COLUMN description TEXT;
