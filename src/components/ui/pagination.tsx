import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export type PaginationProps = {
  page: number // 1-indexed
  pageSize: number
  totalItems: number
  onPageChange: (page: number) => void
  className?: string
  compact?: boolean
}

function range(start: number, end: number) {
  const out: number[] = []
  for (let i = start; i <= end; i++) out.push(i)
  return out
}

function getPages(current: number, totalPages: number) {
  if (totalPages <= 7) return range(1, totalPages)

  const pages = new Set<number>()
  pages.add(1)
  pages.add(totalPages)
  ;[current - 1, current, current + 1].forEach((p) => {
    if (p >= 1 && p <= totalPages) pages.add(p)
  })
  // keep 2 near edges
  pages.add(2)
  pages.add(totalPages - 1)

  return Array.from(pages)
    .filter((p) => p >= 1 && p <= totalPages)
    .sort((a, b) => a - b)
}

export function Pagination({
  page,
  pageSize,
  totalItems,
  onPageChange,
  className,
  compact = false,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const current = Math.min(totalPages, Math.max(1, page))

  const start = totalItems === 0 ? 0 : (current - 1) * pageSize + 1
  const end = Math.min(totalItems, current * pageSize)

  const pages = getPages(current, totalPages)

  return (
    <div
      className={cn(
        "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <p className="text-xs text-muted-foreground">
        {totalItems === 0 ? (
          "No results"
        ) : (
          <>
            Showing <span className="font-medium text-foreground">{start}</span>–
            <span className="font-medium text-foreground">{end}</span> of{" "}
            <span className="font-medium text-foreground">{totalItems}</span>
          </>
        )}
      </p>

      <nav aria-label="Pagination" className="flex items-center gap-1">
        <Button
          type="button"
          variant="outline"
          size={compact ? "sm" : "default"}
          onClick={() => onPageChange(current - 1)}
          disabled={current <= 1}
        >
          Prev
        </Button>

        <div className="flex items-center gap-1">
          {pages.map((p, idx) => {
            const prev = pages[idx - 1]
            const gap = prev != null ? p - prev : 0
            return (
              <React.Fragment key={p}>
                {idx > 0 && gap > 1 ? (
                  <span className="px-2 text-xs text-muted-foreground">…</span>
                ) : null}
                <Button
                  type="button"
                  variant={p === current ? "default" : "outline"}
                  size={compact ? "sm" : "default"}
                  onClick={() => onPageChange(p)}
                  aria-current={p === current ? "page" : undefined}
                >
                  {p}
                </Button>
              </React.Fragment>
            )
          })}
        </div>

        <Button
          type="button"
          variant="outline"
          size={compact ? "sm" : "default"}
          onClick={() => onPageChange(current + 1)}
          disabled={current >= totalPages}
        >
          Next
        </Button>
      </nav>
    </div>
  )
}
