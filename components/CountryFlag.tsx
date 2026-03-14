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

function UsaFlag() {
  return (
    <span className="inline-flex h-4 w-6 overflow-hidden rounded-[3px] border border-white/15 shadow-[0_0_10px_rgba(15,23,42,0.18)]">
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
    <span className="inline-flex h-4 w-6 overflow-hidden rounded-[3px] border border-white/15 shadow-[0_0_10px_rgba(15,23,42,0.18)]">
      <span className="h-full w-1/4 bg-rose-600" />
      <span className="relative flex h-full w-1/2 items-center justify-center bg-white">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-600/90" />
      </span>
      <span className="h-full w-1/4 bg-rose-600" />
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

  if (country === "САЩ") {
    return <UsaFlag />
  }

  if (country === "Канада") {
    return <CanadaFlag />
  }

  return (
    <span className="inline-flex h-4 w-6 rounded-[3px] border border-white/15 bg-white/10" />
  )
}
