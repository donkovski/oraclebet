import type { Metadata } from "next"
import SportResultsPage from "@/components/SportResultsPage"
import { getBaseballResults } from "@/lib/supabase-content"

export const metadata: Metadata = {
  title: "Baseball results and stats",
  description:
    "Browse the OracleBet baseball results archive and statistics by dates, months and years.",
  alternates: {
    canonical: "/en/results/baseball",
  },
}

export default async function EnglishBaseballResultsPage() {
  const results = await getBaseballResults()

  return (
    <SportResultsPage
      label="Baseball results"
      results={results}
      emptyTitle="The baseball archive will start filling up after the first settled matches."
      emptyDescription="Once the published baseball picks are settled, a live archive with results and statistics will start building here automatically."
      predictionHref="/en/tips/baseball"
      predictionLabel="Baseball tips"
      accentClassName="text-emerald-200"
      locale="en"
      sport="baseball"
    />
  )
}
