"use client"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"
import type { Result } from "../types/results"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
)

type Props = {
  results: Result[]
}

function getCumulativeProfit(results: Result[]) {
  let total = 0

  return results.map((item, index) => {
    if (item.status === "WIN") total += item.odds - 1
    else if (item.status === "LOSE") total -= 1

    return {
      x: `Bet ${index + 1}`,
      y: Number(total.toFixed(2)),
    }
  })
}

export default function ProfitChart({ results }: Props) {
  const cumulativeProfit = getCumulativeProfit(results)

  const settledBets = results.filter((r) => r.status !== "VOID").length
  const voidBets = results.filter((r) => r.status === "VOID").length

  const averageOdds =
    results.length === 0
      ? "0.00"
      : (results.reduce((sum, item) => sum + item.odds, 0) / results.length).toFixed(2)

  const highestOdds =
    results.length === 0 ? "0.00" : Math.max(...results.map((r) => r.odds)).toFixed(2)

  const data = {
    labels: cumulativeProfit.map((item) => item.x),
    datasets: [
      {
        label: "Натрупан profit",
        data: cumulativeProfit.map((item) => item.y),
        borderColor: "#f97316",
        backgroundColor: "#f97316",
        tension: 0.3,
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
    scales: {
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "#334155",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "#334155",
        },
      },
    },
  }

  return (
    <div className="mb-10 rounded-xl border border-white/12 bg-slate-950/10 p-6 shadow-[0_18px_40px_rgba(8,15,34,0.14)] backdrop-blur-sm">
      <h2 className="mb-6 text-2xl font-bold">Profit графика</h2>

      <div className="grid grid-cols-1 gap-4">
        <div className="h-80">
          <Line data={data} options={options} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col justify-center rounded-lg border border-white/12 bg-slate-950/10 p-3 text-center">
            <p className="text-sm text-slate-400">Settled bets</p>
            <p className="text-xl font-bold text-white">{settledBets}</p>
          </div>

          <div className="flex flex-col justify-center rounded-lg border border-white/12 bg-slate-950/10 p-3 text-center">
            <p className="text-sm text-slate-400">Void bets</p>
            <p className="text-xl font-bold text-slate-300">{voidBets}</p>
          </div>

          <div className="flex flex-col justify-center rounded-lg border border-white/12 bg-slate-950/10 p-3 text-center">
            <p className="text-sm text-slate-400">Average odds</p>
            <p className="text-xl font-bold text-sky-400">{averageOdds}</p>
          </div>

          <div className="flex flex-col justify-center rounded-lg border border-white/12 bg-slate-950/10 p-3 text-center">
            <p className="text-sm text-slate-400">Highest odds</p>
            <p className="text-xl font-bold text-orange-400">{highestOdds}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
