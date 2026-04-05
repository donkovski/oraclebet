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
          <circle cx="12" cy="12" r="8.25" fill="white" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 7.2L14.6 9L13.7 11.9H10.3L9.4 9L12 7.2Z" fill="currentColor" />
          <path
            d="M12 7.2L12 5.2M14.6 9L17 8.2M13.7 11.9L15.6 14.7M10.3 11.9L8.4 14.7M9.4 9L7 8.2"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <path
            d="M8.4 14.7L6.5 15.7M15.6 14.7L17.5 15.7M7.4 10.9L5.9 12.4M18.1 12.4L16.6 10.9"
            stroke="currentColor"
            strokeWidth="1.1"
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
          <ellipse cx="12" cy="14.6" rx="6.2" ry="2.3" fill="currentColor" opacity="0.18" />
          <ellipse cx="12" cy="13.4" rx="6.2" ry="2.3" fill="currentColor" />
          <path
            d="M6.4 13.4V14.6C6.4 15.9 8.9 16.9 12 16.9C15.1 16.9 17.6 15.9 17.6 14.6V13.4"
            stroke="currentColor"
            strokeWidth="1.3"
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
