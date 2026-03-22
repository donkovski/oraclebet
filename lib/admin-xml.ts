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
  tennis: "tennis",
  "тенис": "tennis",
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
  "анулирана": "void",
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

function normalizeXmlInput(input: string | ArrayBuffer | Uint8Array) {
  if (typeof input === "string") {
    return input
  }

  const bytes = input instanceof Uint8Array ? input : new Uint8Array(input)
  const preview = new TextDecoder("ascii").decode(bytes.slice(0, 256))
  const declaredEncoding =
    preview.match(/encoding=["']([^"']+)["']/i)?.[1]?.trim().toLowerCase() ?? "utf-8"

  const preferredEncoding =
    declaredEncoding === "windows-1251" || declaredEncoding === "cp1251"
      ? "windows-1251"
      : "utf-8"

  const decoders = [preferredEncoding, preferredEncoding === "utf-8" ? "windows-1251" : "utf-8"]

  for (const encoding of decoders) {
    try {
      const decoded = new TextDecoder(encoding, { fatal: false }).decode(bytes)

      if (!decoded.includes("<predictions") || !decoded.includes("</predictions>")) {
        continue
      }

      if (encoding === "utf-8" && decoded.includes("\uFFFD")) {
        continue
      }

      return decoded
    } catch {
      continue
    }
  }

  return new TextDecoder("utf-8").decode(bytes)
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

  if (
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(trimmedValue)
  ) {
    return new Date(trimmedValue).toISOString()
  }

  throw new Error(
    `Неразпознат формат за час на започване в XML на ред ${rowNumber}: ${trimmedValue}`
  )
}

function getPredictionBlocks(xml: string) {
  const blocks: string[] = []
  const tagPattern = /<\/?prediction\b[^>]*>/gi
  let depth = 0
  let startIndex = -1

  for (const match of xml.matchAll(tagPattern)) {
    const tag = match[0]
    const index = match.index ?? -1
    const isClosingTag = /^<\//.test(tag)
    const isSelfClosingTag = /\/>$/.test(tag)

    if (!isClosingTag) {
      if (depth === 0) {
        startIndex = index
      }

      depth += 1

      if (isSelfClosingTag) {
        depth -= 1
      }
    } else {
      depth -= 1
    }

    if (depth === 0 && startIndex !== -1) {
      blocks.push(xml.slice(startIndex, index + tag.length))
      startIndex = -1
    }
  }

  return blocks
}

function getPredictionInnerBlock(block: string) {
  return block.replace(/^<prediction\b[^>]*>/i, "").replace(/<\/prediction>\s*$/i, "")
}

export function parsePredictionImportXml(
  input: string | ArrayBuffer | Uint8Array
): AdminPredictionInput[] {
  const xml = normalizeXmlInput(input)
  const blocks = getPredictionBlocks(xml)

  if (blocks.length === 0) {
    throw new Error("В XML файла няма намерени <prediction> записи.")
  }

  return blocks.map((block, index) => {
    const rowNumber = index + 1
    const innerBlock = getPredictionInnerBlock(block)
    const rawKickoff =
      getTagValue(innerBlock, FIELD_ALIASES.kickoff) ||
      [getTagValue(innerBlock, FIELD_ALIASES.date), getTagValue(innerBlock, FIELD_ALIASES.time)]
        .filter(Boolean)
        .join(" ")

    const sportRaw = getTagValue(innerBlock, FIELD_ALIASES.sport)
    const match = getTagValue(innerBlock, FIELD_ALIASES.match)
    const country = getTagValue(innerBlock, FIELD_ALIASES.country)
    const league = getTagValue(innerBlock, FIELD_ALIASES.league)
    const prediction = getTagValue(innerBlock, FIELD_ALIASES.prediction)
    const oddsRaw = getTagValue(innerBlock, FIELD_ALIASES.odds)
    const analysis = getTagValue(innerBlock, FIELD_ALIASES.analysis)
    const status = normalizeStatus(getTagValue(innerBlock, FIELD_ALIASES.status))
    const resultText = getTagValue(innerBlock, FIELD_ALIASES.resultText)
    const missingFields = [
      !sportRaw && "sport",
      !match && "match",
      !country && "country",
      !league && "league",
      !rawKickoff && "kickoff",
      !prediction && "prediction",
      !oddsRaw && "odds",
    ].filter(Boolean)

    if (missingFields.length > 0) {
      throw new Error(
        `Липсват задължителни полета в XML на ред ${rowNumber}: ${missingFields.join(", ")}.`
      )
    }

    return {
      sport: normalizeSport(sportRaw, rowNumber),
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
