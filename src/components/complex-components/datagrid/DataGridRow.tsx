import React from 'react';
import type { Column, RowData, Theme } from './types';
import DataGridCell from './DataGridCell';

interface DataGridRowProps {
  row: RowData;
  columns: Column[];
  rowKey: string;
  onRowClick?: (row: RowData) => void;
  rowIndex?: number;
  sortKey?: string;
  isSelected?: boolean;
  onSelect?: (selected: boolean) => void;
  pinnedColumns?: 'left' | 'right' | undefined;
  theme?: Theme;
  user?: any;
  access?: (col: Column, user?: any) => boolean;
  editing?: { columnKey: string } | null;
  onEdit?: (columnKey: string) => void;
  onDetailToggle?: () => void;
  isDetailOpen?: boolean;
  renderDetail?: (row: RowData) => React.ReactNode;
}

const DataGridRow: React.FC<DataGridRowProps> = ({
  row,
  columns,
  rowKey,
  onRowClick,
  rowIndex = 0,
  sortKey,
  isSelected,
  onSelect,
  pinnedColumns,
  theme = 'light',
  user,
  access,
  editing,
  onEdit,
  onDetailToggle,
  isDetailOpen,
  renderDetail,
}) => (
  <>
    <tr
      className={`$${rowIndex % 2 === 0 ? (theme === 'dark' ? 'bg-gray-900' : 'bg-white') : (theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50')} hover:bg-blue-50 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500`}
      tabIndex={0}
      aria-label="Data row"
      onClick={() => onRowClick?.(row)}
    >
      {onSelect && (
        <td className="px-2 py-2">
          <input
            type="checkbox"
            checked={!!isSelected}
            onChange={e => onSelect(e.target.checked)}
            aria-label="Select row"
            className="accent-blue-600"
            onClick={e => e.stopPropagation()}
          />
        </td>
      )}
      {columns.map((col) => {
        if (access && !access(col, user)) return null;
        if (pinnedColumns && col.pinned !== pinnedColumns) return null;
        return (
          <DataGridCell
            key={col.key}
            value={row[col.key]}
            column={col}
            row={row}
            isSorted={sortKey === col.key}
            editing={editing && editing.columnKey === col.key}
            onEdit={onEdit ? () => onEdit(col.key) : undefined}
            theme={theme}
          />
        );
      })}
      {onDetailToggle && (
        <td className="px-2 py-2">
          <button
            onClick={e => { e.stopPropagation(); onDetailToggle(); }}
            aria-label={isDetailOpen ? 'Collapse details' : 'Expand details'}
            className="text-blue-600 hover:underline text-xs"
          >
            {isDetailOpen ? '−' : '+'}
          </button>
        </td>
      )}
    </tr>
    {isDetailOpen && renderDetail && (
      <tr className={theme === 'dark' ? 'bg-gray-900' : 'bg-blue-50'}>
        <td colSpan={columns.length + (onSelect ? 1 : 0) + (onDetailToggle ? 1 : 0)} className="p-4 border-b border-gray-200">
          {renderDetail(row)}
        </td>
      </tr>
    )}
  </>
);

export default DataGridRow; 