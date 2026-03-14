import type { Metadata } from "next"
import Link from "next/link"
import GoogleAnalytics from "@/components/GoogleAnalytics"
import OracleBetLogo from "@/components/OracleBetLogo"
import SiteAuthLink from "@/components/SiteAuthLink"
import { siteConfig } from "@/lib/site-config"
import "./globals.css"

export const metadata: Metadata = {
  title: "OracleBet | Спортни прогнози",
  description:
    "OracleBet предлага подредени спортни прогнози, архив с резултати и ясна статистика за бърз преглед.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bg">
      <body className="site-body">
        <GoogleAnalytics measurementId={siteConfig.gaMeasurementId} />

        <div className="site-shell">
          <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/20 backdrop-blur-xl">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between md:px-8">
              <Link
                href="/"
                className="flex items-center gap-3 text-2xl font-semibold uppercase tracking-[0.18em] text-white"
              >
                <OracleBetLogo size={42} className="shrink-0" />
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
                  href="/bezplatni"
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
                {siteConfig.vipEnabled && (
                  <Link
                    href="/vip"
                    className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
                  >
                    VIP
                  </Link>
                )}
                {siteConfig.authEnabled && <SiteAuthLink />}
              </nav>
            </div>
          </header>

          <main className="mx-auto max-w-6xl px-6 py-10 md:px-8 md:py-12">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
