"use client"

import * as React from "react"

import { NotificationCenterProvider } from "@/components/ui/notification-center"
import { ToastProvider } from "@/components/ui/toast"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <NotificationCenterProvider>{children}</NotificationCenterProvider>
    </ToastProvider>
  )
}
