import type { Metadata } from "next"
import SportPredictionsPage from "@/components/SportPredictionsPage"
import { getHockeyPredictions } from "@/lib/supabase-content"

export const metadata: Metadata = {
  title: "Хокей прогнози",
  description:
    "Разгледай хокей прогнози в OracleBet, подредени по час, пазар, коефициент и лига.",
  alternates: {
    canonical: "/tips/hokei",
  },
}

export default async function HockeyTipsPage() {
  const predictions = await getHockeyPredictions()

  return (
    <SportPredictionsPage
      sportLabel="Хокей прогнози"
      emptyTitle="В момента няма активни хокей прогнози."
      emptyDescription=""
      predictions={predictions}
      introTitle="Днешните хокей селекции са вече публикувани."
      finishedTitle="Всички хокей прогнози за деня вече са започнали."
      accentClassName="border-sky-300/45 bg-sky-50 text-sky-700"
      links={[
        { href: "/tips", label: "Към всички прогнози" },
        { href: "/rezultati/hokei", label: "Към хокей резултати", primary: true },
      ]}
    />
  )
}
