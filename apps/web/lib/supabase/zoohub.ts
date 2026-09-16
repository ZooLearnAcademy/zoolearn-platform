/**
 * ZooHub Data Access Layer
 *
 * Server-side functions to fetch phyla, classes, and species
 * from Supabase. Used by all ZooHub pages (Server Components).
 */

import { createSupabaseServerClient } from "./server-client"

// ─── Types ───────────────────────────────────────────────────

export interface PhylumRow {
  slug: string
  name: string
  subtitle: string | null
  sort_order: number
}

export interface ClassRow {
  slug: string
  class_name: string
  phylum_slug: string
  sort_order: number
}

export interface SpeciesRow {
  id: number
  slug: string
  name: string
  scientific_name: string | null
  description: string | null
  image: string | null
  model_3d: string | null
  introduction: string[]
  features: Record<string, string>
  classification: Record<string, string>
  size_structure: string[]
  ecology: string[]
  economy: string[]
  phylum_slug: string
  class_slug: string | null
  sort_order: number
}

export interface SpeciesPreview {
  id: number
  slug: string
  name: string
  image: string | null
  scientific_name: string | null
  phylum_slug: string
}

export interface NeighborSpecies {
  name: string
  slug: string
  phylum: string
}

export interface ClassWithSpecies {
  slug: string
  class_name: string
  species: SpeciesPreview[]
}

// ─── Data Fetching Functions ─────────────────────────────────

/**
 * Get all phyla ordered by sort_order
 */
export async function getAllPhyla(): Promise<PhylumRow[]> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from("phyla")
    .select("slug, name, subtitle, sort_order")
    .order("sort_order", { ascending: true })

  if (error || !data) {
    console.error("[zoohub] Failed to fetch all phyla:", error?.message)
    return []
  }

  return data as PhylumRow[]
}

/**
 * Get a phylum with its full metadata and nested classes with species
 */
export async function getPhylumWithSpecies(phylumSlug: string): Promise<
  (PhylumRow & { classes: ClassWithSpecies[] }) | null
> {
  const supabase = await createSupabaseServerClient()

  const { data: phylum, error } = await supabase
    .from("phyla")
    .select("slug, name, subtitle, sort_order")
    .eq("slug", phylumSlug.toLowerCase())
    .single()

  if (error || !phylum) {
    return null
  }

  const classes = await getPhylumWithClasses(phylumSlug)

  return {
    ...(phylum as PhylumRow),
    classes: classes || [],
  }
}

/**
 * Get random species for the ZooHub landing page marquee
 */
export async function getAllSpeciesPreview(limit = 20): Promise<SpeciesPreview[]> {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from("species")
    .select("id, slug, name, image, scientific_name, phylum_slug")
    .order("sort_order", { ascending: true })

  if (error || !data) {
    console.error("[zoohub] Failed to fetch species preview:", error?.message)
    return []
  }

  // Shuffle and pick `limit` items
  const shuffled = (data as SpeciesPreview[]).sort(() => 0.5 - Math.random())
  return shuffled.slice(0, limit)
}

/**
 * Get a phylum's classes along with the species in each class.
 * Used by the /zoohub/[phylum] page.
 */
export async function getPhylumWithClasses(phylumSlug: string): Promise<ClassWithSpecies[] | null> {
  const supabase = await createSupabaseServerClient()

  // Verify phylum exists
  const { data: phylum } = await supabase
    .from("phyla")
    .select("slug")
    .eq("slug", phylumSlug.toLowerCase())
    .single()

  if (!phylum) return null

  // Get all classes for this phylum, ordered
  const { data: classes, error: classError } = await supabase
    .from("classes")
    .select("slug, class_name, sort_order")
    .eq("phylum_slug", phylumSlug.toLowerCase())
    .order("sort_order", { ascending: true })

  if (classError || !classes) {
    console.error("[zoohub] Failed to fetch classes:", classError?.message)
    return null
  }

  // Get all species for this phylum, ordered
  const { data: speciesList, error: speciesError } = await supabase
    .from("species")
    .select("id, slug, name, image, scientific_name, phylum_slug, class_slug, sort_order")
    .eq("phylum_slug", phylumSlug.toLowerCase())
    .order("sort_order", { ascending: true })

  if (speciesError || !speciesList) {
    console.error("[zoohub] Failed to fetch species:", speciesError?.message)
    return null
  }

  // Group species by class
  const speciesByClass: Record<string, SpeciesPreview[]> = {}
  for (const sp of speciesList as any[]) {
    const key = sp.class_slug || "unknown"
    if (!speciesByClass[key]) speciesByClass[key] = []
    speciesByClass[key].push({
      id: sp.id,
      slug: sp.slug,
      name: sp.name,
      image: sp.image,
      scientific_name: sp.scientific_name,
      phylum_slug: sp.phylum_slug,
    })
  }

  return (classes as any[]).map((cls) => ({
    slug: cls.slug,
    class_name: cls.class_name,
    species: speciesByClass[cls.slug] || [],
  }))
}

