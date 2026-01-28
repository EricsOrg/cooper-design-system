import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type Feature = {
  title: string;
  description: string;
};

export type FeatureGridProps = React.HTMLAttributes<HTMLDivElement> & {
  features: Feature[];
  columns?: 2 | 3 | 4;
};

export function FeatureGrid({
  className,
  features,
  columns = 3,
  ...props
}: FeatureGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4 sm:gap-6",
        columns === 2 && "sm:grid-cols-2",
        columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
      {...props}
    >
      {features.map((f) => (
        <Card key={f.title} className="bg-card">
          <CardHeader>
            <CardTitle className="text-base">{f.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{f.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
