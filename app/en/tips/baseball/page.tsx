import type { Metadata } from "next"
import SportPredictionsPage from "@/components/SportPredictionsPage"
import { getBaseballPredictions } from "@/lib/supabase-content"

export const metadata: Metadata = {
  title: "Baseball tips",
  description:
    "Dedicated baseball picks section in OracleBet with current and future selections.",
  alternates: {
    canonical: "/en/tips/baseball",
  },
}

export default async function EnglishBaseballTipsPage() {
  const predictions = await getBaseballPredictions()

  return (
    <SportPredictionsPage
      sportLabel="Baseball tips"
      emptyTitle="There are no active baseball tips right now."
      emptyDescription="This section is ready and will start filling automatically once you publish the first baseball picks."
      predictions={predictions}
      introTitle="Today's baseball selections are already published."
      finishedTitle="All baseball tips for the day have already started."
      accentClassName="border-emerald-300/35 bg-emerald-300/12 text-emerald-100"
      links={[
        { href: "/en/tips", label: "Back to all tips" },
        { href: "/en/results/baseball", label: "Baseball results", primary: true },
      ]}
      locale="en"
    />
  )
}
