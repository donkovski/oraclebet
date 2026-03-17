import type { Metadata } from "next"
import SportResultsPage from "@/components/SportResultsPage"
import { getFootballResults } from "@/lib/supabase-content"

export const metadata: Metadata = {
  title: "Футболни резултати и статистика",
  description:
    "Прегледай архива с футболни резултати и статистиката в OracleBet по дати, месеци и години.",
  alternates: {
    canonical: "/rezultati/futbol",
  },
}

export default async function FootballResultsPage() {
  const results = await getFootballResults()

  return (
    <SportResultsPage
      label="Футболни резултати"
      results={results}
      emptyTitle="Архивът за футбола ще започне да се попълва след първите приключени мачове."
      emptyDescription="След като публикуваните футболни прогнози приключат, тук автоматично ще започне да се трупа реален архив с резултати и статистика."
      predictionHref="/tips/futbol"
      predictionLabel="Към футболни прогнози"
      accentClassName="text-orange-200"
    />
  )
}
