const SOFIA_TIMEZONE = "Europe/Sofia"

export type AdminPredictionStatus = "pending" | "live" | "won" | "lost" | "void"
export type AdminPredictionSport = "football" | "hockey" | "basketball" | "baseball" | "tennis"

export type AdminPredictionRow = {
  id: number
  sport: AdminPredictionSport
  match: string
  kickoff: string
  country: string
  league: string
  prediction: string
  analysis: string | null
  odds: number
  status: AdminPredictionStatus
  result_text: string | null
  published_at: string
  updated_at: string
}

export type AdminPredictionInput = {
  id?: number
  sport: AdminPredictionSport
  match: string
  kickoff: string
  country: string
  league: string
  prediction: string
  analysis: string | null
  odds: number
  status: AdminPredictionStatus
  result_text: string | null
}

export type DailyVisitorRow = {
  day: string
  visits: number
  created_at: string
  updated_at: string
}

function getSupabaseAdminConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    return null
  }

  return { url, serviceRoleKey }
}

function getSofiaDateKey(input: Date | string) {
  const date = typeof input === "string" ? new Date(input) : input
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: SOFIA_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date)

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))

  return `${values.year}-${values.month}-${values.day}`
}

function getAdminHeaders() {
  const config = getSupabaseAdminConfig()

  if (!config) {
    throw new Error("Supabase admin env vars are missing.")
  }

  return {
    apikey: config.serviceRoleKey,
    Authorization: `Bearer ${config.serviceRoleKey}`,
    "Content-Type": "application/json",
  }
}

async function getSupabaseErrorMessage(response: Response, fallback: string) {
  try {
    const payload = await response.json()

    if (typeof payload?.message === "string" && payload.message.trim()) {
      return payload.message
    }

    if (typeof payload?.error === "string" && payload.error.trim()) {
      return payload.error
    }

    if (typeof payload?.hint === "string" && payload.hint.trim()) {
      return payload.hint
    }

    if (typeof payload?.details === "string" && payload.details.trim()) {
      return payload.details
    }
  } catch {
    // Ignore JSON parsing errors and use the fallback below.
  }

  return `${fallback} (${response.status})`
}

function parseOffsetValue(offsetValue: string) {
  const match = offsetValue.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/)

  if (!match) {
    return "+00:00"
  }

  const [, sign, hours, minutes = "00"] = match

  return `${sign}${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`
}

export function formatKickoffForInput(timestamp: string) {
  const parts = new Intl.DateTimeFormat("sv-SE", {
    timeZone: SOFIA_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date(timestamp))

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))

  return `${values.year}-${values.month}-${values.day}T${values.hour}:${values.minute}`
}

export function toSofiaISOString(localDateTime: string) {
  const [datePart, timePart] = localDateTime.split("T")

  if (!datePart || !timePart) {
    throw new Error("Невалиден час на започване.")
  }

  const [year, month, day] = datePart.split("-").map(Number)
  const [hour, minute] = timePart.split(":").map(Number)
  const probeDate = new Date(Date.UTC(year, month - 1, day, hour, minute))
  const offsetPart = new Intl.DateTimeFormat("en-US", {
    timeZone: SOFIA_TIMEZONE,
    timeZoneName: "shortOffset",
  })
    .formatToParts(probeDate)
    .find((part) => part.type === "timeZoneName")?.value

  const offset = parseOffsetValue(offsetPart ?? "GMT+0")

  return new Date(`${datePart}T${timePart}:00${offset}`).toISOString()
}

