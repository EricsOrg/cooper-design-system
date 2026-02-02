"use client";

import Link from "next/link";
import * as React from "react";

import { ThemeToggle } from "@/app/docs/_components/theme-toggle";
import {
  QueryRail,
  type QueryRailFacet,
  type QueryRailSelection,
} from "@/components/ds/organisms/query-rail";
import { Container, Section, SectionHeader } from "@/components/ds";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FACETS: QueryRailFacet[] = [
  {
    id: "status",
    label: "Status",
    options: [
      { value: "open", label: "Open", count: 12 },
      { value: "in_progress", label: "In progress", count: 4 },
      { value: "blocked", label: "Blocked", count: 2 },
      { value: "closed", label: "Closed", count: 18 },
    ],
  },
  {
    id: "owner",
    label: "Owner",
    description: "Example facet with descriptions.",
    options: [
      { value: "alex", label: "Alex", description: "Product" },
      { value: "sam", label: "Sam", description: "Design" },
      { value: "taylor", label: "Taylor", description: "Engineering" },
    ],
  },
  {
    id: "priority",
    label: "Priority",
    options: [
      { value: "p0", label: "P0" },
      { value: "p1", label: "P1" },
      { value: "p2", label: "P2" },
    ],
  },
];

export default function QueryRailDocsPage() {
  const [query, setQuery] = React.useState("");
  const [selection, setSelection] = React.useState<QueryRailSelection>({
    status: ["open"],
  });

  return (
    <main>
      <header className="border-b">
        <Container className="flex items-center justify-between py-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Docs / Organisms</p>
            <h1 className="text-xl font-semibold tracking-tight">QueryRail</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/docs/organisms">Back</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/design">/design</Link>
            </Button>
            <ThemeToggle />
          </div>
        </Container>
      </header>

      <Section>
        <Container>
          <SectionHeader
            title="Query Rail (smart filter panel)"
            description="Search + faceted filters + active chips + clear all. Responsive: dialog on mobile, rail on desktop."
          />

          <div className="mt-6 grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Demo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-[320px_1fr]">
                  <QueryRail
                    query={query}
                    onQueryChange={setQuery}
                    facets={FACETS}
                    selection={selection}
                    onSelectionChange={setSelection}
                    onClearAll={() => {
                      setQuery("");
                      setSelection({});
                    }}
                    variant="default"
                  />

                  <div className="space-y-3">
                    <div className="rounded-2xl border bg-surface p-4 text-surface-foreground">
                      <p className="text-sm font-semibold tracking-tight">Results (stub)</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        This is just a demo area. Wire QueryRail to your data-fetching layer to drive results.
                      </p>
                      <div className="mt-4 grid gap-2 text-sm">
                        <div>
                          <span className="font-medium">Query:</span> {query || "(empty)"}
                        </div>
                        <div className="space-y-2">
                          <span className="font-medium">Selection:</span>
                          <pre className="max-w-full overflow-auto rounded-md bg-muted p-3 text-xs">
{JSON.stringify(selection, null, 2)}
                          </pre>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">mobile dialog</Badge>
                      <Badge variant="secondary">desktop rail</Badge>
                      <Badge variant="secondary">controlled state</Badge>
                      <Badge variant="secondary">token-driven</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Variant: branded</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-[320px_1fr]">
                  <QueryRail
                    query={query}
                    onQueryChange={setQuery}
                    facets={FACETS}
                    selection={selection}
                    onSelectionChange={setSelection}
                    variant="branded"
                  />
                  <div className="rounded-2xl border bg-surface p-4 text-sm text-muted-foreground">
                    Use <span className="font-mono">variant=&quot;branded&quot;</span> to apply a subtle
                    primary-tinted surface. Teams can also layer additional styles via
                    <span className="font-mono"> className</span>.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </main>
  );
}