/**
 * Get full species detail by slug.
 * Used by the /zoohub/[phylum]/[species] page.
 */
export async function getSpeciesDetail(speciesSlug: string): Promise<SpeciesRow | null> {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from("species")
    .select("*")
    .eq("slug", speciesSlug.toLowerCase())
    .single()

  if (error || !data) {
    return null
  }

  return data as unknown as SpeciesRow
}

/**
 * Get previous / next species within the same phylum.
 * Used for navigation on the species detail page.
 */
export async function getSpeciesNeighbors(
  phylumSlug: string,
  speciesSlug: string
): Promise<{ prev: NeighborSpecies | null; next: NeighborSpecies | null }> {
  const supabase = await createSupabaseServerClient()

  const { data: allSpecies, error } = await supabase
    .from("species")
    .select("slug, name, phylum_slug, sort_order")
    .eq("phylum_slug", phylumSlug.toLowerCase())
    .order("sort_order", { ascending: true })

  if (error || !allSpecies) {
    return { prev: null, next: null }
  }

  const idx = allSpecies.findIndex(
    (s: any) => s.slug.toLowerCase() === speciesSlug.toLowerCase()
  )

  if (idx === -1) return { prev: null, next: null }

  const prev = idx > 0
    ? { name: (allSpecies[idx - 1] as any).name, slug: (allSpecies[idx - 1] as any).slug, phylum: phylumSlug }
    : null
  const next = idx < allSpecies.length - 1
    ? { name: (allSpecies[idx + 1] as any).name, slug: (allSpecies[idx + 1] as any).slug, phylum: phylumSlug }
    : null

  return { prev, next }
}

/**
 * Get all phyla with their classes for the sidebar.
 * Used by the zoohub layout.
 */
export async function getAllClassesForSidebar(): Promise<
  { slug: string; name: string; classes: { slug: string; class_name: string }[] }[]
> {
  const supabase = await createSupabaseServerClient()

  const { data: phyla } = await supabase
    .from("phyla")
    .select("slug, name, sort_order")
    .order("sort_order", { ascending: true })

  if (!phyla) return []

  const { data: classes } = await supabase
    .from("classes")
    .select("slug, class_name, phylum_slug, sort_order")
    .order("sort_order", { ascending: true })

  const classesByPhylum: Record<string, { slug: string; class_name: string }[]> = {}
  for (const cls of (classes || []) as any[]) {
    if (!classesByPhylum[cls.phylum_slug]) {
      classesByPhylum[cls.phylum_slug] = []
    }
    classesByPhylum[cls.phylum_slug]!.push({
      slug: cls.slug,
      class_name: cls.class_name,
    })
  }

  return (phyla as any[]).map((p) => ({
    slug: p.slug,
    name: p.name,
    classes: classesByPhylum[p.slug] || [],
  }))
}

/**
 * Get a flat search index for the ZoohubSearch component.
 */
export async function getSearchIndex(): Promise<
  { title: string; subtitle: string; url: string }[]
> {
  const supabase = await createSupabaseServerClient()

  const { data: phyla } = await supabase
    .from("phyla")
    .select("slug, name")
    .order("sort_order", { ascending: true })

  const { data: classes } = await supabase
    .from("classes")
    .select("slug, class_name, phylum_slug")
    .order("sort_order", { ascending: true })

  const { data: species } = await supabase
    .from("species")
    .select("slug, name, scientific_name, phylum_slug, class_slug")
    .order("sort_order", { ascending: true })

  const searchIndex: { title: string; subtitle: string; url: string }[] = []

  // Add phyla
  for (const p of (phyla || []) as any[]) {
    searchIndex.push({
      title: p.name,
      subtitle: "Phylum",
      url: `/zoohub/${p.slug}`,
    })
  }

  // Add classes
  for (const c of (classes || []) as any[]) {
    const phylumName = (phyla as any[])?.find((p: any) => p.slug === c.phylum_slug)?.name || c.phylum_slug
    searchIndex.push({
      title: c.class_name,
      subtitle: `Class in ${phylumName}`,
      url: `/zoohub/${c.phylum_slug}#${c.slug}`,
    })
  }

  // Add species
  for (const s of (species || []) as any[]) {
    searchIndex.push({
      title: s.name,
      subtitle: `Species (${s.scientific_name || ""})`,
      url: `/zoohub/${s.phylum_slug}/${s.slug}`,
    })
  }

  return searchIndex
}

