import type { Metadata } from "next"
import SportResultsPage from "@/components/SportResultsPage"
import { getBasketballResults } from "@/lib/supabase-content"

export const metadata: Metadata = {
  title: "Баскетбол резултати и статистика",
  description:
    "Прегледай архива с баскетбол резултати и статистиката в OracleBet по дати, месеци и години.",
  alternates: {
    canonical: "/rezultati/basketbol",
  },
}

export default async function BasketballResultsPage() {
  const results = await getBasketballResults()

  return (
    <SportResultsPage
      label="Баскетбол резултати"
      results={results}
      emptyTitle="Архивът за баскетбола ще започне да се попълва след първите приключени мачове."
      emptyDescription=""
      predictionHref="/tips/basketbol"
      predictionLabel="Към баскетбол прогнози"
      accentClassName="text-amber-200"
      sport="basketball"
    />
  )
}
