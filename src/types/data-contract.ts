export type OffsetPagination = {
  /** 1-indexed page number. */
  page: number
  pageSize: number
  /** Total items across all pages. */
  totalItems: number
}

export type DataState = "idle" | "loading" | "ready" | "empty" | "error"

/**
 * A small, explicit contract describing what an organism needs (inputs),
 * what it produces (outputs), and what interactions it emits (events).
 */
export type DataContract<TQuery, TRow, TAction extends string = string> = {
  inputs: {
    query: TQuery
    pagination: OffsetPagination
    /** Optional capabilities/permissions that gate UI affordances. */
    capabilities?: Record<string, boolean>
  }
  outputs: {
    rows: TRow[]
    state: DataState
  }
  emits: {
    onQueryChange?: (next: TQuery) => void
    onPageChange?: (page: number) => void
    onPageSizeChange?: (pageSize: number) => void
    onRowAction?: (action: TAction, row: TRow) => void
    onBulkAction?: (action: TAction, rowIds: string[]) => void
  }
}