/**
 * Dynamically builds the Taxonomy Tree (AnimaliaNode hierarchy) from the DB.
 * Used by the /taxonomy page to render the interactive classification tree.
 *
 * NOTE: This queries the same phyla/classes/species tables used by ZooHub.
 * Both features share the same biological data — this is intentional.
 */
export async function getTaxonomyTree(): Promise<any> {
  const supabase = await createSupabaseServerClient()

  const { data: phyla, error: phylaError } = await supabase.from("phyla").select("*").order("sort_order")
  const { data: classes, error: classError } = await supabase.from("classes").select("*").order("sort_order")
  const { data: species, error: speciesError } = await supabase.from("species").select("*").order("sort_order")

  if (phylaError) console.error("[taxonomy] Failed to fetch phyla:", phylaError.message)
  if (classError) console.error("[taxonomy] Failed to fetch classes:", classError.message)
  if (speciesError) console.error("[taxonomy] Failed to fetch species:", speciesError.message)

  const root = {
    id: "animalia",
    label: "Animalia",
    rank: "Kingdom",
    children: [] as any[],
  }

  for (const p of (phyla || []) as any[]) {
    const phylumNode = {
      id: `animalia_${p.slug}`,
      label: p.name,
      rank: "Phylum",
      children: [] as any[],
    }

    const pClasses = (classes || []).filter((c: any) => c.phylum_slug === p.slug)
    for (const c of pClasses) {
      const classNode = {
        id: `animalia_${p.slug}_${c.slug}`,
        label: c.class_name,
        rank: "Class",
        children: [] as any[],
      }

      const cSpecies = (species || []).filter((s: any) => s.class_slug === c.slug)
      for (const s of cSpecies) {
        classNode.children.push({
          id: `animalia_${p.slug}_${c.slug}_${s.slug}`,
          label: s.name,
          rank: "Species",
          commonName: s.scientific_name,
        })
      }

      // Add class to phylum if it has species or if we want empty classes
      phylumNode.children.push(classNode)
    }

    // Handle species that don't belong to any class but belong to the phylum
    const noClassSpecies = (species || []).filter((s: any) => s.phylum_slug === p.slug && !s.class_slug)
    for (const s of noClassSpecies) {
      phylumNode.children.push({
        id: `animalia_${p.slug}_${s.slug}`,
        label: s.name,
        rank: "Species",
        commonName: s.scientific_name,
      })
    }

    root.children.push(phylumNode)
  }

  return root
}

/**
 * Get taxonomy tree from the dedicated taxonomy_nodes table.
 * Returns the full 8-rank hierarchy (Kingdom → Phylum → Class → Sub-Class → Order → Family → Genus → Species).
 * Automatically falls back to getTaxonomyTree() (phyla/classes/species) if the table is unavailable.
 *
 * This is the PREFERRED function for the /taxonomy page.
 */
export async function getTaxonomyTreeFull(): Promise<any> {
  const supabase = await createSupabaseServerClient()

  // Try taxonomy_nodes first (dedicated tree table with full 8-rank hierarchy)
  const { data: nodes, error } = await supabase
    .from("taxonomy_nodes")
    .select("id, label, rank, common_name, parent_id, sort_order")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })

  if (error || !nodes || nodes.length === 0) {
    if (error && error.code !== "PGRST205") {
      console.error("[taxonomy] taxonomy_nodes error:", error.message)
    }
    return getTaxonomyTree()
  }

  // Build recursive tree from flat node list using a Map
  const nodeMap = new Map<string, any>()
  for (const node of nodes) {
    nodeMap.set(node.id, {
      id: node.id,
      label: node.label,
      rank: node.rank,
      commonName: node.common_name || undefined,
      children: [],
    })
  }

  let root: any = null
  for (const node of nodes) {
    const treeNode = nodeMap.get(node.id)!
    if (!node.parent_id) {
      if (node.id === "animalia" || !root) {
        root = treeNode
      }
    } else {
      const parent = nodeMap.get(node.parent_id)
      if (parent) {
        parent.children.push(treeNode)
      }
    }
  }

  if (!root || root.id !== "animalia") {
    root = nodeMap.get("animalia") ?? root ?? { id: "animalia", label: "Animalia", rank: "Kingdom", children: [] }
  }

  return root
}
