import type { Metadata } from "next"
import SportsHubPage from "@/components/SportsHubPage"

export const metadata: Metadata = {
  title: "Tips",
  description:
    "Choose a sport and browse OracleBet tips for football, hockey, basketball and baseball.",
  alternates: {
    canonical: "/en/tips",
  },
}

export default function EnglishTipsHubPage() {
  return (
    <SportsHubPage
      eyebrow="Tips"
      title="Choose the sports section for today's picks."
      description="All predictions are now grouped by sport so you can find active matches and their archives faster. From here you can open football, hockey, basketball and baseball."
      ctaLabel="Open section"
      cards={[
        {
          href: "/en/tips/football",
          label: "Football",
          description: "Active football picks grouped by kickoff time, market and competition.",
          accentClassName: "border-orange-300/35 bg-orange-300/12 text-orange-100",
        },
        {
          href: "/en/tips/hockey",
          label: "Hockey",
          description: "NHL and other hockey picks in a separate section for current matches.",
          accentClassName: "border-sky-300/35 bg-sky-300/12 text-sky-100",
        },
        {
          href: "/en/tips/basketball",
          label: "Basketball",
          description: "Dedicated basketball picks section ready for current and future selections.",
          accentClassName: "border-amber-300/35 bg-amber-300/12 text-amber-100",
        },
        {
          href: "/en/tips/baseball",
          label: "Baseball",
          description: "Dedicated baseball picks section ready for current and future selections.",
          accentClassName: "border-emerald-300/35 bg-emerald-300/12 text-emerald-100",
        },
      ]}
    />
  )
}
