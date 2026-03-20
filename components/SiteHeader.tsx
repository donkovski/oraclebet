import Image from "next/image"
import Link from "next/link"
import SiteAuthLink from "@/components/SiteAuthLink"

type Props = {
  vipEnabled: boolean
  authEnabled: boolean
}

export default function SiteHeader({ vipEnabled, authEnabled }: Props) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/20 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between md:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 text-2xl font-semibold uppercase tracking-[0.18em] text-white"
        >
          <span className="overflow-hidden rounded-xl border border-white/10 bg-white/95 p-1 shadow-[0_10px_24px_rgba(15,23,42,0.18)]">
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

        <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-white/80 md:gap-4">
          <Link
            href="/"
            className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
          >
            Начало
          </Link>
          <Link
            href="/tips"
            className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
          >
            Прогнози
          </Link>
          <Link
            href="/rezultati"
            className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
          >
            Резултати
          </Link>
          {vipEnabled && (
            <Link
              href="/vip"
              className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
            >
              VIP
            </Link>
          )}
          {authEnabled && <SiteAuthLink />}
        </nav>
      </div>
    </header>
  )
}
