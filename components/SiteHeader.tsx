import Image from "next/image"
import Link from "next/link"
import SiteAuthLink from "@/components/SiteAuthLink"
import SiteClock from "@/components/SiteClock"
import ThemeToggle from "@/components/ThemeToggle"

type Props = {
  vipEnabled: boolean
  authEnabled: boolean
}

export default function SiteHeader({ vipEnabled, authEnabled }: Props) {
  return (
    <header className="theme-header sticky top-0 z-20 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between md:px-8">
        <Link
          href="/"
          className="theme-title flex items-center gap-3 text-2xl font-semibold uppercase tracking-[0.18em]"
        >
          <span className="theme-surface overflow-hidden rounded-xl p-1 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
            <Image
              alt="OracleBet logo"
              className="h-10 w-10 object-contain"
              height={40}
              priority
              src="/logo.png"
              width={40}
            />
          </span>
          Oracle<span className="text-orange-300">Bet</span>
        </Link>

        <div className="flex flex-wrap items-center gap-3 md:justify-end">
          <ThemeToggle />
          <SiteClock />

          <nav className="flex flex-wrap items-center gap-3 text-sm font-medium md:gap-4">
          <Link
            href="/"
            className="theme-nav-link rounded-full px-4 py-2 transition"
          >
            Начало
          </Link>
          <Link
            href="/tips"
            className="theme-nav-link rounded-full px-4 py-2 transition"
          >
            Прогнози
          </Link>
          <Link
            href="/rezultati"
            className="theme-nav-link rounded-full px-4 py-2 transition"
          >
            Резултати
          </Link>
          {vipEnabled && (
            <Link
              href="/vip"
              className="theme-nav-link rounded-full px-4 py-2 transition"
            >
              VIP
            </Link>
          )}
          {authEnabled && <SiteAuthLink />}
          </nav>
        </div>
      </div>
    </header>
  )
}
