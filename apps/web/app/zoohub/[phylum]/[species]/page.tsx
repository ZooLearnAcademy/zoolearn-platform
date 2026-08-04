import Link from "next/link"
import { notFound } from "next/navigation"
import {
  BookOpenText,
  Dna,
  Tag,
  TreeStructure,
  Leaf,
  CurrencyDollar,
  ArrowLeft,
  ArrowRight,
  Cube,
} from "@phosphor-icons/react/dist/ssr"
import { Card, CardHeader, CardTitle, CardContent } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { getSpeciesDetail, getSpeciesNeighbors } from "@/lib/supabase/zoohub"

/* ─────────────────────────────────────────────
   Page Component
   ───────────────────────────────────────────── */

export default async function SpeciesDetailPage({
  params,
}: {
  params: { phylum: string; species: string }
}) {
  const { phylum, species } = await params
  const data = await getSpeciesDetail(species)

  if (!data) notFound()

  const { prev, next } = await getSpeciesNeighbors(phylum, species)
  const descriptionLines = (data.description || "").split("\n")

  // Quick facts from classification
  const quickFacts = ["Kingdom", "Phylum", "Class", "Order", "Family"]
    .filter((r) => data.classification?.[r])
    .map((r) => ({ label: r, value: data.classification[r] }))

  return (
    <div className="w-full min-h-screen">
      {/* ─────────── HERO SECTION ─────────── */}
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

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-foreground tracking-tight leading-[1] mb-3">
                {data.name}
              </h1>

              <p className="text-lg sm:text-xl text-teal-600/80 dark:text-teal-400/70 italic font-medium mb-4">
                {data.scientific_name}
              </p>

              <div className="text-muted-foreground text-sm sm:text-[15px] leading-relaxed max-w-xl mx-auto lg:mx-0">
                {descriptionLines.map((line, i) => (
                  <p key={i} className={i > 0 ? "mt-2" : ""}>
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* Species Image */}
            <div className="relative w-52 h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 shrink-0">
              <div className="absolute inset-6 rounded-full bg-emerald-100/50 dark:bg-emerald-900/20 blur-2xl" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.image || ""}
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

      {/* ─────────── CONTENT SECTIONS ─────────── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 species-content-grid">

          {/* ── Introduction (full width) ── */}
          {data.introduction?.length > 0 && (
            <Card className="lg:col-span-2">
              <CardHeader className="bg-muted/30 border-b pb-5">
                <div className="flex items-center gap-3">
                  <div className="text-emerald-600 dark:text-emerald-400 p-2 bg-emerald-100/50 dark:bg-emerald-900/30 rounded-lg">
                    <BookOpenText size={20} weight="duotone" />
                  </div>
                  <CardTitle className="text-lg text-foreground tracking-tight">Introduction</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {data.introduction.map((point, i) => (
                    <p
                      key={i}
                      className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed pl-4 border-l-2 border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-600 hover:text-slate-800 dark:hover:text-slate-200 transition-all duration-300"
                    >
                      {point}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* ── Size & Structure + 3D Model (full width) ── */}
          {data.size_structure?.length > 0 && (
            <Card className="lg:col-span-2">
              <CardHeader className="bg-muted/30 border-b pb-5">
                <div className="flex items-center gap-3">
                  <div className="text-amber-600 dark:text-amber-400 p-2 bg-amber-100/50 dark:bg-amber-900/30 rounded-lg">
                    <Tag size={20} weight="duotone" />
                  </div>
                  <CardTitle className="text-lg text-foreground tracking-tight">Size & Structure</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Points */}
                  <div className="flex flex-col gap-3.5">
                    {data.size_structure.map((point, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 border hover:bg-muted/50 hover:border-amber-500/50 hover:shadow-md transition-all duration-300 group"
                      >
                        <Badge variant="outline" className="w-8 h-8 flex items-center justify-center text-amber-600 border-amber-200 shrink-0 font-bold group-hover:bg-amber-50">
                          {String(i + 1).padStart(2, "0")}
                        </Badge>
                        <p className="text-sm sm:text-[15px] text-card-foreground font-medium leading-relaxed pt-1">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* 3D Model */}
                  <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-900 shadow-sm">
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700/60">
                      <div className="flex items-center justify-center w-6 h-6 rounded-md bg-emerald-50 dark:bg-emerald-900/40">
                        <Cube size={13} weight="fill" className="text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span className="text-xs font-semibold text-muted-foreground truncate">
                        {data.name} — 3D Model
                      </span>
                    </div>
                    <div className="aspect-[4/3] w-full bg-slate-50 dark:bg-slate-800/30">
                      {data.model_3d ? (
                        <iframe
                          title={`${data.name} 3D Model`}
                          src={data.model_3d}
                          className="w-full h-full border-0"
                          allow="autoplay; fullscreen; xr-spatial-tracking"
                          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm font-medium text-slate-400 dark:text-slate-500">
                          No 3D model available
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* ── General Features — Minimal List ── */}
          {data.features && Object.keys(data.features).length > 0 && (
            <Card className="lg:col-span-2">
              <CardHeader className="bg-muted/30 border-b py-4">
                <div className="flex items-center gap-2.5">
                  <Dna size={18} weight="duotone" className="text-muted-foreground" />
                  <CardTitle className="text-base font-semibold text-foreground">
                    General Features
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <dl className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                  {Object.entries(data.features).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex flex-col sm:flex-row sm:items-start px-6 py-4"
                    >
                      <dt className="sm:w-1/3 shrink-0 mb-1 sm:mb-0 pr-4 font-semibold text-slate-900 dark:text-slate-200">
                        {key}
                      </dt>
                      <dd className="sm:w-2/3 text-muted-foreground leading-relaxed">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          )}

          {/* ── Ecology ── */}
          {data.ecology?.length > 0 && (
            <Card className="shadow-sm border-slate-200/80 dark:border-slate-800/80">
              <CardHeader className="bg-muted/30 border-b pb-5">
                <div className="flex items-center gap-3">
                  <div className="text-emerald-600 dark:text-emerald-400 p-2 bg-emerald-100/50 dark:bg-emerald-900/30 rounded-lg">
                    <Leaf size={20} weight="duotone" />
                  </div>
                  <CardTitle className="text-lg text-foreground tracking-tight">Ecology</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {data.ecology.map((point, i) => (
                    <div key={i} className="flex items-start gap-3 group/item">
                      <div className="w-5 h-5 flex items-center justify-center rounded-md bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/60 dark:border-emerald-500/20 shrink-0 mt-0.5">
                        <Leaf size={11} weight="fill" className="text-emerald-500" />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed group-hover/item:text-slate-800 transition-colors">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* ── Economic Importance ── */}
          {data.economy?.length > 0 && (
            <Card className="shadow-sm border-slate-200/80 dark:border-slate-800/80">
              <CardHeader className="bg-muted/30 border-b pb-5">
                <div className="flex items-center gap-3">
                  <div className="text-amber-600 dark:text-amber-400 p-2 bg-amber-100/50 dark:bg-amber-900/30 rounded-lg">
                    <CurrencyDollar size={20} weight="duotone" />
                  </div>
                  <CardTitle className="text-lg text-foreground tracking-tight">Economic Importance</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {data.economy.map((point, i) => (
                    <div key={i} className="flex items-start gap-3 px-3.5 py-3 rounded-lg bg-muted/30 border hover:bg-muted/50 hover:border-amber-500/50 transition-all duration-300">
                      <CurrencyDollar size={15} weight="fill" className="text-amber-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

        </div>

        {/* ─────────── BOTTOM NAVIGATION ─────────── */}
        {(prev || next) && (
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
        )}
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
