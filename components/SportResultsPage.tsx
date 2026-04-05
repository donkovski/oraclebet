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
    <section className="theme-panel rounded-[28px] p-4 backdrop-blur-xl">
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
                  ? "rounded-full border border-orange-300/50 bg-orange-100/80 px-5 py-2 text-sm font-semibold text-orange-700"
                  : "theme-secondary-button rounded-full px-5 py-2 text-sm font-semibold transition"
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
        <section className="theme-panel rounded-[28px] p-6 backdrop-blur-xl md:p-8">
          <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${accentClassName}`}>
            {label}
          </p>
          <h1 className="theme-title mt-3 text-4xl font-bold">{emptyTitle}</h1>
          {emptyDescription && (
            <p className="theme-text mt-4 max-w-3xl leading-7">{emptyDescription}</p>
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
      <section className="theme-panel rounded-[28px] p-6 backdrop-blur-xl md:p-8">
        <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${accentClassName}`}>
          Архив и статистика
        </p>
        <h1 className="theme-title mt-3 text-4xl font-bold">{label}</h1>
      </section>

      <SportSwitcher currentSport={sport} />

      <ResultsArchive results={results} />

      <ResultsChartsSection results={results} />
    </main>
  )
}
