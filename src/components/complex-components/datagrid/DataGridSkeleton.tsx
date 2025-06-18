import React from 'react';
import type { Column } from './types';

interface DataGridSkeletonProps {
  columns: Column[];
  rows?: number;
}

const DataGridSkeleton: React.FC<DataGridSkeletonProps> = ({ columns, rows = 5 }) => (
  <tbody>
    {Array.from({ length: rows }).map((_, rowIdx) => (
      <tr key={rowIdx} className="animate-pulse">
        {columns.map((col) => (
          <td key={col.key} className="px-4 py-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </td>
        ))}
      </tr>
    ))}
  </tbody>
);

export default DataGridSkeleton; 