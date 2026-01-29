"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export type NotificationVariant = "info" | "warning" | "error"

export type NotificationOptions = {
  title: string
  description?: string
  variant?: NotificationVariant
}

export type NotificationItem = NotificationOptions & {
  id: string
  createdAt: number
  readAt: number | null
}

type NotificationCenterContextValue = {
  items: NotificationItem[]
  unreadCount: number
  notify: (options: NotificationOptions) => string
  dismiss: (id: string) => void
  markRead: (id: string, read?: boolean) => void
  markAllRead: () => void
  clearAll: () => void
}

const NotificationCenterContext = React.createContext<
  NotificationCenterContextValue | null
>(null)

function variantClasses(variant: NotificationVariant) {
  switch (variant) {
    case "warning":
      return "border-amber-500/30 bg-amber-500/10"
    case "error":
      return "border-destructive/30 bg-destructive/10"
    default:
      return "bg-card"
  }
}

function variantLabel(variant: NotificationVariant) {
  switch (variant) {
    case "warning":
      return "Warning"
    case "error":
      return "Error"
    default:
      return "Info"
  }
}

export function NotificationCenterProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [items, setItems] = React.useState<NotificationItem[]>([])
  const [liveMessage, setLiveMessage] = React.useState<string>("")

  const notify = React.useCallback((options: NotificationOptions) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`
    const item: NotificationItem = {
      id,
      title: options.title,
      description: options.description,
      variant: options.variant ?? "info",
      createdAt: Date.now(),
      readAt: null,
    }

    setItems((prev) => [item, ...prev])

    // A11y: announce new notifications without making the entire list a live region.
    setLiveMessage(`${variantLabel(item.variant ?? "info")}: ${item.title}`)

    return id
  }, [])

  const dismiss = React.useCallback((id: string) => {
    setItems((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const markRead = React.useCallback((id: string, read = true) => {
    setItems((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              readAt: read ? Date.now() : null,
            }
          : n
      )
    )
  }, [])

  const markAllRead = React.useCallback(() => {
    const now = Date.now()
    setItems((prev) => prev.map((n) => (n.readAt ? n : { ...n, readAt: now })))
  }, [])

  const clearAll = React.useCallback(() => {
    setItems([])
  }, [])

  const unreadCount = React.useMemo(
    () => items.filter((n) => !n.readAt).length,
    [items]
  )

  return (
    <NotificationCenterContext.Provider
      value={{
        items,
        unreadCount,
        notify,
        dismiss,
        markRead,
        markAllRead,
        clearAll,
      }}
    >
      {children}
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {liveMessage}
      </span>
    </NotificationCenterContext.Provider>
  )
}

export function useNotificationCenter() {
  const ctx = React.useContext(NotificationCenterContext)
  if (!ctx) {
    throw new Error(
      "useNotificationCenter must be used within <NotificationCenterProvider>."
    )
  }
  return ctx
}

export function NotificationCenterPopover({
  className,
  align = "end",
}: {
  className?: string
  align?: React.ComponentProps<typeof PopoverContent>["align"]
}) {
  const { items, unreadCount, dismiss, markRead, markAllRead, clearAll } =
    useNotificationCenter()

  const listRef = React.useRef<HTMLUListElement | null>(null)

  const onListKeyDownCapture = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (!listRef.current) return

      const active = document.activeElement as HTMLElement | null
      const isItem = active?.dataset?.notificationItem === "true"
      if (!isItem) return

      const focusables = Array.from(
        listRef.current.querySelectorAll<HTMLElement>(
          "[data-notification-item='true']"
        )
      )
      const currentIndex = focusables.indexOf(active)
      if (currentIndex < 0) return

      const moveTo = (nextIndex: number) => {
        const el = focusables[nextIndex]
        if (el) el.focus()
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          moveTo(Math.min(currentIndex + 1, focusables.length - 1))
          break
        case "ArrowUp":
          e.preventDefault()
          moveTo(Math.max(currentIndex - 1, 0))
          break
        case "Home":
          e.preventDefault()
          moveTo(0)
          break
        case "End":
          e.preventDefault()
          moveTo(focusables.length - 1)
          break
      }
    },
    []
  )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" variant="outline" size="sm" className={className}>
          Notifications
          {unreadCount > 0 ? (
            <span
              className={cn(
                "ml-2 inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 py-0.5 text-[11px] font-medium text-primary-foreground"
              )}
              aria-label={`${unreadCount} unread`}
            >
              {unreadCount}
            </span>
          ) : null}
        </Button>
      </PopoverTrigger>

      <PopoverContent align={align} className="w-[420px] p-0">
        <div className="border-b p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold leading-none">
                Notification Center
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Persistent alerts (unread/read). Use toasts for transient feedback.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={markAllRead}
                disabled={items.length === 0 || unreadCount === 0}
              >
                Mark all read
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearAll}
                disabled={items.length === 0}
              >
                Clear
              </Button>
            </div>
          </div>
        </div>

        <ul
          ref={listRef}
          className="max-h-[360px] overflow-auto p-3"
          aria-label="Notifications"
          onKeyDownCapture={onListKeyDownCapture}
        >
          {items.length === 0 ? (
            <li className="p-3 text-sm text-muted-foreground">
              No notifications.
            </li>
          ) : (
            items.map((n) => {
              const isUnread = !n.readAt
              const variant = n.variant ?? "info"

              return (
                <li key={n.id} className="py-2 first:pt-0 last:pb-0">
                  <div
                    data-notification-item="true"
                    tabIndex={0}
                    className={cn(
                      "rounded-md border p-3 outline-none",
                      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      variantClasses(variant),
                      isUnread ? "" : "opacity-75"
                    )}
                    aria-label={`${variantLabel(variant)} notification: ${n.title}${
                      isUnread ? ", unread" : ", read"
                    }`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        markRead(n.id, !!n.readAt)
                      }
                      if (e.key === "Delete" || e.key === "Backspace") {
                        e.preventDefault()
                        dismiss(n.id)
                      }
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="grid gap-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium leading-none">
                            {n.title}
                          </p>
                          {isUnread ? (
                            <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[11px] font-medium text-primary">
                              Unread
                            </span>
                          ) : null}
                        </div>
                        {n.description ? (
                          <p className="text-sm text-muted-foreground">
                            {n.description}
                          </p>
                        ) : null}
                        <p className="text-xs text-muted-foreground">
                          {variantLabel(variant)} • {new Date(n.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => markRead(n.id, !!n.readAt)}
                          aria-label={isUnread ? "Mark as read" : "Mark as unread"}
                        >
                          {isUnread ? "✓" : "↺"}
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => dismiss(n.id)}
                          aria-label="Dismiss"
                        >
                          ×
                        </Button>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Keyboard: ↑/↓ to move, Enter to toggle read, Delete to dismiss.
                    </p>
                  </div>
                </li>
              )
            })
          )}
        </ul>
      </PopoverContent>
    </Popover>
  )
}
