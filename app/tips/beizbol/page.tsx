import type { Metadata } from "next"
import SportPredictionsPage from "@/components/SportPredictionsPage"
import { getBaseballPredictions } from "@/lib/supabase-content"

export const metadata: Metadata = {
  title: "Бейзбол прогнози",
  description:
    "Подготвена секция за бейзболни прогнози в OracleBet с бъдещо публикуване по час и коефициент.",
  alternates: {
    canonical: "/tips/beizbol",
  },
}

export default async function BaseballTipsPage() {
  const predictions = await getBaseballPredictions()

  return (
    <SportPredictionsPage
      sportLabel="Бейзбол прогнози"
      emptyTitle="В момента няма активни бейзболни прогнози."
      emptyDescription="Секцията е готова и ще започне да се попълва автоматично, когато публикуваш първите бейзболни прогнози."
      predictions={predictions}
      introTitle="Днешните бейзболни селекции са вече публикувани."
      finishedTitle="Всички бейзболни прогнози за деня вече са започнали."
      accentClassName="border-emerald-300/35 bg-emerald-300/12 text-emerald-100"
      links={[
        { href: "/tips", label: "Към всички прогнози" },
        { href: "/rezultati/beizbol", label: "Към бейзбол резултати", primary: true },
      ]}
    />
  )
}
