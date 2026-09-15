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
    <div className="mt-12 sm:mt-16 pt-6 border-t border-slate-200 dark:border-slate-800">
      <div className="flex justify-between items-center gap-4">
        {prev ? (
          <Link
            href={`/zoohub/${prev.phylum}/${prev.slug}`}
            className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-background border hover:border-emerald-500/50 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <ArrowLeft
              size={16}
              weight="bold"
              className="text-emerald-600 dark:text-emerald-400 shrink-0 group-hover:-translate-x-0.5 transition-transform duration-300"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold leading-none mb-0.5">
                Previous
              </span>
              <span className="text-sm font-semibold text-card-foreground group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors truncate">
                {prev.name}
              </span>
            </div>
          </Link>
        ) : (
          <div />
        )}

        <Link
          href={`/zoohub/${phylum}`}
          className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-background border hover:border-emerald-500/50 shadow-sm hover:shadow-md transition-all duration-300 text-sm font-semibold text-slate-500 hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-400"
        >
          <TreeStructure size={16} weight="bold" />
          All Species
        </Link>

        {next ? (
          <Link
            href={`/zoohub/${next.phylum}/${next.slug}`}
            className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-background border hover:border-emerald-500/50 shadow-sm hover:shadow-md transition-all duration-300 flex-row-reverse text-right"
          >
            <ArrowRight
              size={16}
              weight="bold"
              className="text-emerald-600 dark:text-emerald-400 shrink-0 group-hover:translate-x-0.5 transition-transform duration-300"
            />
            <div className="flex flex-col items-end min-w-0">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold leading-none mb-0.5">
                Next
              </span>
              <span className="text-sm font-semibold text-card-foreground group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors truncate">
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
