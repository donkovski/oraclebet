import type { Metadata } from "next"
import Link from "next/link"
import ProfitChart from "../../components/ProfitChart"
import ResultsArchive from "../../components/ResultsArchive"
import ResultsPieChart from "../../components/ResultsPieChart"
import { getFootballResults } from "../../lib/supabase-content"

export const metadata: Metadata = {
  title: "Футболни резултати и статистика",
  description:
    "Прегледай архива с футболни резултати и статистиката в OracleBet по дати, месеци и години.",
  alternates: {
    canonical: "/rezultati",
  },
}

export default async function ResultsPage() {
  const results = await getFootballResults()
  const total = results.length
  const wins = results.filter((r) => r.status === "WIN").length
  const losses = results.filter((r) => r.status === "LOSE").length
  const voids = results.filter((r) => r.status === "VOID").length

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

  if (results.length === 0) {
    return (
      <main className="space-y-8">
        <section className="rounded-[28px] border border-white/10 bg-slate-950/15 p-6 backdrop-blur-lg md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">
            Футболни резултати
          </p>
          <h1 className="mt-3 text-4xl font-bold text-white">
            Архивът за футбола ще започне да се попълва след първите приключени мачове.
          </h1>
          <p className="mt-4 max-w-3xl leading-7 text-white/75">
            След като публикуваните футболни прогнози приключат, тук автоматично ще започне
            да се трупа реален архив с резултати, статистика и история по дати.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/bezplatni"
              className="rounded-full bg-orange-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-orange-300"
            >
              Към футболни прогнози
            </Link>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="space-y-8">
      <section className="rounded-[28px] border border-white/10 bg-slate-950/15 p-6 backdrop-blur-lg md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">
          Архив и статистика
        </p>
        <h1 className="mt-3 text-4xl font-bold text-white">Футболни резултати</h1>
      </section>

      <ResultsArchive results={results} />

      <section className="space-y-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-slate-950/15 p-4 text-center backdrop-blur-lg">
            <p className="text-sm text-white/55">Общо</p>
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
            <p className="text-sm text-white/55">Win Rate</p>
            <p className="text-xl font-bold text-green-400">{winRate}%</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/15 p-4 text-center backdrop-blur-lg">
            <p className="text-sm text-white/55">ROI</p>
            <p className={`text-xl font-bold ${roiColor}`}>{roi}%</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <ProfitChart results={results} />
          <ResultsPieChart results={results} />
        </div>
      </section>
    </main>
  )
}
