import React from 'react';

interface DataGridDetailProps {
  colSpan: number;
  content: React.ReactNode;
  theme?: 'light' | 'dark';
}

const DataGridDetail: React.FC<DataGridDetailProps> = ({ colSpan, content, theme = 'light' }) => (
  <tr className={theme === 'dark' ? 'bg-gray-900' : 'bg-blue-50'}>
    <td colSpan={colSpan} className="p-4 border-b border-gray-200">
      {content}
    </td>
  </tr>
);

export default DataGridDetail; 