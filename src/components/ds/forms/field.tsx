import * as React from "react"

import { cn } from "@/lib/utils"

export type FormFieldProps = {
  label: string
  htmlFor: string
  hint?: string
  error?: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

/**
 * Minimal field wrapper: label + control + hint/error.
 * Keeps patterns consistent across the system.
 */
export function FormField({
  label,
  htmlFor,
  hint,
  error,
  required,
  children,
  className,
}: FormFieldProps) {
  const describedBy = [hint ? `${htmlFor}-hint` : null, error ? `${htmlFor}-error` : null]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={cn("grid gap-2", className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
        {required ? <span className="text-destructive"> *</span> : null}
      </label>

      {/* We attach aria-describedby to the *first* focusable element in the child slot via clone when possible */}
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
            "aria-describedby": describedBy || undefined,
            "aria-invalid": Boolean(error) || undefined,
          })
        : children}

      {hint ? (
        <p id={`${htmlFor}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={`${htmlFor}-error`} className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}
