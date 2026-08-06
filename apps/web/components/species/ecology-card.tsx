import { Leaf } from "@phosphor-icons/react/dist/ssr"
import { Card, CardHeader, CardTitle, CardContent } from "@workspace/ui/components/card"
import { SpeciesData } from "@/types/species"

export function EcologyCard({ data }: { data: SpeciesData }) {
  if (!data.ecology?.length) return null

  return (
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
  )
}
