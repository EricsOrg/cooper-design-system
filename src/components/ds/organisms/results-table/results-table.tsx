"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { EmptyState, type EmptyStateProps } from "@/components/ui/empty-state"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Pagination, type PaginationProps } from "@/components/ui/pagination"

export type ResultsTableSortDirection = "asc" | "desc"
export type ResultsTableSortState = {
  columnId: string
  direction: ResultsTableSortDirection
} | null

export type ResultsTableColumn<T> = {
  /** Unique id for column (also used for visibility & sorting). */
  id: string
  header: React.ReactNode
  cell: (row: T) => React.ReactNode
  /** Optional className for header & cell. */
  className?: string

  /** Enable client-side sorting for this column. */
  sortable?: boolean
  /** Used for client-side sorting when `sortable` is true. */
  sortValue?: (row: T) => string | number | boolean | Date | null | undefined
  /** Optional comparator overrides `sortValue` when provided. */
  sortComparator?: (a: T, b: T, direction: ResultsTableSortDirection) => number

  /** Column visibility config. */
  hideable?: boolean
  defaultVisible?: boolean
}

export type ResultsTableBulkBarRenderContext<T> = {
  selectedIds: Set<React.Key>
  selectedRows: T[]
  clearSelection: () => void
}

export type ResultsTableProps<T> = {
  columns: Array<ResultsTableColumn<T>>
  data: T[]
  getRowId: (row: T, index: number) => React.Key

  loading?: boolean
  className?: string

  /** When data is empty and not loading. */
  emptyVariant?: "empty" | "no-results"
  emptyState?: React.ReactNode | EmptyStateProps
  noResultsState?: React.ReactNode | EmptyStateProps

  /** Sorting (client-side by default). */
  sort?: ResultsTableSortState
  defaultSort?: ResultsTableSortState
  onSortChange?: (sort: ResultsTableSortState) => void
  /** If true, table will not apply sorting to `data` (assume server-sorted). */
  manualSorting?: boolean

  /** Pagination (optional). */
  pagination?: Omit<PaginationProps, "totalItems"> & { totalItems?: number }
  /** If true, table will not slice `data` (assume server-paginated). */
  manualPagination?: boolean

  /** Row selection (optional). */
  enableRowSelection?: boolean
  selectedRowIds?: Set<React.Key>
  defaultSelectedRowIds?: Set<React.Key>
  onSelectedRowIdsChange?: (next: Set<React.Key>) => void
  renderBulkActionsBar?: (ctx: ResultsTableBulkBarRenderContext<T>) => React.ReactNode

  /** Column visibility (basic). */
  enableColumnVisibility?: boolean
  columnVisibility?: Record<string, boolean>
  defaultColumnVisibility?: Record<string, boolean>
  onColumnVisibilityChange?: (next: Record<string, boolean>) => void

  /** Optional row click handler. */
  onRowClick?: (row: T, index: number) => void
}

function isEmptyStateProps(x: unknown): x is EmptyStateProps {
  if (!x || typeof x !== "object") return false
  const obj = x as Record<string, unknown>
  return "title" in obj || "description" in obj
}

function normalizeSortValue(value: unknown): string | number {
  if (value == null) return ""
  if (value instanceof Date) return value.getTime()
  if (typeof value === "boolean") return value ? 1 : 0
  if (typeof value === "number") return value
  return String(value)
}

function nextSortState(
  current: ResultsTableSortState,
  columnId: string
): ResultsTableSortState {
  if (!current || current.columnId !== columnId) {
    return { columnId, direction: "asc" }
  }
  if (current.direction === "asc") return { columnId, direction: "desc" }
  return null
}

