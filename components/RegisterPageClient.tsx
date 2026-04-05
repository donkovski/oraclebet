"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { setStorageItem, useStorageItem } from "@/lib/browser-storage"

const registerBenefits = [
  "Започваш с личен профил в сайта",
  "Подготвяш си по-удобен достъп за следващите версии",
  "Имаш собствена точка за вход и връщане към OracleBet",
]

export default function RegisterPageClient() {
  const router = useRouter()
  const savedEmail = useStorageItem("oraclebet-user-email")

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Моля, попълни име, имейл и парола.")
      return
    }

    setStorageItem("oraclebet-user-name", name.trim())
    setStorageItem("oraclebet-user-email", email.trim())
    setError("")
    router.push("/login")
  }

  return (
    <main className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
      <section className="theme-panel rounded-[30px] p-8 backdrop-blur-xl">
        <p className="inline-flex rounded-full border border-orange-300/50 bg-orange-100/80 px-4 py-1 text-sm font-semibold uppercase tracking-[0.18em] text-orange-700">
          Регистрация
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
          Създай своя профил в OracleBet.
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-slate-600">
          Регистрацията ти дава собствен достъп до сайта и те подготвя за
          следващите стъпки в OracleBet. След като създадеш профил, можеш веднага
          да продължиш към вход.
        </p>

        <div className="mt-8 space-y-3">
          {registerBenefits.map((item) => (
            <div
              key={item}
              className="theme-surface-soft theme-text rounded-2xl px-4 py-3"
            >
              {item}
            </div>
          ))}
        </div>

        {savedEmail && (
          <p className="mt-6 rounded-2xl border border-emerald-300/35 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            На това устройство вече има активен профил. Ако искаш, можеш направо да
            продължиш към{" "}
            <Link href="/login" className="font-semibold underline underline-offset-4">
              вход
            </Link>
            .
          </p>
        )}
      </section>

      <section className="theme-panel rounded-[30px] p-8 backdrop-blur-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-700">
          Нов профил
        </p>
        <h2 className="mt-4 text-3xl font-bold text-slate-950">
          Данни за регистрация
        </h2>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-600">
              Име
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Иван Иванов"
              className="theme-input w-full rounded-2xl px-4 py-3 outline-none transition focus:border-orange-300/45"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-600">
              Имейл
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              className="theme-input w-full rounded-2xl px-4 py-3 outline-none transition focus:border-orange-300/45"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-600"
            >
              Парола
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Създай парола"
              className="theme-input w-full rounded-2xl px-4 py-3 outline-none transition focus:border-orange-300/45"
            />
          </div>

          {error && (
            <p className="rounded-2xl border border-rose-300/30 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-2xl bg-orange-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-orange-300"
          >
            Създай профил
          </button>
        </form>

        <p className="mt-4 text-sm leading-6 text-slate-500">
          Имаш профил?{" "}
          <Link href="/login" className="font-semibold text-orange-700 hover:text-orange-600">
            Вход
          </Link>
        </p>
      </section>
    </main>
  )
}
