import { createHash, timingSafeEqual } from "node:crypto"
import { cookies } from "next/headers"

const ADMIN_SESSION_COOKIE = "oraclebet_admin_session"
const ADMIN_ACCESS_COOKIE = "oraclebet_admin_access"

function getAdminPassword() {
  return process.env.ORACLEBET_ADMIN_PASSWORD ?? ""
}

function getAdminAccessKey() {
  return process.env.ORACLEBET_ADMIN_ACCESS_KEY ?? ""
}

function buildSessionToken(password: string) {
  return createHash("sha256").update(`oraclebet:${password}`).digest("hex")
}

function secretsMatch(inputSecret: string, expectedSecret: string) {
  const input = Buffer.from(inputSecret)
  const expected = Buffer.from(expectedSecret)

  if (input.length !== expected.length) {
    return false
  }

  return timingSafeEqual(input, expected)
}

export function isAdminConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY &&
      process.env.ORACLEBET_ADMIN_PASSWORD &&
      process.env.ORACLEBET_ADMIN_ACCESS_KEY
  )
}

export async function isAdminAuthenticated() {
  const adminPassword = getAdminPassword()

  if (!adminPassword) {
    return false
  }

  const cookieStore = await cookies()
  const currentSession = cookieStore.get(ADMIN_SESSION_COOKIE)?.value

  return currentSession === buildSessionToken(adminPassword)
}

export async function hasAdminAccess() {
  const adminAccessKey = getAdminAccessKey()

  if (!adminAccessKey) {
    return false
  }

  const cookieStore = await cookies()
  const currentAccess = cookieStore.get(ADMIN_ACCESS_COOKIE)?.value

  return currentAccess === buildSessionToken(adminAccessKey)
}

export async function authenticateAdmin(password: string) {
  const adminPassword = getAdminPassword()

  if (!adminPassword || !secretsMatch(password, adminPassword)) {
    return false
  }

  const cookieStore = await cookies()

  cookieStore.set(ADMIN_SESSION_COOKIE, buildSessionToken(adminPassword), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  })

  return true
}

export async function grantAdminAccess(accessKey: string) {
  const adminAccessKey = getAdminAccessKey()

  if (!adminAccessKey || !secretsMatch(accessKey, adminAccessKey)) {
    return false
  }

  const cookieStore = await cookies()

  cookieStore.set(ADMIN_ACCESS_COOKIE, buildSessionToken(adminAccessKey), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  })

  return true
}

export async function clearAdminSession() {
  const cookieStore = await cookies()

  cookieStore.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  })
}
