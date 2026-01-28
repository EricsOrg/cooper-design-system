"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type ToastVariant = "default" | "success" | "destructive"

export type ToastOptions = {
  title?: string
  description?: string
  variant?: ToastVariant
  durationMs?: number
}

type ToastItem = ToastOptions & {
  id: string
}

type ToastContextValue = {
  toast: (options: ToastOptions) => void
  dismiss: (id: string) => void
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

function toastClasses(variant: ToastVariant) {
  switch (variant) {
    case "success":
      return "border-emerald-500/30 bg-emerald-500/10"
    case "destructive":
      return "border-destructive/30 bg-destructive/10"
    default:
      return "bg-card"
  }
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<ToastItem[]>([])
  const timers = React.useRef(new Map<string, number>())

  const dismiss = React.useCallback((id: string) => {
    setItems((prev) => prev.filter((t) => t.id !== id))
    const timer = timers.current.get(id)
    if (timer) window.clearTimeout(timer)
    timers.current.delete(id)
  }, [])

  const toast = React.useCallback(
    ({ durationMs = 4000, variant = "default", ...options }: ToastOptions) => {
      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`
      const item: ToastItem = { id, variant, durationMs, ...options }

      setItems((prev) => [item, ...prev].slice(0, 5))

      const timer = window.setTimeout(() => dismiss(id), durationMs)
      timers.current.set(id, timer)
    },
    [dismiss]
  )

  React.useEffect(() => {
    const timersMap = timers.current
    return () => {
      for (const timer of timersMap.values()) window.clearTimeout(timer)
      timersMap.clear()
    }
  }, [])

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <Toaster items={items} dismiss={dismiss} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = React.useContext(ToastContext)
  if (!ctx) {
    throw new Error("useToast must be used within <ToastProvider>.")
  }
  return ctx
}

function Toaster({
  items,
  dismiss,
}: {
  items: ToastItem[]
  dismiss: (id: string) => void
}) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 flex w-full flex-col items-center gap-2 p-4 sm:inset-auto sm:bottom-4 sm:right-4 sm:items-end"
      aria-live="polite"
      aria-relevant="additions"
    >
      {items.map((t) => (
        <div
          key={t.id}
          className={cn(
            "w-full max-w-sm rounded-lg border p-4 shadow-sm",
            "animate-in fade-in slide-in-from-bottom-2",
            toastClasses(t.variant ?? "default")
          )}
          role="status"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="grid gap-1">
              {t.title ? (
                <p className="text-sm font-medium leading-none">{t.title}</p>
              ) : null}
              {t.description ? (
                <p className="text-sm text-muted-foreground">{t.description}</p>
              ) : null}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="-mr-1 -mt-1"
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss"
            >
              <span className="text-lg leading-none">×</span>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
