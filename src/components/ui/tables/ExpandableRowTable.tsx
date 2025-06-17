import React, { useState } from 'react';

interface Column {
  key: string;
  header: string;
  width?: string;
}

interface ExpandableRowTableProps {
  data: Record<string, any>[];
  columns: Column[];
  renderExpandedRow?: (row: Record<string, any>, index: number) => React.ReactNode;
  expandedByDefault?: boolean;
  className?: string;
}

export const ExpandableRowTable: React.FC<ExpandableRowTableProps> = ({
  data,
  columns,
  renderExpandedRow,
  expandedByDefault = false,
  className = '',
}) => {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(
    expandedByDefault ? new Set(data.map((_, index) => index)) : new Set()
  );

  const toggleRow = (index: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
              <span className="sr-only">Expand</span>
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
            const isExpanded = expandedRows.has(index);
            
            return (
              <React.Fragment key={index}>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button
                      onClick={() => toggleRow(index)}
                      className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                      aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
                    >
                      <svg
                        className={`w-5 h-5 transform transition-transform duration-200 ${
                          isExpanded ? 'rotate-90' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
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
                {isExpanded && (
                  <tr>
                    <td></td>
                    <td colSpan={columns.length} className="px-6 py-4 bg-gray-50">
                      {renderExpandedRow ? (
                        renderExpandedRow(row, index)
                      ) : (
                        <div className="text-sm text-gray-600">
                          <h4 className="font-medium mb-2">Additional Details</h4>
                          <pre className="whitespace-pre-wrap">
                            {JSON.stringify(row, null, 2)}
                          </pre>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}; 