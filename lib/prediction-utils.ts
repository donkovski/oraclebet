import type { PublicLocale } from "@/lib/public-locale"
import type { PredictionSport } from "@/lib/sports"

export function parseKickoff(kickoff: string) {
  const [datePart = "", timePart = "00:00"] = kickoff.split(" ")
  const [day = "1", month = "1", year = "1970"] = datePart.split(".")
  const [hours = "0", minutes = "0"] = timePart.split(":")

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hours),
    Number(minutes)
  )
}

export function sortPredictionsByKickoff<T extends { kickoff: string }>(items: T[]) {
  return [...items].sort(
    (first, second) =>
      parseKickoff(first.kickoff).getTime() - parseKickoff(second.kickoff).getTime()
  )
}

function normalizePrediction(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase()
}

export function getPredictionCategory(
  prediction: string,
  sport: PredictionSport = "football"
) {
  const normalized = normalizePrediction(prediction)

  if (/\b(картон(?:а|и)?|card(?:s)?)\b/u.test(normalized)) {
    return "cards" as const
  }

  if (
    /^(\+|-)?\d+(?:[.,]\d+)?\s+.+$/u.test(normalized) ||
    /\b(ах|ah|handicap|spread)\b/u.test(normalized) ||
    /^победа за\s+/u.test(normalized) ||
    /\bto win\b/u.test(normalized)
  ) {
    return "market" as const
  }

  if (
    /^(над|под|over|under)\s+\d+(?:[.,]\d+)?(?:\s+\S+)?$/u.test(normalized) ||
    /^двата отбора да отбележат гол$/u.test(normalized) ||
    /^both teams to score$/u.test(normalized)
  ) {
    return "totals" as const
  }

  if ((sport === "football" || sport === "hockey") && /\b(гол|goals?)\b/u.test(normalized)) {
    return "totals" as const
  }

  return "market" as const
}

export function getPredictionCategoryLabel(
  prediction: string,
  locale: PublicLocale = "bg",
  sport: PredictionSport = "football"
) {
  const category = getPredictionCategory(prediction, sport)

  if (category === "cards") {
    return locale === "en" ? "Cards" : "Картони"
  }

  if (category === "totals") {
    if (sport === "basketball") {
      return locale === "en" ? "Points" : "Точки"
    }

    if (sport === "baseball") {
      return locale === "en" ? "Runs" : "Рънове"
    }

    return locale === "en" ? "Goals" : "Голове"
  }

  return locale === "en" ? "Market" : "Пазар"
}
