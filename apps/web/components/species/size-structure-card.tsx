import { Tag, Cube } from "@phosphor-icons/react/dist/ssr"
import { Card, CardHeader, CardTitle, CardContent } from "@workspace/ui/components/card"
import { SpeciesData } from "@/types/species"

export function SizeStructureCard({ data }: { data: SpeciesData }) {
  if (!data.sizeStructure?.length) return null

  return (
    <div className="lg:col-span-2 rounded-2xl bg-white/[0.02] border border-white/5 shadow-2xl backdrop-blur-xl overflow-hidden">
      <div className="bg-white/[0.02] border-b border-white/5 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="text-amber-400 p-2 bg-amber-500/10 rounded-lg">
            <Tag size={20} weight="duotone" />
          </div>
          <h3 className="text-lg font-bold text-slate-200 tracking-tight">Size & Structure</h3>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Points */}
          <div className="flex flex-col gap-4">
            {data.sizeStructure.map((point, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-amber-500/30 hover:shadow-lg transition-all duration-300 group"
              >
                <span className="w-8 h-8 flex items-center justify-center rounded-md border text-amber-400 border-amber-500/20 shrink-0 text-xs font-bold font-mono group-hover:bg-amber-500/10">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[clamp(0.95rem,1.5vw,1.05rem)] text-slate-300 font-medium leading-relaxed pt-1 group-hover:text-white transition-colors">
                  {point}
                </p>
              </div>
            ))}
          </div>

          {/* 3D Model */}
          <div className="rounded-xl overflow-hidden border border-white/10 bg-black/40 shadow-xl">
            <div className="flex items-center gap-3 px-5 py-3 bg-white/[0.03] border-b border-white/5">
              <div className="flex items-center justify-center w-7 h-7 rounded-md bg-emerald-500/10">
                <Cube size={15} weight="fill" className="text-emerald-400" />
              </div>
              <span className="text-sm font-bold text-slate-300 truncate">
                {data.name} — 3D Model
              </span>
            </div>
            <div className="aspect-[4/3] w-full bg-[#080c14]">
              {data["3d"] ? (
                <iframe
                  title={`${data.name} 3D Model`}
                  src={data["3d"]}
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm font-bold text-slate-500">
                  No 3D model available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
