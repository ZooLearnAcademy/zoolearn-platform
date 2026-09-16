import fs from "fs/promises"
import path from "path"

export interface TaxonomyNode {
  id: string
  label: string
  rank: string
  commonName?: string
  extinct?: boolean
  children?: TaxonomyNode[]
}

export interface TaxonomyTreeMeta {
  description: string
  totalNodes: number
  ranks: string[]
  generatedAt: string
}

export interface TaxonomyData {
  _meta: TaxonomyTreeMeta
  tree: TaxonomyNode
}

let cachedTaxonomyData: TaxonomyData | null = null

export async function getTaxonomyData(): Promise<TaxonomyData | null> {
  if (cachedTaxonomyData) return cachedTaxonomyData

  const possiblePaths = [
    path.join(process.cwd(), "data", "taxonomyTreeData.json"),
    path.join(process.cwd(), "apps", "web", "data", "taxonomyTreeData.json"),
    path.join(process.cwd(), "..", "..", "data", "taxonomyTreeData.json"),
    path.join(process.cwd(), "..", "data", "taxonomyTreeData.json"),
  ]

  for (const p of possiblePaths) {
    try {
      const raw = await fs.readFile(p, "utf8")
      cachedTaxonomyData = JSON.parse(raw)
      return cachedTaxonomyData
    } catch {
      // Continue to next path
    }
  }

  console.error("[taxonomy] Failed to find taxonomyTreeData.json in any expected path")
  return null
}

export async function getTaxonomyTree(): Promise<TaxonomyNode | null> {
  const data = await getTaxonomyData()
  return data ? data.tree : null
}
