import type { Metadata } from "next"
import DailyVisitTracker from "@/components/DailyVisitTracker"
import GoogleAnalytics from "@/components/GoogleAnalytics"
import SiteHeader from "@/components/SiteHeader"
import { siteConfig } from "@/lib/site-config"
import "./globals.css"

const defaultTitle = "OracleBet | Спортни прогнози, анализи и резултати"
const siteDescription =
  "OracleBet събира спортни прогнози за днес, анализи и резултати за футбол, хокей, баскетбол, бейзбол и тенис с удобен архив и ясна статистика."

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | OracleBet",
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  verification: {
    google: siteConfig.googleSiteVerification || undefined,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "bg_BG",
    url: siteConfig.siteUrl,
    siteName: "OracleBet",
    title: defaultTitle,
    description: siteDescription,
    images: [
      {
        url: "/logo.png",
        width: 768,
        height: 768,
        alt: "OracleBet logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteDescription,
    images: ["/logo.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bg" data-theme="light">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var theme=localStorage.getItem('oraclebet-theme');if(theme==='dark'||theme==='light'){document.documentElement.dataset.theme=theme;}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="site-body">
        <GoogleAnalytics measurementId={siteConfig.gaMeasurementId} />
        <DailyVisitTracker />

        <div className="site-shell">
          <SiteHeader
            vipEnabled={siteConfig.vipEnabled}
            authEnabled={siteConfig.authEnabled}
          />

          <main className="mx-auto max-w-6xl px-6 py-10 md:px-8 md:py-12">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
