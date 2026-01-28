import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type CTAProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  description?: string;
  href: string;
  ctaLabel?: string;
  variant?: "default" | "secondary" | "outline";
};

export function CTA({
  className,
  title,
  description,
  href,
  ctaLabel = "Get started",
  variant = "default",
  ...props
}: CTAProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-surface text-surface-foreground",
        "p-6 sm:p-8",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-lg font-semibold tracking-tight">{title}</p>
          {description ? (
            <p className="text-muted-foreground">{description}</p>
          ) : null}
        </div>
        <Button asChild variant={variant} className="sm:shrink-0">
          <Link href={href}>{ctaLabel}</Link>
        </Button>
      </div>
    </div>
  );
}
