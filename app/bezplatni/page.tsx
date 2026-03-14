import type { Metadata } from "next"
import Link from "next/link"
import PredictionsBoard from "../../components/PredictionsBoard"
import { predictions } from "../../data/predictions"

export const metadata: Metadata = {
  title: "Футболни прогнози",
  description:
    "Виж активните футболни прогнози в OracleBet, подредени по час, пазар, коефициент и първенство.",
  alternates: {
    canonical: "/bezplatni",
  },
}

export default function BezplatniPrognozi() {
  if (predictions.length === 0) {
    return (
      <main className="space-y-8">
        <section className="rounded-[30px] border border-white/10 bg-slate-950/22 p-6 shadow-[0_22px_60px_rgba(8,15,34,0.22)] backdrop-blur-xl md:p-8">
          <p className="inline-flex rounded-full border border-orange-300/35 bg-orange-300/12 px-4 py-1 text-sm font-semibold uppercase tracking-[0.18em] text-orange-100">
            Футболни прогнози
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
            В момента няма активни футболни прогнози.
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-white/75">
            Когато има нови футболни селекции за деня, те ще се появят тук автоматично.
            Провери отново по-късно и следи страницата за следващите публикувани мачове.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/hokei-prognozi"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Към хокей прогнози
            </Link>
            <Link
              href="/rezultati"
              className="rounded-full bg-orange-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-orange-300"
            >
              Към футболни резултати
            </Link>
          </div>
        </section>
      </main>
    )
  }

  return <PredictionsBoard predictions={predictions} />
}
