import { useMemo } from 'react';
import type { Column, RowData } from './types';

export function useAggregates(data: RowData[], columns: Column[]) {
  return useMemo(() => {
    const result: Record<string, number> = {};
    columns.forEach(col => {
      if (!col.aggregate) return;
      const values = data.map(row => row[col.key]).filter(v => typeof v === 'number');
      if (col.aggregate === 'sum') {
        result[col.key] = values.reduce((a, b) => a + b, 0);
      } else if (col.aggregate === 'avg') {
        result[col.key] = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
      } else if (col.aggregate === 'count') {
        result[col.key] = values.length;
      }
    });
    return result;
  }, [data, columns]);
} 