function HeaderCheckbox({
  checked,
  indeterminate,
  onChange,
  disabled,
}: {
  checked: boolean
  indeterminate: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}) {
  const ref = React.useRef<HTMLInputElement | null>(null)

  React.useEffect(() => {
    if (!ref.current) return
    ref.current.indeterminate = indeterminate && !checked
  }, [indeterminate, checked])

  return (
    <input
      ref={ref}
      type="checkbox"
      className="h-4 w-4 accent-[hsl(var(--primary))]"
      checked={checked}
      disabled={disabled}
      onChange={(e) => onChange(e.target.checked)}
      aria-label={
        checked
          ? "Deselect all rows"
          : indeterminate
            ? "Select all rows (some already selected)"
            : "Select all rows"
      }
    />
  )
}

export function ResultsTable<T>({
  columns,
  data,
  getRowId,
  loading = false,
  className,
  emptyVariant = "empty",
  emptyState,
  noResultsState,
  sort,
  defaultSort = null,
  onSortChange,
  manualSorting = false,
  pagination,
  manualPagination = false,
  enableRowSelection = true,
  selectedRowIds,
  defaultSelectedRowIds,
  onSelectedRowIdsChange,
  renderBulkActionsBar,
  enableColumnVisibility = true,
  columnVisibility,
  defaultColumnVisibility,
  onColumnVisibilityChange,
  onRowClick,
}: ResultsTableProps<T>) {
  const isSortControlled = sort !== undefined
  const [uncontrolledSort, setUncontrolledSort] = React.useState<ResultsTableSortState>(defaultSort)
  const sortState = isSortControlled ? sort! : uncontrolledSort

  const isSelectionControlled = selectedRowIds !== undefined
  const [uncontrolledSelected, setUncontrolledSelected] = React.useState<Set<React.Key>>(
    () => defaultSelectedRowIds ?? new Set<React.Key>()
  )
  const selected = isSelectionControlled ? selectedRowIds! : uncontrolledSelected

  const isVisibilityControlled = columnVisibility !== undefined
  const [uncontrolledVisibility, setUncontrolledVisibility] = React.useState<Record<string, boolean>>(
    () => {
      if (defaultColumnVisibility) return defaultColumnVisibility
      const initial: Record<string, boolean> = {}
      columns.forEach((c) => {
        initial[c.id] = c.defaultVisible ?? true
      })
      return initial
    }
  )
  const visibility = isVisibilityControlled ? columnVisibility! : uncontrolledVisibility

  const visibleColumns = React.useMemo(() => {
    if (!enableColumnVisibility) return columns
    return columns.filter((c) => visibility[c.id] !== false)
  }, [columns, enableColumnVisibility, visibility])

  const sortedData = React.useMemo(() => {
    if (manualSorting) return data
    if (!sortState) return data

    const col = columns.find((c) => c.id === sortState.columnId)
    if (!col || !col.sortable) return data

    const dir = sortState.direction

    const withIndex = data.map((row, idx) => ({ row, idx }))

    withIndex.sort((a, b) => {
      if (col.sortComparator) return col.sortComparator(a.row, b.row, dir)

      const aFallback = (a.row as Record<string, unknown>)[col.id]
      const bFallback = (b.row as Record<string, unknown>)[col.id]

      const av = normalizeSortValue(col.sortValue ? col.sortValue(a.row) : aFallback)
      const bv = normalizeSortValue(col.sortValue ? col.sortValue(b.row) : bFallback)

      if (av < bv) return dir === "asc" ? -1 : 1
      if (av > bv) return dir === "asc" ? 1 : -1
      return a.idx - b.idx
    })

    return withIndex.map((x) => x.row)
  }, [manualSorting, data, sortState, columns])

  const totalItems = pagination?.totalItems ?? sortedData.length

  const page = pagination?.page ?? 1
  const pageSize = pagination?.pageSize ?? sortedData.length

  const pagedData = React.useMemo(() => {
    if (!pagination) return sortedData
    if (manualPagination) return sortedData
    const start = (Math.max(1, page) - 1) * Math.max(1, pageSize)
    return sortedData.slice(start, start + pageSize)
  }, [sortedData, pagination, manualPagination, page, pageSize])

  const pagedRowIds = React.useMemo(() => {
    return pagedData.map((row, i) => getRowId(row, i))
  }, [pagedData, getRowId])

  const selectedRows = React.useMemo(() => {
    if (!enableRowSelection) return []
    const byId = new Map<React.Key, T>()
    data.forEach((row, i) => {
      byId.set(getRowId(row, i), row)
    })
    return Array.from(selected).map((id) => byId.get(id)).filter(Boolean) as T[]
  }, [enableRowSelection, data, getRowId, selected])

  function setSelected(next: Set<React.Key>) {
    if (!isSelectionControlled) setUncontrolledSelected(next)
    onSelectedRowIdsChange?.(next)
  }

  function toggleRow(id: React.Key, checked: boolean) {
    const next = new Set(selected)
    if (checked) next.add(id)
    else next.delete(id)
    setSelected(next)
  }

  function toggleAllOnPage(checked: boolean) {
    const next = new Set(selected)
    if (checked) {
      pagedRowIds.forEach((id) => next.add(id))
    } else {
      pagedRowIds.forEach((id) => next.delete(id))
    }
    setSelected(next)
  }

  const pageSelectedCount = React.useMemo(() => {
    if (!enableRowSelection) return 0
    return pagedRowIds.reduce<number>((acc, id) => acc + (selected.has(id) ? 1 : 0), 0)
  }, [enableRowSelection, pagedRowIds, selected])

  const allOnPageSelected = enableRowSelection && pagedRowIds.length > 0 && pageSelectedCount === pagedRowIds.length
  const someOnPageSelected = enableRowSelection && pageSelectedCount > 0 && pageSelectedCount < pagedRowIds.length

  function setVisibility(next: Record<string, boolean>) {
    if (!isVisibilityControlled) setUncontrolledVisibility(next)
    onColumnVisibilityChange?.(next)
  }

  const emptyContent = React.useMemo(() => {
    const src = emptyVariant === "no-results" ? noResultsState : emptyState
    if (React.isValidElement(src)) return src
    if (src && isEmptyStateProps(src)) return <EmptyState defaultIcon {...src} />

    return (
      <EmptyState
        defaultIcon
        title={emptyVariant === "no-results" ? "No results" : "Nothing here yet"}
        description={
          emptyVariant === "no-results"
            ? "Try adjusting your filters."
            : "When you have data, it will show up here."
        }
      />
    )
  }, [emptyVariant, emptyState, noResultsState])

  const showEmpty = !loading && data.length === 0

  return (
    <div className={cn("grid gap-3", className)}>
      {enableRowSelection && selected.size > 0 ? (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border bg-muted/30 px-3 py-2">
          <div className="text-sm">
            <span className="font-medium">{selected.size}</span> selected
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="ml-2"
              onClick={() => setSelected(new Set())}
            >
              Clear
            </Button>
          </div>
          {renderBulkActionsBar ? (
            <div>
              {renderBulkActionsBar({
                selectedIds: selected,
                selectedRows,
                clearSelection: () => setSelected(new Set()),
              })}
            </div>
          ) : null}
        </div>
      ) : null}

      <div className={cn("w-full overflow-hidden rounded-lg border bg-card")}
      >
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-muted/40">
              <tr className="border-b">
                {enableRowSelection ? (
                  <th className="w-10 px-3 py-3 text-left" scope="col">
                    <HeaderCheckbox
                      checked={allOnPageSelected}
                      indeterminate={someOnPageSelected}
                      onChange={toggleAllOnPage}
                      disabled={loading || pagedRowIds.length === 0}
                    />
                  </th>
                ) : null}

                {visibleColumns.map((c) => {
                  const isSorted = sortState?.columnId === c.id
                  const canSort = !!c.sortable

                  return (
                    <th
                      key={c.id}
                      scope="col"
                      className={cn(
                        "px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground",
                        c.className
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {canSort ? (
                          <button
                            type="button"
                            className={cn(
                              "inline-flex items-center gap-1 rounded-sm text-left hover:text-foreground",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            )}
                            onClick={() => {
                              const next = nextSortState(sortState, c.id)
                              if (!isSortControlled) setUncontrolledSort(next)
                              onSortChange?.(next)
                            }}
                            aria-label={
                              isSorted
                                ? `Toggle sort for ${String(c.header)} (currently ${sortState?.direction})`
                                : `Sort by ${String(c.header)}`
                            }
                          >
                            <span>{c.header}</span>
                            <span className="text-[11px] text-muted-foreground">
                              {isSorted ? (sortState?.direction === "asc" ? "▲" : "▼") : "⇅"}
                            </span>
                          </button>
                        ) : (
                          <span>{c.header}</span>
                        )}

                        {enableColumnVisibility && c.hideable !== false && c.id === visibleColumns[visibleColumns.length - 1]?.id ? (
                          <div className="ml-auto">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button type="button" variant="ghost" size="sm">
                                  Columns
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>Columns</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {columns
                                  .filter((col) => col.hideable !== false)
                                  .map((col) => {
                                    const checked = visibility[col.id] !== false
                                    return (
                                      <DropdownMenuCheckboxItem
                                        key={col.id}
                                        checked={checked}
                                        onCheckedChange={(v) => {
                                          setVisibility({
                                            ...visibility,
                                            [col.id]: Boolean(v),
                                          })
                                        }}
                                      >
                                        {col.header}
                                      </DropdownMenuCheckboxItem>
                                    )
                                  })}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        ) : null}
                      </div>
                    </th>
                  )
                })}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                Array.from({ length: pagination ? Math.min(6, pageSize) : 6 }).map((_, i) => (
                  <tr key={`sk-${i}`} className="border-b last:border-b-0">
                    {enableRowSelection ? (
                      <td className="px-3 py-3">
                        <div className="h-4 w-4 rounded bg-muted animate-pulse" />
                      </td>
                    ) : null}
                    {visibleColumns.map((c) => (
                      <td key={c.id} className={cn("px-4 py-3", c.className)}>
                        <div className="h-4 w-full rounded bg-muted animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : showEmpty ? (
                <tr className="border-b last:border-b-0">
                  <td
                    colSpan={visibleColumns.length + (enableRowSelection ? 1 : 0)}
                    className="p-6"
                  >
                    {emptyContent}
                  </td>
                </tr>
              ) : (
                pagedData.map((row, idx) => {
                  const rowId = getRowId(row, idx)
                  const checked = enableRowSelection ? selected.has(rowId) : false
                  const clickable = typeof onRowClick === "function"

                  return (
                    <tr
                      key={rowId}
                      className={cn(
                        "border-b last:border-b-0",
                        clickable && "cursor-pointer hover:bg-muted/20"
                      )}
                      onClick={
                        clickable
                          ? (event) => {
                              const target = event.target as HTMLElement | null
                              if (target?.closest("button,a,input,select,textarea,label,[role='button']")) {
                                return
                              }
                              onRowClick?.(row, idx)
                            }
                          : undefined
                      }
                    >
                      {enableRowSelection ? (
                        <td className="w-10 px-3 py-3">
                          <input
                            type="checkbox"
                            className="h-4 w-4 accent-[hsl(var(--primary))]"
                            checked={checked}
                            onChange={(e) => toggleRow(rowId, e.target.checked)}
                            aria-label={checked ? "Deselect row" : "Select row"}
                          />
                        </td>
                      ) : null}

                      {visibleColumns.map((c) => (
                        <td key={c.id} className={cn("px-4 py-3", c.className)}>
                          {c.cell(row)}
                        </td>
                      ))}
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pagination ? (
        <Pagination
          {...pagination}
          totalItems={totalItems}
          compact
        />
      ) : null}
    </div>
  )
}
