import { useState } from 'react';

export function useEditState() {
  const [editing, setEditing] = useState<{ rowKey: string | number; columnKey: string } | null>(null);
  const [editValue, setEditValue] = useState<any>('');

  const startEdit = (rowKey: string | number, columnKey: string, initialValue: any) => {
    setEditing({ rowKey, columnKey });
    setEditValue(initialValue);
  };
  const cancelEdit = () => {
    setEditing(null);
    setEditValue('');
  };
  const saveEdit = (onSave: (value: any) => void) => {
    if (editing) {
      onSave(editValue);
      setEditing(null);
      setEditValue('');
    }
  };
  const onChange = (value: any) => setEditValue(value);

  return {
    editing,
    editValue,
    startEdit,
    cancelEdit,
    saveEdit,
    onChange,
  };
} 