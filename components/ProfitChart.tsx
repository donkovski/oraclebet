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
import { results } from "../data/results"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
)

function getCumulativeProfit() {
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

export default function ProfitChart() {
  const cumulativeProfit = getCumulativeProfit()

  const settledBets = results.filter((r) => r.status !== "VOID").length
  const voidBets = results.filter((r) => r.status === "VOID").length

  const averageOdds = (
    results.reduce((sum, item) => sum + item.odds, 0) / results.length
  ).toFixed(2)

  const highestOdds = Math.max(...results.map((r) => r.odds)).toFixed(2)

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
    <div className="bg-slate-800 rounded-xl p-6 mb-10">
      <h2 className="text-2xl font-bold mb-6">Profit графика</h2>

      <div className="grid grid-cols-1 gap-4">
        <div className="h-80">
          <Line data={data} options={options} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900 rounded-lg p-3 text-center flex flex-col justify-center">
            <p className="text-slate-400 text-sm">Settled bets</p>
            <p className="text-white text-xl font-bold">{settledBets}</p>
          </div>

          <div className="bg-slate-900 rounded-lg p-3 text-center flex flex-col justify-center">
            <p className="text-slate-400 text-sm">Void bets</p>
            <p className="text-slate-300 text-xl font-bold">{voidBets}</p>
          </div>

          <div className="bg-slate-900 rounded-lg p-3 text-center flex flex-col justify-center">
            <p className="text-slate-400 text-sm">Average odds</p>
            <p className="text-sky-400 text-xl font-bold">{averageOdds}</p>
          </div>

          <div className="bg-slate-900 rounded-lg p-3 text-center flex flex-col justify-center">
            <p className="text-slate-400 text-sm">Highest odds</p>
            <p className="text-orange-400 text-xl font-bold">{highestOdds}</p>
          </div>
        </div>
      </div>
    </div>
  )
}