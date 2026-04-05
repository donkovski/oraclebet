"use client"

import { useMemo, useState } from "react"
import type { Result } from "../types/results"

type ResultsArchiveProps = {
  results: Result[]
}

type DateGroup = {
  key: string
  label: string
  fullLabel: string
  items: Result[]
}

type MonthGroup = {
  key: string
  label: string
  dates: DateGroup[]
  totalResults: number
}

type YearGroup = {
  year: string
  months: MonthGroup[]
  totalResults: number
}

const INITIAL_VISIBLE_RESULTS = 4

function formatMonth(date: string) {
  return new Intl.DateTimeFormat("bg-BG", {
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}-01T12:00:00`))
}

function formatDay(date: string) {
  return new Intl.DateTimeFormat("bg-BG", {
    day: "numeric",
    month: "short",
  }).format(new Date(`${date}T12:00:00`))
}

function formatFullDate(date: string) {
  return new Intl.DateTimeFormat("bg-BG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`))
}

function formatCount(count: number, singular: string, plural: string) {
  return `${count} ${count === 1 ? singular : plural}`
}

function formatOdds(odds: number) {
  return odds.toFixed(2)
}

function getCardClasses(status: Result["status"]) {
  if (status === "WIN") {
    return "border-emerald-300/45 bg-emerald-50"
  }

  if (status === "LOSE") {
    return "border-rose-300/45 bg-rose-50"
  }

  return "border-slate-200 bg-slate-50"
}

function getBadgeClasses(status: Result["status"]) {
  if (status === "WIN") {
    return "bg-emerald-300 text-slate-950"
  }

  if (status === "LOSE") {
    return "bg-rose-300 text-slate-950"
  }

  return "bg-slate-200 text-slate-950"
}

function buildArchive(results: Result[]): YearGroup[] {
  const yearMap = new Map<string, Map<string, Map<string, Result[]>>>()

  for (const item of results) {
    const year = item.date.slice(0, 4)
    const monthKey = item.date.slice(0, 7)

    const months = yearMap.get(year) ?? new Map<string, Map<string, Result[]>>()
    const dates = months.get(monthKey) ?? new Map<string, Result[]>()
    const dayItems = dates.get(item.date) ?? []

    dayItems.push(item)
    dates.set(item.date, dayItems)
    months.set(monthKey, dates)
    yearMap.set(year, months)
  }

  return Array.from(yearMap.entries())
    .sort(([leftYear], [rightYear]) => Number(rightYear) - Number(leftYear))
    .map(([year, months]) => {
      const monthGroups = Array.from(months.entries())
        .sort(([leftMonth], [rightMonth]) => rightMonth.localeCompare(leftMonth))
        .map(([monthKey, dates]) => {
          const dateGroups = Array.from(dates.entries())
            .sort(([leftDate], [rightDate]) => rightDate.localeCompare(leftDate))
            .map(([date, items]) => ({
              key: date,
              label: formatDay(date),
              fullLabel: formatFullDate(date),
              items,
            }))

          return {
            key: monthKey,
            label: formatMonth(monthKey),
            dates: dateGroups,
            totalResults: dateGroups.reduce((sum, dateGroup) => sum + dateGroup.items.length, 0),
          }
        })

      return {
        year,
        months: monthGroups,
        totalResults: monthGroups.reduce((sum, month) => sum + month.totalResults, 0),
      }
    })
}

function SelectField({
  id,
  label,
  value,
  onChange,
  children,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  children: React.ReactNode
}) {
  return (
    <label htmlFor={id} className="space-y-2">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </span>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="theme-input w-full appearance-none rounded-2xl px-4 py-3 pr-10 text-sm font-medium outline-none transition focus:border-orange-300/55 focus-visible:ring-2 focus-visible:ring-orange-300/35"
        >
          {children}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
          ▾
        </span>
      </div>
    </label>
  )
}

