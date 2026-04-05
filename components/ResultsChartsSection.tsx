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

type ResultStats = {
  total: number
  wins: number
  losses: number
  voids: number
  winRate: string
  roi: string
  roiColor: string
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

function getResultStats(results: Result[]): ResultStats {
  const total = results.length
  const wins = results.filter((result) => result.status === "WIN").length
  const losses = results.filter((result) => result.status === "LOSE").length
  const voids = results.filter((result) => result.status === "VOID").length
  const settledBets = wins + losses
  const profit = results.reduce((sum, item) => {
    if (item.status === "WIN") return sum + (item.odds - 1)
    if (item.status === "LOSE") return sum - 1
    return sum
  }, 0)

  const winRate = settledBets === 0 ? "0.0" : ((wins / settledBets) * 100).toFixed(1)
  const roi = settledBets === 0 ? "0" : ((profit / settledBets) * 100).toFixed(1)
  const roiValue = Number(roi)

  let roiColor = "text-slate-400"
  if (roiValue > 0) roiColor = "text-green-400"
  if (roiValue < 0) roiColor = "text-red-400"

  return {
    total,
    wins,
    losses,
    voids,
    winRate,
    roi,
    roiColor,
  }
}

function getDescription(isAllTime: boolean, isCurrentMonth: boolean) {
  if (isAllTime) {
    return "Показани са всички приключени залози от архива. Избери месец от менюто, ако искаш по-конкретен период."
  }

  if (isCurrentMonth) {
    return "По подразбиране е избран текущият месец, но можеш да разглеждаш и по-стари периоди или общата статистика."
  }

  return "Избран е архивен месец. Можеш по всяко време да се върнеш към текущия месец или към общия преглед."
}

function StatsCards({ stats }: { stats: ResultStats }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      <div className="theme-surface rounded-2xl p-4 text-center">
        <p className="text-sm text-slate-500">Общо</p>
        <p className="text-xl font-bold text-slate-950">{stats.total}</p>
      </div>

      <div className="rounded-2xl border border-emerald-300/45 bg-emerald-50 p-4 text-center">
        <p className="text-sm text-emerald-700">WIN</p>
        <p className="text-xl font-bold text-slate-950">{stats.wins}</p>
      </div>

      <div className="rounded-2xl border border-rose-300/45 bg-rose-50 p-4 text-center">
        <p className="text-sm text-rose-700">LOSE</p>
        <p className="text-xl font-bold text-slate-950">{stats.losses}</p>
      </div>

      <div className="theme-surface-soft rounded-2xl p-4 text-center">
        <p className="text-sm text-slate-600">VOID</p>
        <p className="text-xl font-bold text-slate-950">{stats.voids}</p>
      </div>

      <div className="theme-surface rounded-2xl p-4 text-center">
        <p className="text-sm text-slate-500">Win Rate</p>
        <p className="text-xl font-bold text-green-400">{stats.winRate}%</p>
      </div>

      <div className="theme-surface rounded-2xl p-4 text-center">
        <p className="text-sm text-slate-500">ROI</p>
        <p className={`text-xl font-bold ${stats.roiColor}`}>{stats.roi}%</p>
      </div>
    </div>
  )
}

export default function ResultsChartsSection({ results }: ResultsChartsSectionProps) {
  const currentMonthKey = getCurrentMonthKey()
  const monthOptions = useMemo(() => buildMonthOptions(results), [results])
  const [selectedMonthKey, setSelectedMonthKey] = useState(currentMonthKey)
  const [showAllTime, setShowAllTime] = useState(false)

  const activeMonth =
    monthOptions.find((option) => option.key === selectedMonthKey) ?? monthOptions[0]
  const isAllTime = showAllTime
  const isCurrentMonth = !isAllTime && activeMonth?.key === currentMonthKey

  const activeResults = useMemo(() => {
    if (isAllTime) {
      return results
    }

    return results.filter((result) => result.date.startsWith(activeMonth?.key ?? ""))
  }, [activeMonth?.key, isAllTime, results])

  const stats = useMemo(() => getResultStats(activeResults), [activeResults])
  const activeLabel = isAllTime ? "Общо" : activeMonth?.label ?? formatMonthLabel(currentMonthKey)

  return (
    <section className="space-y-6">
      <div className="theme-panel rounded-[28px] p-5 backdrop-blur-xl md:p-6">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(280px,340px)] xl:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Статистика и графики
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">{activeLabel}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              {getDescription(isAllTime, isCurrentMonth)}
            </p>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setShowAllTime(true)}
              className={
                isAllTime
                  ? "inline-flex rounded-full border border-orange-300/50 bg-orange-100/80 px-5 py-2 text-sm font-semibold text-orange-700"
                  : "theme-secondary-button inline-flex rounded-full px-5 py-2 text-sm font-semibold transition"
              }
            >
              Общо
            </button>

            <label htmlFor="chart-month" className="block space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Избери месец
              </span>
              <div className="relative">
                <select
                  id="chart-month"
                  value={activeMonth?.key ?? currentMonthKey}
                  onChange={(event) => {
                    setSelectedMonthKey(event.target.value)
                    setShowAllTime(false)
                  }}
                  className="theme-input w-full appearance-none rounded-2xl px-4 py-3 pr-10 text-sm font-medium outline-none transition focus:border-orange-300/55 focus-visible:ring-2 focus-visible:ring-orange-300/35"
                >
                  {monthOptions.map((month) => (
                    <option key={month.key} value={month.key}>
                      {month.label} · {formatCount(month.totalResults)}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
                  ▾
                </span>
              </div>
            </label>
          </div>
        </div>
      </div>

      <StatsCards stats={stats} />

      {activeResults.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          <ProfitChart results={activeResults} />
          <ResultsPieChart results={activeResults} />
        </div>
      ) : (
        <div className="theme-panel rounded-[28px] border-dashed border-slate-300 p-8 text-center backdrop-blur-xl">
          <h3 className="text-2xl font-bold text-slate-950">
            Няма приключени залози за {activeLabel.toLowerCase()}
          </h3>
          <p className="mt-3 text-slate-600">
            Избери друг месец или натисни бутона &quot;Общо&quot;, за да разгледаш
            цялата история.
          </p>
        </div>
      )}
    </section>
  )
}
