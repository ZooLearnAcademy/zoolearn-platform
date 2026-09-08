import fs from "fs/promises"
import path from "path"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, SquaresFour } from "@phosphor-icons/react/dist/ssr"

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

async function fetchPhylumData(phylumSlug: string) {
  try {
    const jsonPath = path.join(process.cwd(), "..", "..", "allAnimalData.json")
    const fileContents = await fs.readFile(jsonPath, "utf8")
    const allData = JSON.parse(fileContents)
    const data = allData[phylumSlug.toLowerCase()]
    
    if (!data) return null
    return data
  } catch (error) {
    console.error("Error fetching phylum data from node:", error)
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

      {/* 🚀 Classes and Species List */}
      <div className="w-full space-y-32 pb-24">
        {phylumData.map((cls: any, idx: number) => (
          <div key={cls.id || idx} id={cls.id} className="w-full scroll-mt-32">
            
            {/* Minimalist Class Header */}
            <div className="mb-16 group">
              <div className="flex items-start gap-4 pb-6 border-b border-slate-200/60 dark:border-slate-800/60">
                <div className="w-2 h-16 rounded-full bg-gradient-to-b from-emerald-400 to-teal-500" />
                <div className="flex flex-col gap-3">
                  <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
                    {cls.className}
                  </h2>
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-1.5 rounded-full bg-transparent border border-slate-200 dark:border-slate-700 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-widest">
                      Class
                    </span>
                    <span className="px-4 py-1.5 rounded-full bg-emerald-50/50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-sm font-bold border border-emerald-100/80 dark:border-emerald-800/40">
                      {cls.species.length} Species
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3D Pop-out Species Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-[clamp(1rem,3vw,2rem)] gap-y-[clamp(4rem,10vw,6rem)] mt-16 px-2 sm:px-4">
              {cls.species.map((species: any, i: number) => (
                <Link 
                  key={species.id} 
                  href={`/zoohub/${phylum}/${species.slug || species.name.toLowerCase().replace(/\s+/g, "-")}`}
                  id={species.id}
                  className="flex flex-col items-center justify-start group cursor-pointer h-full text-center scroll-mt-32"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="w-full max-w-[14rem] aspect-square flex items-center justify-center mb-4 relative mx-auto">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={species.image}
                      alt={species.name}
                      className="relative z-10 w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)] group-hover:drop-shadow-[0_15px_25px_rgba(16,185,129,0.15)] group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-300 ease-out"
                    />
                  </div>

                  <h3 className="text-[clamp(1.125rem,3vw,1.5rem)] font-extrabold italic text-slate-800 dark:text-slate-100 mb-3 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-300">
                    {species.name}
                  </h3>
                  
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 mt-auto group-hover:border-emerald-200 group-hover:bg-emerald-50 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 256 256" className="text-emerald-500 shrink-0">
                      <path fill="currentColor" d="M211.88,143.2l-21.78,41.9a32.06,32.06,0,0,1-30.82,18.9h-62.5A32.06,32.06,0,0,1,66,185.1l-21.78-41.9a32,32,0,0,1,0-29.47L66,71.84A32.06,32.06,0,0,1,96.76,52.94h62.5A32.06,32.06,0,0,1,190.08,71.84l21.8,41.89A32,32,0,0,1,211.88,143.2Zm-14.15-22.12L176,79.23a16,16,0,0,0-15.42-9.43h-62.5A16,16,0,0,0,82.68,79.23l-21.73,41.85a16,16,0,0,0,0,14.75L82.68,177.7A16,16,0,0,0,98.1,187.14h62.5a16,16,0,0,0,15.42-9.44l21.73-41.85A16,16,0,0,0,197.73,121.08Z"/>
                    </svg>
                    <span className="text-[clamp(0.65rem,1.5vw,0.75rem)] text-slate-600 dark:text-slate-300 font-bold group-hover:text-emerald-700 truncate">
                      {species.scientificName}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            
          </div>
        ))}
      </div>
    </div>
  )
}
