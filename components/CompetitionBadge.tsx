import CountryFlag from "@/components/CountryFlag"

type Props = {
  country: string
  league: string
}

export default function CompetitionBadge({ country, league }: Props) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
      <CountryFlag country={country} />
      <span>
        {country} · {league}
      </span>
    </span>
  )
}
