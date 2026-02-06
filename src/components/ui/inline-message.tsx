import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inlineMessageVariants = cva(
  "inline-flex items-center gap-2 rounded-md border px-2.5 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "border-border/60 bg-muted/40 text-foreground",
        success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-200",
        warning: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-200",
        destructive: "border-destructive/30 bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type InlineMessageProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof inlineMessageVariants> & {
    icon?: React.ReactNode
  }

function InlineMessage({
  className,
  variant,
  icon,
  children,
  ...props
}: InlineMessageProps) {
  return (
    <div
      data-slot="inline-message"
      className={cn(inlineMessageVariants({ variant, className }))}
      {...props}
    >
      {icon ? <span className="text-base leading-none">{icon}</span> : null}
      <span>{children}</span>
    </div>
  )
}

export { InlineMessage, inlineMessageVariants }
