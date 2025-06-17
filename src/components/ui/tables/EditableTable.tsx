import React, { useState } from 'react';

interface Column {
  key: string;
  header: string;
  width?: string;
  editable?: boolean;
  type?: 'text' | 'number' | 'email';
}

interface EditableTableProps {
  data: Record<string, any>[];
  columns: Column[];
  onCellChange?: (rowIndex: number, columnKey: string, value: any) => void;
  className?: string;
}

export const EditableTable: React.FC<EditableTableProps> = ({
  data,
  columns,
  onCellChange,
  className = '',
}) => {
  const [editingCell, setEditingCell] = useState<{ row: number; column: string } | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleCellClick = (rowIndex: number, columnKey: string, currentValue: any) => {
    const column = columns.find(col => col.key === columnKey);
    if (column?.editable !== false) {
      setEditingCell({ row: rowIndex, column: columnKey });
      setEditValue(currentValue?.toString() || '');
    }
  };

  const handleSave = () => {
    if (editingCell && onCellChange) {
      onCellChange(editingCell.row, editingCell.column, editValue);
    }
    setEditingCell(null);
    setEditValue('');
  };

  const handleCancel = () => {
    setEditingCell(null);
    setEditValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                style={{ width: column.width }}
              >
                {column.header}
                {column.editable !== false && (
                  <span className="ml-1 text-blue-500">*</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => {
                const isEditing = editingCell?.row === rowIndex && editingCell?.column === column.key;
                const cellValue = row[column.key];
                
                return (
                  <td
                    key={column.key}
                    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${
                      column.editable !== false ? 'cursor-pointer hover:bg-gray-50' : ''
                    }`}
                    onClick={() => handleCellClick(rowIndex, column.key, cellValue)}
                  >
                    {isEditing ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type={column.type || 'text'}
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={handleKeyDown}
                          onBlur={handleSave}
                          autoFocus
                          className="block w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                          onClick={handleSave}
                          className="text-green-600 hover:text-green-800"
                          aria-label="Save"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                        <button
                          onClick={handleCancel}
                          className="text-red-600 hover:text-red-800"
                          aria-label="Cancel"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <span className={column.editable !== false ? 'border-b border-dashed border-gray-300 pb-1' : ''}>
                        {cellValue}
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 