import { ReactNode } from 'react';

export type AggregateType = 'sum' | 'avg' | 'count';
export type EditorType = 'text' | 'number' | 'select';
export type PinDirection = 'left' | 'right' | undefined;
export type Theme = 'light' | 'dark';

export type Column = {
  key: string;
  header: string;
  title?: string; // developer-friendly display name, fallback to header
  isVisible?: boolean; // for column chooser/visibility panel
  filterable?: boolean;
  resizable?: boolean;
  render?: (value: any, row: RowData) => ReactNode;
  aggregate?: AggregateType;
  editor?: EditorType;
  options?: { label: string; value: any }[]; // for select
  pinned?: PinDirection;
  className?: string;
  headerClassName?: string;
  access?: (row: RowData, user?: any) => boolean;
};

export type RowData = Record<string, any>;

export type SortDirection = 'asc' | 'desc' | 'none';

export interface DataGridProps {
  columns: Column[];
  data: RowData[];
  rowKey?: string;
  onRowClick?: (row: RowData) => void;
  loading?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  className?: string;
  pageSize?: number;
  globalSearchText?: string;
  filterEnabled?: boolean;
  onSortChange?: (sortKey: string, sortDirection: SortDirection) => void;
  onFilterChange?: (filters: Record<string, string>) => void;
  onSearchChange?: (search: string) => void;
  emptyComponent?: ReactNode;
  emptyMessage?: string;
  rowHeight?: number;
  groupBy?: string;
  renderDetail?: (row: RowData) => ReactNode;
  selectedRowKeys?: (string | number)[];
  onSelectRow?: (rowKey: string | number, selected: boolean) => void;
  onSelectAll?: (selected: boolean) => void;
  theme?: Theme;
  user?: any;
  access?: (row: RowData, user?: any) => boolean;
} 