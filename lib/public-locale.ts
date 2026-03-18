import type { PredictionSport } from "@/lib/sports"

export type PublicLocale = "bg" | "en"

const countryTranslations: Record<string, string> = {
  Англия: "England",
  България: "Bulgaria",
  Германия: "Germany",
  Европа: "Europe",
  Испания: "Spain",
  Италия: "Italy",
  Канада: "Canada",
  Нидерландия: "Netherlands",
  САЩ: "USA",
  Турция: "Turkey",
  Франция: "France",
  Швейцария: "Switzerland",
}

const leagueTranslations: Record<string, string> = {
  Бундеслига: "Bundesliga",
  "Висша лига": "Premier League",
  Европа: "Europe",
  "Ла Лига": "La Liga",
  "Лига 1": "Ligue 1",
  "Лига 2": "Ligue 2",
  НБА: "NBA",
  NHL: "NHL",
  MLB: "MLB",
  "Серия А": "Serie A",
  "Супер Лига": "Super Lig",
}

const teamTranslations: Record<string, string> = {
  "Атлетико Мадрид": "Atletico Madrid",
  "Бостън Бруинс": "Boston Bruins",
  "Бостън Селтикс": "Boston Celtics",
  "Бруклин Нетс": "Brooklyn Nets",
  "Вашингтон Кепитълс": "Washington Capitals",
  "Ванкувър Канъкс": "Vancouver Canucks",
  "Голдън Найтс": "Golden Knights",
  "Голдън Стейт Уориърс": "Golden State Warriors",
  "Далас Старс": "Dallas Stars",
  "Детройт Ред Уингс": "Detroit Red Wings",
  "Индиана Пейсърс": "Indiana Pacers",
  "Калгари Флеймс": "Calgary Flames",
  "Каролина Хърикейнс": "Carolina Hurricanes",
  "Колорадо Аваланч": "Colorado Avalanche",
  "Ливърпул": "Liverpool",
  "Лос Анджелис Кингс": "Los Angeles Kings",
  "Мец": "Metz",
  "Минесота Уайлд": "Minnesota Wild",
  "Наполи": "Napoli",
  "Ню Джърси Девилс": "New Jersey Devils",
  "Ню Йорк Айлендърс": "New York Islanders",
  "Ню Йорк Рейнджърс": "New York Rangers",
  "Оклахома Сити Тъндър": "Oklahoma City Thunder",
  "Портланд Трейл Блейзърс": "Portland Trail Blazers",
  "Ред Бул Лайпциг": "RB Leipzig",
  "Рома": "Roma",
  "Селта": "Celta",
  "Сиатъл Кракенс": "Seattle Kraken",
  "Тампа Бей Лайтинг": "Tampa Bay Lightning",
  "Тотнъм": "Tottenham",
  "Тулуза": "Toulouse",
  "Удинезе": "Udinese",
  "Уинипег Джетс": "Winnipeg Jets",
  "Хамбургер": "Hamburg",
  "Хетафе": "Getafe",
  "Чикаго Блекхоукс": "Chicago Blackhawks",
  "Щутгарт": "Stuttgart",
  "Ювентус": "Juventus",
  "Кьолн": "Cologne",
  "Лече": "Lecce",
  "Комо": "Como",
  "Бетис": "Betis",
}

const cyrillicToLatin: Record<string, string> = {
  А: "A",
  а: "a",
  Б: "B",
  б: "b",
  В: "V",
  в: "v",
  Г: "G",
  г: "g",
  Д: "D",
  д: "d",
  Е: "E",
  е: "e",
  Ж: "Zh",
  ж: "zh",
  З: "Z",
  з: "z",
  И: "I",
  и: "i",
  Й: "Y",
  й: "y",
  К: "K",
  к: "k",
  Л: "L",
  л: "l",
  М: "M",
  м: "m",
  Н: "N",
  н: "n",
  О: "O",
  о: "o",
  П: "P",
  п: "p",
  Р: "R",
  р: "r",
  С: "S",
  с: "s",
  Т: "T",
  т: "t",
  У: "U",
  у: "u",
  Ф: "F",
  ф: "f",
  Х: "H",
  х: "h",
  Ц: "Ts",
  ц: "ts",
  Ч: "Ch",
  ч: "ch",
  Ш: "Sh",
  ш: "sh",
  Щ: "Sht",
  щ: "sht",
  Ъ: "A",
  ъ: "a",
  Ь: "",
  ь: "",
  Ю: "Yu",
  ю: "yu",
  Я: "Ya",
  я: "ya",
}

