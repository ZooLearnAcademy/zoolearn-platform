import { Tag, Cube } from "@phosphor-icons/react/dist/ssr"
import { Card, CardHeader, CardTitle, CardContent } from "@workspace/ui/components/card"
import { SpeciesData } from "@/types/species"
import { Progressive3DViewer } from "./progressive-3d-viewer"

export function SizeStructureCard({ data }: { data: SpeciesData }) {
  if (!data.sizeStructure?.length) return null

  return (
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
            {data.sizeStructure.map((point, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 border hover:bg-muted/50 hover:border-amber-500/50 hover:shadow-md transition-all duration-300 group"
              >
                <span className="w-8 h-8 flex items-center justify-center rounded-md border text-amber-600 border-amber-200 shrink-0 text-xs font-bold font-mono group-hover:bg-amber-50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[clamp(0.875rem,1.5vw,1rem)] text-card-foreground font-medium leading-relaxed pt-1">
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
            <Progressive3DViewer
              modelUrl={data["3d"]}
              speciesName={data.name}
              previewImage={data.image}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
