import React, { useEffect, useRef } from 'react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onCopy: () => void;
  onCut: () => void;
  onPaste: () => void;
  canPaste: boolean;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  onClose,
  onDelete,
  onDuplicate,
  onCopy,
  onCut,
  onPaste,
  canPaste
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const menuItems = [
    {
      label: 'Copy',
      icon: '📋',
      action: onCopy,
      shortcut: 'Ctrl+C'
    },
    {
      label: 'Cut',
      icon: '✂️',
      action: onCut,
      shortcut: 'Ctrl+X'
    },
    {
      label: 'Paste',
      icon: '📋',
      action: onPaste,
      shortcut: 'Ctrl+V',
      disabled: !canPaste
    },
    {
      label: 'Duplicate',
      icon: '📄',
      action: onDuplicate,
      shortcut: 'Ctrl+D'
    },
    {
      label: 'Delete',
      icon: '🗑️',
      action: onDelete,
      shortcut: 'Del',
      danger: true
    }
  ];

  return (
    <div
      ref={menuRef}
      className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-48"
      style={{
        left: x,
        top: y,
        transform: 'translate(-50%, -100%) translateY(-10px)'
      }}
    >
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            item.action();
            onClose();
          }}
          disabled={item.disabled}
          className={`
            w-full px-4 py-2 text-left text-sm flex items-center justify-between hover:bg-gray-100 transition-colors
            ${item.disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700'}
            ${item.danger ? 'hover:text-red-600 hover:bg-red-50' : ''}
          `}
        >
          <div className="flex items-center">
            <span className="mr-2">{item.icon}</span>
            <span>{item.label}</span>
          </div>
          <span className="text-xs text-gray-400 ml-4">{item.shortcut}</span>
        </button>
      ))}
    </div>
  );
};

export default ContextMenu; 