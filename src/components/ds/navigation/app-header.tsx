import * as React from "react";

import { cn } from "@/lib/utils";

export type AppHeaderProps = React.HTMLAttributes<HTMLElement> & {
  title?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
  /** Optional actions on the right side (buttons, profile, etc.) */
  actions?: React.ReactNode;
  /** Optional left-side control (e.g., mobile menu button) */
  navButton?: React.ReactNode;
};

export function AppHeader({
  title,
  breadcrumbs,
  actions,
  navButton,
  className,
  ...props
}: AppHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className,
      )}
      {...props}
    >
      <a
        href="#main-content"
        className={cn(
          "sr-only focus:not-sr-only",
          "absolute left-3 top-3 rounded-md bg-background px-3 py-2 text-sm",
          "border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        )}
      >
        Skip to content
      </a>

      <div className="flex items-center gap-3 px-4 py-3">
        {navButton ? <div className="shrink-0">{navButton}</div> : null}

        <div className="min-w-0 flex-1">
          {title ? (
            <div className="truncate text-sm font-semibold tracking-tight">{title}</div>
          ) : null}
          {breadcrumbs ? <div className="mt-0.5 min-w-0">{breadcrumbs}</div> : null}
        </div>

        {actions ? <div className="shrink-0">{actions}</div> : null}
      </div>
    </header>
  );
}
