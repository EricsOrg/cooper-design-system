"use client"

import Link from "next/link"
import * as React from "react"

import { ThemeToggle } from "@/app/docs/_components/theme-toggle"
import { Breadcrumbs, Container, NavItem, AppHeader } from "@/components/ds"
import { AppLayout, DataTablePage } from "@/components/organisms"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Spinner } from "@/components/ui/spinner"
import {
  Home,
  LayoutDashboard,
  Settings,
  Users,
  FileText,
  HelpCircle,
  LayoutTemplate,
} from "lucide-react"

type Person = {
  id: string
  name: string
  email: string
  status: "Active" | "Invited" | "Disabled"
}

const ALL_ROWS: Person[] = Array.from({ length: 57 }).map((_, idx) => {
  const n = idx + 1
  const status: Person["status"] =
    n % 9 === 0 ? "Disabled" : n % 4 === 0 ? "Invited" : "Active"
  return {
    id: `p-${n}`,
    name: `Person ${n}`,
    email: `person${n}@example.com`,
    status,
  }
})

export default function OrganismsDemoPage() {
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
        window.setTimeout(() => setLoading(false), 150)
      }
    }, 60)
  }

  return (
    <AppLayout
      useRailOnDesktop
      header={
        <AppHeader
          title={
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-brand text-brand-foreground">
                C
              </span>
              <span className="truncate">Cooper</span>
            </div>
          }
          breadcrumbs={
            <Breadcrumbs
              items={[
                { label: "Design", href: "/design" },
                { label: "Organisms" },
              ]}
            />
          }
          actions={
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/design">Catalog</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/docs/organisms">Docs</Link>
              </Button>
              <ThemeToggle />
            </div>
          }
        />
      }
      sidebar={
        <>
          <NavItem href="/" label="Home" icon={<Home className="h-4 w-4" />} />
          <NavItem
            href="/design/organisms"
            label="Organisms"
            icon={<LayoutTemplate className="h-4 w-4" />}
            active
          />
          <NavItem href="#" label="Dashboard" icon={<LayoutDashboard className="h-4 w-4" />} />
          <NavItem href="#" label="Team" icon={<Users className="h-4 w-4" />} />
          <NavItem href="#" label="Reports" icon={<FileText className="h-4 w-4" />} />

          <div className="my-2 h-px w-full bg-border" />

          <NavItem href="#" label="Settings" icon={<Settings className="h-4 w-4" />} />
          <NavItem href="#" label="Help" icon={<HelpCircle className="h-4 w-4" />} />
        </>
      }
      navRail={
        <>
          <NavItem rail href="/" label="Home" icon={<Home className="h-4 w-4" />} />
          <NavItem
            rail
            href="/design/organisms"
            label="Organisms"
            icon={<LayoutTemplate className="h-4 w-4" />}
            active
          />
          <NavItem rail href="#" label="Dashboard" icon={<LayoutDashboard className="h-4 w-4" />} />
          <NavItem rail href="#" label="Team" icon={<Users className="h-4 w-4" />} />
          <NavItem rail href="#" label="Reports" icon={<FileText className="h-4 w-4" />} />
          <div className="my-2 h-px w-full bg-border" />
          <NavItem rail href="#" label="Settings" icon={<Settings className="h-4 w-4" />} />
          <NavItem rail href="#" label="Help" icon={<HelpCircle className="h-4 w-4" />} />
        </>
      }
      pageHeader={
        <Container className="py-8">
          <h1 className="text-2xl font-semibold tracking-tight">Organisms</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Higher-level compositions that prove real UI patterns. This page demos
            the first two: <span className="font-medium">AppLayout</span> and{" "}
            <span className="font-medium">DataTablePage</span>.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Button size="sm" variant="outline" onClick={simulateLoading}>
              Simulate loading
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-4">{loading ? <Spinner size="sm" /> : null}</div>
              <span>Token-driven + themeable + responsive.</span>
            </div>
          </div>
          {loading ? <div className="mt-4"><Progress value={progress} /></div> : null}
        </Container>
      }
    >
      <Container>
        <DataTablePage<Person>
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
          emptyState={
            query
              ? {
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
                }
              : undefined
          }
          filters={
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
          actions={
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
          }
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          pageSizeOptions={[10, 25, 50]}
          onPageChange={setPage}
          onPageSizeChange={(next) => {
            setPageSize(next)
            setPage(1)
          }}
        />
      </Container>
    </AppLayout>
  )
}
