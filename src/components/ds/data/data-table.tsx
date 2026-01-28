import * as React from "react"

import { cn } from "@/lib/utils"
import { EmptyState, type EmptyStateProps } from "@/components/ui/empty-state"
import { Skeleton } from "@/components/ui/skeleton"

export type DataTableColumn<T> = {
  header: React.ReactNode
  cell: (row: T) => React.ReactNode
  className?: string
}

export type DataTableProps<T> = {
  columns: Array<DataTableColumn<T>>
  data: T[]
  getRowKey?: (row: T, index: number) => React.Key
  className?: string
  loading?: boolean
  emptyState?: React.ReactNode | EmptyStateProps
  skeletonRows?: number
}

export function DataTable<T>({
  columns,
  data,
  getRowKey,
  className,
  loading = false,
  emptyState,
  skeletonRows = 6,
}: DataTableProps<T>) {
  const isEmpty = !loading && data.length === 0

  return (
    <div className={cn("w-full overflow-hidden rounded-lg border bg-card", className)}>
      <table className="w-full border-collapse text-sm">
        <thead className="bg-muted/40">
          <tr className="border-b">
            {columns.map((c, idx) => (
              <th
                key={idx}
                className={cn(
                  "px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground",
                  c.className
                )}
                scope="col"
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading
            ? Array.from({ length: skeletonRows }).map((_, i) => (
                <tr key={`sk-${i}`} className="border-b last:border-b-0">
                  {columns.map((c, idx) => (
                    <td key={idx} className={cn("px-4 py-3", c.className)}>
                      <Skeleton className="h-4 w-full" />
                    </td>
                  ))}
                </tr>
              ))
            : data.map((row, i) => (
                <tr
                  key={getRowKey ? getRowKey(row, i) : i}
                  className="border-b last:border-b-0 hover:bg-muted/20"
                >
                  {columns.map((c, idx) => (
                    <td key={idx} className={cn("px-4 py-3", c.className)}>
                      {c.cell(row)}
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>

      {isEmpty ? (
        <div className="p-4">
          {React.isValidElement(emptyState) ? (
            emptyState
          ) : emptyState ? (
            <EmptyState defaultIcon {...(emptyState as EmptyStateProps)} />
          ) : (
            <EmptyState
              defaultIcon
              title="No results"
              description="Try adjusting your filters."
            />
          )}
        </div>
      ) : null}
    </div>
  )
}
