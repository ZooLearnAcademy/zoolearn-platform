"use client"

import React, { useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { cloudinaryLoader } from "@/lib/cloudinary"

interface Species {
  id: number
  slug?: string
  name: string
  scientificName: string
  image: string
}

interface SpeciesGridProps {
  species: Species[]
  phylum: string
  /** Number of species to show initially and per "Load More" click */
  batchSize?: number
}

const BATCH_SIZE_DEFAULT = 24

function SpeciesCard({
  species,
  phylum,
}: {
  species: Species
  phylum: string
}) {
  const slug =
    species.slug || species.name.toLowerCase().replace(/\s+/g, "-")

  return (
    <Link
      href={`/zoohub/${phylum}/${slug}`}
      id={String(species.id)}
      className="flex flex-col items-center justify-start group cursor-pointer h-full text-center scroll-mt-32"
    >
      <div className="w-full max-w-[14rem] aspect-square flex items-center justify-center mb-4 relative mx-auto">
        <Image
          loader={cloudinaryLoader}
          src={species.image}
          alt={species.name}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 14rem"
          className="relative z-10 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)] group-hover:drop-shadow-[0_15px_25px_rgba(16,185,129,0.15)] group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-300 ease-out"
          loading="lazy"
        />
      </div>

      <h3 className="text-[clamp(1.125rem,3vw,1.5rem)] font-extrabold italic text-slate-800 dark:text-slate-100 mb-3 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-300">
        {species.name}
      </h3>

      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 mt-auto group-hover:border-emerald-200 group-hover:bg-emerald-50 transition-colors duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 256 256"
          className="text-emerald-500 shrink-0"
        >
          <path
            fill="currentColor"
            d="M211.88,143.2l-21.78,41.9a32.06,32.06,0,0,1-30.82,18.9h-62.5A32.06,32.06,0,0,1,66,185.1l-21.78-41.9a32,32,0,0,1,0-29.47L66,71.84A32.06,32.06,0,0,1,96.76,52.94h62.5A32.06,32.06,0,0,1,190.08,71.84l21.8,41.89A32,32,0,0,1,211.88,143.2Zm-14.15-22.12L176,79.23a16,16,0,0,0-15.42-9.43h-62.5A16,16,0,0,0,82.68,79.23l-21.73,41.85a16,16,0,0,0,0,14.75L82.68,177.7A16,16,0,0,0,98.1,187.14h62.5a16,16,0,0,0,15.42-9.44l21.73-41.85A16,16,0,0,0,197.73,121.08Z"
          />
        </svg>
        <span className="text-[clamp(0.65rem,1.5vw,0.75rem)] text-slate-600 dark:text-slate-300 font-bold group-hover:text-emerald-700 truncate">
          {species.scientificName}
        </span>
      </div>
    </Link>
  )
}

const MemoizedSpeciesCard = React.memo(SpeciesCard)

export function SpeciesGrid({
  species,
  phylum,
  batchSize = BATCH_SIZE_DEFAULT,
}: SpeciesGridProps) {
  const [visibleCount, setVisibleCount] = useState(batchSize)

  const showMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + batchSize, species.length))
  }, [batchSize, species.length])

  const visibleSpecies = species.slice(0, visibleCount)
  const hasMore = visibleCount < species.length
  const remaining = species.length - visibleCount

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-[clamp(1rem,3vw,2rem)] gap-y-[clamp(4rem,10vw,6rem)] mt-16 px-2 sm:px-4">
        {visibleSpecies.map((sp) => (
          <MemoizedSpeciesCard key={sp.id} species={sp} phylum={phylum} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={showMore}
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white dark:bg-slate-900 border-2 border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 font-bold text-sm tracking-wide hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300"
          >
            <span>
              Show More ({remaining} remaining)
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 256 256"
              className="group-hover:translate-y-0.5 transition-transform duration-300"
            >
              <path
                fill="currentColor"
                d="M213.66 101.66l-80 80a8 8 0 0 1-11.32 0l-80-80A8 8 0 0 1 53.66 90.34L128 164.69l74.34-74.35a8 8 0 0 1 11.32 11.32z"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  )
}
