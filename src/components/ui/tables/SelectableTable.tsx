import React, { useState } from 'react';

interface Column {
  key: string;
  header: string;
  width?: string;
}

interface SelectableTableProps {
  data: Record<string, any>[];
  columns: Column[];
  selectedIds?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  idField?: string;
  className?: string;
}

export const SelectableTable: React.FC<SelectableTableProps> = ({
  data,
  columns,
  selectedIds = [],
  onSelectionChange,
  idField = 'id',
  className = '',
}) => {
  const [internalSelected, setInternalSelected] = useState<string[]>(selectedIds);
  
  const currentSelected = onSelectionChange ? selectedIds : internalSelected;
  const setSelected = onSelectionChange || setInternalSelected;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = data.map(row => row[idField]);
      setSelected(allIds);
    } else {
      setSelected([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelected([...currentSelected, id]);
    } else {
      setSelected(currentSelected.filter(selectedId => selectedId !== id));
    }
  };

  const isAllSelected = data.length > 0 && currentSelected.length === data.length;
  const isIndeterminate = currentSelected.length > 0 && currentSelected.length < data.length;

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left">
              <input
                type="checkbox"
                checked={isAllSelected}
                ref={(input) => {
                  if (input) input.indeterminate = isIndeterminate;
                }}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                aria-label="Select all rows"
              />
            </th>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                style={{ width: column.width }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => {
            const rowId = row[idField];
            const isSelected = currentSelected.includes(rowId);
            
            return (
              <tr key={index} className={isSelected ? 'bg-blue-50' : ''}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => handleSelectRow(rowId, e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    aria-label={`Select row ${index + 1}`}
                  />
                </td>
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}; 