"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import SiteAuthLink from "@/components/SiteAuthLink"

type Props = {
  vipEnabled: boolean
  authEnabled: boolean
}

const bgToEnPathMap: Record<string, string> = {
  "/": "/en",
  "/tips": "/en/tips",
  "/tips/futbol": "/en/tips/football",
  "/tips/hokei": "/en/tips/hockey",
  "/tips/basketbol": "/en/tips/basketball",
  "/tips/beizbol": "/en/tips/baseball",
  "/rezultati": "/en/results",
  "/rezultati/futbol": "/en/results/football",
  "/rezultati/hokei": "/en/results/hockey",
  "/rezultati/basketbol": "/en/results/basketball",
  "/rezultati/beizbol": "/en/results/baseball",
  "/prognozi": "/en/tips",
  "/prognozi/futbol": "/en/tips/football",
  "/prognozi/hokei": "/en/tips/hockey",
  "/prognozi/basketbol": "/en/tips/basketball",
  "/prognozi/beizbol": "/en/tips/baseball",
  "/hokei-prognozi": "/en/tips/hockey",
  "/hokei-rezultati": "/en/results/hockey",
}

const enToBgPathMap = Object.fromEntries(
  Object.entries(bgToEnPathMap).map(([bgPath, enPath]) => [enPath, bgPath])
) as Record<string, string>

function getLocalizedPath(pathname: string | null, locale: "bg" | "en") {
  if (!pathname) {
    return locale === "en" ? "/en" : "/"
  }

  if (locale === "en") {
    return bgToEnPathMap[pathname] ?? (pathname === "/" ? "/en" : `/en${pathname}`)
  }

  return enToBgPathMap[pathname] ?? (pathname === "/en" ? "/" : pathname.replace(/^\/en/, "") || "/")
}

export default function SiteHeader({ vipEnabled, authEnabled }: Props) {
  const pathname = usePathname()
  const isEnglish = pathname === "/en" || pathname?.startsWith("/en/")

  const copy = isEnglish
    ? {
        home: "Home",
        tips: "Tips",
        results: "Results",
        brandHref: "/en",
      }
    : {
        home: "Начало",
        tips: "Прогнози",
        results: "Резултати",
        brandHref: "/",
      }

  const tipsHref = isEnglish ? "/en/tips" : "/tips"
  const resultsHref = isEnglish ? "/en/results" : "/rezultati"
  const languageSwitchHref = getLocalizedPath(pathname, isEnglish ? "bg" : "en")

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/20 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between md:px-8">
        <Link
          href={copy.brandHref}
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
            href={copy.brandHref}
            className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
          >
            {copy.home}
          </Link>
          <Link
            href={tipsHref}
            className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
          >
            {copy.tips}
          </Link>
          <Link
            href={resultsHref}
            className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
          >
            {copy.results}
          </Link>
          {vipEnabled && (
            <Link
              href="/vip"
              className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
            >
              VIP
            </Link>
          )}
          <Link
            href={languageSwitchHref}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition hover:bg-white/10 hover:text-white"
          >
            {isEnglish ? "BG" : "EN"}
          </Link>
          {authEnabled && <SiteAuthLink />}
        </nav>
      </div>
    </header>
  )
}
