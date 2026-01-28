import * as React from "react"

import { cn } from "@/lib/utils"

export type SpinnerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: "sm" | "md" | "lg"
}

const sizeMap: Record<NonNullable<SpinnerProps["size"]>, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-5 w-5 border-2",
  lg: "h-7 w-7 border-[3px]",
}

export function Spinner({ className, size = "md", ...props }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        "inline-block animate-spin rounded-full border-muted-foreground/30 border-t-muted-foreground",
        sizeMap[size],
        className
      )}
      {...props}
    />
  )
}
