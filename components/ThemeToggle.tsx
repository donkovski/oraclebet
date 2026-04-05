"use client"

import { useEffect, useState } from "react"
import { setStorageItem, useStorageItem } from "@/lib/browser-storage"

const THEME_KEY = "oraclebet-theme"

type Theme = "light" | "dark"

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
}

export default function ThemeToggle() {
  const storedTheme = useStorageItem(THEME_KEY)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const theme = storedTheme === "dark" ? "dark" : "light"
    applyTheme(theme)
    setMounted(true)
  }, [storedTheme])

  const activeTheme: Theme = storedTheme === "dark" ? "dark" : "light"

  return (
    <button
      type="button"
      aria-label={activeTheme === "dark" ? "Включи светла тема" : "Включи тъмна тема"}
      aria-pressed={activeTheme === "dark"}
      onClick={() => {
        const nextTheme: Theme = activeTheme === "dark" ? "light" : "dark"
        applyTheme(nextTheme)
        setStorageItem(THEME_KEY, nextTheme)
      }}
      className="theme-secondary-button inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition"
    >
      <span className="text-base leading-none">{mounted && activeTheme === "dark" ? "☀" : "☾"}</span>
      <span>{mounted && activeTheme === "dark" ? "Светла" : "Тъмна"}</span>
    </button>
  )
}
