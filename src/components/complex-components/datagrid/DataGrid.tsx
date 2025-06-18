import React, { useRef, useState } from 'react';
import type { DataGridProps, Column, RowData } from './types';
import DataGridHeader from './DataGridHeader';
import DataGridRow from './DataGridRow';
import DataGridSkeleton from './DataGridSkeleton';
import DataGridPagination from './DataGridPagination';
import { useSorting } from './useSorting';
import { useFiltering } from './useFiltering';
import { usePagination } from './usePagination';

const DataGrid: React.FC<DataGridProps> = ({
  columns: initialColumns,
  data,
  rowKey = 'id',
  onRowClick,
  loading = false,
  pageSize = 10,
  globalSearchText = '',
  filterEnabled = true,
  onSortChange,
  onFilterChange,
  onSearchChange,
  currentPage: controlledPage,
  totalPages: controlledTotalPages,
  onPageChange,
  className = '',
  emptyComponent,
  emptyMessage = 'No data available',
}) => {
  // Column order and resizing state
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const [draggingKey, setDraggingKey] = useState<string | null>(null);
  const dragOverKey = useRef<string | null>(null);

  // Sorting
  const {
    sortKey,
    sortDirection,
    sortedData,
    toggleSort,
    setSortKey,
    setSortDirection,
  } = useSorting(columns, data);

  // Filtering
  const {
    filters,
    setFilter,
    filteredData,
  } = useFiltering(columns, sortedData, filterEnabled, {}, globalSearchText);

  // Pagination
  const {
    currentPage,
    totalPages,
    pagedData,
    setCurrentPage,
  } = usePagination(filteredData, controlledPage || 1, pageSize);

  // Handlers
  const handleSort = (key: string) => {
    toggleSort(key);
    if (onSortChange) onSortChange(key, sortKey === key ? (sortDirection === 'asc' ? 'desc' : sortDirection === 'desc' ? 'none' : 'asc') : 'asc');
  };

  const handleFilter = (key: string, value: string) => {
    setFilter(key, value);
    onFilterChange?.({ ...filters, [key]: value });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange?.(e.target.value);
  };

  // Column resizing
  const resizingCol = useRef<string | null>(null);
  const startX = useRef<number>(0);
  const startWidth = useRef<number>(0);

  const handleResizeStart = (key: string, e: React.MouseEvent) => {
    resizingCol.current = key;
    startX.current = e.clientX;
    startWidth.current = columnWidths[key] || e.currentTarget.parentElement?.offsetWidth || 120;
    document.addEventListener('mousemove', handleResizing);
    document.addEventListener('mouseup', handleResizeEnd);
  };
  const handleResizing = (e: MouseEvent) => {
    if (!resizingCol.current) return;
    const delta = e.clientX - startX.current;
    setColumnWidths((prev) => ({ ...prev, [resizingCol.current!]: Math.max(60, startWidth.current + delta) }));
  };
  const handleResizeEnd = () => {
    resizingCol.current = null;
    document.removeEventListener('mousemove', handleResizing);
    document.removeEventListener('mouseup', handleResizeEnd);
  };

  // Column reordering
  const handleHeaderDragStart = (key: string, e: React.DragEvent) => {
    setDraggingKey(key);
    e.dataTransfer.effectAllowed = 'move';
  };
  const handleHeaderDrop = (key: string, e: React.DragEvent) => {
    e.preventDefault();
    if (draggingKey && draggingKey !== key) {
      const fromIdx = columns.findIndex((c) => c.key === draggingKey);
      const toIdx = columns.findIndex((c) => c.key === key);
      const newCols = [...columns];
      const [moved] = newCols.splice(fromIdx, 1);
      newCols.splice(toIdx, 0, moved);
      setColumns(newCols);
    }
    setDraggingKey(null);
    dragOverKey.current = null;
  };
  const handleHeaderDragOver = (key: string, e: React.DragEvent) => {
    e.preventDefault();
    dragOverKey.current = key;
  };

  // Render
  return (
    <div className={`overflow-x-auto w-full ${className}`}>
      {/* Global Search */}
      <div className="flex items-center mb-2">
        <input
          type="text"
          className="w-64 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Global search..."
          value={globalSearchText}
          onChange={handleSearch}
          aria-label="Global search"
        />
      </div>
      <table
        className="min-w-full bg-white border border-gray-200 rounded-lg text-sm"
        role="table"
        aria-label="Data grid"
      >
        <DataGridHeader
          columns={columns.map((col) => ({ ...col, width: columnWidths[col.key] }))}
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSort={handleSort}
          filters={filters}
          onFilter={handleFilter}
          filterEnabled={filterEnabled}
          onResizeStart={handleResizeStart}
          onHeaderDragStart={handleHeaderDragStart}
          onHeaderDrop={handleHeaderDrop}
          onHeaderDragOver={handleHeaderDragOver}
          draggingKey={draggingKey || undefined}
        />
        {loading ? (
          <DataGridSkeleton columns={columns} />
        ) : pagedData.length === 0 ? (
          <tbody>
            <tr>
              <td
                colSpan={columns.length}
                className="text-center text-gray-400 py-8"
                aria-live="polite"
              >
                {emptyComponent || emptyMessage}
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {pagedData.map((row, i) => (
              <DataGridRow
                key={row[rowKey] ?? JSON.stringify(row)}
                row={row}
                columns={columns}
                rowKey={rowKey}
                onRowClick={onRowClick}
                rowIndex={i}
                sortKey={sortKey}
              />
            ))}
          </tbody>
        )}
      </table>
      <DataGridPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange || setCurrentPage}
      />
    </div>
  );
};

export default DataGrid; 