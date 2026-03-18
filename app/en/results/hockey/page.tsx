import type { Metadata } from "next"
import SportResultsPage from "@/components/SportResultsPage"
import { getHockeyResults } from "@/lib/supabase-content"

export const metadata: Metadata = {
  title: "Hockey results and stats",
  description:
    "Browse the OracleBet hockey results archive and statistics by dates, months and years.",
  alternates: {
    canonical: "/en/results/hockey",
  },
}

export default async function EnglishHockeyResultsPage() {
  const results = await getHockeyResults()

  return (
    <SportResultsPage
      label="Hockey results"
      results={results}
      emptyTitle="The hockey archive will start filling up after the first settled matches."
      emptyDescription="Once the published hockey picks are settled, a live archive with results and statistics will start building here automatically."
      predictionHref="/en/tips/hockey"
      predictionLabel="Hockey tips"
      accentClassName="text-sky-200"
      locale="en"
      sport="hockey"
    />
  )
}
