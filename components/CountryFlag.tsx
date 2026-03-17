type Props = {
  country: string
}

function normalizeCountry(country: string) {
  return country.trim().toLowerCase()
}

function flagBase(className = "") {
  return `inline-flex h-4 w-6 overflow-hidden rounded-[3px] border border-white/15 shadow-[0_0_10px_rgba(15,23,42,0.18)] ${className}`.trim()
}

function SpainFlag() {
  return (
    <span className={flagBase()}>
      <span className="h-full w-full bg-red-500">
        <span className="mt-[4px] block h-[8px] w-full bg-yellow-300" />
      </span>
    </span>
  )
}

function ItalyFlag() {
  return (
    <span className={flagBase()}>
      <span className="h-full w-1/3 bg-emerald-500" />
      <span className="h-full w-1/3 bg-white" />
      <span className="h-full w-1/3 bg-rose-500" />
    </span>
  )
}

function GermanyFlag() {
  return (
    <span className={flagBase("flex-col")}>
      <span className="h-1/3 w-full bg-black" />
      <span className="h-1/3 w-full bg-red-600" />
      <span className="h-1/3 w-full bg-amber-400" />
    </span>
  )
}

function EnglandFlag() {
  return (
    <span className={flagBase("relative bg-white")}>
      <span className="absolute left-1/2 top-0 h-full w-[4px] -translate-x-1/2 bg-red-600" />
      <span className="absolute left-0 top-1/2 h-[4px] w-full -translate-y-1/2 bg-red-600" />
    </span>
  )
}

function FranceFlag() {
  return (
    <span className={flagBase()}>
      <span className="h-full w-1/3 bg-sky-700" />
      <span className="h-full w-1/3 bg-white" />
      <span className="h-full w-1/3 bg-rose-600" />
    </span>
  )
}

function UsaFlag() {
  return (
    <span className={flagBase()}>
      <span className="relative h-full w-full bg-white">
        <span className="absolute left-0 top-0 h-[54%] w-[45%] bg-sky-900" />
        <span className="absolute inset-0 flex flex-col justify-between py-[1px]">
          <span className="block h-[1px] bg-rose-600" />
          <span className="block h-[1px] bg-rose-600" />
          <span className="block h-[1px] bg-rose-600" />
          <span className="block h-[1px] bg-rose-600" />
          <span className="block h-[1px] bg-rose-600" />
          <span className="block h-[1px] bg-rose-600" />
          <span className="block h-[1px] bg-rose-600" />
        </span>
      </span>
    </span>
  )
}

function CanadaFlag() {
  return (
    <span className={flagBase()}>
      <span className="h-full w-1/4 bg-rose-600" />
      <span className="relative flex h-full w-1/2 items-center justify-center bg-white">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-600/90" />
      </span>
      <span className="h-full w-1/4 bg-rose-600" />
    </span>
  )
}

function SwitzerlandFlag() {
  return (
    <span className={flagBase("items-center justify-center bg-red-600")}>
      <span className="relative block h-2.5 w-2.5">
        <span className="absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 rounded-full bg-white" />
        <span className="absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 rounded-full bg-white" />
      </span>
    </span>
  )
}

function EuropeFlag() {
  const stars = Array.from({ length: 12 }, (_, index) => {
    const angle = ((index * 30 - 90) * Math.PI) / 180
    const x = 30 + Math.cos(angle) * 11
    const y = 20 + Math.sin(angle) * 11

    return { x, y }
  })

  return (
    <span className={flagBase("bg-sky-800")}>
      <svg
        aria-hidden="true"
        className="h-full w-full"
        viewBox="0 0 60 40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="60" height="40" fill="#1d4ed8" />
        {stars.map((star, index) => (
          <g key={index} transform={`translate(${star.x} ${star.y}) scale(0.62)`}>
            <path
              d="M0 -4 L1.18 -1.45 L3.95 -1.22 L1.88 0.72 L2.52 3.5 L0 2.08 L-2.52 3.5 L-1.88 0.72 L-3.95 -1.22 L-1.18 -1.45 Z"
              fill="#facc15"
            />
          </g>
        ))}
      </svg>
    </span>
  )
}

function FallbackFlag({ country }: Props) {
  const label = country
    .split(/[\s-/]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")

  return (
    <span
      className={flagBase("items-center justify-center bg-white/10 text-[9px] font-bold uppercase tracking-[0.08em] text-white/80")}
      title={country}
    >
      {label || "?"}
    </span>
  )
}

export default function CountryFlag({ country }: Props) {
  switch (normalizeCountry(country)) {
    case "испания":
    case "spain":
      return <SpainFlag />
    case "италия":
    case "italy":
      return <ItalyFlag />
    case "германия":
    case "germany":
      return <GermanyFlag />
    case "англия":
    case "england":
    case "великобритания":
    case "united kingdom":
      return <EnglandFlag />
    case "франция":
    case "france":
      return <FranceFlag />
    case "швейцария":
    case "switzerland":
    case "swiss":
      return <SwitzerlandFlag />
    case "европа":
    case "europe":
    case "european union":
    case "eu":
      return <EuropeFlag />
    case "сащ":
    case "usa":
    case "united states":
      return <UsaFlag />
    case "канада":
    case "canada":
      return <CanadaFlag />
    default:
      return <FallbackFlag country={country} />
  }
}
