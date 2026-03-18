export type PublicLocale = "bg" | "en"

const countryTranslations: Record<string, string> = {
  "Англия": "England",
  "България": "Bulgaria",
  "Германия": "Germany",
  "Европа": "Europe",
  "Испания": "Spain",
  "Италия": "Italy",
  "Канада": "Canada",
  "Нидерландия": "Netherlands",
  "САЩ": "USA",
  "Турция": "Turkey",
  "Франция": "France",
  "Швейцария": "Switzerland",
}

const leagueTranslations: Record<string, string> = {
  "Бундеслига": "Bundesliga",
  "Висша лига": "Premier League",
  "Европа": "Europe",
  "Ла Лига": "La Liga",
  "Лига 1": "Ligue 1",
  "Лига 2": "Ligue 2",
  "Серия А": "Serie A",
  "Супер Лига": "Super Lig",
}

export function translateCountryName(country: string, locale: PublicLocale) {
  if (locale === "bg") {
    return country
  }

  return countryTranslations[country] ?? country
}

export function translateLeagueName(league: string, locale: PublicLocale) {
  if (locale === "bg") {
    return league
  }

  return leagueTranslations[league] ?? league
}

export function translatePredictionText(prediction: string, locale: PublicLocale) {
  if (locale === "bg") {
    return prediction
  }

  const normalizedPrediction = prediction.trim().replace(/\s+/g, " ")

  if (/^двата отбора да отбележат гол$/i.test(normalizedPrediction)) {
    return "Both teams to score"
  }

  const winnerMatch = normalizedPrediction.match(/^победа за\s+(.+)$/i)
  if (winnerMatch) {
    return `${winnerMatch[1]} to win`
  }

  const asianHandicapMatch = normalizedPrediction.match(/^([+-]?\d+(?:[.,]\d+)?)\s*ах\s+(.+)$/i)
  if (asianHandicapMatch) {
    return `${asianHandicapMatch[2]} ${asianHandicapMatch[1]} AH`
  }

  const overGoalsMatch = normalizedPrediction.match(/^над\s+(\d+(?:[.,]\d+)?)\s+гола?$/i)
  if (overGoalsMatch) {
    return `Over ${overGoalsMatch[1]} goals`
  }

  const underGoalsMatch = normalizedPrediction.match(/^под\s+(\d+(?:[.,]\d+)?)\s+гола?$/i)
  if (underGoalsMatch) {
    return `Under ${underGoalsMatch[1]} goals`
  }

  const overCardsMatch = normalizedPrediction.match(/^над\s+(\d+(?:[.,]\d+)?)\s+картона?$/i)
  if (overCardsMatch) {
    return `Over ${overCardsMatch[1]} cards`
  }

  const underCardsMatch = normalizedPrediction.match(/^под\s+(\d+(?:[.,]\d+)?)\s+картона?$/i)
  if (underCardsMatch) {
    return `Under ${underCardsMatch[1]} cards`
  }

  return normalizedPrediction
}

export function translateResultText(result: string, locale: PublicLocale) {
  if (locale === "bg") {
    return result
  }

  return result
    .replace(/жълти/gi, "yellow")
    .replace(/жълт/gi, "yellow")
    .replace(/червен/gi, "red")
    .replace(/картона/gi, "cards")
    .replace(/картон/gi, "card")
}
