import * as React from "react"

import { cn } from "@/lib/utils"

export type ProgressProps = React.HTMLAttributes<HTMLDivElement> & {
  value?: number
}

export function Progress({ className, value = 0, ...props }: ProgressProps) {
  const v = Math.min(100, Math.max(0, value))
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(v)}
      className={cn("h-2 w-full overflow-hidden rounded-full bg-muted", className)}
      {...props}
    >
      <div
        className="h-full bg-brand transition-[width] duration-300"
        style={{ width: `${v}%` }}
      />
    </div>
  )
}
