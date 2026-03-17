import type { DisplayPrediction } from "@/lib/supabase-content"
import Link from "next/link"
import PredictionsBoard from "@/components/PredictionsBoard"

type NavLink = {
  href: string
  label: string
  primary?: boolean
}

type SportPredictionsPageProps = {
  sportLabel: string
  emptyTitle: string
  emptyDescription: string
  predictions: DisplayPrediction[]
  introTitle: string
  finishedTitle: string
  accentClassName: string
  links: NavLink[]
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
}: SportPredictionsPageProps) {
  if (predictions.length === 0) {
    return (
      <main className="space-y-8">
        <section className="rounded-[30px] border border-white/10 bg-slate-950/22 p-6 shadow-[0_22px_60px_rgba(8,15,34,0.22)] backdrop-blur-xl md:p-8">
          <p
            className={`inline-flex rounded-full border px-4 py-1 text-sm font-semibold uppercase tracking-[0.18em] ${accentClassName}`}
          >
            {sportLabel}
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
            {emptyTitle}
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-white/75">{emptyDescription}</p>

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
    />
  )
}
