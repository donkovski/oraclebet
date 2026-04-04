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
      <section className="rounded-[30px] border border-white/12 bg-slate-950/12 p-8 shadow-[0_22px_60px_rgba(8,15,34,0.18)] backdrop-blur-sm">
        <p className="inline-flex rounded-full border border-orange-300/35 bg-orange-300/12 px-4 py-1 text-sm font-semibold uppercase tracking-[0.18em] text-orange-100">
          Регистрация
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
          Създай своя профил в OracleBet.
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-white/75">
          Регистрацията ти дава собствен достъп до сайта и те подготвя за
          следващите стъпки в OracleBet. След като създадеш профил, можеш веднага
          да продължиш към вход.
        </p>

        <div className="mt-8 space-y-3">
          {registerBenefits.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3 text-white/80"
            >
              {item}
            </div>
          ))}
        </div>

        {savedEmail && (
          <p className="mt-6 rounded-2xl border border-emerald-300/25 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-100">
            На това устройство вече има активен профил. Ако искаш, можеш направо да
            продължиш към{" "}
            <Link href="/login" className="font-semibold underline underline-offset-4">
              вход
            </Link>
            .
          </p>
        )}
      </section>

      <section className="rounded-[30px] border border-white/12 bg-slate-950/10 p-8 backdrop-blur-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">
          Нов профил
        </p>
        <h2 className="mt-4 text-3xl font-bold text-white">
          Данни за регистрация
        </h2>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-white/75">
              Име
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Иван Иванов"
              className="w-full rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-orange-300/45 focus:bg-white/[0.06]"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/75">
              Имейл
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              className="w-full rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-orange-300/45 focus:bg-white/[0.06]"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-white/75"
            >
              Парола
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Създай парола"
              className="w-full rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-orange-300/45 focus:bg-white/[0.06]"
            />
          </div>

          {error && (
            <p className="rounded-2xl border border-rose-300/25 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
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

        <p className="mt-4 text-sm leading-6 text-white/55">
          Имаш профил?{" "}
          <Link href="/login" className="font-semibold text-orange-200 hover:text-orange-100">
            Вход
          </Link>
        </p>
      </section>
    </main>
  )
}
