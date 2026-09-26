import { Leaf } from "@phosphor-icons/react/dist/ssr"
import { Card, CardHeader, CardTitle, CardContent } from "@workspace/ui/components/card"
import { SpeciesData } from "@/types/species"

export function EcologyCard({ data }: { data: SpeciesData }) {
  if (!data.ecology?.length) return null

  return (
    <div className="rounded-2xl bg-white/[0.02] border border-white/5 shadow-2xl backdrop-blur-xl overflow-hidden">
      <div className="bg-white/[0.02] border-b border-white/5 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="text-emerald-400 p-2 bg-emerald-500/10 rounded-lg">
            <Leaf size={20} weight="duotone" />
          </div>
          <h3 className="text-lg font-bold text-slate-200 tracking-tight">Ecology</h3>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {data.ecology.map((point, i) => (
            <div key={i} className="flex items-start gap-3 group/item">
              <div className="w-5 h-5 flex items-center justify-center rounded-md bg-emerald-500/10 border border-emerald-500/20 shrink-0 mt-0.5">
                <Leaf size={11} weight="fill" className="text-emerald-400" />
              </div>
              <p className="text-[clamp(0.9rem,1.5vw,1rem)] font-medium text-slate-400 leading-relaxed group-hover/item:text-slate-200 transition-colors">
                {point}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
