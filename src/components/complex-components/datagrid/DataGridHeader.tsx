import React from 'react';
import type { Column, SortDirection, Theme } from './types';

interface DataGridHeaderProps {
  columns: Column[];
  sortKey?: string;
  sortDirection?: SortDirection;
  onSort?: (key: string) => void;
  filters?: Record<string, string>;
  onFilter?: (key: string, value: string) => void;
  filterEnabled?: boolean;
  onResizeStart?: (key: string, e: React.MouseEvent) => void;
  onHeaderDragStart?: (key: string, e: React.DragEvent) => void;
  onHeaderDrop?: (key: string, e: React.DragEvent) => void;
  onHeaderDragOver?: (key: string, e: React.DragEvent) => void;
  draggingKey?: string;
  pinnedColumns?: 'left' | 'right' | undefined;
  onSelectAll?: (selected: boolean) => void;
  allSelected?: boolean;
  theme?: Theme;
  user?: any;
  access?: (col: Column, user?: any) => boolean;
}

const sortIcon = (dir: SortDirection) => {
  if (dir === 'asc') return <span className="ml-1">▲</span>;
  if (dir === 'desc') return <span className="ml-1">▼</span>;
  return <span className="ml-1 text-gray-300">⇅</span>;
};

const DataGridHeader: React.FC<DataGridHeaderProps> = ({
  columns,
  sortKey,
  sortDirection,
  onSort,
  filters = {},
  onFilter,
  filterEnabled,
  onResizeStart,
  onHeaderDragStart,
  onHeaderDrop,
  onHeaderDragOver,
  draggingKey,
  pinnedColumns,
  onSelectAll,
  allSelected,
  theme = 'light',
  user,
  access,
}) => {
  return (
    <thead>
      <tr>
        {onSelectAll && (
          <th className={`px-2 py-2 bg-gray-50 border-b border-gray-200 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}`}> 
            <input
              type="checkbox"
              checked={!!allSelected}
              onChange={e => onSelectAll(e.target.checked)}
              aria-label="Select all rows"
              className="accent-blue-600"
            />
          </th>
        )}
        {columns.map((col, idx) => {
          if (access && !access(col, user)) return null;
          if (pinnedColumns && col.pinned !== pinnedColumns) return null;
          return (
            <th
              key={col.key}
              scope="col"
              className={`relative px-4 py-2 text-left text-xs font-semibold uppercase border-b select-none group ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-gray-50 border-gray-200 text-gray-700'} ${draggingKey === col.key ? 'bg-blue-100' : ''} ${col.headerClassName || ''}`}
              tabIndex={0}
              aria-sort={
                sortKey === col.key
                  ? sortDirection === 'asc'
                    ? 'ascending'
                    : sortDirection === 'desc'
                    ? 'descending'
                    : 'none'
                  : 'none'
              }
              onClick={col.render ? undefined : () => onSort?.(col.key)}
              style={{ cursor: 'pointer', userSelect: 'none' }}
              draggable
              onDragStart={e => onHeaderDragStart?.(col.key, e)}
              onDrop={e => onHeaderDrop?.(col.key, e)}
              onDragOver={e => onHeaderDragOver?.(col.key, e)}
            >
              <div className="flex items-center">
                <span className={sortKey === col.key ? 'text-blue-600' : ''}>{col.header}</span>
                {onSort && sortIcon(sortKey === col.key ? sortDirection || 'none' : 'none')}
                {col.resizable && (
                  <span
                    className="absolute right-0 top-0 h-full w-2 cursor-col-resize group-hover:bg-blue-200"
                    onMouseDown={e => onResizeStart?.(col.key, e)}
                    style={{ zIndex: 10 }}
                    aria-label="Resize column"
                  />
                )}
              </div>
              {filterEnabled && col.filterable && (
                <input
                  type="text"
                  className="mt-2 w-full px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Filter ${col.header}`}
                  value={filters[col.key] || ''}
                  onChange={e => onFilter?.(col.key, e.target.value)}
                  aria-label={`Filter for ${col.header}`}
                  onClick={e => e.stopPropagation()}
                />
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default DataGridHeader; 