export interface SpeciesData {
  id: number
  slug: string
  name: string
  scientificName: string
  description: string
  image: string
  "3d": string
  introduction: string[]
  features: Record<string, string>
  classification: Record<string, string>
  sizeStructure: string[]
  ecology: string[]
  economy: string[]
  phylum_source: string
}

export interface NeighborSpecies {
  name: string
  slug: string
  phylum: string
}
