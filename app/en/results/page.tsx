import type { Metadata } from "next"
import SportsHubPage from "@/components/SportsHubPage"

export const metadata: Metadata = {
  title: "Results",
  description:
    "Choose a sport and browse OracleBet result archives for football, hockey, basketball and baseball.",
  alternates: {
    canonical: "/en/results",
  },
}

export default function EnglishResultsHubPage() {
  return (
    <SportsHubPage
      eyebrow="Results"
      title="Choose the sports section for archives and statistics."
      description="Result archives are now grouped by sport so you can follow history, statistics and settled picks more easily."
      ctaLabel="Open section"
      cards={[
        {
          href: "/en/results/football",
          label: "Football",
          description: "Archive of football results, stats and charts.",
          accentClassName: "border-orange-300/35 bg-orange-300/12 text-orange-100",
        },
        {
          href: "/en/results/hockey",
          label: "Hockey",
          description: "Archive of hockey results, stats and charts.",
          accentClassName: "border-sky-300/35 bg-sky-300/12 text-sky-100",
        },
        {
          href: "/en/results/basketball",
          label: "Basketball",
          description: "Dedicated basketball results section ready for archive and statistics.",
          accentClassName: "border-amber-300/35 bg-amber-300/12 text-amber-100",
        },
        {
          href: "/en/results/baseball",
          label: "Baseball",
          description: "Dedicated baseball results section ready for archive and statistics.",
          accentClassName: "border-emerald-300/35 bg-emerald-300/12 text-emerald-100",
        },
      ]}
    />
  )
}
