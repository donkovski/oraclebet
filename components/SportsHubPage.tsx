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
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 shadow-[0_10px_22px_rgba(15,23,42,0.06)]">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-6 w-6 text-slate-800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.1" />
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 7.3L14.8 9.1L13.9 12.3H10.1L9.2 9.1L12 7.3Z" fill="currentColor" />
          <path
            d="M12 7.3V5.8M14.8 9.1L17 8.5M13.9 12.3L15.5 14.8M10.1 12.3L8.5 14.8M9.2 9.1L7 8.5"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      </span>
    )
  }

  if (icon === "hockey") {
    return (
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 shadow-[0_10px_22px_rgba(15,23,42,0.06)]">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-6 w-6 text-slate-800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="8" cy="17.2" rx="4.3" ry="2.3" fill="currentColor" opacity="0.2" />
          <ellipse cx="8" cy="16.5" rx="4.3" ry="2.3" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M13.8 6.5L10.6 15.3M13.8 6.5L16.8 7.7M13.8 6.5L15 4.4"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.6 15.3L16.9 17.3C17.5 17.5 18.1 17.1 18.2 16.5L18.4 15.6"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
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
            <div className="mt-4 flex items-center gap-3">
              <SportIcon icon={card.icon} />
              <p className="text-lg font-bold text-slate-900">{card.label}</p>
            </div>
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
