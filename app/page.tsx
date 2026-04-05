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
      <section className="rounded-[32px] border border-slate-200/80 bg-white/72 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl md:p-10">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_380px] xl:items-start">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex rounded-full border border-orange-300/50 bg-orange-100/80 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-orange-700">
              OracleBet.eu
            </div>

            <h1 className="text-5xl font-black tracking-tight text-slate-950 md:text-6xl">
              Спортни прогнози за днес, анализи и резултати на едно място.
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Следи подбрани мачове за футбол, хокей, баскетбол, бейзбол и тенис с
              бърз достъп до <span className="font-semibold text-slate-900">Прогнози</span> и{" "}
              <span className="font-semibold text-slate-900">Резултати</span>. OracleBet ти
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
                className="rounded-full border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                Към резултати
              </Link>
            </div>
          </div>

          <aside className="rounded-[28px] border border-slate-200/80 bg-slate-50/80 p-6 text-sm text-slate-600 shadow-[0_12px_32px_rgba(15,23,42,0.06)] backdrop-blur-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Днес в сайта
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-4 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Общо
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-950">{totalPredictions}</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-4 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Дата
                </p>
                <p className="mt-2 text-lg font-bold text-emerald-700">{activeDate}</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-4 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Футбол
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-950">
                  {groupedPredictions.football.length}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-4 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Хокей
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-950">
                  {groupedPredictions.hockey.length}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-4 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Баскетбол
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-950">
                  {groupedPredictions.basketball.length}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-4 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Бейзбол
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-950">
                  {groupedPredictions.baseball.length}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-4 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Тенис
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-950">
                  {groupedPredictions.tennis.length}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-white/90 px-4 py-4 text-center text-slate-600">
              Използвай{" "}
              <Link
                href="/tips"
                className="font-semibold text-orange-700 transition hover:text-orange-600"
              >
                Прогнози
              </Link>{" "}
              за активните мачове и{" "}
              <Link
                href="/rezultati"
                className="font-semibold text-orange-700 transition hover:text-orange-600"
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
