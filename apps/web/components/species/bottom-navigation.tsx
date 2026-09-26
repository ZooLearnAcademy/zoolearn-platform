import Link from "next/link"
import { ArrowLeft, ArrowRight, TreeStructure } from "@phosphor-icons/react/dist/ssr"
import { NeighborSpecies } from "@/types/species"

interface BottomNavigationProps {
  phylum: string
  prev: NeighborSpecies | null
  next: NeighborSpecies | null
}

export function BottomNavigation({ phylum, prev, next }: BottomNavigationProps) {
  if (!prev && !next) return null

  return (
    <div className="mt-12 sm:mt-16 pt-6 border-t border-white/10">
      <div className="flex justify-between items-center gap-4">
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

        <Link
          href={`/zoohub/${phylum}`}
          className="hidden sm:flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 hover:bg-white/[0.04] shadow-xl backdrop-blur-xl transition-all duration-300 text-sm font-bold text-slate-400 hover:text-emerald-400"
        >
          <TreeStructure size={18} weight="bold" />
          All Species
        </Link>

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
    </div>
  )
}
