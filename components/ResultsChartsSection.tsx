"use client"

import { useMemo, useState } from "react"
import ProfitChart from "@/components/ProfitChart"
import ResultsPieChart from "@/components/ResultsPieChart"
import type { Result } from "@/types/results"

const SOFIA_TIMEZONE = "Europe/Sofia"

type ResultsChartsSectionProps = {
  results: Result[]
}

type MonthOption = {
  key: string
  label: string
  totalResults: number
}

function getCurrentMonthKey() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: SOFIA_TIMEZONE,
    year: "numeric",
    month: "2-digit",
  }).formatToParts(new Date())

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))

  return `${values.year}-${values.month}`
}

function formatMonthLabel(monthKey: string) {
  const [year, month] = monthKey.split("-").map(Number)

  return new Intl.DateTimeFormat("bg-BG", {
    timeZone: SOFIA_TIMEZONE,
    month: "long",
    year: "numeric",
  }).format(new Date(Date.UTC(year, month - 1, 1, 12)))
}

function formatCount(count: number) {
  return `${count} ${count === 1 ? "залог" : "залога"}`
}

function buildMonthOptions(results: Result[]): MonthOption[] {
  const monthTotals = new Map<string, number>()
  const currentMonthKey = getCurrentMonthKey()

  monthTotals.set(currentMonthKey, 0)

  for (const result of results) {
    const monthKey = result.date.slice(0, 7)
    monthTotals.set(monthKey, (monthTotals.get(monthKey) ?? 0) + 1)
  }

  return Array.from(monthTotals.entries())
    .sort(([leftMonth], [rightMonth]) => rightMonth.localeCompare(leftMonth))
    .map(([key, totalResults]) => ({
      key,
      label: formatMonthLabel(key),
      totalResults,
    }))
}

export default function ResultsChartsSection({ results }: ResultsChartsSectionProps) {
  const currentMonthKey = getCurrentMonthKey()
  const monthOptions = useMemo(() => buildMonthOptions(results), [results])
  const [selectedMonthKey, setSelectedMonthKey] = useState(currentMonthKey)

  const activeMonth =
    monthOptions.find((option) => option.key === selectedMonthKey) ?? monthOptions[0]

  const activeMonthResults = useMemo(
    () => results.filter((result) => result.date.startsWith(activeMonth?.key ?? "")),
    [activeMonth?.key, results]
  )

  if (!activeMonth) {
    return null
  }

  const isCurrentMonth = activeMonth.key === currentMonthKey

  return (
    <section className="space-y-6">
      <div className="rounded-[28px] border border-white/12 bg-slate-950/[0.08] p-5 backdrop-blur-[2px] md:p-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Графики по месец
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">{activeMonth.label}</h2>
            <p className="mt-2 text-sm leading-7 text-white/65">
              {isCurrentMonth
                ? "По подразбиране е избран текущият месец, но можеш да отвориш и по-стари периоди от менюто."
                : "Избран е архивен месец. Можеш по всяко време да се върнеш към текущия период от менюто."}
            </p>
          </div>

          <label htmlFor="chart-month" className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              Избери месец
            </span>
            <div className="relative">
              <select
                id="chart-month"
                value={activeMonth.key}
                onChange={(event) => setSelectedMonthKey(event.target.value)}
                className="w-full appearance-none rounded-2xl border border-white/12 bg-slate-950/[0.08] px-4 py-3 pr-10 text-sm font-medium text-white outline-none transition focus:border-orange-300/55 focus:bg-slate-950/[0.12] focus-visible:ring-2 focus-visible:ring-orange-300/35"
              >
                {monthOptions.map((month) => (
                  <option key={month.key} value={month.key}>
                    {month.label} · {formatCount(month.totalResults)}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-white/45">
                ▾
              </span>
            </div>
          </label>
        </div>
      </div>

      {activeMonthResults.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          <ProfitChart results={activeMonthResults} />
          <ResultsPieChart results={activeMonthResults} />
        </div>
      ) : (
        <div className="rounded-[28px] border border-dashed border-white/15 bg-slate-950/[0.08] p-8 text-center backdrop-blur-[2px]">
          <h3 className="text-2xl font-bold text-white">
            Няма приключени залози за {activeMonth.label}
          </h3>
          <p className="mt-3 text-white/65">
            Избери друг месец от менюто, ако искаш да разгледаш по-стари графики и
            история.
          </p>
        </div>
      )}
    </section>
  )
}
