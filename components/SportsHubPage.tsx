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
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="8.2" fill="#ffffff" stroke="#2563eb" strokeWidth="1.2" />
          <path d="M12 7.3L14.5 9L13.7 11.8H10.3L9.5 9L12 7.3Z" fill="#2563eb" />
          <path
            d="M12 7.3L12 5.5M14.5 9L16.8 8.2M13.7 11.8L15.3 14.2M10.3 11.8L8.7 14.2M9.5 9L7.2 8.2"
            stroke="#2563eb"
            strokeWidth="1.15"
            strokeLinecap="round"
          />
          <path
            d="M8.7 14.2L6.9 15.2M15.3 14.2L17.1 15.2M7.5 10.9L6.1 12.3M17.9 12.3L16.5 10.9"
            stroke="#60a5fa"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      </span>
    )
  }

  if (icon === "hockey") {
    return (
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-sky-200 bg-sky-50 shadow-[0_10px_22px_rgba(15,23,42,0.06)]">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.4 6.2L11.6 14.1"
            stroke="#2563eb"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M15.1 5.8L17.5 7"
            stroke="#60a5fa"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <path
            d="M11.6 14.1L17 15.7C17.7 15.9 18.3 15.4 18.4 14.7L18.5 13.9"
            stroke="#ef4444"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <ellipse cx="8.1" cy="17.1" rx="4" ry="1.8" fill="#0f172a" opacity="0.2" />
          <ellipse cx="8.1" cy="16.4" rx="4" ry="1.8" fill="#1e293b" />
        </svg>
      </span>
    )
  }

  if (icon === "basketball") {
    return (
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 shadow-[0_10px_22px_rgba(15,23,42,0.06)]">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="8.1" fill="#fb923c" stroke="#ea580c" strokeWidth="1.2" />
          <path
            d="M12 4.3C9.8 6.2 8.7 8.7 8.7 12C8.7 15.3 9.8 17.8 12 19.7"
            stroke="#7c2d12"
            strokeWidth="1.15"
            strokeLinecap="round"
          />
          <path
            d="M12 4.3C14.2 6.2 15.3 8.7 15.3 12C15.3 15.3 14.2 17.8 12 19.7"
            stroke="#7c2d12"
            strokeWidth="1.15"
            strokeLinecap="round"
          />
          <path d="M4.3 12H19.7" stroke="#7c2d12" strokeWidth="1.15" strokeLinecap="round" />
          <path d="M6.1 7.5C8.2 8.7 10.2 9.2 12 9.2C13.8 9.2 15.8 8.7 17.9 7.5" stroke="#7c2d12" strokeWidth="1.15" strokeLinecap="round" />
        </svg>
      </span>
    )
  }

  if (icon === "baseball") {
    return (
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 shadow-[0_10px_22px_rgba(15,23,42,0.06)]">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="8.2" fill="#fff7ed" stroke="#fda4af" strokeWidth="1.1" />
          <path
            d="M8.5 6.7C10 8 10.8 9.9 10.8 12C10.8 14.1 10 16 8.5 17.3"
            stroke="#e11d48"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          <path
            d="M15.5 6.7C14 8 13.2 9.9 13.2 12C13.2 14.1 14 16 15.5 17.3"
            stroke="#e11d48"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          <path d="M9.1 8.3L8 9.3M9.5 10.2L8.2 11.3M9.5 13.8L8.2 12.7M9.1 15.7L8 14.7" stroke="#fb7185" strokeWidth="1" strokeLinecap="round" />
          <path d="M14.9 8.3L16 9.3M14.5 10.2L15.8 11.3M14.5 13.8L15.8 12.7M14.9 15.7L16 14.7" stroke="#fb7185" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </span>
    )
  }

  if (icon === "tennis") {
    return (
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-lime-200 bg-lime-50 shadow-[0_10px_22px_rgba(15,23,42,0.06)]">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="11" cy="10" r="6.4" fill="#d9f99d" stroke="#84cc16" strokeWidth="1.2" />
          <path
            d="M13.8 4.5C12.4 6 11.7 7.9 11.7 10C11.7 12.1 12.4 14 13.8 15.5"
            stroke="#65a30d"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          <path
            d="M8.2 4.5C9.6 6 10.3 7.9 10.3 10C10.3 12.1 9.6 14 8.2 15.5"
            stroke="#65a30d"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          <path
            d="M14.3 14.2L18.8 18.7"
            stroke="#ec4899"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M17.8 13.7L19.3 15.2C19.8 15.7 19.8 16.5 19.3 17L17.1 19.2C16.6 19.7 15.8 19.7 15.3 19.2L13.8 17.7"
            stroke="#ec4899"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
        </svg>
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
            className="theme-panel-soft group flex h-full flex-col rounded-[28px] p-6 transition hover:-translate-y-0.5 hover:border-orange-300/45"
          >
            <p
              className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${card.accentClassName}`}
            >
              {card.label}
            </p>
            <div className="mt-4 flex min-h-[52px] items-center gap-3">
              <SportIcon icon={card.icon} />
              <p className="theme-title text-lg font-bold">{card.label}</p>
            </div>
            <p className="theme-text mt-3 min-h-[112px] text-sm leading-7">{card.description}</p>
            <p className="theme-link-accent mt-auto pt-6 text-sm font-semibold transition">
              {ctaLabel}
            </p>
          </Link>
        ))}
      </section>
    </main>
  )
}
