import type { Metadata } from "next"
import SportsHubPage from "@/components/SportsHubPage"

export const metadata: Metadata = {
  title: "Прогнози",
  description:
    "Избери спорт и разгледай прогнозите в OracleBet за футбол, хокей, баскетбол и бейзбол.",
  alternates: {
    canonical: "/tips",
  },
}

export default function TipsHubPage() {
  return (
    <SportsHubPage
      eyebrow="Прогнози"
      title="Избери спортната секция за днешните прогнози."
      description="Всички прогнози вече са подредени по спортове, за да намираш по-бързо активните мачове и архивите им. Оттук можеш да влезеш във футбол, хокей, баскетбол и бейзбол."
      cards={[
        {
          href: "/tips/futbol",
          label: "Футбол",
          description: "Активни футболни прогнози, подредени по час, пазар и първенство.",
          accentClassName: "border-orange-300/35 bg-orange-300/12 text-orange-100",
        },
        {
          href: "/tips/hokei",
          label: "Хокей",
          description: "NHL и други хокейни прогнози с отделна секция за текущите мачове.",
          accentClassName: "border-sky-300/35 bg-sky-300/12 text-sky-100",
        },
        {
          href: "/tips/basketbol",
          label: "Баскетбол",
          description: "Подготвена секция за баскетболни прогнози и бъдещо публикуване.",
          accentClassName: "border-amber-300/35 bg-amber-300/12 text-amber-100",
        },
        {
          href: "/tips/beizbol",
          label: "Бейзбол",
          description: "Подготвена секция за бейзболни прогнози и бъдещо публикуване.",
          accentClassName: "border-emerald-300/35 bg-emerald-300/12 text-emerald-100",
        },
      ]}
    />
  )
}
