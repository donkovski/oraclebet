"use client"

import { useRouter } from "next/navigation"
import PredictionCard from "@/components/PredictionCard"
import { removeStorageItem, setStorageItem, useStorageItem } from "@/lib/browser-storage"
import { vipPredictions } from "@/data/vipPredictions"

const eurToBgn = 1.95583

const plans = [
  {
    id: "1m",
    title: "1 месец",
    totalPriceEur: 12.99,
    monthlyPriceEur: 12.99,
    badge: "",
  },
  {
    id: "6m",
    title: "6 месеца",
    totalPriceEur: 54.99,
    monthlyPriceEur: 9.16,
    badge: "По-изгоден",
  },
  {
    id: "12m",
    title: "12 месеца",
    totalPriceEur: 99.99,
    monthlyPriceEur: 8.33,
    badge: "Най-изгоден",
  },
]

export default function VipPageClient() {
  const router = useRouter()
  const authorized = useStorageItem("vipUser") === "true"

  const handleLogout = () => {
    removeStorageItem("vipUser")
  }

  const handleLoginRedirect = () => {
    router.push("/login")
  }

  const handleSelectPlan = (planId: string) => {
    setStorageItem("selectedVipPlan", planId)
    router.push("/login")
  }

  return (
    <main>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">VIP прогнози</h1>

        {authorized ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white font-semibold transition"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLoginRedirect}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white font-semibold transition"
          >
            Login
          </button>
        )}
      </div>

      {authorized ? (
        <>
          <div className="bg-slate-900 border border-orange-500 rounded-2xl p-8 mb-8">
            <p className="text-2xl font-semibold text-orange-400 mb-4">
              VIP отключен
            </p>

            <p className="text-slate-300">
              Вие имате достъп до VIP секцията и можете да виждате всички premium прогнози.
            </p>
          </div>

          <div className="space-y-6">
            {vipPredictions.map((item) => (
              <PredictionCard
                key={`${item.match}-${item.prediction}`}
                match={item.match}
                prediction={item.prediction}
                odds={item.odds}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="grid lg:grid-cols-3 gap-6 mb-10">
            <div className="lg:col-span-1 bg-slate-900 border border-orange-500 rounded-2xl p-8">
              <p className="text-2xl font-semibold text-orange-400 mb-4">
                VIP секция
              </p>

              <p className="text-slate-300 mb-6">
                Отключи premium прогнози, по-високи коефициенти и пълен достъп до VIP съдържанието.
              </p>

              <ul className="space-y-3 text-slate-200">
                <li>Ежедневни VIP прогнози</li>
                <li>По-високи коефициенти</li>
                <li>По-добър value подбор</li>
                <li>Достъп до premium секцията</li>
                <li>Достъп от телефон и компютър</li>
              </ul>
            </div>

            <div className="lg:col-span-2 grid md:grid-cols-3 gap-6">
              {plans.map((plan) => {
                const totalPriceBgn = (plan.totalPriceEur * eurToBgn).toFixed(2)
                const monthlyPriceBgn = (plan.monthlyPriceEur * eurToBgn).toFixed(2)

                const isBest = plan.badge === "Най-изгоден"
                const isBetter = plan.badge === "По-изгоден"

                return (
                  <div
                    key={plan.id}
                    className={`relative rounded-2xl p-6 text-center border ${
                      isBest
                        ? "bg-slate-900 border-green-500"
                        : isBetter
                        ? "bg-slate-900 border-orange-500"
                        : "bg-slate-900 border-slate-700"
                    }`}
                  >
                    {plan.badge && (
                      <div
                        className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm font-semibold ${
                          isBest
                            ? "bg-green-500 text-black"
                            : "bg-orange-500 text-white"
                        }`}
                      >
                        {plan.badge}
                      </div>
                    )}

                    <p className="text-slate-300 mt-2 mb-2">{plan.title}</p>

                    <p className="text-4xl font-bold text-green-400 mb-1">
                      {plan.totalPriceEur.toFixed(2)} EUR
                    </p>

                    <p className="text-slate-400 text-sm mb-3">
                      около {totalPriceBgn} лв общо
                    </p>

                    <div className="bg-slate-800 rounded-xl p-3 mb-5">
                      <p className="text-slate-400 text-sm">Цена на месец</p>
                      <p className="text-xl font-bold text-white">
                        {plan.monthlyPriceEur.toFixed(2)} EUR
                      </p>
                      <p className="text-slate-500 text-sm">
                        около {monthlyPriceBgn} лв
                      </p>
                    </div>

                    <div className="space-y-2 text-slate-200 text-sm mb-6">
                      <p>Пълен достъп до VIP прогнозите</p>
                      <p>Premium съдържание</p>
                      <p>Бърз login и отключване</p>
                    </div>

                    <button
                      onClick={() => handleSelectPlan(plan.id)}
                      className={`w-full font-semibold px-4 py-3 rounded-xl transition ${
                        isBest
                          ? "bg-green-600 hover:bg-green-500 text-white"
                          : "bg-orange-500 hover:bg-orange-400 text-white"
                      }`}
                    >
                      Избери план
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="relative">
            <div className="space-y-6 blur-sm pointer-events-none select-none">
              {vipPredictions.map((item) => (
                <PredictionCard
                  key={`${item.match}-${item.prediction}`}
                  match={item.match}
                  prediction={item.prediction}
                  odds={item.odds}
                />
              ))}
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-slate-950/90 border border-orange-500 rounded-2xl p-8 text-center max-w-md">
                <p className="text-2xl font-bold text-orange-400 mb-4">
                  Отключи VIP прогнозите
                </p>

                <p className="text-slate-300">
                  Избери план и влез в профила си, за да видиш premium съдържанието и всички VIP прогнози.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  )
}
