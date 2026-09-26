import { Dna } from "@phosphor-icons/react/dist/ssr"
import { Card, CardHeader, CardTitle, CardContent } from "@workspace/ui/components/card"
import { SpeciesData } from "@/types/species"

export function GeneralFeaturesCard({ data }: { data: SpeciesData }) {
  if (!data.features || Object.keys(data.features).length === 0) return null

  return (
    <div className="lg:col-span-2 rounded-2xl bg-white/[0.02] border border-white/5 shadow-2xl backdrop-blur-xl overflow-hidden">
      <div className="bg-white/[0.02] border-b border-white/5 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="text-blue-400 p-2 bg-blue-500/10 rounded-lg">
            <Dna size={20} weight="duotone" />
          </div>
          <h3 className="text-lg font-bold text-slate-200 tracking-tight">General Features</h3>
        </div>
      </div>
      <div className="p-0">
        <dl className="divide-y divide-white/5 text-[clamp(0.9rem,1.5vw,1rem)]">
          {Object.entries(data.features).map(([key, value]) => (
            <div
              key={key}
              className="flex flex-col sm:flex-row sm:items-start px-6 py-4 hover:bg-white/[0.02] transition-colors duration-300"
            >
              <dt className="sm:w-1/3 shrink-0 mb-1 sm:mb-0 pr-4 font-bold text-slate-300">
                {key}
              </dt>
              <dd className="sm:w-2/3 text-slate-400 leading-relaxed font-medium">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
