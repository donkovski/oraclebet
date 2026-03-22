import {
  toSofiaISOString,
  type AdminPredictionInput,
  type AdminPredictionSport,
  type AdminPredictionStatus,
} from "@/lib/supabase-admin"

export const PREDICTION_IMPORT_XML_TEMPLATE = `<?xml version="1.0" encoding="UTF-8"?>
<predictions>
  <prediction>
    <sport>football</sport>
    <match>Реал Мадрид - Атлетико Мадрид</match>
    <country>Испания</country>
    <league>Ла Лига</league>
    <kickoff>2026-03-22T22:00</kickoff>
    <prediction>Над 5.5 картона</prediction>
    <odds>2.00</odds>
    <analysis>Кратък анализ на мача.</analysis>
    <status>pending</status>
    <result_text></result_text>
  </prediction>
</predictions>`

const SPORT_ALIASES: Record<string, AdminPredictionSport> = {
  football: "football",
  futbol: "football",
  "футбол": "football",
  hockey: "hockey",
  "хокей": "hockey",
  basketball: "basketball",
  "баскетбол": "basketball",
  baseball: "baseball",
  "бейзбол": "baseball",
}

const STATUS_ALIASES: Record<string, AdminPredictionStatus> = {
  pending: "pending",
  live: "live",
  won: "won",
  lost: "lost",
  lose: "lost",
  void: "void",
  "чакаща": "pending",
  "играе се": "live",
  "печеливша": "won",
  "губеща": "lost",
}

const FIELD_ALIASES = {
  sport: ["sport", "спорт"],
  match: ["match", "мач"],
  country: ["country", "държава"],
  league: ["league", "първенство"],
  kickoff: ["kickoff", "start_time", "datetime", "час_на_започване", "начало"],
  date: ["date", "дата"],
  time: ["time", "час"],
  prediction: ["prediction", "pick", "прогноза"],
  odds: ["odds", "коефициент"],
  analysis: ["analysis", "анализ"],
  status: ["status", "статус"],
  resultText: ["result_text", "result", "краен_резултат"],
} as const

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function decodeXmlEntities(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .trim()
}

function getTagValue(block: string, tagNames: readonly string[]) {
  for (const tagName of tagNames) {
    const pattern = new RegExp(
      `<${escapeRegExp(tagName)}>([\\s\\S]*?)<\\/${escapeRegExp(tagName)}>`,
      "i"
    )
    const match = block.match(pattern)

    if (match?.[1]) {
      return decodeXmlEntities(match[1])
    }
  }

  return ""
}

function normalizeSport(value: string, rowNumber: number) {
  const normalized = value.trim().toLowerCase()
  const sport = SPORT_ALIASES[normalized]

  if (!sport) {
    throw new Error(`Невалиден спорт в XML на ред ${rowNumber}: ${value}`)
  }

  return sport
}

function normalizeStatus(value: string) {
  if (!value) {
    return "pending"
  }

  return STATUS_ALIASES[value.trim().toLowerCase()] ?? "pending"
}

function normalizeOdds(value: string, rowNumber: number) {
  const odds = Number(value.replace(",", ".").trim())

  if (!Number.isFinite(odds) || odds <= 1) {
    throw new Error(`Невалиден коефициент в XML на ред ${rowNumber}: ${value}`)
  }

  return Number(odds.toFixed(2))
}

function normalizeKickoff(value: string, rowNumber: number) {
  const trimmedValue = value.trim()

  if (!trimmedValue) {
    throw new Error(`Липсва час на започване в XML на ред ${rowNumber}.`)
  }

  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(trimmedValue)) {
    return toSofiaISOString(trimmedValue)
  }

  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(trimmedValue)) {
    return toSofiaISOString(trimmedValue.replace(" ", "T"))
  }

  if (/^\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}$/.test(trimmedValue)) {
    const [datePart, timePart] = trimmedValue.split(" ")
    const [day, month, year] = datePart.split(".")
    return toSofiaISOString(`${year}-${month}-${day}T${timePart}`)
  }

  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(trimmedValue)) {
    return new Date(trimmedValue).toISOString()
  }

  throw new Error(
    `Неразпознат формат за час на започване в XML на ред ${rowNumber}: ${trimmedValue}`
  )
}

function getPredictionBlocks(xml: string) {
  return xml.match(/<prediction\b[\s\S]*?<\/prediction>/gi) ?? []
}

export function parsePredictionImportXml(xml: string): AdminPredictionInput[] {
  const blocks = getPredictionBlocks(xml)

  if (blocks.length === 0) {
    throw new Error("В XML файла няма намерени <prediction> записи.")
  }

  return blocks.map((block, index) => {
    const rowNumber = index + 1
    const rawKickoff =
      getTagValue(block, FIELD_ALIASES.kickoff) ||
      [getTagValue(block, FIELD_ALIASES.date), getTagValue(block, FIELD_ALIASES.time)]
        .filter(Boolean)
        .join(" ")

    const sport = normalizeSport(getTagValue(block, FIELD_ALIASES.sport), rowNumber)
    const match = getTagValue(block, FIELD_ALIASES.match)
    const country = getTagValue(block, FIELD_ALIASES.country)
    const league = getTagValue(block, FIELD_ALIASES.league)
    const prediction = getTagValue(block, FIELD_ALIASES.prediction)
    const oddsRaw = getTagValue(block, FIELD_ALIASES.odds)
    const analysis = getTagValue(block, FIELD_ALIASES.analysis)
    const status = normalizeStatus(getTagValue(block, FIELD_ALIASES.status))
    const resultText = getTagValue(block, FIELD_ALIASES.resultText)

    if (!match || !country || !league || !prediction || !oddsRaw || !rawKickoff) {
      throw new Error(`Липсват задължителни полета в XML на ред ${rowNumber}.`)
    }

    return {
      sport,
      match,
      kickoff: normalizeKickoff(rawKickoff, rowNumber),
      country,
      league,
      prediction,
      analysis: analysis || null,
      odds: normalizeOdds(oddsRaw, rowNumber),
      status,
      result_text: resultText || null,
    }
  })
}
