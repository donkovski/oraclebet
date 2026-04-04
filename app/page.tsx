import type { Metadata } from "next"
import Link from "next/link"
import {
  getBaseballPredictions,
  getBasketballPredictions,
  getFootballPredictions,
  getHockeyPredictions,
  getTennisPredictions,
} from "@/lib/supabase-content"
import { sortPredictionsByKickoff } from "@/lib/prediction-utils"

export const metadata: Metadata = {
  title: "Спортни прогнози за днес, анализи и резултати",
  description:
    "Виж спортни прогнози за днес, анализи и резултати за футбол, хокей, баскетбол, бейзбол и тенис в OracleBet. Подредени мачове, удобен архив и ясна статистика на едно място.",
  alternates: {
    canonical: "/",
  },
}

export default async function Home() {
  const [
    footballPredictions,
    hockeyPredictions,
    basketballPredictions,
    baseballPredictions,
    tennisPredictions,
  ] = await Promise.all([
    getFootballPredictions(),
    getHockeyPredictions(),
    getBasketballPredictions(),
    getBaseballPredictions(),
    getTennisPredictions(),
  ])

  const groupedPredictions = {
    football: sortPredictionsByKickoff(footballPredictions),
    hockey: sortPredictionsByKickoff(hockeyPredictions),
    basketball: sortPredictionsByKickoff(basketballPredictions),
    baseball: sortPredictionsByKickoff(baseballPredictions),
    tennis: sortPredictionsByKickoff(tennisPredictions),
  }

  const allPredictions = sortPredictionsByKickoff([
    ...groupedPredictions.football,
    ...groupedPredictions.hockey,
    ...groupedPredictions.basketball,
    ...groupedPredictions.baseball,
    ...groupedPredictions.tennis,
  ])

  const totalPredictions = allPredictions.length
  const activeDate = allPredictions[0]?.kickoff.split(" ")[0] ?? "Няма дата"

  return (
    <main>
      <section className="rounded-[32px] border border-white/12 bg-slate-950/12 p-8 shadow-[0_24px_80px_rgba(8,15,34,0.18)] backdrop-blur-sm md:p-10">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_380px] xl:items-start">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex rounded-full border border-orange-300/40 bg-orange-300/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">
              OracleBet.eu
            </div>

            <h1 className="text-5xl font-black tracking-tight text-white md:text-6xl">
              Спортни прогнози за днес, анализи и резултати на едно място.
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">
              Следи подбрани мачове за футбол, хокей, баскетбол, бейзбол и тенис с
              бърз достъп до <span className="font-semibold text-white">Прогнози</span> и{" "}
              <span className="font-semibold text-white">Резултати</span>. OracleBet ти
              помага да намираш важните срещи по-бързо с удобна структура и ясен
              архив.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/tips"
                className="rounded-full bg-orange-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-orange-300"
              >
                Към прогнози
              </Link>
              <Link
                href="/rezultati"
                className="rounded-full border border-white/12 bg-white/[0.04] px-6 py-3 font-semibold text-white transition hover:bg-white/[0.08]"
              >
                Към резултати
              </Link>
            </div>
          </div>

          <aside className="rounded-[28px] border border-white/12 bg-white/[0.04] p-6 text-sm text-white/75 shadow-[0_12px_32px_rgba(15,23,42,0.12)] backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
              Днес в сайта
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/12 bg-slate-950/12 px-4 py-4 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  Общо
                </p>
                <p className="mt-2 text-2xl font-bold text-white">{totalPredictions}</p>
              </div>

              <div className="rounded-2xl border border-white/12 bg-slate-950/12 px-4 py-4 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  Дата
                </p>
                <p className="mt-2 text-lg font-bold text-emerald-100">{activeDate}</p>
              </div>

              <div className="rounded-2xl border border-white/12 bg-slate-950/12 px-4 py-4 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  Футбол
                </p>
                <p className="mt-2 text-2xl font-bold text-white">
                  {groupedPredictions.football.length}
                </p>
              </div>

              <div className="rounded-2xl border border-white/12 bg-slate-950/12 px-4 py-4 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  Хокей
                </p>
                <p className="mt-2 text-2xl font-bold text-white">
                  {groupedPredictions.hockey.length}
                </p>
              </div>

              <div className="rounded-2xl border border-white/12 bg-slate-950/12 px-4 py-4 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  Баскетбол
                </p>
                <p className="mt-2 text-2xl font-bold text-white">
                  {groupedPredictions.basketball.length}
                </p>
              </div>

              <div className="rounded-2xl border border-white/12 bg-slate-950/12 px-4 py-4 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  Бейзбол
                </p>
                <p className="mt-2 text-2xl font-bold text-white">
                  {groupedPredictions.baseball.length}
                </p>
              </div>

              <div className="rounded-2xl border border-white/12 bg-slate-950/12 px-4 py-4 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  Тенис
                </p>
                <p className="mt-2 text-2xl font-bold text-white">
                  {groupedPredictions.tennis.length}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-white/12 bg-slate-950/12 px-4 py-4 text-center text-white/65">
              Използвай{" "}
              <Link
                href="/tips"
                className="font-semibold text-orange-200 transition hover:text-orange-100"
              >
                Прогнози
              </Link>{" "}
              за активните мачове и{" "}
              <Link
                href="/rezultati"
                className="font-semibold text-orange-200 transition hover:text-orange-100"
              >
                Резултати
              </Link>{" "}
              за архивите по спорт.
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
