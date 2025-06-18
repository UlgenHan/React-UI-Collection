import React from 'react';
import type { Column } from './types';

interface ColumnVisibilityPanelProps {
  columns: Column[];
  onToggleColumn: (key: string, visible: boolean) => void;
}

const ColumnVisibilityPanel: React.FC<ColumnVisibilityPanelProps> = ({ columns, onToggleColumn }) => {
  // Placeholder for dropdown/panel UI
  return (
    <div className="p-2 bg-white border rounded shadow-md">
      <div className="font-bold mb-2">Columns</div>
      {columns.map(col => (
        <label key={col.key} className="flex items-center space-x-2 mb-1">
          <input
            type="checkbox"
            checked={col.isVisible !== false}
            onChange={e => onToggleColumn(col.key, e.target.checked)}
          />
          <span>{col.title || col.header}</span>
        </label>
      ))}
    </div>
  );
};

export default ColumnVisibilityPanel; 