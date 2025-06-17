import React from 'react';

interface Column {
  key: string;
  header: string;
  width?: string;
  sticky?: boolean;
}

interface ResponsiveTableProps {
  data: Record<string, any>[];
  columns: Column[];
  className?: string;
}

export const ResponsiveTable: React.FC<ResponsiveTableProps> = ({
  data,
  columns,
  className = '',
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    column.sticky ? 'sticky left-0 bg-gray-50 z-10' : ''
                  }`}
                  style={{ width: column.width }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${
                      column.sticky ? 'sticky left-0 bg-white z-10' : ''
                    }`}
                  >
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="block sm:hidden mt-4">
        <div className="space-y-4">
          {data.map((row, index) => (
            <div key={index} className="bg-white shadow rounded-lg p-4">
              {columns.map((column) => (
                <div key={column.key} className="flex justify-between py-1">
                  <span className="font-medium text-gray-500">{column.header}:</span>
                  <span className="text-gray-900">{row[column.key]}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 