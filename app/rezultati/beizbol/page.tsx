import type { Metadata } from "next"
import SportResultsPage from "@/components/SportResultsPage"
import { getBaseballResults } from "@/lib/supabase-content"

export const metadata: Metadata = {
  title: "Бейзбол резултати и статистика",
  description:
    "Прегледай архива с бейзбол резултати и статистиката в OracleBet по дати, месеци и години.",
  alternates: {
    canonical: "/rezultati/beizbol",
  },
}

export default async function BaseballResultsPage() {
  const results = await getBaseballResults()

  return (
    <SportResultsPage
      label="Бейзбол резултати"
      results={results}
      emptyTitle="Архивът за бейзбола ще започне да се попълва след първите приключени мачове."
      emptyDescription="След като публикуваните бейзболни прогнози приключат, тук автоматично ще започне да се трупа реален архив с резултати и статистика."
      predictionHref="/tips/beizbol"
      predictionLabel="Към бейзбол прогнози"
      accentClassName="text-emerald-200"
    />
  )
}
