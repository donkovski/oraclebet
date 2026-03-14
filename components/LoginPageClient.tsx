"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  removeStorageItem,
  setStorageItem,
  useStorageItem,
} from "@/lib/browser-storage"

const loginBenefits = [
  "По-бърз достъп до прогнозите и резултатите",
  "По-удобно следене на сайта от едно място",
  "Основа за бъдещ профил и лични предпочитания",
]

export default function LoginPageClient() {
  const router = useRouter()
  const savedEmail = useStorageItem("oraclebet-user-email")
  const savedName = useStorageItem("oraclebet-user-name")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!email.trim() || !password.trim()) {
      setError("Моля, попълни имейл и парола.")
      return
    }

    setStorageItem("oraclebet-user-email", email.trim())
    setStorageItem("oraclebet-user-name", savedName || "Потребител")
    setError("")
    router.push("/")
  }

  const handleLogout = () => {
    removeStorageItem("oraclebet-user-email")
    removeStorageItem("oraclebet-user-name")
  }

  if (savedEmail) {
    return (
      <main className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <section className="rounded-[30px] border border-white/10 bg-slate-950/20 p-8 shadow-[0_22px_60px_rgba(8,15,34,0.22)] backdrop-blur-xl">
          <p className="inline-flex rounded-full border border-emerald-300/35 bg-emerald-300/12 px-4 py-1 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-100">
            Активен профил
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
            Добре дошъл отново, {savedName || "Потребител"}.
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-white/75">
            В момента си влязъл в сайта с имейл <span className="text-white">{savedEmail}</span>.
            Можеш да продължиш към прогнозите и резултатите или да излезеш от профила си.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/bezplatni"
              className="rounded-full bg-orange-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-orange-300"
            >
              Към прогнозите
            </Link>
            <Link
              href="/rezultati"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Към футболни резултати
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-rose-300/30 bg-rose-400/12 px-6 py-3 font-semibold text-rose-100 transition hover:bg-rose-400/20"
            >
              Изход
            </button>
          </div>
        </section>

        <section className="rounded-[30px] border border-white/10 bg-slate-950/18 p-8 backdrop-blur-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">
            Твоят профил
          </p>
          <h2 className="mt-4 text-3xl font-bold text-white">
            По-удобен достъп до сайта
          </h2>

          <div className="mt-6 space-y-3">
            {loginBenefits.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/80"
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
      <section className="rounded-[30px] border border-white/10 bg-slate-950/20 p-8 shadow-[0_22px_60px_rgba(8,15,34,0.22)] backdrop-blur-xl">
        <p className="inline-flex rounded-full border border-orange-300/35 bg-orange-300/12 px-4 py-1 text-sm font-semibold uppercase tracking-[0.18em] text-orange-100">
          Вход за потребители
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
          Влез в своя профил в OracleBet.
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-white/75">
          Ако вече имаш профил, използвай формата вдясно, за да влезеш и да
          продължиш към прогнозите и резултатите.
        </p>

        <div className="mt-8 space-y-3">
          {loginBenefits.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/80"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[30px] border border-white/10 bg-slate-950/18 p-8 backdrop-blur-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">
          Вход
        </p>
        <h2 className="mt-4 text-3xl font-bold text-white">
          Достъп до профила
        </h2>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
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
              className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-orange-300/45"
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
              placeholder="Въведи парола"
              className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-orange-300/45"
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
            Вход
          </button>
        </form>

        <p className="mt-4 text-sm leading-6 text-white/55">
          Нямаш профил?{" "}
          <Link href="/register" className="font-semibold text-orange-200 hover:text-orange-100">
            Регистрация
          </Link>
        </p>
      </section>
    </main>
  )
}
