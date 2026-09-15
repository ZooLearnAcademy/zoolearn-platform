/**
 * lib/data/species.ts
 * Previously read AllPhylumData.json / allAnimalData.json from disk.
 * Now delegates to the Supabase-backed zoohub-public layer.
 */
import { getSpeciesDetail, getSpeciesNeighbors } from "@/lib/supabase/zoohub-public";
import type { SpeciesData, NeighborSpecies } from "@/types/species";

export async function fetchSpeciesData(speciesSlug: string): Promise<SpeciesData | null> {
  return getSpeciesDetail(speciesSlug);
}

export async function fetchNeighbors(
  phylumSlug: string,
  speciesSlug: string
): Promise<{ prev: NeighborSpecies | null; next: NeighborSpecies | null }> {
  return getSpeciesNeighbors(phylumSlug, speciesSlug);
}
