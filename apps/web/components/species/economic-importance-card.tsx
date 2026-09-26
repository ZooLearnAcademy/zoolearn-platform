import { CurrencyDollar } from "@phosphor-icons/react/dist/ssr"
import { Card, CardHeader, CardTitle, CardContent } from "@workspace/ui/components/card"
import { SpeciesData } from "@/types/species"

export function EconomicImportanceCard({ data }: { data: SpeciesData }) {
  if (!data.economy?.length) return null

  return (
    <div className="rounded-2xl bg-white/[0.02] border border-white/5 shadow-2xl backdrop-blur-xl overflow-hidden">
      <div className="bg-white/[0.02] border-b border-white/5 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="text-amber-400 p-2 bg-amber-500/10 rounded-lg">
            <CurrencyDollar size={20} weight="duotone" />
          </div>
          <h3 className="text-lg font-bold text-slate-200 tracking-tight">Economic Importance</h3>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {data.economy.map((point, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-amber-500/30 hover:shadow-lg transition-all duration-300">
              <CurrencyDollar size={18} weight="fill" className="text-amber-400 shrink-0 mt-0.5" />
              <p className="text-[clamp(0.9rem,1.5vw,1.05rem)] font-medium text-slate-300 leading-relaxed group-hover:text-white transition-colors">
                {point}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
