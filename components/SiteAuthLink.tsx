"use client"

import Link from "next/link"
import { useStorageItem } from "@/lib/browser-storage"

export default function SiteAuthLink() {
  const userEmail = useStorageItem("oraclebet-user-email")

  if (userEmail) {
    return (
      <Link
        href="/login"
        className="theme-nav-link rounded-full px-4 py-2 transition"
      >
        Профил
      </Link>
    )
  }

  return (
    <>
      <Link
        href="/login"
        className="theme-nav-link rounded-full px-4 py-2 transition"
      >
        Вход
      </Link>
      <Link
        href="/register"
        className="theme-secondary-button rounded-full px-4 py-2 transition"
      >
        Регистрация
      </Link>
    </>
  )
}
