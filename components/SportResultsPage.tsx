import type { Result } from "@/types/results"
import type { PublicLocale } from "@/lib/public-locale"
import Link from "next/link"
import ProfitChart from "@/components/ProfitChart"
import ResultsArchive from "@/components/ResultsArchive"
import ResultsPieChart from "@/components/ResultsPieChart"

type SportResultsPageProps = {
  label: string
  results: Result[]
  emptyTitle: string
  emptyDescription: string
  predictionHref: string
  predictionLabel: string
  accentClassName: string
  locale?: PublicLocale
}

export default function SportResultsPage({
  label,
  results,
  emptyTitle,
  emptyDescription,
  predictionHref,
  predictionLabel,
  accentClassName,
  locale = "bg",
}: SportResultsPageProps) {
  const total = results.length
  const wins = results.filter((result) => result.status === "WIN").length
  const losses = results.filter((result) => result.status === "LOSE").length
  const voids = results.filter((result) => result.status === "VOID").length

  const settledBets = wins + losses
  const winRate = settledBets === 0 ? "0.0" : ((wins / settledBets) * 100).toFixed(1)

  const profit = results
    .reduce((sum, item) => {
      if (item.status === "WIN") return sum + (item.odds - 1)
      if (item.status === "LOSE") return sum - 1
      return sum
    }, 0)
    .toFixed(2)

  const roi = settledBets === 0 ? "0" : ((Number(profit) / settledBets) * 100).toFixed(1)
  const roiValue = Number(roi)

  let roiColor = "text-slate-400"
  if (roiValue > 0) roiColor = "text-green-400"
  if (roiValue < 0) roiColor = "text-red-400"

  const copy =
    locale === "en"
      ? {
          archiveAndStats: "Archive and stats",
          total: "Total",
          winRate: "Win Rate",
          roi: "ROI",
        }
      : {
          archiveAndStats: "Архив и статистика",
          total: "Общо",
          winRate: "Win Rate",
          roi: "ROI",
        }

  if (results.length === 0) {
    return (
      <main className="space-y-8">
        <section className="rounded-[28px] border border-white/10 bg-slate-950/15 p-6 backdrop-blur-lg md:p-8">
          <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${accentClassName}`}>
            {label}
          </p>
          <h1 className="mt-3 text-4xl font-bold text-white">{emptyTitle}</h1>
          <p className="mt-4 max-w-3xl leading-7 text-white/75">{emptyDescription}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={predictionHref}
              className="rounded-full bg-orange-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-orange-300"
            >
              {predictionLabel}
            </Link>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="space-y-8">
      <section className="rounded-[28px] border border-white/10 bg-slate-950/15 p-6 backdrop-blur-lg md:p-8">
        <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${accentClassName}`}>
          {copy.archiveAndStats}
        </p>
        <h1 className="mt-3 text-4xl font-bold text-white">{label}</h1>
      </section>

      <ResultsArchive results={results} locale={locale} />

      <section className="space-y-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-slate-950/15 p-4 text-center backdrop-blur-lg">
            <p className="text-sm text-white/55">{copy.total}</p>
            <p className="text-xl font-bold text-white">{total}</p>
          </div>

          <div className="rounded-2xl border border-emerald-300/35 bg-emerald-950/70 p-4 text-center backdrop-blur-lg">
            <p className="text-sm text-emerald-100">WIN</p>
            <p className="text-xl font-bold text-white">{wins}</p>
          </div>

          <div className="rounded-2xl border border-rose-300/35 bg-rose-950/70 p-4 text-center backdrop-blur-lg">
            <p className="text-sm text-rose-100">LOSE</p>
            <p className="text-xl font-bold text-white">{losses}</p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-slate-900/55 p-4 text-center backdrop-blur-lg">
            <p className="text-sm text-white/65">VOID</p>
            <p className="text-xl font-bold text-white">{voids}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/15 p-4 text-center backdrop-blur-lg">
            <p className="text-sm text-white/55">{copy.winRate}</p>
            <p className="text-xl font-bold text-green-400">{winRate}%</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/15 p-4 text-center backdrop-blur-lg">
            <p className="text-sm text-white/55">{copy.roi}</p>
            <p className={`text-xl font-bold ${roiColor}`}>{roi}%</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <ProfitChart results={results} locale={locale} />
          <ResultsPieChart results={results} locale={locale} />
        </div>
      </section>
    </main>
  )
}
