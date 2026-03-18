"use client"

import { useMemo, useState } from "react"
import {
  translatePredictionText,
  translateResultText,
  type PublicLocale,
} from "@/lib/public-locale"
import type { Result } from "../types/results"

type ResultsArchiveProps = {
  results: Result[]
  locale?: PublicLocale
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

function formatMonth(date: string, locale: PublicLocale) {
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "bg-BG", {
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}-01T12:00:00`))
}

function formatDay(date: string, locale: PublicLocale) {
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "bg-BG", {
    day: "numeric",
    month: "short",
  }).format(new Date(`${date}T12:00:00`))
}

function formatFullDate(date: string, locale: PublicLocale) {
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "bg-BG", {
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
    return "border-emerald-300/45 bg-emerald-950/70"
  }

  if (status === "LOSE") {
    return "border-rose-300/45 bg-rose-950/70"
  }

  return "border-white/15 bg-slate-900/55"
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

function buildArchive(results: Result[], locale: PublicLocale): YearGroup[] {
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
              label: formatDay(date, locale),
              fullLabel: formatFullDate(date, locale),
              items,
            }))

          return {
            key: monthKey,
            label: formatMonth(monthKey, locale),
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
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
        {label}
      </span>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 pr-10 text-sm font-medium text-white outline-none transition focus:border-orange-300/55 focus:bg-slate-950/45 focus-visible:ring-2 focus-visible:ring-orange-300/35"
        >
          {children}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-white/45">
          ▾
        </span>
      </div>
    </label>
  )
}

export default function ResultsArchive({
  results,
  locale = "bg",
}: ResultsArchiveProps) {
  const copy =
    locale === "en"
      ? {
          year: "Year",
          month: "Month",
          date: "Date",
          predictionSingular: "prediction",
          predictionPlural: "predictions",
          selectedDate: "Selected date",
          totalForMonth: "total for the selected month",
          prediction: "Prediction",
          result: "Result",
          odds: "Odds",
          showLess: "Show less",
          showMorePrefix: "Show",
        }
      : {
          year: "Година",
          month: "Месец",
          date: "Дата",
          predictionSingular: "прогноза",
          predictionPlural: "прогнози",
          selectedDate: "Избрана дата",
          totalForMonth: "общо за избрания месец",
          prediction: "Прогноза",
          result: "Резултат",
          odds: "Коефициент",
          showLess: "Покажи по-малко",
          showMorePrefix: "Покажи още",
        }

  const archive = useMemo(() => buildArchive(results, locale), [locale, results])

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
      <div className="rounded-[28px] border border-white/10 bg-slate-950/18 p-5 backdrop-blur-xl md:p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <SelectField
            id="results-year"
            label={copy.year}
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
                {yearGroup.year} ·{" "}
                {formatCount(
                  yearGroup.totalResults,
                  copy.predictionSingular,
                  copy.predictionPlural
                )}
              </option>
            ))}
          </SelectField>

          <SelectField
            id="results-month"
            label={copy.month}
            value={activeMonthGroup.key}
            onChange={(value) => {
              const nextMonthGroup = activeYearGroup.months.find((month) => month.key === value)
              setSelectedMonth(value)
              setSelectedDate(nextMonthGroup?.dates[0]?.key ?? "")
            }}
          >
            {activeYearGroup.months.map((monthGroup) => (
              <option key={monthGroup.key} value={monthGroup.key}>
                {monthGroup.label} ·{" "}
                {formatCount(
                  monthGroup.totalResults,
                  copy.predictionSingular,
                  copy.predictionPlural
                )}
              </option>
            ))}
          </SelectField>

          <SelectField
            id="results-date"
            label={copy.date}
            value={activeDateGroup.key}
            onChange={setSelectedDate}
          >
            {activeMonthGroup.dates.map((dateGroup) => (
              <option key={dateGroup.key} value={dateGroup.key}>
                {dateGroup.fullLabel} ·{" "}
                {formatCount(
                  dateGroup.items.length,
                  copy.predictionSingular,
                  copy.predictionPlural
                )}
              </option>
            ))}
          </SelectField>
        </div>
      </div>

      <div className="rounded-[28px] border border-white/10 bg-slate-950/18 p-6 shadow-[0_18px_40px_rgba(8,15,34,0.18)] backdrop-blur-xl md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              {copy.selectedDate}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">{activeDateGroup.fullLabel}</h2>
            <p className="mt-2 text-sm text-white/60">
              {formatCount(
                activeMonthGroup.totalResults,
                copy.predictionSingular,
                copy.predictionPlural
              )}{" "}
              {copy.totalForMonth}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/75">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
              {formatCount(
                activeDateGroup.items.length,
                copy.predictionSingular,
                copy.predictionPlural
              )}
            </span>
            <span className="rounded-full border border-emerald-300/30 bg-emerald-400/15 px-4 py-2 text-emerald-50">
              {dayWins} WIN
            </span>
            <span className="rounded-full border border-rose-300/30 bg-rose-400/15 px-4 py-2 text-rose-50">
              {dayLosses} LOSE
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/70">
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
                  <h3 className="text-xl font-semibold text-white">{item.match}</h3>
                  <p className="mt-3 text-white/85">
                    {copy.prediction}:{" "}
                    <span className="font-semibold text-white">
                      {translatePredictionText(item.prediction, locale)}
                    </span>
                  </p>
                  <p className="mt-1 text-white/75">
                    {copy.result}: {translateResultText(item.result, locale)}
                  </p>
                  <p className="mt-1 text-white/70">
                    {copy.odds}:{" "}
                    <span className="font-semibold text-orange-300">
                      {formatOdds(item.odds)}
                    </span>
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
              className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300"
            >
              {showAll
                ? copy.showLess
                : `${copy.showMorePrefix} ${
                    activeDateGroup.items.length - visibleItems.length
                  }`}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
