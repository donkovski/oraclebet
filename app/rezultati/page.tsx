import type { Metadata } from "next"
import SportsHubPage from "@/components/SportsHubPage"

export const metadata: Metadata = {
  title: "Резултати",
  description:
    "Избери спорт и разгледай резултатите и архивите в OracleBet за футбол, хокей, баскетбол, бейзбол и тенис.",
  alternates: {
    canonical: "/rezultati",
  },
}

export default function ResultsHubPage() {
  return (
    <SportsHubPage
      eyebrow="Резултати"
      title="Избери спортната секция за архив и статистика."
      description="Архивите с резултати вече са подредени по спортове, за да можеш по-лесно да следиш историята, статистиката и завършените прогнози."
      cards={[
        {
          href: "/rezultati/futbol",
          label: "Футбол",
          description: "Архив на футболните резултати, статистика и графики.",
          accentClassName: "border-orange-300/45 bg-orange-50 text-orange-700",
        },
        {
          href: "/rezultati/hokei",
          label: "Хокей",
          description: "Архив на хокейните резултати, статистика и графики.",
          accentClassName: "border-sky-300/45 bg-sky-50 text-sky-700",
        },
        {
          href: "/rezultati/basketbol",
          label: "Баскетбол",
          description: "Подготвена секция за баскетболни резултати и бъдеща статистика.",
          accentClassName: "border-amber-300/45 bg-amber-50 text-amber-700",
        },
        {
          href: "/rezultati/beizbol",
          label: "Бейзбол",
          description: "Подготвена секция за бейзболни резултати и бъдеща статистика.",
          accentClassName: "border-emerald-300/45 bg-emerald-50 text-emerald-700",
        },
        {
          href: "/rezultati/tenis",
          label: "Тенис",
          description: "Архив за тенис резултати, статистика и бъдещи завършени прогнози.",
          accentClassName: "border-fuchsia-300/45 bg-fuchsia-50 text-fuchsia-700",
        },
      ]}
    />
  )
}
