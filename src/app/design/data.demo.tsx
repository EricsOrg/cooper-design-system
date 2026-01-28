"use client"

import * as React from "react"

import { DataTable, FilterBar } from "@/components/ds"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pagination } from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { Spinner } from "@/components/ui/spinner"

type Person = {
  id: string
  name: string
  email: string
  status: "Active" | "Invited" | "Disabled"
}

const ALL_ROWS: Person[] = Array.from({ length: 57 }).map((_, idx) => {
  const n = idx + 1
  const status: Person["status"] = n % 9 === 0 ? "Disabled" : n % 4 === 0 ? "Invited" : "Active"
  return {
    id: `p-${n}`,
    name: `Person ${n}`,
    email: `person${n}@example.com`,
    status,
  }
})

export function DataDemo() {
  const [query, setQuery] = React.useState("")
  const [page, setPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(10)
  const [loading, setLoading] = React.useState(false)
  const [progress, setProgress] = React.useState<number>(0)

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ALL_ROWS
    return ALL_ROWS.filter((r) => {
      return (
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q)
      )
    })
  }, [query])

  const totalItems = filtered.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))

  React.useEffect(() => {
    // keep page in range as filters change
    setPage((p) => Math.min(totalPages, Math.max(1, p)))
  }, [totalPages])

  const rows = React.useMemo(() => {
    const start = (page - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, page, pageSize])

  function simulateLoading() {
    if (loading) return
    setLoading(true)
    setProgress(0)

    const start = Date.now()
    const duration = 900

    const t = window.setInterval(() => {
      const pct = Math.min(100, ((Date.now() - start) / duration) * 100)
      setProgress(pct)
      if (pct >= 100) {
        window.clearInterval(t)
        // small delay so you see 100%
        window.setTimeout(() => setLoading(false), 150)
      }
    }, 60)
  }

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-4">
            {loading ? <Spinner size="sm" /> : null}
          </div>
          <p className="text-sm text-muted-foreground">
            Data suite demo: FilterBar + DataTable + Pagination, with loading + empty states.
          </p>
        </div>
        <Button size="sm" variant="outline" onClick={simulateLoading}>
          Simulate loading
        </Button>
      </div>

      {loading ? <Progress value={progress} /> : null}

      <FilterBar
        left={
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
            <div className="w-full sm:w-80">
              <Input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setPage(1)
                }}
                placeholder="Search name, email, status…"
                aria-label="Search people"
              />
            </div>
            <p className="text-xs text-muted-foreground">{totalItems} results</p>
          </div>
        }
        right={
          <>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setQuery("")
                setPage(1)
              }}
              disabled={!query}
            >
              Clear
            </Button>
          </>
        }
      />

      <DataTable<Person>
        loading={loading}
        data={rows}
        getRowKey={(r) => r.id}
        columns={[
          {
            header: "Name",
            cell: (r) => <span className="font-medium">{r.name}</span>,
          },
          {
            header: "Email",
            cell: (r) => <span className="text-muted-foreground">{r.email}</span>,
          },
          {
            header: "Status",
            cell: (r) => (
              <span
                className={
                  "inline-flex items-center rounded-full border px-2 py-0.5 text-xs " +
                  (r.status === "Active"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-300"
                    : r.status === "Invited"
                      ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-300"
                      : "border-muted bg-muted/30 text-muted-foreground")
                }
              >
                {r.status}
              </span>
            ),
            className: "w-[140px]",
          },
        ]}
        emptyState={{
          title: "No people match your filters",
          description: "Try a different search query.",
          action: (
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setQuery("")
                setPage(1)
              }}
            >
              Reset filters
            </Button>
          ),
        }}
      />

      <Pagination
        page={page}
        pageSize={pageSize}
        pageSizeOptions={[10, 25, 50]}
        onPageSizeChange={(next) => {
          setPageSize(next)
          setPage(1)
        }}
        totalItems={totalItems}
        onPageChange={setPage}
        compact
      />
    </div>
  )
}
