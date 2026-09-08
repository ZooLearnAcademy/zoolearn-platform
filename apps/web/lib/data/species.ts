import fs from "fs/promises"
import path from "path"
import { SpeciesData, NeighborSpecies } from "@/types/species"

export async function fetchSpeciesData(speciesSlug: string): Promise<SpeciesData | null> {
  try {
    const jsonPath = path.join(process.cwd(), "..", "..", "AllPhylumData.json")
    const raw = await fs.readFile(jsonPath, "utf8")
    const allData: Record<string, SpeciesData> = JSON.parse(raw)
    return allData[speciesSlug.toLowerCase()] ?? null
  } catch {
    return null
  }
}

export async function fetchNeighbors(
  phylumSlug: string,
  speciesSlug: string
): Promise<{ prev: NeighborSpecies | null; next: NeighborSpecies | null }> {
  try {
    const jsonPath = path.join(process.cwd(), "..", "..", "allAnimalData.json")
    const raw = await fs.readFile(jsonPath, "utf8")
    const allData = JSON.parse(raw)
    const classes = allData[phylumSlug.toLowerCase()] ?? []

    // Flatten all species in this phylum
    const allSpecies: { name: string; slug: string }[] = []
    for (const cls of classes) {
      for (const sp of cls.species ?? []) {
        allSpecies.push({
          name: sp.name,
          slug: sp.slug ?? sp.name.toLowerCase().replace(/\s+/g, "-"),
        })
      }
    }

    const idx = allSpecies.findIndex(
      (s) => s.slug.toLowerCase() === speciesSlug.toLowerCase()
    )
    const prevItem = idx > 0 ? allSpecies[idx - 1] : undefined
    const prev: NeighborSpecies | null = prevItem
      ? { name: prevItem.name, slug: prevItem.slug, phylum: phylumSlug }
      : null

    const nextItem = idx < allSpecies.length - 1 ? allSpecies[idx + 1] : undefined
    const next: NeighborSpecies | null = nextItem
      ? { name: nextItem.name, slug: nextItem.slug, phylum: phylumSlug }
      : null

    return { prev, next }

  } catch {
    return { prev: null, next: null }
  }
}
