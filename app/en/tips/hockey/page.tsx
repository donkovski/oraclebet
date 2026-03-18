import type { Metadata } from "next"
import SportPredictionsPage from "@/components/SportPredictionsPage"
import { getHockeyPredictions } from "@/lib/supabase-content"

export const metadata: Metadata = {
  title: "Hockey tips",
  description:
    "Browse hockey tips in OracleBet, grouped by kickoff time, market, odds and league.",
  alternates: {
    canonical: "/en/tips/hockey",
  },
}

export default async function EnglishHockeyTipsPage() {
  const predictions = await getHockeyPredictions()

  return (
    <SportPredictionsPage
      sportLabel="Hockey tips"
      emptyTitle="There are no active hockey tips right now."
      emptyDescription="When new hockey selections are published, they will appear here automatically."
      predictions={predictions}
      introTitle="Today's hockey selections are already published."
      finishedTitle="All hockey tips for the day have already started."
      accentClassName="border-sky-300/35 bg-sky-300/12 text-sky-100"
      links={[
        { href: "/en/tips", label: "Back to all tips" },
        { href: "/en/results/hockey", label: "Hockey results", primary: true },
      ]}
      locale="en"
    />
  )
}
