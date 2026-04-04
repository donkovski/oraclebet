"use client"

import Link from "next/link"
import { useStorageItem } from "@/lib/browser-storage"

export default function SiteAuthLink() {
  const userEmail = useStorageItem("oraclebet-user-email")

  if (userEmail) {
    return (
      <Link
        href="/login"
        className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
      >
        Профил
      </Link>
    )
  }

  return (
    <>
      <Link
        href="/login"
        className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
      >
        Вход
      </Link>
      <Link
        href="/register"
        className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 transition hover:bg-white/[0.08] hover:text-white"
      >
        Регистрация
      </Link>
    </>
  )
}
