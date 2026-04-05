import Link from "next/link"

type SportCard = {
  href: string
  label: string
  description: string
  accentClassName: string
  icon?: "football" | "hockey" | "basketball" | "baseball" | "tennis"
}

type SportsHubPageProps = {
  eyebrow: string
  title: string
  description: string
  cards: SportCard[]
  ctaLabel?: string
}

function SportIcon({ icon }: { icon?: SportCard["icon"] }) {
  if (icon === "football") {
    return (
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50 shadow-[0_10px_22px_rgba(15,23,42,0.06)]">
        <span className="text-2xl leading-none">⚽</span>
      </span>
    )
  }

  if (icon === "hockey") {
    return (
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-sky-200 bg-sky-50 shadow-[0_10px_22px_rgba(15,23,42,0.06)]">
        <span className="text-2xl leading-none">🏒</span>
      </span>
    )
  }

  if (icon === "basketball") {
    return (
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 shadow-[0_10px_22px_rgba(15,23,42,0.06)]">
        <span className="text-2xl leading-none">🏀</span>
      </span>
    )
  }

  if (icon === "baseball") {
    return (
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 shadow-[0_10px_22px_rgba(15,23,42,0.06)]">
        <span className="text-2xl leading-none">⚾</span>
      </span>
    )
  }

  if (icon === "tennis") {
    return (
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-lime-200 bg-lime-50 shadow-[0_10px_22px_rgba(15,23,42,0.06)]">
        <span className="text-2xl leading-none">🎾</span>
      </span>
    )
  }

  return null
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
      <section className="theme-panel rounded-[30px] p-6 backdrop-blur-xl md:p-8">
        <p className="inline-flex rounded-full border border-orange-300/50 bg-orange-100/80 px-4 py-1 text-sm font-semibold uppercase tracking-[0.18em] text-orange-700">
          {eyebrow}
        </p>
        <h1 className="theme-title mt-4 text-4xl font-black tracking-tight md:text-5xl">
          {title}
        </h1>
        <p className="theme-text mt-4 max-w-3xl leading-7">{description}</p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="theme-panel-soft group rounded-[28px] p-6 transition hover:-translate-y-0.5 hover:border-orange-300/45"
          >
            <p
              className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${card.accentClassName}`}
            >
              {card.label}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <SportIcon icon={card.icon} />
              <p className="theme-title text-lg font-bold">{card.label}</p>
            </div>
            <p className="theme-text mt-3 text-sm leading-7">{card.description}</p>
            <p className="theme-link-accent mt-6 text-sm font-semibold transition">
              {ctaLabel}
            </p>
          </Link>
        ))}
      </section>
    </main>
  )
}
