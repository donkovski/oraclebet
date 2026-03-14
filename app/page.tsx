import CompetitionBadge from "../components/CompetitionBadge"
import Link from "next/link"
import OracleBetLogo from "../components/OracleBetLogo"
import PredictionMarketBadge from "../components/PredictionMarketBadge"
import { predictions } from "../data/predictions"
import { sortPredictionsByKickoff } from "../lib/prediction-utils"

export default function Home() {
  const sortedPredictions = sortPredictionsByKickoff(predictions)
  const totalPredictions = sortedPredictions.length
  const averageOdds =
    totalPredictions === 0
      ? "0.00"
      : (
          sortedPredictions.reduce((sum, item) => sum + Number(item.odds), 0) / totalPredictions
        ).toFixed(2)
  const firstKickoff = sortedPredictions[0]?.kickoff ?? ""
  const activeDate = firstKickoff ? firstKickoff.split(" ")[0] : "Няма дата"

  return (
    <main>
      <section className="rounded-[32px] border border-white/10 bg-slate-950/20 p-8 shadow-[0_24px_80px_rgba(8,15,34,0.28)] backdrop-blur-xl md:p-10">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-orange-300/40 bg-orange-300/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">
              <OracleBetLogo size={34} />
              <span>OracleBet</span>
            </div>

            <h1 className="text-5xl font-black tracking-tight text-white md:text-6xl">
              OracleBet вече е активен и първите прогнози са публикувани.
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">
              Следи дневните селекции, преглеждай коефициентите в ясен формат и
              използвай архива с резултати, когато първите срещи приключат.
              OracleBet е направен така, че съдържанието да е бързо, подредено
              и удобно за четене на телефон и компютър.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/bezplatni"
                className="rounded-full bg-orange-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-orange-300"
              >
                Към прогнозите
              </Link>
              <Link
                href="/rezultati"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Към резултатите
              </Link>
            </div>
          </div>

          <aside className="rounded-[28px] border border-white/10 bg-white/5 p-6 text-sm text-white/75 shadow-[0_12px_32px_rgba(15,23,42,0.16)] backdrop-blur-lg">
            <div className="flex items-center gap-3">
              <OracleBetLogo size={30} />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
                Днес в сайта
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-4 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  Прогнози
                </p>
                <p className="mt-2 text-2xl font-bold text-white">{totalPredictions}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-4 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  Средно
                </p>
                <p className="mt-2 text-2xl font-bold text-orange-100">{averageOdds}</p>
              </div>
              <div className="col-span-2 rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-4 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  Дата
                </p>
                <p className="mt-2 text-lg font-bold text-emerald-100">{activeDate}</p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {sortedPredictions.map((item) => (
                <div
                  key={`${item.match}-${item.kickoff}`}
                  className="rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-xs font-semibold text-orange-200">{item.kickoff}</p>
                    <PredictionMarketBadge prediction={item.prediction} />
                  </div>
                  <p className="mt-1 font-semibold text-white">{item.match}</p>
                  <div className="mt-2">
                    <CompetitionBadge country={item.country} league={item.league} />
                  </div>
                  <p className="mt-1 text-white/70">{item.prediction}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
