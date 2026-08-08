import { Dna } from "@phosphor-icons/react/dist/ssr"
import { Card, CardHeader, CardTitle, CardContent } from "@workspace/ui/components/card"
import { SpeciesData } from "@/types/species"

export function GeneralFeaturesCard({ data }: { data: SpeciesData }) {
  if (!data.features || Object.keys(data.features).length === 0) return null

  return (
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
  )
}
