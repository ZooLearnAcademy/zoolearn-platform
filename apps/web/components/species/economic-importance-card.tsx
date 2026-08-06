import { CurrencyDollar } from "@phosphor-icons/react/dist/ssr"
import { Card, CardHeader, CardTitle, CardContent } from "@workspace/ui/components/card"
import { SpeciesData } from "@/types/species"

export function EconomicImportanceCard({ data }: { data: SpeciesData }) {
  if (!data.economy?.length) return null

  return (
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
  )
}
