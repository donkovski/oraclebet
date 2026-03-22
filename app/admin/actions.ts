"use server"

import { redirect } from "next/navigation"
import { parsePredictionImportXml } from "@/lib/admin-xml"
import {
  authenticateAdmin,
  clearAdminSession,
  hasAdminAccess,
  isAdminAuthenticated,
} from "@/lib/admin-auth"
import {
  deleteAdminPrediction,
  saveAdminPrediction,
  saveAdminPredictionsBatch,
  toSofiaISOString,
  type AdminPredictionInput,
  type AdminPredictionSport,
  type AdminPredictionStatus,
} from "@/lib/supabase-admin"

function getStringValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim()
}

function parsePredictionPayload(formData: FormData): AdminPredictionInput {
  const id = getStringValue(formData, "id")
  const sport = getStringValue(formData, "sport") as AdminPredictionSport
  const match = getStringValue(formData, "match")
  const kickoffInput = getStringValue(formData, "kickoff")
  const country = getStringValue(formData, "country")
  const league = getStringValue(formData, "league")
  const prediction = getStringValue(formData, "prediction")
  const analysis = getStringValue(formData, "analysis")
  const odds = Number(getStringValue(formData, "odds"))
  const status = getStringValue(formData, "status") as AdminPredictionStatus
  const resultText = getStringValue(formData, "result_text")

  if (!sport || !match || !kickoffInput || !country || !league || !prediction) {
    throw new Error("Попълни всички основни полета.")
  }

  if (!Number.isFinite(odds) || odds <= 1) {
    throw new Error("Коефициентът трябва да е число над 1.00.")
  }

  return {
    id: id ? Number(id) : undefined,
    sport,
    match,
    kickoff: toSofiaISOString(kickoffInput),
    country,
    league,
    prediction,
    analysis: analysis || null,
    odds: Number(odds.toFixed(2)),
    status,
    result_text: resultText || null,
  }
}

export async function loginAdminAction(formData: FormData) {
  const accessGranted = await hasAdminAccess()

  if (!accessGranted) {
    redirect("/")
  }

  const password = getStringValue(formData, "password")
  const authenticated = await authenticateAdmin(password)

  if (!authenticated) {
    redirect("/admin?error=wrong-password")
  }

  redirect("/admin")
}

export async function logoutAdminAction() {
  await clearAdminSession()
  redirect("/admin")
}

export async function savePredictionAction(formData: FormData) {
  const accessGranted = await hasAdminAccess()
  const isAuthenticated = await isAdminAuthenticated()

  if (!accessGranted || !isAuthenticated) {
    redirect("/admin")
  }

  try {
    const payload = parsePredictionPayload(formData)
    await saveAdminPrediction(payload)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Неуспешен запис."
    redirect(`/admin?error=${encodeURIComponent(message)}`)
  }

  redirect("/admin?saved=1")
}

export async function importPredictionXmlAction(formData: FormData) {
  const accessGranted = await hasAdminAccess()
  const isAuthenticated = await isAdminAuthenticated()

  if (!accessGranted || !isAuthenticated) {
    redirect("/admin")
  }

  const fileEntry = formData.get("xml_file")

  if (!(fileEntry instanceof File) || fileEntry.size === 0) {
    redirect("/admin?error=Моля%20избери%20XML%20файл%20за%20импорт.")
  }

  try {
    const xmlContent = await fileEntry.text()
    const predictions = parsePredictionImportXml(xmlContent)
    await saveAdminPredictionsBatch(predictions)
    redirect(`/admin?imported=${predictions.length}`)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Неуспешен XML импорт."
    redirect(`/admin?error=${encodeURIComponent(message)}`)
  }
}

export async function deletePredictionAction(formData: FormData) {
  const accessGranted = await hasAdminAccess()
  const isAuthenticated = await isAdminAuthenticated()

  if (!accessGranted || !isAuthenticated) {
    redirect("/admin")
  }

  const id = Number(getStringValue(formData, "id"))

  if (!Number.isInteger(id) || id <= 0) {
    redirect("/admin?error=Невалиден%20идентификатор%20за%20изтриване.")
  }

  try {
    await deleteAdminPrediction(id)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Неуспешно изтриване."
    redirect(`/admin?error=${encodeURIComponent(message)}`)
  }

  redirect("/admin?deleted=1")
}
