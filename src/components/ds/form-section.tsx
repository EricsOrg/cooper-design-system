import * as React from "react"

import { cn } from "@/lib/utils"

export type FormSectionProps = {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

/**
 * A simple organism: section title + description + a grid of fields.
 */
export function FormSection({ title, description, children, className }: FormSectionProps) {
  return (
    <section className={cn("rounded-xl border bg-card p-6 shadow-1", className)}>
      <div className="mb-4 space-y-1">
        <h3 className="text-base font-semibold tracking-tight">{title}</h3>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <div className="grid gap-4">{children}</div>
    </section>
  )
}
