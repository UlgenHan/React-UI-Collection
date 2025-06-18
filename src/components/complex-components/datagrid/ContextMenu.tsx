import React from 'react';

interface ContextMenuOption {
  label: string;
  action: () => void;
}

interface ContextMenuProps {
  options: ContextMenuOption[];
  position: { x: number; y: number };
  onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ options, position, onClose }) => {
  // Placeholder for context menu UI
  return (
    <div
      className="absolute z-50 bg-white border rounded shadow-lg min-w-[120px]"
      style={{ left: position.x, top: position.y }}
      onMouseLeave={onClose}
      tabIndex={-1}
    >
      {options.map((opt, idx) => (
        <div
          key={idx}
          className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
          onClick={() => { opt.action(); onClose(); }}
        >
          {opt.label}
        </div>
      ))}
    </div>
  );
};

export default ContextMenu; 