function transliterateToLatin(value: string) {
  return value
    .split("")
    .map((character) => cyrillicToLatin[character] ?? character)
    .join("")
}

function translateEntityName(name: string, locale: PublicLocale) {
  if (locale === "bg") {
    return name
  }

  return teamTranslations[name] ?? transliterateToLatin(name)
}

function totalUnitBySport(
  sport: PredictionSport,
  locale: PublicLocale,
  explicitUnit?: string
) {
  if (explicitUnit) {
    const normalizedUnit = explicitUnit.toLowerCase()

    if (normalizedUnit.includes("карт") || normalizedUnit.includes("card")) {
      return locale === "en" ? "cards" : "картона"
    }

    if (normalizedUnit.includes("гол") || normalizedUnit.includes("goal")) {
      return locale === "en" ? "goals" : "гола"
    }

    if (normalizedUnit.includes("point")) {
      return locale === "en" ? "points" : "точки"
    }

    if (normalizedUnit.includes("run")) {
      return locale === "en" ? "runs" : "ръна"
    }
  }

  if (sport === "basketball") {
    return locale === "en" ? "points" : "точки"
  }

  if (sport === "baseball") {
    return locale === "en" ? "runs" : "ръна"
  }

  return locale === "en" ? "goals" : "гола"
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

export function translateMatchText(match: string, locale: PublicLocale) {
  if (locale === "bg") {
    return match
  }

  if (!match.includes(" - ")) {
    return translateEntityName(match, locale)
  }

  return match
    .split(" - ")
    .map((part) => translateEntityName(part.trim(), locale))
    .join(" - ")
}

export function translatePredictionText(
  prediction: string,
  locale: PublicLocale,
  sport: PredictionSport = "football"
) {
  if (locale === "bg") {
    return prediction
  }

  const normalizedPrediction = prediction.trim().replace(/\s+/g, " ")

  if (/^двата отбора да отбележат гол$/i.test(normalizedPrediction)) {
    return "Both teams to score"
  }

  const winnerMatch = normalizedPrediction.match(/^победа за\s+(.+)$/i)
  if (winnerMatch) {
    return `${translateEntityName(winnerMatch[1], locale)} to win`
  }

  const asianHandicapMatch = normalizedPrediction.match(
    /^([+-]?\d+(?:[.,]\d+)?)\s*ах\s+(.+)$/i
  )
  if (asianHandicapMatch) {
    return `${translateEntityName(asianHandicapMatch[2], locale)} ${asianHandicapMatch[1]} AH`
  }

  const handicapMatch = normalizedPrediction.match(/^([+-]?\d+(?:[.,]\d+)?)\s+(.+)$/)
  if (handicapMatch) {
    return `${translateEntityName(handicapMatch[2], locale)} ${handicapMatch[1]}`
  }

  const overUnderMatch = normalizedPrediction.match(
    /^(над|под)\s+(\d+(?:[.,]\d+)?)(?:\s+(гола?|гол|картона?|картон|точки|ръна))?$/i
  )
  if (overUnderMatch) {
    const direction = overUnderMatch[1].toLowerCase() === "над" ? "Over" : "Under"
    const unit = totalUnitBySport(sport, locale, overUnderMatch[3])
    return `${direction} ${overUnderMatch[2]}${unit ? ` ${unit}` : ""}`
  }

  return transliterateToLatin(normalizedPrediction)
}

export function translateResultText(
  result: string,
  locale: PublicLocale,
  sport: PredictionSport = "football"
) {
  if (locale === "bg") {
    return result
  }

  return result
    .replace(/жълти/gi, "yellow")
    .replace(/жълт/gi, "yellow")
    .replace(/червен/gi, "red")
    .replace(/картона/gi, totalUnitBySport(sport, locale, "cards"))
    .replace(/картон/gi, "card")
}
