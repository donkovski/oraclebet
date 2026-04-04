import type { Result } from "@/types/results"
import type { PredictionSport } from "@/lib/sports"
import Link from "next/link"
import ResultsArchive from "@/components/ResultsArchive"
import ResultsChartsSection from "@/components/ResultsChartsSection"

type SportResultsPageProps = {
  label: string
  results: Result[]
  emptyTitle: string
  emptyDescription?: string
  predictionHref: string
  predictionLabel: string
  accentClassName: string
  sport: PredictionSport
}

type SportSwitchLink = {
  href: string
  label: string
  sport: PredictionSport
}

const sportSwitchLinks: SportSwitchLink[] = [
  { href: "/rezultati/futbol", label: "Футбол", sport: "football" },
  { href: "/rezultati/hokei", label: "Хокей", sport: "hockey" },
  { href: "/rezultati/basketbol", label: "Баскетбол", sport: "basketball" },
  { href: "/rezultati/beizbol", label: "Бейзбол", sport: "baseball" },
  { href: "/rezultati/tenis", label: "Тенис", sport: "tennis" },
]

function SportSwitcher({ currentSport }: { currentSport: PredictionSport }) {
  return (
    <section className="rounded-[28px] border border-white/12 bg-slate-950/[0.08] p-4 backdrop-blur-[2px]">
      <div className="flex flex-wrap gap-3">
        {sportSwitchLinks.map((link) => {
          const isActive = link.sport === currentSport

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={
                isActive
                  ? "rounded-full border border-orange-300/35 bg-orange-300/12 px-5 py-2 text-sm font-semibold text-orange-100"
                  : "rounded-full border border-white/12 bg-white/[0.04] px-5 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/[0.08]"
              }
            >
              {link.label}
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default function SportResultsPage({
  label,
  results,
  emptyTitle,
  emptyDescription,
  predictionHref,
  predictionLabel,
  accentClassName,
  sport,
}: SportResultsPageProps) {
  if (results.length === 0) {
    return (
      <main className="space-y-8">
        <section className="rounded-[28px] border border-white/12 bg-slate-950/[0.08] p-6 backdrop-blur-[2px] md:p-8">
          <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${accentClassName}`}>
            {label}
          </p>
          <h1 className="mt-3 text-4xl font-bold text-white">{emptyTitle}</h1>
          {emptyDescription && (
            <p className="mt-4 max-w-3xl leading-7 text-white/75">{emptyDescription}</p>
          )}

          <div className="mt-6">
            <SportSwitcher currentSport={sport} />
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={predictionHref}
              className="rounded-full bg-orange-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-orange-300"
            >
              {predictionLabel}
            </Link>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="space-y-8">
      <section className="rounded-[28px] border border-white/12 bg-slate-950/[0.08] p-6 backdrop-blur-[2px] md:p-8">
        <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${accentClassName}`}>
          Архив и статистика
        </p>
        <h1 className="mt-3 text-4xl font-bold text-white">{label}</h1>
      </section>

      <SportSwitcher currentSport={sport} />

      <ResultsArchive results={results} />

      <ResultsChartsSection results={results} />
    </main>
  )
}
