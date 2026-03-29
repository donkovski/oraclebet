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
          accentClassName: "border-orange-300/35 bg-orange-300/12 text-orange-100",
        },
        {
          href: "/rezultati/hokei",
          label: "Хокей",
          description: "Архив на хокейните резултати, статистика и графики.",
          accentClassName: "border-sky-300/35 bg-sky-300/12 text-sky-100",
        },
        {
          href: "/rezultati/basketbol",
          label: "Баскетбол",
          description: "Подготвена секция за баскетболни резултати и бъдеща статистика.",
          accentClassName: "border-amber-300/35 bg-amber-300/12 text-amber-100",
        },
        {
          href: "/rezultati/beizbol",
          label: "Бейзбол",
          description: "Подготвена секция за бейзболни резултати и бъдеща статистика.",
          accentClassName: "border-emerald-300/35 bg-emerald-300/12 text-emerald-100",
        },
        {
          href: "/rezultati/tenis",
          label: "Тенис",
          description: "Архив за тенис резултати, статистика и бъдещи завършени прогнози.",
          accentClassName: "border-fuchsia-300/35 bg-fuchsia-300/12 text-fuchsia-100",
        },
      ]}
    />
  )
}
