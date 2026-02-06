import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const switchVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer appearance-none rounded-full border border-transparent bg-muted transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 before:absolute before:content-[''] before:rounded-full before:bg-background before:shadow-sm before:transition-transform checked:bg-primary",
  {
    variants: {
      size: {
        default:
          "h-6 w-11 before:left-0.5 before:top-0.5 before:h-5 before:w-5 checked:before:translate-x-5",
        sm: "h-5 w-9 before:left-0.5 before:top-0.5 before:h-4 before:w-4 checked:before:translate-x-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const Switch = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<"input"> & VariantProps<typeof switchVariants>
>(({ className, size, type = "checkbox", ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    role="switch"
    data-slot="switch"
    className={cn(switchVariants({ size, className }))}
    {...props}
  />
))
Switch.displayName = "Switch"

export { Switch, switchVariants }
