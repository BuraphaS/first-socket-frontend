import type { ColumnProps } from 'primevue'

export interface IPagination {
  page: number
  totalPage: number
  count: number
  perPage: number
}

export interface ITableSort {
  sortField: string | null
  sortOrder: 0 | 1 | -1 | null | undefined
}

export interface ITableHeader extends ColumnProps {
  field: string
  optionKey?: string
  value?: (event: any) => any
}
