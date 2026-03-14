import Link from "next/link"
import PredictionCard from "../../components/PredictionCard"
import { predictions } from "../../data/predictions"

export default function BezplatniPrognozi() {
  if (predictions.length === 0) {
    return (
      <main className="space-y-8">
        <section className="rounded-[30px] border border-white/10 bg-slate-950/22 p-6 shadow-[0_22px_60px_rgba(8,15,34,0.22)] backdrop-blur-xl md:p-8">
          <p className="inline-flex rounded-full border border-orange-300/35 bg-orange-300/12 px-4 py-1 text-sm font-semibold uppercase tracking-[0.18em] text-orange-100">
            Прогнози
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
            В момента няма активни прогнози.
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-white/75">
            Когато има нови селекции за деня, те ще се появят тук автоматично.
            Провери отново по-късно или влез в профила си, за да следиш сайта
            по-лесно.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/login"
              className="rounded-full bg-orange-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-orange-300"
            >
              Вход
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

  const totalPredictions = predictions.length
  const averageOdds = (
    predictions.reduce((sum, item) => sum + Number(item.odds), 0) / totalPredictions
  ).toFixed(2)
  const featuredPrediction = predictions[0]
  const remainingPredictions = predictions.slice(1)
  const activeDate = featuredPrediction.kickoff.split(" ")[0]

  return (
    <main className="space-y-8">
      <section className="rounded-[30px] border border-white/10 bg-slate-950/22 p-6 shadow-[0_22px_60px_rgba(8,15,34,0.22)] backdrop-blur-xl md:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="inline-flex rounded-full border border-orange-300/35 bg-orange-300/12 px-4 py-1 text-sm font-semibold uppercase tracking-[0.18em] text-orange-100">
              Актуални прогнози
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
              Днешните селекции са вече публикувани.
            </h1>
            <p className="mt-4 max-w-2xl leading-7 text-white/75">
              Тук виждаш актуалните прогнози за деня в ясен формат с час,
              пазар и коефициент. Идеята е най-важното да се вижда веднага,
              без излишен шум и без да губиш време в дълги списъци.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
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
            <div className="rounded-2xl border border-white/10 bg-white/6 p-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                Дата
              </p>
              <p className="mt-2 text-lg font-bold text-emerald-100">{activeDate}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-[30px] border border-orange-300/28 bg-slate-950/26 p-6 shadow-[0_20px_48px_rgba(8,15,34,0.2)] backdrop-blur-xl md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">
            Акцент на деня
          </p>
          <h2 className="mt-4 text-3xl font-black text-white md:text-4xl">
            {featuredPrediction.match}
          </h2>

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

          <p className="mt-6 max-w-2xl leading-7 text-white/72">
            Акцентът на деня е изведен отделно, за да се вижда още при първото
            отваряне на страницата, а останалите селекции остават подредени
            отдолу за бърз преглед и лесно сравнение.
          </p>
        </article>

        <div className="grid gap-6">
          {remainingPredictions.map((item) => (
            <PredictionCard
              key={`${item.match}-${item.prediction}`}
              match={item.match}
              kickoff={item.kickoff}
              prediction={item.prediction}
              odds={item.odds}
            />
          ))}
        </div>
      </section>

      <section className="rounded-[30px] border border-white/10 bg-slate-950/18 p-6 backdrop-blur-xl md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">
              Всички прогнози
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white">
              Пълен списък за спокоен преглед
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-white/65">
            Целият списък остава видим по-долу, така че потребителят да може да
            прегледа всичко наведнъж и да сравни селекциите без излишно местене
            между различни секции.
          </p>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {predictions.map((item) => (
            <PredictionCard
              key={`full-${item.match}-${item.prediction}`}
              match={item.match}
              kickoff={item.kickoff}
              prediction={item.prediction}
              odds={item.odds}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
