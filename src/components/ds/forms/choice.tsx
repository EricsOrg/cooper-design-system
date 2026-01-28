import * as React from "react"

import { cn } from "@/lib/utils"

type ChoiceBaseProps = {
  id: string
  label: string
  description?: string
  className?: string
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "type">

function Choice({
  id,
  label,
  description,
  className,
  type,
  ...props
}: ChoiceBaseProps & { type: "checkbox" | "radio" }) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex items-start gap-3 rounded-md border bg-background px-3 py-2 text-sm shadow-sm",
        "transition hover:bg-muted/30",
        className
      )}
    >
      <input
        id={id}
        type={type}
        className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]"
        {...props}
      />
      <span className="grid gap-0.5">
        <span className="font-medium leading-5">{label}</span>
        {description ? (
          <span className="text-xs text-muted-foreground">{description}</span>
        ) : null}
      </span>
    </label>
  )
}

export function Checkbox(props: ChoiceBaseProps) {
  return <Choice {...props} type="checkbox" />
}

export function Radio(props: ChoiceBaseProps) {
  return <Choice {...props} type="radio" />
}
