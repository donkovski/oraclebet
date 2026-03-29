import type { Metadata } from "next"
import SportPredictionsPage from "@/components/SportPredictionsPage"
import { getTennisPredictions } from "@/lib/supabase-content"

export const metadata: Metadata = {
  title: "Тенис прогнози",
  description:
    "Разгледай тенис прогнози в OracleBet, подредени по час, пазар, коефициент и турнир.",
  alternates: {
    canonical: "/tips/tenis",
  },
}

export default async function TennisTipsPage() {
  const predictions = await getTennisPredictions()

  return (
    <SportPredictionsPage
      sportLabel="Тенис прогнози"
      emptyTitle="Очаквайте скоро."
      emptyDescription=""
      predictions={predictions}
      introTitle="Днешните тенис селекции са вече публикувани."
      finishedTitle="Всички тенис прогнози за деня вече са започнали."
      accentClassName="border-fuchsia-300/35 bg-fuchsia-300/12 text-fuchsia-100"
      links={[
        { href: "/tips", label: "Към всички прогнози" },
        { href: "/rezultati/tenis", label: "Към тенис резултати", primary: true },
      ]}
      sport="tennis"
    />
  )
}
