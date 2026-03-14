import Link from "next/link"
import PredictionCard from "../components/PredictionCard"
import { predictions } from "../data/predictions"

const highlights = [
  {
    title: "Ясен формат",
    text: "Всеки мач е подреден с час, пазар и коефициент, така че важната информация да се вижда веднага.",
  },
  {
    title: "Дневен фокус",
    text: "Началната страница извежда актуалните селекции за деня и дава бърз достъп до пълния списък с прогнози.",
  },
  {
    title: "Архив и статистика",
    text: "След приключване на срещите резултатите ще се натрупват в архив, подреден по дати и готов за лесно следене.",
  },
]

export default function Home() {
  const totalPredictions = predictions.length
  const averageOdds =
    totalPredictions === 0
      ? "0.00"
      : (
          predictions.reduce((sum, item) => sum + Number(item.odds), 0) / totalPredictions
        ).toFixed(2)
  const firstKickoff = predictions[0]?.kickoff ?? ""
  const activeDate = firstKickoff ? firstKickoff.split(" ")[0] : "Няма дата"
  const previewPredictions = predictions.slice(0, 3)

  return (
    <main className="space-y-8">
      <section className="rounded-[32px] border border-white/10 bg-slate-950/20 p-8 shadow-[0_24px_80px_rgba(8,15,34,0.28)] backdrop-blur-xl md:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full border border-orange-300/40 bg-orange-300/10 px-4 py-1 text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">
              OracleBet
            </p>

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
              <Link
                href="/login"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Вход
              </Link>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 text-sm text-white/75 shadow-[0_12px_32px_rgba(15,23,42,0.16)] backdrop-blur-lg lg:max-w-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
              Днес в сайта
            </p>

            <div className="mt-4 grid grid-cols-3 gap-3">
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
              <div className="rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-4 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  Дата
                </p>
                <p className="mt-2 text-sm font-bold text-emerald-100">{activeDate}</p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {predictions.map((item) => (
                <div
                  key={`${item.match}-${item.kickoff}`}
                  className="rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-3"
                >
                  <p className="text-xs font-semibold text-orange-200">{item.kickoff}</p>
                  <p className="mt-1 font-semibold text-white">{item.match}</p>
                  <p className="mt-1 text-white/70">{item.prediction}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <article
            key={item.title}
            className="rounded-[28px] border border-white/10 bg-slate-950/20 p-6 shadow-[0_18px_40px_rgba(8,15,34,0.18)] backdrop-blur-lg"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-200/90">
              OracleBet
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white">{item.title}</h2>
            <p className="mt-3 leading-7 text-white/75">{item.text}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[28px] border border-white/10 bg-slate-950/15 p-6 backdrop-blur-lg md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">
            Днешни прогнози
          </p>
          <h2 className="mt-3 text-2xl font-bold text-white">
            Бърз преглед на публикуваните селекции
          </h2>
          <div className="mt-6 grid gap-6">
            {previewPredictions.map((item) => (
              <PredictionCard
                key={`${item.match}-${item.kickoff}`}
                match={item.match}
                kickoff={item.kickoff}
                prediction={item.prediction}
                odds={item.odds}
              />
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-slate-950/15 p-6 backdrop-blur-lg md:p-8">
          <h2 className="text-2xl font-bold text-white">
            Какво ще намериш в OracleBet
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-white/75">
            Платформата е подредена за бързо следене на мачовете през деня:
            първо виждаш активните прогнози, после архива с резултати, а след
            това потребителската част. Така сайтът стои чисто още от началото и
            може да се надгражда спокойно.
          </p>

          <div className="mt-6 space-y-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/80">
              Публикувани прогнози с час, мач, пазар и коефициент
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/80">
              Архив с резултати по дати веднага след приключване на срещите
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/80">
              Вход и регистрация за потребители, които искат да следят сайта
            </div>
            <div className="rounded-2xl border border-orange-300/25 bg-orange-300/10 px-4 py-3 text-orange-100">
              Следващата стъпка е трупане на реални резултати, трафик и analytics
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
