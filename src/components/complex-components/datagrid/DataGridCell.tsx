import React from 'react';
import type { Column, RowData, Theme } from './types';

interface DataGridCellProps {
  value: any;
  column: Column;
  row: RowData;
  isSorted?: boolean;
  editing?: boolean;
  onEdit?: () => void;
  theme?: Theme;
}

const DataGridCell: React.FC<DataGridCellProps> = ({ value, column, row, isSorted, editing, onEdit, theme = 'light' }) => {
  // Inline editor rendering
  if (editing) {
    if (column.editor === 'text') {
      return (
        <td className={`px-4 py-2 border-b border-gray-100 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}>
          <input type="text" className="w-full px-2 py-1 border rounded" defaultValue={value} autoFocus />
        </td>
      );
    }
    if (column.editor === 'number') {
      return (
        <td className={`px-4 py-2 border-b border-gray-100 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}>
          <input type="number" className="w-full px-2 py-1 border rounded" defaultValue={value} autoFocus />
        </td>
      );
    }
    if (column.editor === 'select' && column.options) {
      return (
        <td className={`px-4 py-2 border-b border-gray-100 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}>
          <select className="w-full px-2 py-1 border rounded" defaultValue={value} autoFocus>
            {column.options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </td>
      );
    }
  }
  return (
    <td
      className={`px-4 py-2 whitespace-nowrap text-sm border-b border-gray-100 ${isSorted ? 'bg-blue-50 font-semibold' : theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'text-gray-800'} ${column.className || ''}`}
      onDoubleClick={onEdit}
      tabIndex={0}
    >
      {column.render ? column.render(value, row) : value !== undefined && value !== null ? value : <span className="text-gray-400">—</span>}
    </td>
  );
};

export default DataGridCell; 