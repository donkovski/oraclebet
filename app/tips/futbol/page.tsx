import type { Metadata } from "next"
import SportPredictionsPage from "@/components/SportPredictionsPage"
import { getFootballPredictions } from "@/lib/supabase-content"

export const metadata: Metadata = {
  title: "Футболни прогнози",
  description:
    "Виж активните футболни прогнози в OracleBet, подредени по час, пазар, коефициент и първенство.",
  alternates: {
    canonical: "/tips/futbol",
  },
}

export default async function FootballTipsPage() {
  const predictions = await getFootballPredictions()

  return (
    <SportPredictionsPage
      sportLabel="Футболни прогнози"
      emptyTitle="В момента няма активни футболни прогнози."
      emptyDescription="Когато има нови футболни селекции за деня, те ще се появят тук автоматично."
      predictions={predictions}
      introTitle="Днешните футболни селекции са вече публикувани."
      finishedTitle="Всички футболни прогнози за деня вече са започнали."
      accentClassName="border-orange-300/35 bg-orange-300/12 text-orange-100"
      links={[
        { href: "/tips", label: "Към всички прогнози" },
        { href: "/rezultati/futbol", label: "Към футболни резултати", primary: true },
      ]}
    />
  )
}
