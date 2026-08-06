import Link from "next/link"
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr"
import { SpeciesData, NeighborSpecies } from "@/types/species"

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
    <div className="relative w-full bg-background border-b">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMS41IiBmaWxsPSIjMDAwMDAwIi8+PC9zdmc+')] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 pt-0 sm:pt-2 pb-8 sm:pb-10">
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          {prev ? (
            <Link
              href={`/zoohub/${prev.phylum}/${prev.slug}`}
              className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-emerald-300 dark:hover:border-emerald-700 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <ArrowLeft
                size={16}
                weight="bold"
                className="text-emerald-600 dark:text-emerald-400 shrink-0 group-hover:-translate-x-0.5 transition-transform duration-300"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-semibold leading-none mb-0.5">
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
                <span className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-semibold leading-none mb-0.5">
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

        {/* Species Info + Image */}
        <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start gap-8 lg:gap-14 pt-2">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
                Species Profile
              </span>
            </div>

            <h1 className="text-[clamp(2.5rem,5vw+1rem,4.5rem)] font-black text-foreground tracking-tight leading-[1] mb-[clamp(0.75rem,2vw,1.5rem)]">
              {data.name}
            </h1>

            <p className="text-[clamp(1.125rem,2vw,1.25rem)] text-teal-600/80 dark:text-teal-400/70 italic font-medium mb-[clamp(1rem,3vw,1.5rem)]">
              {data.scientificName}
            </p>

            <div className="text-muted-foreground text-[clamp(0.875rem,1.5vw,1rem)] leading-relaxed max-w-[70ch] mx-auto lg:mx-0">
              {descriptionLines.map((line, i) => (
                <p key={i} className={i > 0 ? "mt-[clamp(0.5rem,1vw,1rem)]" : ""}>
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* Species Image */}
          <div className="relative w-[clamp(13rem,30vw,20rem)] aspect-square shrink-0 mx-auto lg:mx-0">
            <div className="absolute inset-[clamp(1rem,3vw,2rem)] rounded-full bg-emerald-100/50 dark:bg-emerald-900/20 blur-2xl" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.image}
              alt={data.name}
              className="relative z-10 w-full h-full object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:scale-[1.03] transition-transform duration-500 ease-out"
            />
          </div>
        </div>

        {/* ─── Quick Facts Strip ─── */}
        {quickFacts.length > 0 && (
          <div className="mt-8 sm:mt-10 mx-auto w-fit rounded-xl bg-background/70 border shadow-sm backdrop-blur-sm overflow-hidden">
            <div className="flex flex-wrap justify-center divide-x divide-border">
              {quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex flex-col items-center px-5 sm:px-7 py-3.5 sm:py-4 min-w-[110px] hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition-colors duration-300"
                >
                  <span className="text-[10px] font-bold text-teal-600/70 dark:text-teal-500/70 uppercase tracking-[0.12em] mb-1">
                    {fact.label}
                  </span>
                  <span className="text-sm font-bold text-card-foreground">
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
