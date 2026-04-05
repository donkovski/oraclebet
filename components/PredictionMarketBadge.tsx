import type { PredictionSport } from "@/lib/sports"
import { getPredictionCategory, getPredictionCategoryLabel } from "@/lib/prediction-utils"

type Props = {
  prediction: string
  sport?: PredictionSport
}

export default function PredictionMarketBadge({
  prediction,
  sport = "football",
}: Props) {
  const category = getPredictionCategory(prediction, sport)
  const label = getPredictionCategoryLabel(prediction, sport)

  if (category === "cards") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/45 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-amber-700">
        <span className="inline-block h-4 w-3 rounded-[3px] border border-amber-300 bg-amber-300/85 shadow-[0_0_12px_rgba(251,191,36,0.18)]" />
        {label}
      </span>
    )
  }

  if (category === "totals") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/45 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
        <span className="inline-flex h-4 w-4 items-center justify-center">
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
          >
            <circle
              cx="8"
              cy="8"
              r="6.25"
              className="fill-white stroke-emerald-700"
              strokeWidth="1.2"
            />
            <path
              d="M8 4.6L10.3 6.2L9.45 8.9H6.55L5.7 6.2L8 4.6Z"
              className="fill-emerald-700"
            />
            <path
              d="M8 4.6V2.9M10.3 6.2L12.8 5.65M9.45 8.9L11.2 10.9M6.55 8.9L4.8 10.9M5.7 6.2L3.2 5.65"
              className="stroke-emerald-700"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
        {label}
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-700 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
      <span className="inline-flex min-w-[2rem] items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[0.62rem] font-black tracking-[0.12em] text-slate-600">
        1X2
      </span>
      {label}
    </span>
  )
}
