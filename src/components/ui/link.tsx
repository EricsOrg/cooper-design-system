import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const linkVariants = cva(
  "inline-flex items-center gap-1 font-medium underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-primary hover:underline",
        muted: "text-muted-foreground hover:text-foreground hover:underline",
        destructive: "text-destructive hover:underline",
        ghost: "text-foreground/80 hover:text-foreground",
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
)

type LinkProps = React.ComponentPropsWithoutRef<"a"> &
  VariantProps<typeof linkVariants> & {
    asChild?: boolean
  }

function Link({ className, variant, size, asChild, ...props }: LinkProps) {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      data-slot="link"
      className={cn(linkVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Link, linkVariants }