export async function getAdminPredictions() {
  const config = getSupabaseAdminConfig()

  if (!config) {
    return []
  }

  const params = new URLSearchParams({
    select:
      "id,sport,match,kickoff,country,league,prediction,analysis,odds,status,result_text,published_at,updated_at",
    order: "kickoff.asc",
  })

  const response = await fetch(`${config.url}/rest/v1/predictions?${params.toString()}`, {
    headers: getAdminHeaders(),
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(await getSupabaseErrorMessage(response, "Грешка при зареждане на прогнозите"))
  }

  return (await response.json()) as AdminPredictionRow[]
}

export async function saveAdminPrediction(input: AdminPredictionInput) {
  const config = getSupabaseAdminConfig()

  if (!config) {
    throw new Error("Supabase admin env vars are missing.")
  }

  const payload = {
    sport: input.sport,
    match: input.match,
    kickoff: input.kickoff,
    country: input.country,
    league: input.league,
    prediction: input.prediction,
    analysis: input.analysis,
    odds: input.odds,
    status: input.status,
    result_text: input.result_text,
  }

  if (input.id) {
    const response = await fetch(`${config.url}/rest/v1/predictions?id=eq.${input.id}`, {
      method: "PATCH",
      headers: {
        ...getAdminHeaders(),
        Prefer: "return=minimal",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(await getSupabaseErrorMessage(response, "Грешка при обновяване на прогнозата"))
    }

    return
  }

  const response = await fetch(`${config.url}/rest/v1/predictions`, {
    method: "POST",
    headers: {
      ...getAdminHeaders(),
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(await getSupabaseErrorMessage(response, "Грешка при добавяне на прогнозата"))
  }
}

export async function saveAdminPredictionsBatch(inputs: AdminPredictionInput[]) {
  const config = getSupabaseAdminConfig()

  if (!config) {
    throw new Error("Supabase admin env vars are missing.")
  }

  if (inputs.length === 0) {
    throw new Error("XML файлът не съдържа прогнози за импорт.")
  }

  const payload = inputs.map((input) => ({
    sport: input.sport,
    match: input.match,
    kickoff: input.kickoff,
    country: input.country,
    league: input.league,
    prediction: input.prediction,
    analysis: input.analysis,
    odds: input.odds,
    status: input.status,
    result_text: input.result_text,
  }))

  const response = await fetch(
    `${config.url}/rest/v1/predictions?on_conflict=sport,match,kickoff,prediction`,
    {
      method: "POST",
      headers: {
        ...getAdminHeaders(),
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    }
  )

  if (!response.ok) {
    throw new Error(
      await getSupabaseErrorMessage(response, "Грешка при пакетно качване на прогнозите")
    )
  }
}

export async function deleteAdminPrediction(id: number) {
  const config = getSupabaseAdminConfig()

  if (!config) {
    throw new Error("Supabase admin env vars are missing.")
  }

  const response = await fetch(`${config.url}/rest/v1/predictions?id=eq.${id}`, {
    method: "DELETE",
    headers: {
      ...getAdminHeaders(),
      Prefer: "return=minimal",
    },
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(await getSupabaseErrorMessage(response, "Р“СЂРµС€РєР° РїСЂРё РёР·С‚СЂРёРІР°РЅРµ РЅР° РїСЂРѕРіРЅРѕР·Р°С‚Р°"))
  }
}

async function upsertDailyVisitFallback(
  config: NonNullable<ReturnType<typeof getSupabaseAdminConfig>>,
  visitDay: string
) {
  const selectParams = new URLSearchParams({
    select: "day,visits,created_at,updated_at",
    day: `eq.${visitDay}`,
    limit: "1",
  })

  const existingResponse = await fetch(
    `${config.url}/rest/v1/daily_visitors?${selectParams.toString()}`,
    {
      headers: getAdminHeaders(),
      cache: "no-store",
    }
  )

  if (!existingResponse.ok) {
    return null
  }

  const existingRows = (await existingResponse.json()) as DailyVisitorRow[]
  const existingRow = existingRows[0]

  if (existingRow) {
    const updateResponse = await fetch(
      `${config.url}/rest/v1/daily_visitors?day=eq.${visitDay}`,
      {
        method: "PATCH",
        headers: {
          ...getAdminHeaders(),
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          visits: existingRow.visits + 1,
        }),
        cache: "no-store",
      }
    )

    if (!updateResponse.ok) {
      return null
    }

    const updatedRows = (await updateResponse.json()) as DailyVisitorRow[]

    return updatedRows[0] ?? null
  }

  const insertResponse = await fetch(`${config.url}/rest/v1/daily_visitors`, {
    method: "POST",
    headers: {
      ...getAdminHeaders(),
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      day: visitDay,
      visits: 1,
    }),
    cache: "no-store",
  })

  if (!insertResponse.ok) {
    return null
  }

  const insertedRows = (await insertResponse.json()) as DailyVisitorRow[]

  return insertedRows[0] ?? null
}

export async function incrementDailyVisit() {
  const config = getSupabaseAdminConfig()

  if (!config) {
    return null
  }

  const visitDay = getSofiaDateKey(new Date())

  try {
    const response = await fetch(`${config.url}/rest/v1/rpc/increment_daily_visitors`, {
      method: "POST",
      headers: getAdminHeaders(),
      body: JSON.stringify({
        visit_day: visitDay,
      }),
      cache: "no-store",
    })

    if (response.ok) {
      const payload = (await response.json()) as DailyVisitorRow | DailyVisitorRow[]

      return Array.isArray(payload) ? payload[0] ?? null : payload
    }
  } catch {
    // Fall back to a direct table write below.
  }

  return upsertDailyVisitFallback(config, visitDay)
}

export async function getAdminDailyVisitors(limit = 7) {
  const config = getSupabaseAdminConfig()

  if (!config) {
    return []
  }

  const params = new URLSearchParams({
    select: "day,visits,created_at,updated_at",
    order: "day.desc",
    limit: String(limit),
  })

  const response = await fetch(`${config.url}/rest/v1/daily_visitors?${params.toString()}`, {
    headers: getAdminHeaders(),
    cache: "no-store",
  })

  if (!response.ok) {
    return []
  }

  return (await response.json()) as DailyVisitorRow[]
}
