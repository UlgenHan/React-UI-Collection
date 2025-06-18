import React from 'react';
import type { Column } from './types';

interface DataGridFooterProps {
  columns: Column[];
  aggregates: Record<string, number>;
  theme?: 'light' | 'dark';
  className?: string;
}

const DataGridFooter: React.FC<DataGridFooterProps> = ({ columns, aggregates, theme = 'light', className = '' }) => (
  <tfoot>
    <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}>
      {columns.map((col) => (
        <td
          key={col.key}
          className={`px-4 py-2 text-xs font-semibold border-t border-gray-200 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} ${col.className || ''} ${className}`}
        >
          {col.aggregate ? (
            <span>
              {col.aggregate === 'sum' && 'Σ '}
              {col.aggregate === 'avg' && 'Avg '}
              {col.aggregate === 'count' && 'Count '}
              {aggregates[col.key] ?? ''}
            </span>
          ) : null}
        </td>
      ))}
    </tr>
  </tfoot>
);

export default DataGridFooter; 