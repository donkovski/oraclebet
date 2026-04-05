import type { Metadata } from "next"
import SportsHubPage from "@/components/SportsHubPage"

export const metadata: Metadata = {
  title: "Прогнози",
  description:
    "Избери спорт и разгледай прогнозите в OracleBet за футбол, хокей, баскетбол, бейзбол и тенис.",
  alternates: {
    canonical: "/tips",
  },
}

export default function TipsHubPage() {
  return (
    <SportsHubPage
      eyebrow="Прогнози"
      title="Избери спортната секция за днешните прогнози."
      description="Всички прогнози вече са подредени по спортове, за да намираш по-бързо активните мачове и архивите им. Оттук можеш да влезеш във футбол, хокей, баскетбол, бейзбол и тенис."
      cards={[
        {
          href: "/tips/futbol",
          label: "Футбол",
          description: "Активни футболни прогнози, подредени по час, пазар и първенство.",
          accentClassName: "border-orange-300/45 bg-orange-50 text-orange-700",
        },
        {
          href: "/tips/hokei",
          label: "Хокей",
          description: "NHL и други хокейни прогнози с отделна секция за текущите мачове.",
          accentClassName: "border-sky-300/45 bg-sky-50 text-sky-700",
        },
        {
          href: "/tips/basketbol",
          label: "Баскетбол",
          description: "Подготвена секция за баскетболни прогнози и бъдещо публикуване.",
          accentClassName: "border-amber-300/45 bg-amber-50 text-amber-700",
        },
        {
          href: "/tips/beizbol",
          label: "Бейзбол",
          description: "Подготвена секция за бейзболни прогнози и бъдещо публикуване.",
          accentClassName: "border-emerald-300/45 bg-emerald-50 text-emerald-700",
        },
        {
          href: "/tips/tenis",
          label: "Тенис",
          description: "Тенис прогнози по турнири и мачове, подредени в отделна секция.",
          accentClassName: "border-fuchsia-300/45 bg-fuchsia-50 text-fuchsia-700",
        },
      ]}
    />
  )
}
