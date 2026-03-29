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

  if (normalized.includes("картон") || normalized.includes("card")) {
    return "cards" as const
  }

  if (
    /^(\+|-)?\d+(?:[.,]\d+)?\s+.+$/u.test(normalized) ||
    normalized.includes("ах") ||
    normalized.includes("ah") ||
    normalized.includes("handicap") ||
    normalized.includes("spread") ||
    normalized.startsWith("победа за ") ||
    normalized.includes("to win")
  ) {
    return "market" as const
  }

  if (
    /^(над|под|over|under)\s+\d+(?:[.,]\d+)?(?:\s+\S+)?$/u.test(normalized) ||
    normalized === "двата отбора да отбележат гол" ||
    normalized === "both teams to score"
  ) {
    return "totals" as const
  }

  if (
    (sport === "football" || sport === "hockey") &&
    (normalized.includes("гол") || normalized.includes("goal"))
  ) {
    return "totals" as const
  }

  if (sport === "tennis" && (normalized.includes("гейм") || normalized.includes("game"))) {
    return "totals" as const
  }

  return "market" as const
}

export function getPredictionCategoryLabel(
  prediction: string,
  sport: PredictionSport = "football"
) {
  const category = getPredictionCategory(prediction, sport)

  if (category === "cards") {
    return "Картони"
  }

  if (category === "totals") {
    if (sport === "basketball") {
      return "Точки"
    }

    if (sport === "baseball") {
      return "Рънове"
    }

    if (sport === "tennis") {
      return "Геймове"
    }

    return "Голове"
  }

  return "Пазар"
}
