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
      <section className="rounded-[30px] border border-white/12 bg-slate-950/12 p-6 shadow-[0_22px_60px_rgba(8,15,34,0.18)] backdrop-blur-sm md:p-8">
        <p className="inline-flex rounded-full border border-orange-300/35 bg-orange-300/12 px-4 py-1 text-sm font-semibold uppercase tracking-[0.18em] text-orange-100">
          {eyebrow}
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl leading-7 text-white/75">{description}</p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group rounded-[28px] border border-white/12 bg-slate-950/10 p-6 shadow-[0_16px_36px_rgba(8,15,34,0.14)] transition hover:-translate-y-0.5 hover:border-orange-300/35 hover:bg-slate-950/16"
          >
            <p
              className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${card.accentClassName}`}
            >
              {card.label}
            </p>
            <p className="mt-4 text-lg font-bold text-white">{card.label}</p>
            <p className="mt-3 text-sm leading-7 text-white/70">{card.description}</p>
            <p className="mt-6 text-sm font-semibold text-orange-200 transition group-hover:text-orange-100">
              {ctaLabel}
            </p>
          </Link>
        ))}
      </section>
    </main>
  )
}
