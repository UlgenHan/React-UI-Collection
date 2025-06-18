import { useState, useMemo } from 'react';
import type { RowData, Column } from './types';

export function useFiltering(
  columns: Column[],
  data: RowData[],
  filterEnabled: boolean = true,
  initialFilters: Record<string, string> = {},
  globalSearchText: string = ''
) {
  const [filters, setFilters] = useState<Record<string, string>>(initialFilters);

  const filteredData = useMemo(() => {
    let filtered = data;
    if (filterEnabled) {
      filtered = filtered.filter(row =>
        columns.every(col => {
          const filterValue = filters[col.key];
          if (!filterValue) return true;
          const cell = row[col.key];
          return String(cell ?? '').toLowerCase().includes(filterValue.toLowerCase());
        })
      );
    }
    if (globalSearchText) {
      const search = globalSearchText.toLowerCase();
      filtered = filtered.filter(row =>
        columns.some(col =>
          String(row[col.key] ?? '').toLowerCase().includes(search)
        )
      );
    }
    return filtered;
  }, [data, filters, globalSearchText, columns, filterEnabled]);

  const setFilter = (key: string, value: string) => {
    setFilters(f => ({ ...f, [key]: value }));
  };

  const clearFilters = () => setFilters({});

  return {
    filters,
    setFilter,
    clearFilters,
    filteredData,
  };
} 