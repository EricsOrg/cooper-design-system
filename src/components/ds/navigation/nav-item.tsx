import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export type NavItemProps = {
  href: string;
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  /**
   * When true, render in a compact (nav-rail) mode.
   * Labels are visually hidden but remain accessible to screen readers.
   */
  rail?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export function NavItem({
  href,
  label,
  icon,
  active,
  disabled,
  rail,
  className,
  onClick,
}: NavItemProps) {
  const base = cn(
    "group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    disabled
      ? "pointer-events-none opacity-50"
      : "hover:bg-accent hover:text-accent-foreground",
    active
      ? "bg-accent text-accent-foreground"
      : "text-muted-foreground",
    rail && "justify-center px-2",
    className,
  );

  // Always include an accessible label, even when visually hidden.
  const labelNode = rail ? (
    <span className="sr-only">{label}</span>
  ) : (
    <span className="truncate">{label}</span>
  );

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      aria-disabled={disabled ? true : undefined}
      tabIndex={disabled ? -1 : 0}
      className={base}
      onClick={onClick}
      title={rail ? label : undefined}
    >
      {icon ? (
        <span
          aria-hidden="true"
          className={cn(
            "shrink-0 text-muted-foreground transition-colors group-hover:text-foreground",
            active && "text-foreground",
          )}
        >
          {icon}
        </span>
      ) : null}
      {labelNode}
    </Link>
  );
}
