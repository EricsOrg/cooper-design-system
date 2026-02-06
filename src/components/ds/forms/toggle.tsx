import * as React from "react"

import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"

type ToggleProps = {
  id: string
  label: string
  description?: string
  className?: string
} & Omit<React.ComponentProps<typeof Switch>, "id" | "type">

export function Toggle({
  id,
  label,
  description,
  className,
  ...props
}: ToggleProps) {
  const descriptionId = description ? `${id}-description` : undefined

  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 rounded-md border bg-background px-3 py-2 text-sm shadow-sm",
        className
      )}
    >
      <div className="grid gap-0.5">
        <label htmlFor={id} className="font-medium leading-5">
          {label}
        </label>
        {description ? (
          <span id={descriptionId} className="text-xs text-muted-foreground">
            {description}
          </span>
        ) : null}
      </div>
      <Switch id={id} aria-describedby={descriptionId} {...props} />
    </div>
  )
}
