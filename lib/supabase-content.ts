import { hockeyPredictions as fallbackHockeyPredictions } from "@/data/hockey-predictions"
import { hockeyResults as fallbackHockeyResults } from "@/data/hockey-results"
import { predictions as fallbackFootballPredictions } from "@/data/predictions"
import { results as fallbackFootballResults } from "@/data/results"
import type { Result } from "@/types/results"

export type Sport = "football" | "hockey" | "basketball" | "baseball"
type PredictionStatus = "pending" | "live" | "won" | "lost" | "void"

type SupabasePredictionRow = {
  match: string
  kickoff: string
  published_at: string
  country: string
  league: string
  prediction: string
  analysis: string | null
  odds: number
  status: PredictionStatus
  result_text: string | null
}

export type DisplayPrediction = {
  match: string
  kickoff: string
  publishedAt?: string
  country: string
  league: string
  prediction: string
  analysis?: string
  odds: string
}

const SOFIA_TIMEZONE = "Europe/Sofia"
const emptyPredictions: DisplayPrediction[] = []
const emptyResults: Result[] = []

function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (!url || !publishableKey) {
    return null
  }

  return { url, publishableKey }
}

function formatTimestampInSofia(timestamp: string) {
  const parts = new Intl.DateTimeFormat("bg-BG", {
    timeZone: SOFIA_TIMEZONE,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date(timestamp))

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))

  return `${values.day}.${values.month}.${values.year} ${values.hour}:${values.minute}`
}

function formatDateKeyInSofia(timestamp: string) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: SOFIA_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(timestamp))

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))

  return `${values.year}-${values.month}-${values.day}`
}

function mapPredictionRow(row: SupabasePredictionRow): DisplayPrediction {
  return {
    match: row.match,
    kickoff: formatTimestampInSofia(row.kickoff),
    publishedAt: formatTimestampInSofia(row.published_at),
    country: row.country,
    league: row.league,
    prediction: row.prediction,
    analysis: row.analysis ?? undefined,
    odds: row.odds.toFixed(2),
  }
}

function normalizeResultStatus(status: string): Result["status"] {
  switch (status.toLowerCase()) {
    case "won":
      return "WIN"
    case "lost":
    case "lose":
      return "LOSE"
    case "void":
      return "VOID"
    default:
      return "VOID"
  }
}

function mapResultRow(row: SupabasePredictionRow): Result {
  return {
    date: formatDateKeyInSofia(row.kickoff),
    match: row.match,
    prediction: row.prediction,
    odds: row.odds,
    result: row.result_text ?? "",
    status: normalizeResultStatus(row.status),
  }
}

async function fetchPredictionRows(sport: Sport, statuses: PredictionStatus[]) {
  const config = getSupabaseConfig()

  if (!config) {
    return null
  }

  const params = new URLSearchParams({
    select: "match,kickoff,published_at,country,league,prediction,analysis,odds,status,result_text",
    sport: `eq.${sport}`,
    order: "kickoff.asc",
  })

  params.append("status", `in.(${statuses.join(",")})`)

  const response = await fetch(`${config.url}/rest/v1/predictions?${params.toString()}`, {
    headers: {
      apikey: config.publishableKey,
      Authorization: `Bearer ${config.publishableKey}`,
    },
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`Supabase request failed with status ${response.status}`)
  }

  return (await response.json()) as SupabasePredictionRow[]
}

async function getPredictionsBySport(sport: Sport, fallback: DisplayPrediction[]) {
  try {
    const rows = await fetchPredictionRows(sport, ["pending", "live"])

    if (!rows) {
      return fallback
    }

    return rows.map(mapPredictionRow)
  } catch {
    return fallback
  }
}

async function getResultsBySport(sport: Sport, fallback: Result[]) {
  try {
    const rows = await fetchPredictionRows(sport, ["won", "lost", "void"])

    if (!rows) {
      return fallback
    }

    return rows.map(mapResultRow)
  } catch {
    return fallback
  }
}

export async function getFootballPredictions() {
  return getPredictionsBySport("football", fallbackFootballPredictions)
}

export async function getHockeyPredictions() {
  return getPredictionsBySport("hockey", fallbackHockeyPredictions)
}

export async function getBasketballPredictions() {
  return getPredictionsBySport("basketball", emptyPredictions)
}

export async function getBaseballPredictions() {
  return getPredictionsBySport("baseball", emptyPredictions)
}

export async function getFootballResults() {
  return getResultsBySport("football", fallbackFootballResults)
}

export async function getHockeyResults() {
  return getResultsBySport("hockey", fallbackHockeyResults)
}

export async function getBasketballResults() {
  return getResultsBySport("basketball", emptyResults)
}

export async function getBaseballResults() {
  return getResultsBySport("baseball", emptyResults)
}
