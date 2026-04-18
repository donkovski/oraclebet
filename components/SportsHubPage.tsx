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
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-orange-200 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.98),rgba(255,247,237,0.94)_58%,rgba(255,237,213,0.9))] shadow-[0_10px_22px_rgba(15,23,42,0.06)]">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="8.15" fill="#ffffff" stroke="#2563eb" strokeWidth="1.2" />
          <path d="M12 7.2L14.4 9L13.7 11.8H10.3L9.6 9L12 7.2Z" fill="#2563eb" />
          <path
            d="M12 7.2V5.8M14.4 9L16.9 8.3M13.7 11.8L15.3 14.3M10.3 11.8L8.7 14.3M9.6 9L7.1 8.3"
            stroke="#2563eb"
            strokeWidth="1.15"
            strokeLinecap="round"
          />
          <path
            d="M8.9 14L7.4 15.1M15.1 14L16.6 15.1M7.6 11.7L6.2 12.9M17.8 12.9L16.4 11.7"
            stroke="#60a5fa"
            strokeWidth="0.95"
            strokeLinecap="round"
          />
        </svg>
      </span>
    )
  }

  if (icon === "hockey") {
    return (
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-sky-200 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.98),rgba(239,246,255,0.95)_58%,rgba(224,242,254,0.9))] shadow-[0_10px_22px_rgba(15,23,42,0.06)]">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="8.2" cy="17.15" rx="4" ry="1.65" fill="#0f172a" opacity="0.16" />
          <ellipse cx="8.2" cy="16.45" rx="3.95" ry="1.65" fill="#1e293b" />
          <path
            d="M15.2 5.7L11.5 14.1"
            stroke="#2563eb"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <path
            d="M14.9 5.5L17.3 6.7"
            stroke="#7dd3fc"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <path
            d="M11.5 14.1L17 15.8C17.7 16 18.3 15.5 18.4 14.8L18.5 13.9"
            stroke="#ef4444"
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
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-200 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.98),rgba(255,251,235,0.94)_58%,rgba(254,243,199,0.9))] shadow-[0_10px_22px_rgba(15,23,42,0.06)]">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="8.2" fill="#fb923c" stroke="#ea580c" strokeWidth="1.2" />
          <path d="M12 4.4C9.8 6.3 8.7 8.8 8.7 12C8.7 15.2 9.8 17.7 12 19.6" stroke="#7c2d12" strokeWidth="1.1" strokeLinecap="round" />
          <path d="M12 4.4C14.2 6.3 15.3 8.8 15.3 12C15.3 15.2 14.2 17.7 12 19.6" stroke="#7c2d12" strokeWidth="1.1" strokeLinecap="round" />
          <path d="M4.3 12H19.7" stroke="#7c2d12" strokeWidth="1.1" strokeLinecap="round" />
          <path d="M6.2 7.6C8.2 8.7 10.1 9.2 12 9.2C13.9 9.2 15.8 8.7 17.8 7.6" stroke="#7c2d12" strokeWidth="1.05" strokeLinecap="round" />
        </svg>
      </span>
    )
  }

  if (icon === "baseball") {
    return (
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-200 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.98),rgba(236,253,245,0.95)_58%,rgba(209,250,229,0.9))] shadow-[0_10px_22px_rgba(15,23,42,0.06)]">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="8.2" fill="#fff7ed" stroke="#fda4af" strokeWidth="1.15" />
          <path d="M8.6 6.8C10 8 10.8 9.9 10.8 12C10.8 14.1 10 16 8.6 17.2" stroke="#e11d48" strokeWidth="1.1" strokeLinecap="round" />
          <path d="M15.4 6.8C14 8 13.2 9.9 13.2 12C13.2 14.1 14 16 15.4 17.2" stroke="#e11d48" strokeWidth="1.1" strokeLinecap="round" />
          <path d="M9.1 8.3L8 9.2M9.5 10.2L8.3 11.2M9.5 13.8L8.3 12.8M9.1 15.7L8 14.8" stroke="#fb7185" strokeWidth="1" strokeLinecap="round" />
          <path d="M14.9 8.3L16 9.2M14.5 10.2L15.7 11.2M14.5 13.8L15.7 12.8M14.9 15.7L16 14.8" stroke="#fb7185" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </span>
    )
  }

  if (icon === "tennis") {
    return (
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-lime-200 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.98),rgba(247,254,231,0.95)_58%,rgba(236,252,203,0.9))] shadow-[0_10px_22px_rgba(15,23,42,0.06)]">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="10.6" cy="10" r="6.3" fill="#d9f99d" stroke="#84cc16" strokeWidth="1.15" />
          <path d="M13.5 4.6C12.2 6.1 11.5 7.9 11.5 10C11.5 12.1 12.2 13.9 13.5 15.4" stroke="#65a30d" strokeWidth="1.05" strokeLinecap="round" />
          <path d="M7.7 4.6C9 6.1 9.7 7.9 9.7 10C9.7 12.1 9 13.9 7.7 15.4" stroke="#65a30d" strokeWidth="1.05" strokeLinecap="round" />
          <path d="M14.1 14.1L18.7 18.7" stroke="#ec4899" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M17.7 13.7L19.2 15.2C19.7 15.7 19.7 16.5 19.2 17L17 19.2C16.5 19.7 15.7 19.7 15.2 19.2L13.7 17.7" stroke="#ec4899" strokeWidth="1.05" strokeLinejoin="round" />
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
            className="theme-panel-soft group grid h-full min-h-[306px] grid-rows-[auto_auto_1fr_auto] rounded-[28px] p-6 transition hover:-translate-y-0.5 hover:border-orange-300/45"
          >
            <p
              className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${card.accentClassName}`}
            >
              {card.label}
            </p>
            <div className="mt-4 flex min-h-[52px] items-center gap-3">
              <span className="shrink-0">
                <SportIcon icon={card.icon} />
              </span>
              <p className="theme-title text-lg font-bold leading-none">{card.label}</p>
            </div>
            <p className="theme-text mt-3 max-w-[17ch] text-sm leading-7">{card.description}</p>
            <p className="theme-link-accent mt-6 text-sm font-semibold transition">
              {ctaLabel}
            </p>
          </Link>
        ))}
      </section>
    </main>
  )
}
