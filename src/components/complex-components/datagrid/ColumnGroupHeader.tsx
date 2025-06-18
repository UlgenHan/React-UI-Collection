import React from 'react';
import type { Column } from './types';

interface ColumnGroupHeaderProps {
  columns: Column[];
}

const ColumnGroupHeader: React.FC<ColumnGroupHeaderProps> = ({ columns }) => {
  // Placeholder for grouped header row
  return (
    <tr>
      {columns.map(col => (
        <th key={col.key} colSpan={col.colSpan || 1} className="text-center font-bold bg-gray-100">
          {col.group || col.title}
        </th>
      ))}
    </tr>
  );
};

export default ColumnGroupHeader; 