import type { Metadata } from "next"
import SportResultsPage from "@/components/SportResultsPage"
import { getFootballResults } from "@/lib/supabase-content"

export const metadata: Metadata = {
  title: "Football results and stats",
  description:
    "Browse the OracleBet football results archive and statistics by dates, months and years.",
  alternates: {
    canonical: "/en/results/football",
  },
}

export default async function EnglishFootballResultsPage() {
  const results = await getFootballResults()

  return (
    <SportResultsPage
      label="Football results"
      results={results}
      emptyTitle="The football archive will start filling up after the first settled matches."
      emptyDescription="Once the published football picks are settled, a live archive with results and statistics will start building here automatically."
      predictionHref="/en/tips/football"
      predictionLabel="Football tips"
      accentClassName="text-orange-200"
      locale="en"
    />
  )
}
