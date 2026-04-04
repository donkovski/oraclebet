import type { DisplayPrediction } from "@/lib/supabase-content"
import type { PredictionSport } from "@/lib/sports"
import Link from "next/link"
import PredictionsBoard from "@/components/PredictionsBoard"

type NavLink = {
  href: string
  label: string
  primary?: boolean
}

type SportSwitchLink = {
  href: string
  label: string
  sport: PredictionSport
}

type SportPredictionsPageProps = {
  sportLabel: string
  emptyTitle: string
  emptyDescription?: string
  predictions: DisplayPrediction[]
  introTitle: string
  finishedTitle: string
  accentClassName: string
  links: NavLink[]
  sport?: PredictionSport
}

const sportSwitchLinks: SportSwitchLink[] = [
  { href: "/tips/futbol", label: "Футбол", sport: "football" },
  { href: "/tips/hokei", label: "Хокей", sport: "hockey" },
  { href: "/tips/basketbol", label: "Баскетбол", sport: "basketball" },
  { href: "/tips/beizbol", label: "Бейзбол", sport: "baseball" },
  { href: "/tips/tenis", label: "Тенис", sport: "tennis" },
]

function SportSwitcher({ currentSport }: { currentSport: PredictionSport }) {
  return (
    <section className="rounded-[28px] border border-white/12 bg-slate-950/10 p-4 backdrop-blur-sm">
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
                  : "rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10"
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

export default function SportPredictionsPage({
  sportLabel,
  emptyTitle,
  emptyDescription,
  predictions,
  introTitle,
  finishedTitle,
  accentClassName,
  links,
  sport = "football",
}: SportPredictionsPageProps) {
  if (predictions.length === 0) {
    return (
      <main className="space-y-8">
        <section className="rounded-[30px] border border-white/12 bg-slate-950/12 p-6 shadow-[0_22px_60px_rgba(8,15,34,0.18)] backdrop-blur-sm md:p-8">
          <p
            className={`inline-flex rounded-full border px-4 py-1 text-sm font-semibold uppercase tracking-[0.18em] ${accentClassName}`}
          >
            {sportLabel}
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
            {emptyTitle}
          </h1>
          {emptyDescription && (
            <p className="mt-4 max-w-2xl leading-7 text-white/75">{emptyDescription}</p>
          )}

          <div className="mt-6">
            <SportSwitcher currentSport={sport} />
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  link.primary
                    ? "rounded-full bg-orange-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-orange-300"
                    : "rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      </main>
    )
  }

  return (
    <PredictionsBoard
      predictions={predictions}
      sportLabel={sportLabel}
      introTitle={introTitle}
      finishedTitle={finishedTitle}
      sport={sport}
      topContent={<SportSwitcher currentSport={sport} />}
    />
  )
}
