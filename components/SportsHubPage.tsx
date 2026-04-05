import Link from "next/link"

type SportCard = {
  href: string
  label: string
  description: string
  accentClassName: string
}

type SportsHubPageProps = {
  eyebrow: string
  title: string
  description: string
  cards: SportCard[]
  ctaLabel?: string
}

export default function SportsHubPage({
  eyebrow,
  title,
  description,
  cards,
  ctaLabel = "Отвори секцията",
}: SportsHubPageProps) {
  return (
    <main className="space-y-8">
      <section className="rounded-[30px] border border-slate-200/80 bg-white/72 p-6 shadow-[0_22px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl md:p-8">
        <p className="inline-flex rounded-full border border-orange-300/50 bg-orange-100/80 px-4 py-1 text-sm font-semibold uppercase tracking-[0.18em] text-orange-700">
          {eyebrow}
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl leading-7 text-slate-600">{description}</p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group rounded-[28px] border border-slate-200/80 bg-white/80 p-6 shadow-[0_16px_36px_rgba(15,23,42,0.07)] transition hover:-translate-y-0.5 hover:border-orange-300/45 hover:bg-white"
          >
            <p
              className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${card.accentClassName}`}
            >
              {card.label}
            </p>
            <p className="mt-4 text-lg font-bold text-slate-900">{card.label}</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">{card.description}</p>
            <p className="mt-6 text-sm font-semibold text-orange-700 transition group-hover:text-orange-600">
              {ctaLabel}
            </p>
          </Link>
        ))}
      </section>
    </main>
  )
}
