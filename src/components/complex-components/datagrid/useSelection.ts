import { useState, useCallback } from 'react';

export function useSelection(
  allRowKeys: (string | number)[],
  selectedRowKeys: (string | number)[] = [],
  onSelectRow?: (rowKey: string | number, selected: boolean) => void,
  onSelectAll?: (selected: boolean) => void
) {
  const [internalSelected, setInternalSelected] = useState<(string | number)[]>(selectedRowKeys);

  const isSelected = useCallback(
    (key: string | number) => (selectedRowKeys || internalSelected).includes(key),
    [selectedRowKeys, internalSelected]
  );

  const selectRow = (key: string | number, selected: boolean) => {
    let newSelected = (selectedRowKeys || internalSelected).slice();
    if (selected) {
      if (!newSelected.includes(key)) newSelected.push(key);
    } else {
      newSelected = newSelected.filter(k => k !== key);
    }
    setInternalSelected(newSelected);
    onSelectRow?.(key, selected);
  };

  const selectAll = (selected: boolean) => {
    const newSelected = selected ? allRowKeys : [];
    setInternalSelected(newSelected);
    onSelectAll?.(selected);
  };

  return {
    isSelected,
    selectRow,
    selectAll,
    selectedKeys: selectedRowKeys || internalSelected,
  };
} 