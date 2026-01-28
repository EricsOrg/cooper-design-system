import * as React from "react"

import { cn } from "@/lib/utils"

export type EmptyStateProps = {
  title: string
  description?: string
  icon?: React.ReactNode
  /** Render a subtle default decorative icon when `icon` is not provided. */
  defaultIcon?: boolean
  action?: React.ReactNode
  className?: string
}

export function EmptyStateDefaultIcon(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("opacity-70", props.className)}
    >
      <path
        d="M4.5 6.75A2.25 2.25 0 0 1 6.75 4.5h10.5A2.25 2.25 0 0 1 19.5 6.75v10.5A2.25 2.25 0 0 1 17.25 19.5H6.75A2.25 2.25 0 0 1 4.5 17.25V6.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7.5 9h9M7.5 12h6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function EmptyState({
  title,
  description,
  icon,
  defaultIcon = false,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-lg border bg-card p-8 text-center",
        className
      )}
    >
      {icon ? (
        <div className="text-muted-foreground">{icon}</div>
      ) : defaultIcon ? (
        <div className="text-muted-foreground">
          <EmptyStateDefaultIcon />
        </div>
      ) : null}
      <p className="text-sm font-medium">{title}</p>
      {description ? (
        <p className="max-w-prose text-sm text-muted-foreground">{description}</p>
      ) : null}
      {action ? <div className="pt-2">{action}</div> : null}
    </div>
  )
}
