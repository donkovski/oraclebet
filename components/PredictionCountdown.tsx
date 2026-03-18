"use client"

import { useEffect, useMemo, useState } from "react"
import type { PublicLocale } from "@/lib/public-locale"
import { parseKickoff } from "@/lib/prediction-utils"

type Props = {
  kickoff: string
  locale?: PublicLocale
}

function getCountdownState(kickoff: string, now: number, locale: PublicLocale) {
  const startsAt = parseKickoff(kickoff).getTime()
  const diffMs = startsAt - now

  if (diffMs <= 0) {
    return {
      label: locale === "en" ? "Live now" : "Играе се",
      className: "border-rose-300/30 bg-rose-300/10 text-rose-100",
    }
  }

  const totalMinutes = Math.floor(diffMs / 60000)
  const days = Math.floor(totalMinutes / (60 * 24))
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60)
  const minutes = totalMinutes % 60

  const parts: string[] = []

  if (days > 0) {
    parts.push(locale === "en" ? `${days}d` : `${days}д`)
  }

  if (hours > 0) {
    parts.push(locale === "en" ? `${hours}h` : `${hours}ч`)
  }

  if (minutes > 0 || parts.length === 0) {
    parts.push(locale === "en" ? `${minutes}m` : `${minutes}м`)
  }

  const className =
    totalMinutes <= 60
      ? "border-amber-300/30 bg-amber-300/10 text-amber-100"
      : "border-emerald-300/30 bg-emerald-300/10 text-emerald-100"

  return {
    label:
      locale === "en"
        ? `Starts in ${parts.join(" ")}`
        : `Започва след ${parts.join(" ")}`,
    className,
  }
}

export default function PredictionCountdown({
  kickoff,
  locale = "bg",
}: Props) {
  const [now, setNow] = useState(() => Date.now())
  const countdown = useMemo(
    () => getCountdownState(kickoff, now, locale),
    [kickoff, locale, now]
  )

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
