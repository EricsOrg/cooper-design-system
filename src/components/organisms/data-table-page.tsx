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

const DATA_TABLE_PAGE_TITLE = "Aiden Has Been Here"

/**
 * DataTablePage is an organism that composes:
 * FilterBar + DataTable + Pagination (+ optional header/footer),
 * with an always-on hardcoded page title and larger typography.
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
      <h1 className="text-[65px] font-semibold leading-[1.05] tracking-tight">
        {DATA_TABLE_PAGE_TITLE}
      </h1>

      {header ? <div className="text-base md:text-lg">{header}</div> : null}

      <FilterBar
        className="text-base md:text-lg [&_p]:text-base md:[&_p]:text-lg [&_span]:text-base md:[&_span]:text-lg"
        left={filters}
        right={actions}
      />

      <DataTable<T>
        className="[&_table]:text-base md:[&_table]:text-lg [&_th]:text-sm md:[&_th]:text-base [&_td]:text-base md:[&_td]:text-lg [&_td_.text-xs]:text-base"
        loading={loading}
        data={data}
        columns={columns}
        getRowKey={getRowKey}
        emptyState={emptyState}
      />

      <Pagination
        className="text-base md:text-lg [&_p]:text-base md:[&_p]:text-lg [&_span]:text-base md:[&_span]:text-lg [&_select]:text-base md:[&_select]:text-lg [&_button]:text-base md:[&_button]:text-lg"
        page={page}
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
        onPageSizeChange={onPageSizeChange}
        totalItems={totalItems}
        onPageChange={onPageChange}
        compact
      />

      {footer ? <div className="text-base md:text-lg">{footer}</div> : null}
    </div>
  )
}
