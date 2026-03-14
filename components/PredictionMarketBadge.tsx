import {
  getPredictionCategory,
  getPredictionCategoryLabel,
} from "@/lib/prediction-utils"

type Props = {
  prediction: string
}

export default function PredictionMarketBadge({ prediction }: Props) {
  const category = getPredictionCategory(prediction)
  const label = getPredictionCategoryLabel(prediction)

  if (category === "cards") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-amber-100">
        <span className="inline-block h-4 w-3 rounded-[3px] border border-amber-100 bg-amber-300/85 shadow-[0_0_12px_rgba(251,191,36,0.28)]" />
        {label}
      </span>
    )
  }

  if (category === "goals") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-100">
        <span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full border border-emerald-100/90">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-100" />
        </span>
        {label}
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
      <span className="inline-block h-2.5 w-2.5 rounded-full bg-white/70" />
      {label}
    </span>
  )
}
