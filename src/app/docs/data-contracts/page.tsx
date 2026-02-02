import Link from "next/link"

import { ThemeToggle } from "@/app/docs/_components/theme-toggle"
import { Container, Section, SectionHeader } from "@/components/ds"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DataContractsDocsPage() {
  return (
    <main>
      <header className="border-b">
        <Container className="flex items-center justify-between py-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Docs</p>
            <h1 className="text-xl font-semibold tracking-tight">Data contracts</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/docs">Back to /docs</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/docs/organisms">Organisms</Link>
            </Button>
            <ThemeToggle />
          </div>
        </Container>
      </header>

      <Section>
        <Container>
          <SectionHeader
            title="Standard interface between UI + data"
            description="Every organism that touches data should declare (1) what it needs, (2) what it renders, and (3) what it emits. Default pagination is offset/page-based."
          />

          <div className="mt-6 grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Pagination (default)</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2 text-sm text-muted-foreground">
                <p>
                  We standardize on <span className="font-mono">page</span> (1-indexed),{" "}
                  <span className="font-mono">pageSize</span>, and{" "}
                  <span className="font-mono">totalItems</span>. This is URL-friendly and supports
                  jump-to-page.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data contract shape</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <p className="text-muted-foreground">
                  Type lives at <span className="font-mono">src/types/data-contract.ts</span>.
                </p>
                <div className="rounded-md border bg-muted/20 p-4 font-mono text-xs whitespace-pre-wrap">
{`type DataContract<TQuery, TRow, TAction extends string = string> = {
  inputs: {
    query: TQuery
    pagination: { page: number; pageSize: number; totalItems: number }
    capabilities?: Record<string, boolean>
  }
  outputs: { rows: TRow[]; state: "idle" | "loading" | "ready" | "empty" | "error" }
  emits: {
    onQueryChange?: (next: TQuery) => void
    onPageChange?: (page: number) => void
    onPageSizeChange?: (pageSize: number) => void
    onRowAction?: (action: TAction, row: TRow) => void
    onBulkAction?: (action: TAction, rowIds: string[]) => void
  }
}`}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Example: DataTablePage query</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <div className="rounded-md border bg-muted/20 p-4 font-mono text-xs whitespace-pre-wrap">
{`type PeopleQuery = {
  search?: string
  status?: "Active" | "Invited" | "Disabled"
  sort?: { key: "name" | "email" | "status"; dir: "asc" | "desc" }
}

// Inputs
{
  query: { search: "eric" },
  pagination: { page: 1, pageSize: 25, totalItems: 57 },
  capabilities: { canInvite: true, canDisable: true }
}

// Emits
onQueryChange(nextQuery)
onPageChange(nextPage)
onRowAction("invite", row)`}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cursor APIs (escape hatch)</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2 text-sm text-muted-foreground">
                <p>
                  If a backend is cursor-based, we either:
                </p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>map cursor -&gt; offset at the data layer (preferred for UI consistency), or</li>
                  <li>introduce a dedicated cursor organism later (e.g. infinite scroll).</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </main>
  )
}
