import { notFound } from "next/navigation";
import { getSpeciesDetail, getSpeciesNeighbors } from "@/lib/supabase/zoohub-public";

import { HeroSection } from "@/components/species/hero-section";
import { IntroductionCard } from "@/components/species/introduction-card";
import { SizeStructureCard } from "@/components/species/size-structure-card";
import { GeneralFeaturesCard } from "@/components/species/general-features-card";
import { EcologyCard } from "@/components/species/ecology-card";
import { EconomicImportanceCard } from "@/components/species/economic-importance-card";
import { BottomNavigation } from "@/components/species/bottom-navigation";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ phylum: string; species: string }> };

export default async function SpeciesDetailPage({ params }: Props) {
  const { phylum, species } = await params;

  const [data, neighbors] = await Promise.all([
    getSpeciesDetail(species),
    getSpeciesNeighbors(phylum, species),
  ]);

  if (!data) notFound();

  const { prev, next } = neighbors;

  return (
    <div className="w-full min-h-screen">
      <HeroSection data={data} prev={prev} next={next} />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 species-content-grid">
          <IntroductionCard data={data} />
          <SizeStructureCard data={data} />
          <GeneralFeaturesCard data={data} />
          <EcologyCard data={data} />
          <EconomicImportanceCard data={data} />
        </div>

        <BottomNavigation phylum={phylum} prev={prev} next={next} />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .species-content-grid > * { animation: contentfadein 0.5s ease-out both; }
        .species-content-grid > *:nth-child(1) { animation-delay: 0.04s; }
        .species-content-grid > *:nth-child(2) { animation-delay: 0.10s; }
        .species-content-grid > *:nth-child(3) { animation-delay: 0.16s; }
        .species-content-grid > *:nth-child(4) { animation-delay: 0.22s; }
        .species-content-grid > *:nth-child(5) { animation-delay: 0.28s; }
        @keyframes contentfadein {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
}
