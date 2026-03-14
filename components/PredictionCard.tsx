type Props = {
  match: string
  kickoff: string
  prediction: string
  odds: string
}

export default function PredictionCard({ match, kickoff, prediction, odds }: Props) {
  return (
    <article className="group rounded-[28px] border border-white/10 bg-slate-950/24 p-6 shadow-[0_18px_40px_rgba(8,15,34,0.2)] backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:border-orange-300/45 hover:bg-slate-950/32">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <span className="inline-flex rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/65">
            Дневна селекция
          </span>
          <p className="text-sm font-medium text-white/65">{kickoff}</p>
        </div>

        <div className="rounded-full border border-orange-300/30 bg-orange-300/14 px-3 py-1 text-sm font-bold text-orange-100">
          {odds}
        </div>
      </div>

      <h3 className="mt-5 text-2xl font-bold leading-tight text-white">{match}</h3>

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/6 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
          Прогноза
        </p>
        <p className="mt-2 text-lg font-semibold text-white">{prediction}</p>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 text-sm text-white/58">
        <span>Начало: {kickoff}</span>
        <span className="font-semibold text-orange-200/90">OracleBet</span>
      </div>
    </article>
  )
}
