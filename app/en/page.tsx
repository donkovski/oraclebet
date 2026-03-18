import type { Metadata } from "next"
import Link from "next/link"
import {
  getBaseballPredictions,
  getBasketballPredictions,
  getFootballPredictions,
  getHockeyPredictions,
} from "@/lib/supabase-content"
import { sortPredictionsByKickoff } from "@/lib/prediction-utils"

export const metadata: Metadata = {
  title: "Today's sports picks",
  description:
    "Browse today's OracleBet picks by sport with a cleaner structure for tips and results.",
  alternates: {
    canonical: "/en",
  },
}

export default async function EnglishHomePage() {
  const [footballPredictions, hockeyPredictions, basketballPredictions, baseballPredictions] =
    await Promise.all([
      getFootballPredictions(),
      getHockeyPredictions(),
      getBasketballPredictions(),
      getBaseballPredictions(),
    ])

  const groupedPredictions = {
    football: sortPredictionsByKickoff(footballPredictions),
    hockey: sortPredictionsByKickoff(hockeyPredictions),
    basketball: sortPredictionsByKickoff(basketballPredictions),
    baseball: sortPredictionsByKickoff(baseballPredictions),
  }

  const allPredictions = sortPredictionsByKickoff([
    ...groupedPredictions.football,
    ...groupedPredictions.hockey,
    ...groupedPredictions.basketball,
    ...groupedPredictions.baseball,
  ])

  const totalPredictions = allPredictions.length
  const activeDate = allPredictions[0]?.kickoff.split(" ")[0] ?? "No date"

  return (
    <main>
      <section className="rounded-[32px] border border-white/10 bg-slate-950/20 p-8 shadow-[0_24px_80px_rgba(8,15,34,0.28)] backdrop-blur-xl md:p-10">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_380px] xl:items-start">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex rounded-full border border-orange-300/40 bg-orange-300/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">
              OracleBet.eu
            </div>

            <h1 className="text-5xl font-black tracking-tight text-white md:text-6xl">
              OracleBet is now structured by sport for easier tips and results.
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">
              The site now has separate sections for football, hockey, basketball and
              baseball. Start from the main <span className="font-semibold text-white">Tips</span> and{" "}
              <span className="font-semibold text-white">Results</span> pages, then open the
              sport you want to follow.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/en/tips"
                className="rounded-full bg-orange-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-orange-300"
              >
                Go to tips
              </Link>
              <Link
                href="/en/results"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Go to results
              </Link>
            </div>
          </div>

          <aside className="rounded-[28px] border border-white/10 bg-white/5 p-6 text-sm text-white/75 shadow-[0_12px_32px_rgba(15,23,42,0.16)] backdrop-blur-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
              Today on the site
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-4 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  Total
                </p>
                <p className="mt-2 text-2xl font-bold text-white">{totalPredictions}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-4 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  Date
                </p>
                <p className="mt-2 text-lg font-bold text-emerald-100">{activeDate}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-4 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  Football
                </p>
                <p className="mt-2 text-2xl font-bold text-white">
                  {groupedPredictions.football.length}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-4 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  Hockey
                </p>
                <p className="mt-2 text-2xl font-bold text-white">{groupedPredictions.hockey.length}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-4 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  Basketball
                </p>
                <p className="mt-2 text-2xl font-bold text-white">
                  {groupedPredictions.basketball.length}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-4 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  Baseball
                </p>
                <p className="mt-2 text-2xl font-bold text-white">
                  {groupedPredictions.baseball.length}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-4 text-center text-white/65">
              Use{" "}
              <Link
                href="/en/tips"
                className="font-semibold text-orange-200 transition hover:text-orange-100"
              >
                Tips
              </Link>{" "}
              for active matches and{" "}
              <Link
                href="/en/results"
                className="font-semibold text-orange-200 transition hover:text-orange-100"
              >
                Results
              </Link>{" "}
              for archives by sport.
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
