import React from 'react';
import type { Column, RowData, Theme } from './types';

interface DataGridBodyProps {
  data: RowData[];
  columns: Column[];
  theme?: Theme;
  // ...other props for virtualization, drag-and-drop, validation, etc.
}

const DataGridBody: React.FC<DataGridBodyProps> = ({ data, columns, theme = 'light' }) => {
  // Placeholder for virtualization, drag-and-drop, tree data, validation, context menu, etc.
  return (
    <tbody>
      {/* Render rows here (virtualized, draggable, tree, etc.) */}
      {data.map((row, idx) => (
        <tr key={row.id || idx}>
          {columns.map(col => (
            <td key={col.key}>{row[col.key]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default DataGridBody; 