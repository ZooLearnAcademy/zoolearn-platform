import fs from "fs/promises"
import path from "path"
import { SpeciesData, NeighborSpecies } from "@/types/species"

let cachedAnimalData: any = null
let cachedPhylumData: Record<string, SpeciesData> | null = null

export async function getAllAnimalData(): Promise<any> {
  if (cachedAnimalData) return cachedAnimalData
  try {
    const jsonPath = path.join(process.cwd(), "..", "..", "allAnimalData.json")
    const raw = await fs.readFile(jsonPath, "utf8")
    cachedAnimalData = JSON.parse(raw)
    return cachedAnimalData
  } catch (error) {
    console.error("Error reading allAnimalData.json:", error)
    return {}
  }
}

export async function getAllPhylumData(): Promise<Record<string, SpeciesData>> {
  if (cachedPhylumData) return cachedPhylumData
  try {
    const jsonPath = path.join(process.cwd(), "..", "..", "AllPhylumData.json")
    const raw = await fs.readFile(jsonPath, "utf8")
    cachedPhylumData = JSON.parse(raw)
    return cachedPhylumData || {}
  } catch (error) {
    console.error("Error reading AllPhylumData.json:", error)
    return {}
  }
}

export async function fetchSpeciesData(speciesSlug: string): Promise<SpeciesData | null> {
  try {
    const allData = await getAllPhylumData()
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
    const allData = await getAllAnimalData()
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
