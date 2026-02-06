import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import type { LucideIcon, LucideProps } from "lucide-react"

import { cn } from "@/lib/utils"

const iconVariants = cva("inline-block shrink-0", {
  variants: {
    size: {
      xs: "size-3",
      sm: "size-4",
      md: "size-5",
      lg: "size-6",
      xl: "size-8",
    },
  },
  defaultVariants: {
    size: "sm",
  },
})

type IconProps = Omit<LucideProps, "size"> &
  VariantProps<typeof iconVariants> & {
    icon: LucideIcon
  }

function Icon({ icon: IconComponent, size, className, ...props }: IconProps) {
  return (
    <IconComponent
      aria-hidden={props["aria-hidden"] ?? true}
      focusable="false"
      className={cn(iconVariants({ size, className }))}
      {...props}
    />
  )
}

export { Icon, iconVariants }
