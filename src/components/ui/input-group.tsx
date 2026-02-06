import * as React from "react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

function InputGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="input-group"
      className={cn(
        "flex w-full items-stretch overflow-hidden rounded-md border border-input bg-transparent shadow-xs transition-[color,box-shadow]",
        "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
        "has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50",
        "has-[input[aria-invalid='true']]:border-destructive has-[input[aria-invalid='true']]:ring-destructive/20",
        className
      )}
      {...props}
    />
  )
}

function InputGroupPrefix({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="input-group-prefix"
      className={cn(
        "inline-flex items-center border-r border-input bg-muted/30 px-3 text-sm text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function InputGroupSuffix({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="input-group-suffix"
      className={cn(
        "inline-flex items-center border-l border-input bg-muted/30 px-3 text-sm text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="input-group-input"
      className={cn(
        "h-9 flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:border-0 aria-invalid:ring-0 aria-invalid:border-0",
        className
      )}
      {...props}
    />
  )
}

export { InputGroup, InputGroupPrefix, InputGroupSuffix, InputGroupInput }
