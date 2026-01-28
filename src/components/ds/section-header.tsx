import * as React from "react";

import { cn } from "@/lib/utils";

export type SectionHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  className,
  title,
  description,
  align = "left",
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "space-y-2",
        align === "center" && "text-center",
        className,
      )}
      {...props}
    >
      <h2 className="text-pretty text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="text-pretty text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
