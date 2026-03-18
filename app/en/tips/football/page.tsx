import type { Metadata } from "next"
import SportPredictionsPage from "@/components/SportPredictionsPage"
import { getFootballPredictions } from "@/lib/supabase-content"

export const metadata: Metadata = {
  title: "Football tips",
  description:
    "Browse active football tips in OracleBet, grouped by kickoff time, market, odds and competition.",
  alternates: {
    canonical: "/en/tips/football",
  },
}

export default async function EnglishFootballTipsPage() {
  const predictions = await getFootballPredictions()

  return (
    <SportPredictionsPage
      sportLabel="Football tips"
      emptyTitle="There are no active football tips right now."
      emptyDescription="When new football selections are published for the day, they will appear here automatically."
      predictions={predictions}
      introTitle="Today's football selections are already published."
      finishedTitle="All football tips for the day have already started."
      accentClassName="border-orange-300/35 bg-orange-300/12 text-orange-100"
      links={[
        { href: "/en/tips", label: "Back to all tips" },
        { href: "/en/results/football", label: "Football results", primary: true },
      ]}
      locale="en"
      sport="football"
    />
  )
}
