"use client"

import { useEffect, useMemo, useState } from "react"
import { parseKickoff } from "@/lib/prediction-utils"

type Props = {
  kickoff: string
}

function getCountdownState(kickoff: string, now: number) {
  const startsAt = parseKickoff(kickoff).getTime()
  const diffMs = startsAt - now

  if (diffMs <= 0) {
    return {
      label: "Играе се",
      className: "border-rose-300/40 bg-rose-50 text-rose-700",
    }
  }

  const totalMinutes = Math.floor(diffMs / 60000)
  const days = Math.floor(totalMinutes / (60 * 24))
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60)
  const minutes = totalMinutes % 60

  const parts: string[] = []

  if (days > 0) {
    parts.push(`${days}д`)
  }

  if (hours > 0) {
    parts.push(`${hours}ч`)
  }

  if (minutes > 0 || parts.length === 0) {
    parts.push(`${minutes}м`)
  }

  const className =
    totalMinutes <= 60
      ? "border-amber-300/40 bg-amber-50 text-amber-700"
      : "border-emerald-300/40 bg-emerald-50 text-emerald-700"

  return {
    label: `Започва след ${parts.join(" ")}`,
    className,
  }
}

export default function PredictionCountdown({ kickoff }: Props) {
  const [now, setNow] = useState(() => Date.now())
  const countdown = useMemo(() => getCountdownState(kickoff, now), [kickoff, now])

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(Date.now())
    }, 30000)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${countdown.className}`}
    >
      {countdown.label}
    </span>
  )
}
