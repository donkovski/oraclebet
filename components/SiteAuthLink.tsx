"use client"

import Link from "next/link"
import { useStorageItem } from "@/lib/browser-storage"

export default function SiteAuthLink() {
  const userEmail = useStorageItem("oraclebet-user-email")

  if (userEmail) {
    return (
      <Link
        href="/login"
        className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-slate-900"
      >
        Профил
      </Link>
    )
  }

  return (
    <>
      <Link
        href="/login"
        className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-slate-900"
      >
        Вход
      </Link>
      <Link
        href="/register"
        className="rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
      >
        Регистрация
      </Link>
    </>
  )
}
