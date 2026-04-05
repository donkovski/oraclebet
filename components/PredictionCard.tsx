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
    <article className="group relative overflow-hidden rounded-[24px] border border-slate-200/80 bg-white/82 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.07)] transition duration-200 hover:-translate-y-0.5 hover:border-orange-300/45 hover:bg-white">
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">{kickoff}</p>
            {publishedAt && (
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
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

        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Прогноза
          </p>
          <p className="mt-1.5 text-lg font-semibold text-slate-900">{prediction}</p>
        </div>

        {analysis && (
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white/75 p-3.5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Анализ
            </p>
            <p className="mt-1.5 text-sm leading-7 text-slate-600">{analysis}</p>
          </div>
        )}

        <div className="mt-4">
          <PredictionCountdown kickoff={kickoff} />
        </div>
      </div>
    </article>
  )
}
