import type { Metadata } from "next"
import SportResultsPage from "@/components/SportResultsPage"
import { getHockeyResults } from "@/lib/supabase-content"

export const metadata: Metadata = {
  title: "Хокей резултати и статистика",
  description:
    "Прегледай архива с хокей резултати и статистиката в OracleBet по дати, месеци и години.",
  alternates: {
    canonical: "/rezultati/hokei",
  },
}

export default async function HockeyResultsPage() {
  const results = await getHockeyResults()

  return (
    <SportResultsPage
      label="Хокей резултати"
      results={results}
      emptyTitle="Архивът за хокея ще започне да се попълва след първите приключени мачове."
      emptyDescription="След като публикуваните хокей прогнози приключат, тук автоматично ще започне да се трупа реален архив с резултати и статистика."
      predictionHref="/tips/hokei"
      predictionLabel="Към хокей прогнози"
      accentClassName="text-sky-200"
    />
  )
}
