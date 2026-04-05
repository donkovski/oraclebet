import type { Metadata } from "next"
import SportResultsPage from "@/components/SportResultsPage"
import { getTennisResults } from "@/lib/supabase-content"

export const metadata: Metadata = {
  title: "Тенис резултати и статистика",
  description:
    "Прегледай архива с тенис резултати и статистиката в OracleBet по дати, месеци и години.",
  alternates: {
    canonical: "/rezultati/tenis",
  },
}

export default async function TennisResultsPage() {
  const results = await getTennisResults()

  return (
    <SportResultsPage
      label="Тенис резултати"
      results={results}
      emptyTitle="Архивът за тениса ще започне да се попълва след първите приключени мачове."
      emptyDescription=""
      predictionHref="/tips/tenis"
      predictionLabel="Към тенис прогнози"
      accentClassName="text-fuchsia-700"
      sport="tennis"
    />
  )
}
