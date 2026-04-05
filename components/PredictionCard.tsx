import CompetitionBadge from "@/components/CompetitionBadge"
import PredictionCountdown from "@/components/PredictionCountdown"
import PredictionMarketBadge from "@/components/PredictionMarketBadge"
import type { PredictionSport } from "@/lib/sports"

type Props = {
  match: string
  kickoff: string
  publishedAt?: string
  country?: string
  league?: string
  prediction: string
  analysis?: string
  odds: string
  sport?: PredictionSport
}

export default function PredictionCard({
  match,
  kickoff,
  publishedAt,
  country,
  league,
  prediction,
  analysis,
  odds,
  sport = "football",
}: Props) {
  return (
    <article className="theme-panel-soft group relative overflow-hidden rounded-[24px] p-5 transition duration-200 hover:-translate-y-0.5 hover:border-orange-300/45">
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="theme-muted text-sm font-medium">{kickoff}</p>
            {publishedAt && (
              <p className="theme-muted mt-1 text-xs font-semibold uppercase tracking-[0.14em]">
                Добавена: {publishedAt}
              </p>
            )}
          </div>

          <div className="rounded-full border border-orange-300/45 bg-orange-50 px-3 py-1 text-sm font-bold text-orange-700">
            {odds}
          </div>
        </div>

        <h3 className="mt-4 text-[1.85rem] font-bold leading-tight text-slate-950">{match}</h3>

        <div className="mt-3 flex flex-wrap gap-3">
          <PredictionMarketBadge prediction={prediction} sport={sport} />

          {country && league && (
            <div>
              <CompetitionBadge country={country} league={league} />
            </div>
          )}
        </div>

        <div className="theme-surface-soft mt-4 rounded-2xl p-3.5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Прогноза
          </p>
          <p className="theme-title mt-1.5 text-lg font-semibold">{prediction}</p>
        </div>

        {analysis && (
          <div className="theme-surface mt-4 rounded-2xl p-3.5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Анализ
            </p>
            <p className="theme-text mt-1.5 text-sm leading-7">{analysis}</p>
          </div>
        )}

        <div className="mt-4">
          <PredictionCountdown kickoff={kickoff} />
        </div>
      </div>
    </article>
  )
}
