"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

const SOFIA_TIMEZONE = "Europe/Sofia"

function getSofiaDateKey() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: SOFIA_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date())

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))

  return `${values.year}-${values.month}-${values.day}`
}

export default function DailyVisitTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) {
      return
    }

    const visitKey = `oraclebet-visit-v2-${getSofiaDateKey()}`
    const pendingKey = `${visitKey}-pending`

    if (window.localStorage.getItem(visitKey)) {
      return
    }

    if (window.sessionStorage.getItem(pendingKey)) {
      return
    }

    window.sessionStorage.setItem(pendingKey, "1")

    void fetch("/api/analytics/visit", {
      method: "POST",
      cache: "no-store",
      keepalive: true,
    })
      .then(async (response) => {
        if (!response.ok) {
          return
        }

        const payload = (await response.json()) as { ok?: boolean }

        if (payload.ok) {
          window.localStorage.setItem(visitKey, "1")
        }
      })
      .finally(() => {
        window.sessionStorage.removeItem(pendingKey)
      })
  }, [pathname])

  return null
}
