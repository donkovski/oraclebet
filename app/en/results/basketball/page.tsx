import type { Metadata } from "next"
import SportResultsPage from "@/components/SportResultsPage"
import { getBasketballResults } from "@/lib/supabase-content"

export const metadata: Metadata = {
  title: "Basketball results and stats",
  description:
    "Browse the OracleBet basketball results archive and statistics by dates, months and years.",
  alternates: {
    canonical: "/en/results/basketball",
  },
}

export default async function EnglishBasketballResultsPage() {
  const results = await getBasketballResults()

  return (
    <SportResultsPage
      label="Basketball results"
      results={results}
      emptyTitle="The basketball archive will start filling up after the first settled matches."
      emptyDescription="Once the published basketball picks are settled, a live archive with results and statistics will start building here automatically."
      predictionHref="/en/tips/basketball"
      predictionLabel="Basketball tips"
      accentClassName="text-amber-200"
      locale="en"
    />
  )
}
