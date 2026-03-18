import CountryFlag from "@/components/CountryFlag"
import type { PublicLocale } from "@/lib/public-locale"
import { translateCountryName, translateLeagueName } from "@/lib/public-locale"

type Props = {
  country: string
  league: string
  locale?: PublicLocale
}

export default function CompetitionBadge({
  country,
  league,
  locale = "bg",
}: Props) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-semibold text-white/80">
      <CountryFlag country={country} />
      <span>
        {translateCountryName(country, locale)} · {translateLeagueName(league, locale)}
      </span>
    </span>
  )
}
