"use client"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"
import type { PublicLocale } from "@/lib/public-locale"
import type { Result } from "../types/results"

ChartJS.register(ArcElement, Tooltip, Legend)

type Props = {
  results: Result[]
  locale?: PublicLocale
}

export default function ResultsPieChart({ results, locale = "bg" }: Props) {
  const wins = results.filter((r) => r.status === "WIN").length
  const losses = results.filter((r) => r.status === "LOSE").length
  const voids = results.filter((r) => r.status === "VOID").length
  const chartTitle = locale === "en" ? "Win / Lose chart" : "Win / Lose графика"

  const data = {
    labels: ["WIN", "LOSE", "VOID"],
    datasets: [
      {
        data: [wins, losses, voids],
        backgroundColor: ["#22c55e", "#ef4444", "#94a3b8"],
        borderWidth: 0,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
  }

  return (
    <div className="mb-10 rounded-xl bg-slate-800 p-6">
      <h2 className="mb-6 text-2xl font-bold">{chartTitle}</h2>

      <div className="h-80">
        <Pie data={data} options={options} />
      </div>
    </div>
  )
}
