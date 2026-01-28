import * as React from "react";

import { cn } from "@/lib/utils";

export type SidebarProps = React.HTMLAttributes<HTMLElement> & {
  /**
   * "sidebar" shows icon + label; "rail" shows icon-only.
   */
  variant?: "sidebar" | "rail";
  label?: string;
};

export function Sidebar({
  variant = "sidebar",
  label = "Primary",
  className,
  children,
  ...props
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "h-full border-r bg-card",
        variant === "sidebar" && "w-64",
        variant === "rail" && "w-16",
        className,
      )}
      {...props}
    >
      <nav aria-label={label} className="h-full p-2">
        <div className={cn("grid gap-1", variant === "rail" && "justify-items-center")}>
          {children}
        </div>
      </nav>
    </aside>
  );
}
