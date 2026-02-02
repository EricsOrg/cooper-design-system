"use client"

import * as React from "react"

import { FilterBar } from "@/components/ds/data/filter-bar"
import { DataTable, type DataTableColumn } from "@/components/ds/data/data-table"
import { Pagination } from "@/components/ui/pagination"

export type DataTablePageProps<T> = {
  /** Left side of the filter bar (usually search + result count). */
  filters?: React.ReactNode
  /** Right side of the filter bar (usually actions). */
  actions?: React.ReactNode

  data: T[]
  columns: DataTableColumn<T>[]
  getRowKey: (row: T) => string

  loading?: boolean
  emptyState?: {
    title: string
    description?: string
    action?: React.ReactNode
  }

  page: number
  pageSize: number
  totalItems: number
  pageSizeOptions?: number[]
  onPageChange: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void

  /** Optional content above the filter bar (status text, progress, etc). */
  header?: React.ReactNode
  /** Optional content below pagination. */
  footer?: React.ReactNode
}

/**
 * DataTablePage is an organism that composes:
 * FilterBar + DataTable + Pagination (+ optional header/footer).
 */
export function DataTablePage<T>({
  header,
  filters,
  actions,
  data,
  columns,
  getRowKey,
  loading,
  emptyState,
  page,
  pageSize,
  totalItems,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
  footer,
}: DataTablePageProps<T>) {
  return (
    <div className="grid gap-4">
      {header ? <div>{header}</div> : null}

      <FilterBar left={filters} right={actions} />

      <DataTable<T>
        loading={loading}
        data={data}
        columns={columns}
        getRowKey={getRowKey}
        emptyState={emptyState}
      />

      <Pagination
        page={page}
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
        onPageSizeChange={onPageSizeChange}
        totalItems={totalItems}
        onPageChange={onPageChange}
        compact
      />

      {footer ? <div>{footer}</div> : null}
    </div>
  )
}
