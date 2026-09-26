import { BookOpenText } from "@phosphor-icons/react/dist/ssr"
import { Card, CardHeader, CardTitle, CardContent } from "@workspace/ui/components/card"
import { SpeciesData } from "@/types/species"

export function IntroductionCard({ data }: { data: SpeciesData }) {
  if (!data.introduction?.length) return null

  return (
    <div className="lg:col-span-2 rounded-2xl bg-white/[0.02] border border-white/5 shadow-2xl backdrop-blur-xl overflow-hidden">
      <div className="bg-white/[0.02] border-b border-white/5 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="text-emerald-400 p-2 bg-emerald-500/10 rounded-lg">
            <BookOpenText size={20} weight="duotone" />
          </div>
          <h3 className="text-lg font-bold text-slate-200 tracking-tight">Introduction</h3>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {data.introduction.map((point, i) => (
            <p
              key={i}
              className="text-[clamp(0.95rem,1.5vw,1.05rem)] font-medium text-slate-300 leading-relaxed pl-4 border-l-2 border-white/10 hover:border-emerald-400 hover:text-white transition-all duration-300"
            >
              {point}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
