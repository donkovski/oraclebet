import type { Metadata } from "next"
import Link from "next/link"
import PredictionCard from "../../components/PredictionCard"
import { hockeyPredictions } from "../../data/hockey-predictions"
import { sortPredictionsByKickoff } from "../../lib/prediction-utils"

export const metadata: Metadata = {
  title: "Хокей прогнози",
  description:
    "Разгледай хокей прогнози в OracleBet. Страницата е подготвена за публикуване на селекции по лиги, час и коефициент.",
  alternates: {
    canonical: "/hokei-prognozi",
  },
}

export default function HokeiPrognoziPage() {
  if (hockeyPredictions.length === 0) {
    return (
      <main className="space-y-8">
        <section className="rounded-[30px] border border-white/10 bg-slate-950/22 p-6 shadow-[0_22px_60px_rgba(8,15,34,0.22)] backdrop-blur-xl md:p-8">
          <p className="inline-flex rounded-full border border-sky-300/35 bg-sky-300/12 px-4 py-1 text-sm font-semibold uppercase tracking-[0.18em] text-sky-100">
            Хокей прогнози
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
            В момента няма активни хокей прогнози.
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-white/75">
            Страницата е готова и първите хокей селекции ще се появят тук автоматично,
            когато бъдат публикувани.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/bezplatni"
              className="rounded-full bg-orange-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-orange-300"
            >
              Към футболни прогнози
            </Link>
            <Link
              href="/rezultati"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Към резултатите
            </Link>
          </div>
        </section>
      </main>
    )
  }

  const sortedPredictions = sortPredictionsByKickoff(hockeyPredictions)

  return (
    <main className="space-y-8">
      <section className="rounded-[30px] border border-white/10 bg-slate-950/22 p-6 shadow-[0_22px_60px_rgba(8,15,34,0.22)] backdrop-blur-xl md:p-8">
        <p className="inline-flex rounded-full border border-sky-300/35 bg-sky-300/12 px-4 py-1 text-sm font-semibold uppercase tracking-[0.18em] text-sky-100">
          Хокей прогнози
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
          Активни хокей селекции
        </h1>
      </section>

      <div className="mx-auto w-full max-w-[56rem] space-y-4">
        {sortedPredictions.map((item) => (
          <PredictionCard
            key={`${item.match}-${item.prediction}`}
            match={item.match}
            kickoff={item.kickoff}
            country={item.country}
            league={item.league}
            prediction={item.prediction}
            odds={item.odds}
          />
        ))}
      </div>
    </main>
  )
}
