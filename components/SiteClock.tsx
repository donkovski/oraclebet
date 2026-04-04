"use client"

import { useEffect, useMemo, useState } from "react"

const TIME_ZONE = "Europe/Sofia"

export default function SiteClock() {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(Date.now())
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [])

  const formattedTime = useMemo(
    () =>
      new Intl.DateTimeFormat("bg-BG", {
        timeZone: TIME_ZONE,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now),
    [now]
  )

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/80">
      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.6)]" />
      <span>София {formattedTime}</span>
    </div>
  )
}
