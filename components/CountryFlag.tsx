type Props = {
  country: string
}

function SpainFlag() {
  return (
    <span className="inline-flex h-4 w-6 overflow-hidden rounded-[3px] border border-white/15 shadow-[0_0_10px_rgba(15,23,42,0.18)]">
      <span className="h-full w-full bg-red-500">
        <span className="mt-[4px] block h-[8px] w-full bg-yellow-300" />
      </span>
    </span>
  )
}

function ItalyFlag() {
  return (
    <span className="inline-flex h-4 w-6 overflow-hidden rounded-[3px] border border-white/15 shadow-[0_0_10px_rgba(15,23,42,0.18)]">
      <span className="h-full w-1/3 bg-emerald-500" />
      <span className="h-full w-1/3 bg-white" />
      <span className="h-full w-1/3 bg-rose-500" />
    </span>
  )
}

function GermanyFlag() {
  return (
    <span className="inline-flex h-4 w-6 flex-col overflow-hidden rounded-[3px] border border-white/15 shadow-[0_0_10px_rgba(15,23,42,0.18)]">
      <span className="h-1/3 w-full bg-black" />
      <span className="h-1/3 w-full bg-red-600" />
      <span className="h-1/3 w-full bg-amber-400" />
    </span>
  )
}

export default function CountryFlag({ country }: Props) {
  if (country === "Испания") {
    return <SpainFlag />
  }

  if (country === "Италия") {
    return <ItalyFlag />
  }

  if (country === "Германия") {
    return <GermanyFlag />
  }

  return (
    <span className="inline-flex h-4 w-6 rounded-[3px] border border-white/15 bg-white/10" />
  )
}
