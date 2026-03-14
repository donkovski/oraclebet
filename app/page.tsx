import Link from "next/link"

const highlights = [
  {
    title: "Чиста структура",
    text: "OracleBet е подреден така, че съдържанието да се чете лесно и да остава удобно за следене и на телефон, и на компютър.",
  },
  {
    title: "Подготовка за старт",
    text: "Сайтът е подготвен за публикуване на прогнози, архив с резултати и потребителски профили без излишен шум в интерфейса.",
  },
  {
    title: "Основа за растеж",
    text: "След старта съдържанието, статистиката и потребителските функционалности могат да се надграждат върху вече чиста структура.",
  },
]

const nextSteps = [
  "Публикуване на първите прогнози",
  "Натрупване на реален архив с резултати",
  "Събиране на посещения и потребители",
  "Подготовка за live домейн и analytics",
]

export default function Home() {
  return (
    <main className="space-y-8">
      <section className="rounded-[32px] border border-white/10 bg-slate-950/20 p-8 shadow-[0_24px_80px_rgba(8,15,34,0.28)] backdrop-blur-xl md:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full border border-orange-300/40 bg-orange-300/10 px-4 py-1 text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">
              OracleBet
            </p>

            <h1 className="text-5xl font-black tracking-tight text-white md:text-6xl">
              Сайтът е подготвен за старт и готов за първото реално съдържание.
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">
              В момента OracleBet е изчистен от demo история и е подготвен като
              чиста основа за deploy. След публикуването на първите прогнози и
              резултати сайтът ще започне да трупа реално съдържание, а не
              примерни данни.
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
              Следващи стъпки
            </p>

            <div className="mt-4 space-y-3">
              {nextSteps.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-3 text-white/85"
                >
                  {item}
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

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] border border-white/10 bg-slate-950/15 p-6 backdrop-blur-lg md:p-8">
          <h2 className="text-2xl font-bold text-white">
            Защо този подход е правилен
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-white/75">
            Преди live пускането е по-добре сайтът да бъде изчистен от примерни
            резултати и стара demo история. Така, когато домейнът стане публичен,
            всичко което се вижда вътре ще бъде реално и ще изгражда доверие от
            самото начало.
          </p>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-slate-950/15 p-6 backdrop-blur-lg md:p-8">
          <h2 className="text-2xl font-bold text-white">Готовност за deploy</h2>
          <p className="mt-4 leading-7 text-white/75">
            В тази версия OracleBet е подготвен като чист старт: дизайнът е
            готов, основните страници са налични, а съдържанието може да започне
            да се публикува поетапно вече на реалния домейн.
          </p>

          <div className="mt-6 rounded-2xl border border-orange-300/25 bg-orange-300/10 p-4 text-sm leading-6 text-orange-100">
            След deploy най-важното ще бъде да качиш първите реални прогнози и да
            включиш analytics, за да започнеш да трупаш реални посещения.
          </div>
        </div>
      </section>
    </main>
  )
}
