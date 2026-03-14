type Props = {
  country: string
  countryFlag: string
  league: string
}

export default function CompetitionBadge({ country, countryFlag, league }: Props) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-semibold text-white/80">
      <span aria-hidden="true" className="text-sm leading-none">
        {countryFlag}
      </span>
      <span>
        {country} · {league}
      </span>
    </span>
  )
}
