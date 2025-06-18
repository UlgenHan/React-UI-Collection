import React from 'react';
import DataGrid from '../components/complex-components/datagrid/DataGrid';
import type { Column, RowData } from '../components/complex-components/datagrid/types';

// Mock data and columns for preview
const baseColumns: Column[] = [
  { key: 'id', header: 'ID', title: 'ID' },
  { key: 'name', header: 'Name', title: 'Name' },
  { key: 'qty', header: 'Qty', title: 'Quantity' },
  { key: 'price', header: 'Price', title: 'Price' },
];
const baseData: RowData[] = [
  { id: 1, name: 'Apple', qty: 10, price: 2.5 },
  { id: 2, name: 'Banana', qty: 5, price: 1.2 },
  { id: 3, name: 'Orange', qty: 8, price: 1.8 },
];

const featureList = [
  { key: 'ssr', title: 'Server-Side Mode', desc: 'Grid as a Service: sorting/filtering/pagination handled by server.' },
  { key: 'col-chooser', title: 'Column Chooser', desc: 'Toggle column visibility with a panel.' },
  { key: 'export', title: 'Export', desc: 'Export to Excel, CSV, or PDF.' },
  { key: 'multi-sort', title: 'Multi-Column Sorting', desc: 'Shift+Click to sort by multiple columns.' },
  { key: 'dnd', title: 'Drag & Drop Row Reordering', desc: 'Reorder rows via drag-and-drop.' },
  { key: 'validation', title: 'Cell/Row Validation', desc: 'Inline validation with error markers.' },
  { key: 'formula', title: 'Formula Columns', desc: 'Columns with computed values.' },
  { key: 'tree', title: 'Tree Data', desc: 'Hierarchical/parent-child rows.' },
  { key: 'realtime', title: 'Real-Time Data Sync', desc: 'Auto-update rows via WebSocket.' },
  { key: 'undo', title: 'Undo/Redo', desc: 'History of edit operations.' },
  { key: 'infinite', title: 'Infinite Scroll', desc: 'Lazy load more data as you scroll.' },
  { key: 'keyboard', title: 'Keyboard Navigation', desc: 'Tab, arrows, Enter, Esc, shortcuts.' },
  { key: 'group-header', title: 'Grouped Column Headers', desc: 'Columns grouped under a single header.' },
  { key: 'span', title: 'Cell Spanning', desc: 'Merged cells with colSpan/rowSpan.' },
  { key: 'rtl', title: 'RTL Support', desc: 'Right-to-left layout and direction.' },
  { key: 'a11y', title: 'Accessibility', desc: 'WCAG 2.1 AA, ARIA, screen reader support.' },
  { key: 'i18n', title: 'Multi-language', desc: 'i18n-ready, all labels/strings customizable.' },
  { key: 'virtual', title: 'Column & Row Virtualization', desc: 'Render only visible rows/columns.' },
  { key: 'auto-width', title: 'Auto Size Columns', desc: 'Columns auto-size to fit content.' },
  { key: 'context-menu', title: 'Context Menus', desc: 'Right-click menu for rows/cells.' },
];

const DataGridGallery: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-4">Ultra-Advanced DataGrid Feature Gallery</h1>
      {/* Developer Documentation Callout */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8 rounded">
        <div className="font-semibold text-blue-800 mb-1">Developer Quickstart</div>
        <ul className="list-disc pl-6 text-blue-900 text-sm mb-2">
          <li>All DataGrid code is modularized in <code>src/components/complex-components/datagrid/</code>.</li>
          <li>Each feature below is previewed in isolation for rapid development and testing.</li>
          <li>To add or extend a feature, update the corresponding section and pass feature-specific props to <code>DataGrid</code>.</li>
        </ul>
        <div className="text-blue-900 text-xs">
          <b>Features:</b> Server-side mode, column chooser, export, multi-sort, drag & drop, validation, formula columns, tree data, real-time sync, undo/redo, infinite scroll, keyboard nav, grouped headers, cell spanning, RTL, accessibility, i18n, virtualization, auto-size, context menus, and more.
        </div>
      </div>
      {/* Modular Structure Doc */}
      <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-8">
        <div className="font-semibold mb-1">Modular Structure</div>
        <ul className="list-disc pl-6 text-gray-700 text-sm">
          <li><b>DataGrid.tsx</b>: Main orchestrator, props, and state.</li>
          <li><b>DataGridHeader.tsx</b>, <b>DataGridBody.tsx</b>, <b>DataGridFooter.tsx</b>: Table sections.</li>
          <li><b>DataGridCell.tsx</b>: Custom cell rendering, editing, validation.</li>
          <li><b>ColumnVisibilityPanel.tsx</b>: Column chooser UI.</li>
          <li><b>ContextMenu.tsx</b>: Right-click menu for actions.</li>
          <li><b>ColumnGroupHeader.tsx</b>: Grouped column headers.</li>
          <li><b>useVirtualScroll.ts</b>: Row/column virtualization.</li>
          <li><b>types.ts</b>: TypeScript types for all features.</li>
        </ul>
      </div>
      {featureList.map((feature) => (
        <section key={feature.key} className="bg-white rounded shadow p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
          <p className="mb-4 text-gray-600">{feature.desc}</p>
          {/* DataGrid instance for this feature preview */}
          <div className="overflow-x-auto">
            <DataGrid columns={baseColumns} data={baseData} />
            {/* TODO: Pass feature-specific props and data for each preview */}
          </div>
        </section>
      ))}
    </div>
  );
};

export default DataGridGallery; 