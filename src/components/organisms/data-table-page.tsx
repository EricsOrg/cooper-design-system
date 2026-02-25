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
 * a fixed hero title + FilterBar + DataTable + Pagination (+ optional header/footer).
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
    <div className="grid gap-6">
      <h1 className="text-[65px] font-semibold leading-[1.02] tracking-tight">
        Aiden Has Been Here
      </h1>

      {header ? <div className="text-xl leading-relaxed">{header}</div> : null}

      <FilterBar
        className="gap-4 p-6 text-lg [&_input]:h-12 [&_input]:text-lg [&_button]:h-11 [&_button]:px-5 [&_button]:text-base"
        left={filters}
        right={actions}
      />

      <DataTable<T>
        className="[&_table]:text-lg [&_thead_th]:px-5 [&_thead_th]:py-4 [&_thead_th]:text-base [&_tbody_td]:px-5 [&_tbody_td]:py-4"
        loading={loading}
        data={data}
        columns={columns}
        getRowKey={getRowKey}
        emptyState={emptyState}
      />

      <Pagination
        className="gap-3 [&_p]:text-base [&_button]:h-11 [&_button]:min-w-11 [&_button]:px-4 [&_button]:text-base [&_select]:h-11 [&_select]:text-base"
        page={page}
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
        onPageSizeChange={onPageSizeChange}
        totalItems={totalItems}
        onPageChange={onPageChange}
      />

      {footer ? <div className="text-base leading-relaxed">{footer}</div> : null}
    </div>
  )
}
