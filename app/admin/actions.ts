"use server"

import { redirect } from "next/navigation"
import {
  authenticateAdmin,
  clearAdminSession,
  hasAdminAccess,
  isAdminAuthenticated,
} from "@/lib/admin-auth"
import {
  saveAdminPrediction,
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
