import type { PublicLocale } from "@/lib/public-locale"

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

export function getPredictionCategory(prediction: string) {
  const normalized = prediction.toLowerCase()

  if (normalized.includes("картон")) {
    return "cards" as const
  }

  if (normalized.includes("гол")) {
    return "goals" as const
  }

  return "market" as const
}

export function getPredictionCategoryLabel(
  prediction: string,
  locale: PublicLocale = "bg"
) {
  const category = getPredictionCategory(prediction)

  if (category === "cards") {
    return locale === "en" ? "Cards" : "Картони"
  }

  if (category === "goals") {
    return locale === "en" ? "Goals" : "Голове"
  }

  return locale === "en" ? "Market" : "Пазар"
}
