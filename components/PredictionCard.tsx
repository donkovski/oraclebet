import CompetitionBadge from "@/components/CompetitionBadge"
import PredictionCountdown from "@/components/PredictionCountdown"
import PredictionMarketBadge from "@/components/PredictionMarketBadge"
import type { PredictionSport } from "@/lib/sports"

type Props = {
  match: string
  kickoff: string
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
  country,
  league,
  prediction,
  analysis,
  odds,
  sport = "football",
}: Props) {
  return (
    <article className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-slate-950/24 p-5 shadow-[0_18px_40px_rgba(8,15,34,0.2)] backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:border-orange-300/45 hover:bg-slate-950/32">
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm font-medium text-white/65">{kickoff}</p>

          <div className="rounded-full border border-orange-300/30 bg-orange-300/14 px-3 py-1 text-sm font-bold text-orange-100">
            {odds}
          </div>
        </div>

        <h3 className="mt-4 text-[1.85rem] font-bold leading-tight text-white">{match}</h3>

        <div className="mt-3 flex flex-wrap gap-3">
          <PredictionMarketBadge prediction={prediction} sport={sport} />

          {country && league && (
            <div>
              <CompetitionBadge country={country} league={league} />
            </div>
          )}
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/6 p-3.5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
            Прогноза
          </p>
          <p className="mt-1.5 text-lg font-semibold text-white">{prediction}</p>
        </div>

        {analysis && (
          <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/28 p-3.5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
              Анализ
            </p>
            <p className="mt-1.5 text-sm leading-7 text-white/80">{analysis}</p>
          </div>
        )}

        <div className="mt-4">
          <PredictionCountdown kickoff={kickoff} />
        </div>
      </div>
    </article>
  )
}
