import type { PublicLocale } from "@/lib/public-locale"
import {
  getPredictionCategory,
  getPredictionCategoryLabel,
} from "@/lib/prediction-utils"

type Props = {
  prediction: string
  locale?: PublicLocale
}

export default function PredictionMarketBadge({
  prediction,
  locale = "bg",
}: Props) {
  const category = getPredictionCategory(prediction)
  const label = getPredictionCategoryLabel(prediction, locale)

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
            <circle cx="8" cy="8" r="6.25" className="fill-white stroke-emerald-950" strokeWidth="1.2" />
            <path
              d="M8 4.6L10.3 6.2L9.45 8.9H6.55L5.7 6.2L8 4.6Z"
              className="fill-emerald-950"
            />
            <path
              d="M8 4.6V2.9M10.3 6.2L12.8 5.65M9.45 8.9L11.2 10.9M6.55 8.9L4.8 10.9M5.7 6.2L3.2 5.65"
              className="stroke-emerald-950"
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
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
      <span className="inline-block h-2.5 w-2.5 rounded-full bg-white/70" />
      {label}
    </span>
  )
}
