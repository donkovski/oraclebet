import type { Metadata } from "next"
import SportPredictionsPage from "@/components/SportPredictionsPage"
import { getBasketballPredictions } from "@/lib/supabase-content"

export const metadata: Metadata = {
  title: "Баскетбол прогнози",
  description:
    "Подготвена секция за баскетболни прогнози в OracleBet с бъдещо публикуване по час и коефициент.",
  alternates: {
    canonical: "/tips/basketbol",
  },
}

export default async function BasketballTipsPage() {
  const predictions = await getBasketballPredictions()

  return (
    <SportPredictionsPage
      sportLabel="Баскетбол прогнози"
      emptyTitle="В момента няма активни баскетболни прогнози."
      emptyDescription=""
      predictions={predictions}
      introTitle="Днешните баскетболни селекции са вече публикувани."
      finishedTitle="Всички баскетболни прогнози за деня вече са започнали."
      accentClassName="border-amber-300/45 bg-amber-50 text-amber-700"
      links={[
        { href: "/tips", label: "Към всички прогнози" },
        { href: "/rezultati/basketbol", label: "Към баскетбол резултати", primary: true },
      ]}
    />
  )
}
