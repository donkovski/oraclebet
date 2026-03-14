"use client"

import { useSyncExternalStore } from "react"

const STORAGE_EVENT = "oraclebet-storage-change"

type StorageChangeDetail = {
  key: string
}

function subscribeToStorageKey(key: string, callback: () => void) {
  if (typeof window === "undefined") {
    return () => {}
  }

  const handleStorageChange = (event: Event) => {
    if (event instanceof StorageEvent) {
      if (event.key === key) {
        callback()
      }

      return
    }

    const customEvent = event as CustomEvent<StorageChangeDetail>

    if (customEvent.detail.key === key) {
      callback()
    }
  }

  window.addEventListener("storage", handleStorageChange)
  window.addEventListener(STORAGE_EVENT, handleStorageChange as EventListener)

  return () => {
    window.removeEventListener("storage", handleStorageChange)
    window.removeEventListener(STORAGE_EVENT, handleStorageChange as EventListener)
  }
}

function emitStorageChange(key: string) {
  window.dispatchEvent(
    new CustomEvent<StorageChangeDetail>(STORAGE_EVENT, {
      detail: { key },
    })
  )
}

export function useStorageItem(key: string) {
  return useSyncExternalStore(
    (callback) => subscribeToStorageKey(key, callback),
    () => {
      if (typeof window === "undefined") {
        return null
      }

      return window.localStorage.getItem(key)
    },
    () => null
  )
}

export function setStorageItem(key: string, value: string) {
  if (typeof window === "undefined") {
    return
  }

  window.localStorage.setItem(key, value)
  emitStorageChange(key)
}

export function removeStorageItem(key: string) {
  if (typeof window === "undefined") {
    return
  }

  window.localStorage.removeItem(key)
  emitStorageChange(key)
}
