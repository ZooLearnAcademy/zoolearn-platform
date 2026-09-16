import { notFound } from "next/navigation"
import { fetchSpeciesData, fetchNeighbors, getAllAnimalData } from "@/lib/data/species"

import { HeroSection } from "@/components/species/hero-section"
import { IntroductionCard } from "@/components/species/introduction-card"
import { SizeStructureCard } from "@/components/species/size-structure-card"
import { GeneralFeaturesCard } from "@/components/species/general-features-card"
import { EcologyCard } from "@/components/species/ecology-card"
import { EconomicImportanceCard } from "@/components/species/economic-importance-card"
import { BottomNavigation } from "@/components/species/bottom-navigation"

export async function generateStaticParams() {
  try {
    const allData = await getAllAnimalData()
    const params: { phylum: string; species: string }[] = []
    for (const [phylum, classes] of Object.entries(allData)) {
      for (const cls of classes as any[]) {
        for (const sp of cls.species || []) {
          const speciesSlug = sp.slug ?? sp.name.toLowerCase().replace(/\s+/g, "-")
          params.push({ phylum: phylum.toLowerCase(), species: speciesSlug })
        }
      }
    }
    return params
  } catch {
    return []
  }
}

export default async function SpeciesDetailPage({
  params,
}: {
  params: Promise<{ phylum: string; species: string }>
}) {
  const { phylum, species } = await params
  const data = await fetchSpeciesData(species)

  if (!data) notFound()

  const { prev, next } = await fetchNeighbors(phylum, species)

  return (
    <div className="w-full min-h-screen">
      {/* ─────────── HERO SECTION ─────────── */}
      <HeroSection data={data} prev={prev} next={next} />

      {/* ─────────── CONTENT SECTIONS ─────────── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 species-content-grid">
          <IntroductionCard data={data} />
          <SizeStructureCard data={data} />
          <GeneralFeaturesCard data={data} />
          <EcologyCard data={data} />
          <EconomicImportanceCard data={data} />
        </div>

        {/* ─────────── BOTTOM NAVIGATION ─────────── */}
        <BottomNavigation phylum={phylum} prev={prev} next={next} />
      </div>

      {/* ─────────── CSS Animations ─────────── */}
      <style dangerouslySetInnerHTML={{ __html: `
        .species-content-grid > * {
          animation: contentfadein 0.5s ease-out both;
        }
        .species-content-grid > *:nth-child(1) { animation-delay: 0.04s; }
        .species-content-grid > *:nth-child(2) { animation-delay: 0.10s; }
        .species-content-grid > *:nth-child(3) { animation-delay: 0.16s; }
        .species-content-grid > *:nth-child(4) { animation-delay: 0.22s; }
        .species-content-grid > *:nth-child(5) { animation-delay: 0.28s; }
        .species-content-grid > *:nth-child(6) { animation-delay: 0.34s; }
        .species-content-grid > *:nth-child(7) { animation-delay: 0.40s; }

        @keyframes contentfadein {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  )
}
