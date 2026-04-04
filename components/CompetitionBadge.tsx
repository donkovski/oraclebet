import CountryFlag from "@/components/CountryFlag"

type Props = {
  country: string
  league: string
}

export default function CompetitionBadge({ country, league }: Props) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-white/80">
      <CountryFlag country={country} />
      <span>
        {country} · {league}
      </span>
    </span>
  )
}
