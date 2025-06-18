import { useState, useCallback } from 'react';
import type { RowData, SortDirection, Column } from './types';

export function useSorting(
  columns: Column[],
  data: RowData[],
  initialSortKey?: string,
  initialSortDirection: SortDirection = 'none'
) {
  const [sortKey, setSortKey] = useState<string | undefined>(initialSortKey);
  const [sortDirection, setSortDirection] = useState<SortDirection>(initialSortDirection);

  const sortedData = (() => {
    if (!sortKey || sortDirection === 'none') return data;
    const col = columns.find(c => c.key === sortKey);
    if (!col) return data;
    return [...data].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      if (aValue === bValue) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      return sortDirection === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  })();

  const toggleSort = useCallback(
    (key: string) => {
      if (sortKey !== key) {
        setSortKey(key);
        setSortDirection('asc');
      } else {
        setSortDirection((prev) =>
          prev === 'asc' ? 'desc' : prev === 'desc' ? 'none' : 'asc'
        );
      }
    },
    [sortKey]
  );

  return {
    sortKey,
    sortDirection,
    sortedData,
    setSortKey,
    setSortDirection,
    toggleSort,
  };
} 