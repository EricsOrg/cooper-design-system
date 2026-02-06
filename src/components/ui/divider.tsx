import * as React from "react"

import { cn } from "@/lib/utils"

type DividerProps = React.ComponentPropsWithoutRef<"hr"> & {
  orientation?: "horizontal" | "vertical"
}

function Divider({
  className,
  orientation = "horizontal",
  ...props
}: DividerProps) {
  return (
    <hr
      role="separator"
      aria-orientation={orientation}
      data-orientation={orientation}
      className={cn(
        "shrink-0 bg-border border-0",
        orientation === "horizontal" ? "h-px w-full" : "w-px h-full",
        className
      )}
      {...props}
    />
  )
}

export { Divider }
