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