export default function ResultsArchive({ results }: ResultsArchiveProps) {
  const archive = useMemo(() => buildArchive(results), [results])

  const [selectedYear, setSelectedYear] = useState(archive[0]?.year ?? "")
  const [selectedMonth, setSelectedMonth] = useState(archive[0]?.months[0]?.key ?? "")
  const [selectedDate, setSelectedDate] = useState(archive[0]?.months[0]?.dates[0]?.key ?? "")
  const [showAllByDate, setShowAllByDate] = useState<Record<string, boolean>>({})

  const activeYearGroup = archive.find((group) => group.year === selectedYear) ?? archive[0]
  const activeMonthGroup =
    activeYearGroup?.months.find((month) => month.key === selectedMonth) ??
    activeYearGroup?.months[0]
  const activeDateGroup =
    activeMonthGroup?.dates.find((date) => date.key === selectedDate) ??
    activeMonthGroup?.dates[0]

  if (!activeYearGroup || !activeMonthGroup || !activeDateGroup) {
    return null
  }

  const dayWins = activeDateGroup.items.filter((item) => item.status === "WIN").length
  const dayLosses = activeDateGroup.items.filter((item) => item.status === "LOSE").length
  const dayVoids = activeDateGroup.items.filter((item) => item.status === "VOID").length

  const showAll = showAllByDate[activeDateGroup.key] ?? false
  const visibleItems = showAll
    ? activeDateGroup.items
    : activeDateGroup.items.slice(0, INITIAL_VISIBLE_RESULTS)
  const hasHiddenItems = activeDateGroup.items.length > INITIAL_VISIBLE_RESULTS

  return (
    <section className="space-y-4">
      <div className="theme-panel rounded-[28px] p-5 backdrop-blur-xl md:p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <SelectField
            id="results-year"
            label="Година"
            value={activeYearGroup.year}
            onChange={(value) => {
              const nextYearGroup = archive.find((group) => group.year === value)
              setSelectedYear(value)
              setSelectedMonth(nextYearGroup?.months[0]?.key ?? "")
              setSelectedDate(nextYearGroup?.months[0]?.dates[0]?.key ?? "")
            }}
          >
            {archive.map((yearGroup) => (
              <option key={yearGroup.year} value={yearGroup.year}>
                {yearGroup.year} · {formatCount(yearGroup.totalResults, "прогноза", "прогнози")}
              </option>
            ))}
          </SelectField>

          <SelectField
            id="results-month"
            label="Месец"
            value={activeMonthGroup.key}
            onChange={(value) => {
              const nextMonthGroup = activeYearGroup.months.find((month) => month.key === value)
              setSelectedMonth(value)
              setSelectedDate(nextMonthGroup?.dates[0]?.key ?? "")
            }}
          >
            {activeYearGroup.months.map((monthGroup) => (
              <option key={monthGroup.key} value={monthGroup.key}>
                {monthGroup.label} · {formatCount(monthGroup.totalResults, "прогноза", "прогнози")}
              </option>
            ))}
          </SelectField>

          <SelectField
            id="results-date"
            label="Дата"
            value={activeDateGroup.key}
            onChange={setSelectedDate}
          >
            {activeMonthGroup.dates.map((dateGroup) => (
              <option key={dateGroup.key} value={dateGroup.key}>
                {dateGroup.fullLabel} · {formatCount(dateGroup.items.length, "прогноза", "прогнози")}
              </option>
            ))}
          </SelectField>
        </div>
      </div>

      <div className="theme-panel rounded-[28px] p-6 backdrop-blur-xl md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Избрана дата
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">{activeDateGroup.fullLabel}</h2>
            <p className="mt-2 text-sm text-slate-500">
              {formatCount(activeMonthGroup.totalResults, "прогноза", "прогнози")} общо за избрания месец
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-700">
            <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
              {formatCount(activeDateGroup.items.length, "прогноза", "прогнози")}
            </span>
            <span className="rounded-full border border-emerald-300/45 bg-emerald-50 px-4 py-2 text-emerald-700">
              {dayWins} WIN
            </span>
            <span className="rounded-full border border-rose-300/45 bg-rose-50 px-4 py-2 text-rose-700">
              {dayLosses} LOSE
            </span>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-slate-600">
              {dayVoids} VOID
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {visibleItems.map((item) => (
            <article
              key={`${item.date}-${item.match}-${item.prediction}`}
              className={`rounded-[24px] border p-6 ${getCardClasses(item.status)}`}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-slate-950">{item.match}</h3>
                  <p className="mt-3 text-slate-700">
                    Прогноза: <span className="font-semibold text-slate-950">{item.prediction}</span>
                  </p>
                  <p className="mt-1 text-slate-600">Резултат: {item.result}</p>
                  <p className="mt-1 text-slate-600">
                    Коефициент: <span className="font-semibold text-orange-700">{formatOdds(item.odds)}</span>
                  </p>
                </div>

                <span
                  className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-semibold ${getBadgeClasses(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </div>
            </article>
          ))}
        </div>

        {hasHiddenItems && (
          <div className="mt-6">
            <button
              type="button"
              onClick={() =>
                setShowAllByDate((current) => ({
                  ...current,
                  [activeDateGroup.key]: !showAll,
                }))
              }
              className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300"
            >
              {showAll
                ? "Покажи по-малко"
                : `Покажи още ${activeDateGroup.items.length - visibleItems.length}`}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
