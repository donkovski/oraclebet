"use client"

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js"
import { Pie } from "react-chartjs-2"
import { results } from "../data/results"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function ResultsPieChart() {
  const wins = results.filter((r) => r.status === "WIN").length
  const losses = results.filter((r) => r.status === "LOSE").length
  const voids = results.filter((r) => r.status === "VOID").length

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
    <div className="bg-slate-800 rounded-xl p-6 mb-10">
      <h2 className="text-2xl font-bold mb-6">Win / Lose графика</h2>

      <div className="h-80">
        <Pie data={data} options={options} />
      </div>
    </div>
  )
}