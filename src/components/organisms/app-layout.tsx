"use client"

import * as React from "react"

import { AppShell, type AppShellProps } from "@/components/ds/navigation/app-shell"
import { cn } from "@/lib/utils"

export type AppLayoutProps = Omit<AppShellProps, "children"> & {
  /** Page content. Usually a <Container> + sections. */
  children: React.ReactNode
  /** Optional per-page header area (inside the main region). */
  pageHeader?: React.ReactNode
  /** Optional page chrome wrapper className. */
  contentClassName?: string
}

/**
 * AppLayout is an *organism* wrapper over AppShell.
 *
 * Goal: standardize app chrome + provide a consistent place for page headers,
 * without forcing apps into one-off layouts.
 */
export function AppLayout({
  children,
  pageHeader,
  contentClassName,
  ...shell
}: AppLayoutProps) {
  return (
    <AppShell {...shell}>
      <div className={cn("min-h-0", contentClassName)}>
        {pageHeader ? <div className="border-b">{pageHeader}</div> : null}
        <div className="p-4 sm:p-6">{children}</div>
      </div>
    </AppShell>
  )
}
