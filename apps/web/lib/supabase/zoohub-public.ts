import { createClient } from "@supabase/supabase-js";
import type { SpeciesData, NeighborSpecies } from "@/types/species";

// ─── Public (anon) client ─────────────────────────────────────
// No auth required — ZooHub is publicly accessible
function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// ─── Types ────────────────────────────────────────────────────

export interface PhylumClass {
  slug: string;
  class_name: string;
  className: string; // alias for UI compat
  sort_order: number;
  species: SpeciesRow[];
}

export interface SpeciesRow {
  id: number;
  slug: string;
  name: string;
  scientific_name: string | null;
  scientificName: string | null; // alias for UI compat
  image: string | null;
  phylum_slug: string;
  class_slug: string | null;
  sort_order: number;
}

export interface PhylumDetail {
  slug: string;
  name: string;
  subtitle: string | null;
  classes: PhylumClass[];
}

// ─── Queries ──────────────────────────────────────────────────

/**
 * Get a sample of random species for the ZooHub home marquee.
 */
export async function getRandomSpeciesForMarquee(limit = 20): Promise<SpeciesRow[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("species")
    .select("id, slug, name, scientific_name, image, phylum_slug, class_slug, sort_order")
    .limit(limit * 3); // over-fetch then shuffle

  if (error || !data) return [];

  // Shuffle and take `limit`
  const shuffled = [...data].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, limit).map(normalize);
}

/**
 * Get all phyla ordered by sort_order.
 */
export async function getAllPhyla() {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("phyla")
    .select("slug, name, subtitle, sort_order")
    .order("sort_order", { ascending: true });

  if (error || !data) return [];
  return data;
}

/**
 * Get a single phylum with its classes and species.
 * Returns the same shape the dev1 pages expected from `allAnimalData.json`.
 */
export async function getPhylumWithSpecies(phylumSlug: string): Promise<PhylumDetail | null> {
  const supabase = createPublicClient();

  // Fetch phylum
  const { data: phylum, error: pErr } = await supabase
    .from("phyla")
    .select("slug, name, subtitle")
    .eq("slug", phylumSlug.toLowerCase())
    .single();

  if (pErr || !phylum) return null;

  // Fetch classes for this phylum
  const { data: classes, error: cErr } = await supabase
    .from("classes")
    .select("slug, class_name, sort_order")
    .eq("phylum_slug", phylumSlug.toLowerCase())
    .order("sort_order", { ascending: true });

  if (cErr) return null;

  // Fetch all species for this phylum
  const { data: speciesRows, error: sErr } = await supabase
    .from("species")
    .select("id, slug, name, scientific_name, image, phylum_slug, class_slug, sort_order")
    .eq("phylum_slug", phylumSlug.toLowerCase())
    .order("sort_order", { ascending: true });

  if (sErr) return null;

  // Group species under their class
  const speciesByClass: Record<string, SpeciesRow[]> = {};
  for (const sp of speciesRows ?? []) {
    const key = sp.class_slug ?? "__unclassified__";
    if (!speciesByClass[key]) speciesByClass[key] = [];
    speciesByClass[key].push(normalize(sp));
  }

  // If no classes exist yet, return a single synthetic class with all species
  if (!classes || classes.length === 0) {
    return {
      slug: phylum.slug,
      name: phylum.name,
      subtitle: phylum.subtitle,
      classes: [
        {
          slug: "__all__",
          class_name: phylum.name,
          className: phylum.name,
          sort_order: 0,
          species: (speciesRows ?? []).map(normalize),
        },
      ],
    };
  }

  const result: PhylumDetail = {
    slug: phylum.slug,
    name: phylum.name,
    subtitle: phylum.subtitle,
    classes: classes.map((cls) => ({
      ...cls,
      className: cls.class_name, // alias used by dev1 UI
      species: speciesByClass[cls.slug] ?? [],
    })),
  };

  return result;
}

/**
 * Get full species detail for the species page.
 */
export async function getSpeciesDetail(speciesSlug: string): Promise<SpeciesData | null> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("species")
    .select("*")
    .eq("slug", speciesSlug.toLowerCase())
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    slug: data.slug,
    name: data.name,
    scientificName: data.scientific_name ?? "",
    description: data.description ?? "",
    image: data.image ?? "",
    "3d": data.model_3d ?? "",
    introduction: data.introduction ?? [],
    features: data.features ?? {},
    classification: data.classification ?? {},
    sizeStructure: data.size_structure ?? [],
    ecology: data.ecology ?? [],
    economy: data.economy ?? [],
    phylum_source: data.phylum_slug,
  };
}

/**
 * Get prev/next species within the same phylum for bottom navigation.
 */
export async function getSpeciesNeighbors(
  phylumSlug: string,
  speciesSlug: string
): Promise<{ prev: NeighborSpecies | null; next: NeighborSpecies | null }> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("species")
    .select("slug, name, phylum_slug")
    .eq("phylum_slug", phylumSlug.toLowerCase())
    .order("sort_order", { ascending: true });

  if (error || !data) return { prev: null, next: null };

  const idx = data.findIndex((s) => s.slug.toLowerCase() === speciesSlug.toLowerCase());
  const prevItem = idx > 0 ? data[idx - 1] : null;
  const nextItem = idx >= 0 && idx < data.length - 1 ? data[idx + 1] : null;

  return {
    prev: prevItem ? { name: prevItem.name, slug: prevItem.slug, phylum: phylumSlug } : null,
    next: nextItem ? { name: nextItem.name, slug: nextItem.slug, phylum: phylumSlug } : null,
  };
}

// ─── Utility ─────────────────────────────────────────────────

function normalize(sp: any): SpeciesRow {
  return {
    ...sp,
    scientificName: sp.scientific_name ?? null, // alias for UI
  };
}
