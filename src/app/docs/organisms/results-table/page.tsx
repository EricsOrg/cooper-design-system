"use client"

import Link from "next/link"
import * as React from "react"

import { ThemeToggle } from "@/app/docs/_components/theme-toggle"
import { Container, Section, SectionHeader } from "@/components/ds"
import {
  ResultsTable,
  type ResultsTableColumn,
  type ResultsTableSortState,
} from "@/components/ds/organisms/results-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Person = {
  id: string
  name: string
  email: string
  status: "Active" | "Invited" | "Disabled"
  createdAt: Date
}

const ALL: Person[] = Array.from({ length: 87 }).map((_, idx) => {
  const n = idx + 1
  const status: Person["status"] =
    n % 11 === 0 ? "Disabled" : n % 4 === 0 ? "Invited" : "Active"

  return {
    id: `person-${n}`,
    name: `Person ${n}`,
    email: `person${n}@example.com`,
    status,
    createdAt: new Date(Date.now() - n * 1000 * 60 * 60 * 24),
  }
})

export default function ResultsTableDocsPage() {
  const [query, setQuery] = React.useState("")
  const [page, setPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(10)
  const [sort, setSort] = React.useState<ResultsTableSortState>({
    columnId: "name",
    direction: "asc",
  })
  const [selected, setSelected] = React.useState<Set<React.Key>>(() => new Set())

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ALL
    return ALL.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q) ||
        p.status.toLowerCase().includes(q)
      )
    })
  }, [query])

  React.useEffect(() => {
    setPage(1)
  }, [query])

  const columns = React.useMemo(() => {
    const cols: ResultsTableColumn<Person>[] = [
      {
        id: "name",
        header: "Name",
        sortable: true,
        sortValue: (r) => r.name,
        cell: (r) => <span className="font-medium">{r.name}</span>,
      },
      {
        id: "email",
        header: "Email",
        sortable: true,
        sortValue: (r) => r.email,
        cell: (r) => <span className="text-muted-foreground">{r.email}</span>,
      },
      {
        id: "status",
        header: "Status",
        sortable: true,
        sortValue: (r) => r.status,
        cell: (r) => (
          <Badge
            variant={
              r.status === "Active"
                ? "default"
                : r.status === "Invited"
                  ? "secondary"
                  : "outline"
            }
          >
            {r.status}
          </Badge>
        ),
        className: "w-[140px]",
      },
      {
        id: "createdAt",
        header: "Created",
        sortable: true,
        sortValue: (r) => r.createdAt,
        cell: (r) => (
          <span className="text-muted-foreground">
            {r.createdAt.toLocaleDateString()}
          </span>
        ),
        className: "w-[140px]",
        hideable: true,
      },
    ]

    return cols
  }, [])

  return (
    <main>
      <header className="border-b">
        <Container className="flex items-center justify-between py-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Docs → Organisms</p>
            <h1 className="text-xl font-semibold tracking-tight">Results Table</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/docs/organisms">Back</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/design/organisms">/design/organisms</Link>
            </Button>
            <ThemeToggle />
          </div>
        </Container>
      </header>

      <Section>
        <Container>
          <SectionHeader
            title="Organism #2: Results Table"
            description="A power-list data table with sorting, pagination, selection + bulk actions, and basic column visibility."
          />

          <div className="mt-6 grid gap-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
                <div className="w-full sm:w-80">
                  <Input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search name, email, status…"
                    aria-label="Search people"
                  />
                </div>
                <p className="text-xs text-muted-foreground">{filtered.length} results</p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setQuery("")
                    setSelected(new Set())
                  }}
                  disabled={!query && selected.size === 0}
                >
                  Reset
                </Button>
              </div>
            </div>

            <ResultsTable<Person>
              data={filtered}
              columns={columns}
              getRowId={(r) => r.id}
              sort={sort}
              onSortChange={(next) => {
                setSort(next)
                setPage(1)
              }}
              pagination={{
                page,
                pageSize,
                totalItems: filtered.length,
                pageSizeOptions: [10, 25, 50],
                onPageChange: setPage,
                onPageSizeChange: (next) => {
                  setPageSize(next)
                  setPage(1)
                },
              }}
              enableRowSelection
              selectedRowIds={selected}
              onSelectedRowIdsChange={setSelected}
              renderBulkActionsBar={({ selectedRows, clearSelection }) => (
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      alert(`Emailing ${selectedRows.length} people (mock)`)
                      clearSelection()
                    }}
                  >
                    Email
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      alert(`Deleting ${selectedRows.length} people (mock)`)
                      clearSelection()
                    }}
                  >
                    Delete
                  </Button>
                </div>
              )}
              emptyVariant={query.trim() ? "no-results" : "empty"}
              emptyState={{
                title: "No people yet",
                description: "Add your first person to see results here.",
                action: <Button size="sm">Create person</Button>,
              }}
              noResultsState={{
                title: "No results",
                description: "Try a different search query.",
                action: (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setQuery("")}
                  >
                    Clear search
                  </Button>
                ),
              }}
            />

            <div className="rounded-lg border p-4 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Notes</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Sorting is client-side by default (set <span className="font-mono">manualSorting</span> for server-driven sorting).</li>
                <li>Pagination is optional (provide the <span className="font-mono">pagination</span> prop).</li>
                <li>Column visibility is provided via a basic Columns dropdown.</li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}
