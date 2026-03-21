"use client"

import { useEffect, useMemo, useState } from "react"
import CompetitionBadge from "@/components/CompetitionBadge"
import PredictionCard from "@/components/PredictionCard"
import PredictionCountdown from "@/components/PredictionCountdown"
import PredictionMarketBadge from "@/components/PredictionMarketBadge"
import { parseKickoff, sortPredictionsByKickoff } from "@/lib/prediction-utils"
import type { PredictionSport } from "@/lib/sports"

type PredictionItem = {
  match: string
  kickoff: string
  country: string
  league: string
  prediction: string
  analysis?: string
  odds: string
}

type Props = {
  predictions: PredictionItem[]
  sportLabel?: string
  introTitle?: string
  finishedTitle?: string
  sport?: PredictionSport
}

export default function PredictionsBoard({
  predictions,
  sportLabel = "Футболни прогнози",
  introTitle = "Днешните футболни селекции са вече публикувани.",
  finishedTitle = "Всички футболни прогнози за деня вече са започнали.",
  sport = "football",
}: Props) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(Date.now())
    }, 30000)

    return () => window.clearInterval(intervalId)
  }, [])

  const sortedPredictions = useMemo(() => sortPredictionsByKickoff(predictions), [predictions])

  const startedPredictions = useMemo(
    () => sortedPredictions.filter((item) => parseKickoff(item.kickoff).getTime() <= now),
    [now, sortedPredictions]
  )

  const upcomingPredictions = useMemo(
    () => sortedPredictions.filter((item) => parseKickoff(item.kickoff).getTime() > now),
    [now, sortedPredictions]
  )

  const totalPredictions = sortedPredictions.length
  const averageOdds = (
    sortedPredictions.reduce((sum, item) => sum + Number(item.odds), 0) /
    Math.max(totalPredictions, 1)
  ).toFixed(2)
  const referencePrediction = upcomingPredictions[0] ?? sortedPredictions[0]
  const activeDate = referencePrediction?.kickoff.split(" ")[0] ?? "—"
  const featuredPrediction = upcomingPredictions[0] ?? null
  const remainingPredictions = featuredPrediction ? upcomingPredictions.slice(1) : []

  return (
    <main className="space-y-8">
      <section className="rounded-[30px] border border-white/10 bg-slate-950/22 p-6 shadow-[0_22px_60px_rgba(8,15,34,0.22)] backdrop-blur-xl md:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="inline-flex rounded-full border border-orange-300/35 bg-orange-300/12 px-4 py-1 text-sm font-semibold uppercase tracking-[0.18em] text-orange-100">
              {sportLabel}
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
              {introTitle}
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/6 p-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                Общо
              </p>
              <p className="mt-2 text-2xl font-bold text-white">{totalPredictions}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/6 p-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                Средно
              </p>
              <p className="mt-2 text-2xl font-bold text-orange-100">{averageOdds}</p>
            </div>
            <div className="col-span-2 rounded-2xl border border-white/10 bg-white/6 p-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                Дата
              </p>
              <p className="mt-2 text-lg font-bold text-emerald-100">{activeDate}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[56rem] space-y-8">
        {startedPredictions.length > 0 && (
          <section className="space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">
                Започнали
              </p>

              <div className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-semibold text-white/75">
                {startedPredictions.length} {startedPredictions.length === 1 ? "мач" : "мача"}
              </div>
            </div>

            <div className="grid gap-4">
              {startedPredictions.map((item) => (
                <PredictionCard
                  key={`started-${item.match}-${item.prediction}`}
                  match={item.match}
                  kickoff={item.kickoff}
                  country={item.country}
                  league={item.league}
                  prediction={item.prediction}
                  analysis={item.analysis}
                  odds={item.odds}
                  sport={sport}
                />
              ))}
            </div>
          </section>
        )}

        {featuredPrediction ? (
          <section className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">
              Следващ мач
            </p>

            <article className="relative overflow-hidden rounded-[30px] border border-orange-300/28 bg-slate-950/26 p-6 shadow-[0_20px_48px_rgba(8,15,34,0.2)] backdrop-blur-xl md:p-8">
              <div className="relative z-10">
                <h2 className="text-3xl font-black text-white md:text-4xl">
                  {featuredPrediction.match}
                </h2>

                <div className="mt-4 flex flex-wrap gap-3">
                  <PredictionMarketBadge
                    prediction={featuredPrediction.prediction}
                    sport={sport}
                  />
                  <CompetitionBadge
                    country={featuredPrediction.country}
                    league={featuredPrediction.league}
                  />
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/6 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                      Начало
                    </p>
                    <p className="mt-3 text-xl font-bold text-white">
                      {featuredPrediction.kickoff}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/6 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                      Прогноза
                    </p>
                    <p className="mt-3 text-2xl font-bold text-white">
                      {featuredPrediction.prediction}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-orange-300/28 bg-orange-300/10 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-100/70">
                      Коефициент
                    </p>
                    <p className="mt-3 text-3xl font-black text-orange-100">
                      {featuredPrediction.odds}
                    </p>
                  </div>
                </div>

                {featuredPrediction.analysis && (
                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/6 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                      Анализ
                    </p>
                    <p className="mt-3 text-base leading-8 text-white/85">
                      {featuredPrediction.analysis}
                    </p>
                  </div>
                )}

                <div className="mt-4">
                  <PredictionCountdown kickoff={featuredPrediction.kickoff} />
                </div>
              </div>
            </article>

            <div className="grid gap-4">
              {remainingPredictions.map((item) => (
                <PredictionCard
                  key={`${item.match}-${item.prediction}`}
                  match={item.match}
                  kickoff={item.kickoff}
                  country={item.country}
                  league={item.league}
                  prediction={item.prediction}
                  analysis={item.analysis}
                  odds={item.odds}
                  sport={sport}
                />
              ))}
            </div>
          </section>
        ) : (
          <section className="rounded-[30px] border border-white/10 bg-slate-950/22 p-6 shadow-[0_22px_60px_rgba(8,15,34,0.22)] backdrop-blur-xl md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">
              Следващ мач
            </p>
            <h2 className="mt-4 text-3xl font-black text-white md:text-4xl">
              {finishedTitle}
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-white/75">
              Новите предстоящи мачове ще се покажат автоматично тук, когато публикуваш следващите селекции.
            </p>
          </section>
        )}
      </div>
    </main>
  )
}
