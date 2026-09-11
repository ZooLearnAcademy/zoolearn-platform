import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, SquaresFour } from "@phosphor-icons/react/dist/ssr"
import { PhylumClassesList } from "./phylum-classes-list"
import { getAllAnimalData } from "@/lib/data/species"

const phylumsList = [
  { name: "Porifera", slug: "porifera" },
  { name: "Coelenterata", slug: "coelenterata" },
  { name: "Ctenophora", slug: "ctenophora" },
  { name: "Platyhelminthes", slug: "platyhelminthes" },
  { name: "Aschelminthes", slug: "aschelminthes" },
  { name: "Annelida", slug: "annelida" },
  { name: "Arthropoda", slug: "arthropoda" },
  { name: "Mollusca", slug: "mollusca" },
  { name: "Echinodermata", slug: "echinodermata" },
  { name: "Hemichordata", slug: "hemichordata" },
  { name: "Chordata", slug: "chordata" },
]

export function generateStaticParams() {
  return phylumsList.map((p) => ({
    phylum: p.slug,
  }))
}

async function fetchPhylumData(phylumSlug: string) {
  try {
    const allData = await getAllAnimalData()
    const data = allData[phylumSlug.toLowerCase()]
    
    if (!data) return null
    return data
  } catch (error) {
    console.error("Error fetching phylum data:", error)
    return null
  }
}

export default async function PhylumPage({
  params,
}: {
  params: { phylum: string }
}) {
  const { phylum } = await params
  const phylumData = await fetchPhylumData(phylum)
  
  if (!phylumData) {
    notFound()
  }

  const currentSlug = phylum.toLowerCase()
  const currentIndex = phylumsList.findIndex((p) => p.slug === currentSlug)
  const prevPhylum = currentIndex > 0 ? phylumsList[currentIndex - 1] : null
  const nextPhylum = currentIndex >= 0 && currentIndex < phylumsList.length - 1 ? phylumsList[currentIndex + 1] : null

  // Generate a subtitle based on the phylum
  const subtitleMap: Record<string, string> = {
    porifera: "Discover the ancient, pore-bearing sponges that filter the ocean's depths.",
    coelenterata: "Explore the mesmerizing world of stinging jellies and corals.",
    ctenophora: "Witness the glowing bioluminescence of the beautiful comb jellies.",
    platyhelminthes: "Uncover the fascinating biology of the unsegmented flatworms.",
    aschelminthes: "Delve into the ubiquitous and diverse world of roundworms.",
    annelida: "Study the complex segmentation of earthworms and leeches.",
    arthropoda: "Venture into the largest phylum of joint-legged insects, spiders, and crustaceans.",
    mollusca: "Discover the soft-bodied wonders from snails to the highly intelligent octopus.",
    echinodermata: "Explore the spiny-skinned starfish and sea urchins of the ocean floor.",
    hemichordata: "Learn about the evolutionary link presented by the intriguing acorn worms.",
    chordata: "From fishes to mammals, explore the animals with a dorsal nerve cord.",
  }
  const subtitle = subtitleMap[currentSlug] || "Exploring the fascinating diversity of the Animal Kingdom."

  return (
    <div className="w-full max-w-[90rem] mx-auto py-6 px-4 sm:px-8 lg:px-12 xl:px-16 bg-transparent">
      
      {/* 🚀 Top Navigation: Previous / Next Phylum */}
      <div className="flex items-center justify-between gap-3 sm:gap-4 mb-8 sm:mb-12 pt-2 border-b border-slate-200/70 dark:border-slate-800/70 pb-5">
        {prevPhylum ? (
          <Link
            href={`/zoohub/${prevPhylum.slug}`}
            className="group flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-5 py-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800 hover:border-emerald-500/60 dark:hover:border-emerald-500/60 shadow-xs hover:shadow-md transition-all duration-300 max-w-[45%]"
          >
            <ArrowLeft
              size={18}
              weight="bold"
              className="text-emerald-600 dark:text-emerald-400 shrink-0 group-hover:-translate-x-1 transition-transform duration-300"
            />
            <div className="flex flex-col min-w-0 text-left">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-bold leading-none mb-1">
                Previous
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                {prevPhylum.name}
              </span>
            </div>
          </Link>
        ) : (
          <div />
        )}

        <Link
          href="/zoohub"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 bg-slate-100/60 dark:bg-slate-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200/80 dark:border-slate-700/60 transition-all duration-300"
        >
          <SquaresFour size={16} weight="bold" />
          <span>All Phylums</span>
        </Link>

        {nextPhylum ? (
          <Link
            href={`/zoohub/${nextPhylum.slug}`}
            className="group flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-5 py-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800 hover:border-emerald-500/60 dark:hover:border-emerald-500/60 shadow-xs hover:shadow-md transition-all duration-300 flex-row-reverse text-right max-w-[45%]"
          >
            <ArrowRight
              size={18}
              weight="bold"
              className="text-emerald-600 dark:text-emerald-400 shrink-0 group-hover:translate-x-1 transition-transform duration-300"
            />
            <div className="flex flex-col min-w-0 text-right">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-bold leading-none mb-1">
                Next
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                {nextPhylum.name}
              </span>
            </div>
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* 🚀 Ultra-Minimalist Editorial Hero Section */}
      <div className="mb-24 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="flex flex-col items-start max-w-5xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[3px] bg-[#00897b] rounded-full" />
            <span className="text-[#00897b] font-bold tracking-[0.2em] uppercase text-sm">
              Phylum Overview
            </span>
          </div>
          
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black tracking-tighter text-[#0a192f] dark:text-white capitalize leading-[0.9] mb-10">
            {phylum}
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-[#546e7a] dark:text-slate-400 font-medium leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>

      {/* 🚀 Progressive Classes and Species List */}
      <PhylumClassesList classes={phylumData} phylum={phylum} />
    </div>
  )
}
