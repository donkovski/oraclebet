import type { Metadata } from "next"
import SportPredictionsPage from "@/components/SportPredictionsPage"
import { getBasketballPredictions } from "@/lib/supabase-content"

export const metadata: Metadata = {
  title: "Basketball tips",
  description:
    "Dedicated basketball picks section in OracleBet with current and future selections.",
  alternates: {
    canonical: "/en/tips/basketball",
  },
}

export default async function EnglishBasketballTipsPage() {
  const predictions = await getBasketballPredictions()

  return (
    <SportPredictionsPage
      sportLabel="Basketball tips"
      emptyTitle="There are no active basketball tips right now."
      emptyDescription="This section is ready and will start filling automatically once you publish the first basketball picks."
      predictions={predictions}
      introTitle="Today's basketball selections are already published."
      finishedTitle="All basketball tips for the day have already started."
      accentClassName="border-amber-300/35 bg-amber-300/12 text-amber-100"
      links={[
        { href: "/en/tips", label: "Back to all tips" },
        { href: "/en/results/basketball", label: "Basketball results", primary: true },
      ]}
      locale="en"
      sport="basketball"
    />
  )
}
