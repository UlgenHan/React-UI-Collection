import { useState, useMemo } from 'react';
import type { RowData } from './types';

export function useGroupBy(data: RowData[], groupBy?: string) {
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const grouped = useMemo(() => {
    if (!groupBy) return { groups: [], groupMap: {}, groupOrder: [] };
    const groupMap: Record<string, RowData[]> = {};
    data.forEach(row => {
      const key = String(row[groupBy] ?? '');
      if (!groupMap[key]) groupMap[key] = [];
      groupMap[key].push(row);
    });
    const groupOrder = Object.keys(groupMap);
    return { groups: groupOrder.map(key => ({ key, rows: groupMap[key] })), groupMap, groupOrder };
  }, [data, groupBy]);

  const isCollapsed = (key: string) => !!collapsedGroups[key];
  const toggleGroup = (key: string) => setCollapsedGroups(prev => ({ ...prev, [key]: !prev[key] }));
  const expandAll = () => setCollapsedGroups({});
  const collapseAll = () => setCollapsedGroups(Object.fromEntries(grouped.groupOrder.map(k => [k, true])));

  return {
    grouped,
    isCollapsed,
    toggleGroup,
    expandAll,
    collapseAll,
  };
} 