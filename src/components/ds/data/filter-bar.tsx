import * as React from "react"

import { cn } from "@/lib/utils"

export type FilterBarProps = React.HTMLAttributes<HTMLDivElement> & {
  left?: React.ReactNode
  right?: React.ReactNode
}

export function FilterBar({ className, left, right, ...props }: FilterBarProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-lg border bg-card p-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2">{left}</div>
      <div className="flex shrink-0 items-center gap-2">{right}</div>
    </div>
  )
}
