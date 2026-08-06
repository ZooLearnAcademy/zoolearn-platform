import { BookOpenText } from "@phosphor-icons/react/dist/ssr"
import { Card, CardHeader, CardTitle, CardContent } from "@workspace/ui/components/card"
import { SpeciesData } from "@/types/species"

export function IntroductionCard({ data }: { data: SpeciesData }) {
  if (!data.introduction?.length) return null

  return (
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
              className="text-[clamp(0.875rem,1.5vw,1rem)] text-muted-foreground leading-relaxed pl-[clamp(0.75rem,2vw,1rem)] border-l-2 border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-600 hover:text-slate-800 dark:hover:text-slate-200 transition-all duration-300"
            >
              {point}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
