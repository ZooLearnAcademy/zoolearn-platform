"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr"
import { SpeciesData, NeighborSpecies } from "@/types/species"
import { cloudinaryLoader } from "@/lib/cloudinary"

interface HeroSectionProps {
  data: SpeciesData
  prev: NeighborSpecies | null
  next: NeighborSpecies | null
}

export function HeroSection({ data, prev, next }: HeroSectionProps) {
  const descriptionLines = data.description.split("\n")

  // Quick facts from classification
  const quickFacts = ["Kingdom", "Phylum", "Class", "Order", "Family"]
    .filter((r) => data.classification?.[r])
    .map((r) => ({ label: r, value: data.classification[r] }))

  return (
    <div className="relative w-full border-b border-white/5 pb-10">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMS41IiBmaWxsPSIjMDAwMDAwIi8+PC9zdmc+')] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 pt-0 sm:pt-2 pb-8 sm:pb-10">
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          {prev ? (
            <Link
              href={`/zoohub/${prev.phylum}/${prev.slug}`}
              className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 hover:bg-white/[0.04] shadow-xl backdrop-blur-xl transition-all duration-300"
            >
              <ArrowLeft
                size={18}
                weight="bold"
                className="text-emerald-400 shrink-0 group-hover:-translate-x-1 transition-transform duration-300"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold leading-none mb-1">
                  Previous
                </span>
                <span className="text-sm font-bold text-slate-200 group-hover:text-emerald-400 transition-colors truncate">
                  {prev.name}
                </span>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              href={`/zoohub/${next.phylum}/${next.slug}`}
              className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 hover:bg-white/[0.04] shadow-xl backdrop-blur-xl transition-all duration-300 flex-row-reverse text-right"
            >
              <ArrowRight
                size={18}
                weight="bold"
                className="text-emerald-400 shrink-0 group-hover:translate-x-1 transition-transform duration-300"
              />
              <div className="flex flex-col items-end min-w-0">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold leading-none mb-1">
                  Next
                </span>
                <span className="text-sm font-bold text-slate-200 group-hover:text-emerald-400 transition-colors truncate">
                  {next.name}
                </span>
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Species Info + Image */}
        <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start gap-8 lg:gap-14 pt-2">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6 backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-[0.2em]">
                Species Profile
              </span>
            </div>

            <h1 className="text-[clamp(2.5rem,5vw+1rem,5rem)] font-black text-white tracking-tight leading-[1] mb-4 drop-shadow-2xl">
              {data.name}
            </h1>

            <p className="text-[clamp(1.125rem,2vw,1.5rem)] text-emerald-400/80 italic font-medium mb-8">
              {data.scientificName}
            </p>

            <div className="text-slate-300 text-[clamp(0.95rem,1.5vw,1.1rem)] leading-relaxed max-w-[70ch] mx-auto lg:mx-0 font-medium">
              {descriptionLines.map((line, i) => (
                <p key={i} className={i > 0 ? "mt-4" : ""}>
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* Species Image */}
          <div className="relative w-[clamp(13rem,30vw,24rem)] aspect-square shrink-0 mx-auto lg:mx-0">
            <div className="absolute inset-[clamp(1rem,3vw,2rem)] rounded-full bg-emerald-500/20 blur-[60px] mix-blend-screen" />
            <Image
              loader={cloudinaryLoader}
              src={data.image}
              alt={data.name}
              fill
              sizes="(max-width: 1024px) clamp(13rem, 30vw, 24rem), 24rem"
              priority
              className="relative z-10 object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:scale-[1.05] hover:rotate-2 transition-all duration-700 ease-out"
            />
          </div>
        </div>

        {/* ─── Quick Facts Strip ─── */}
        {quickFacts.length > 0 && (
          <div className="mt-12 mx-auto w-fit rounded-2xl bg-white/[0.02] border border-white/5 shadow-2xl backdrop-blur-xl overflow-hidden">
            <div className="flex flex-wrap justify-center divide-x divide-white/5">
              {quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex flex-col items-center px-6 sm:px-8 py-4 sm:py-5 min-w-[120px] hover:bg-white/[0.04] transition-colors duration-300"
                >
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1.5">
                    {fact.label}
                  </span>
                  <span className="text-sm font-black text-slate-200">
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
