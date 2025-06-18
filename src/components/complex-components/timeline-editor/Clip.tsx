import React from 'react';
import type { Clip as ClipType } from './types';

interface ClipProps {
  clip: ClipType;
  zoomLevel: number;
  selected?: boolean;
  onSelect: () => void;
  onMove: (id: string, newStart: number) => void;
  onResize: (id: string, newStart: number, newEnd: number) => void;
  onSplit: (id: string, at: number) => void;
}

const Clip: React.FC<ClipProps> = ({ clip, zoomLevel, selected, onSelect }) => {
  const left = clip.start * 40 * zoomLevel;
  const width = (clip.end - clip.start) * 40 * zoomLevel;
  return (
    <div
      className={`absolute top-1 h-10 rounded shadow flex items-center cursor-move select-none border-2 ${selected ? 'border-blue-500' : 'border-transparent'} ${clip.type === 'audio' ? 'bg-blue-200' : 'bg-green-200'}`}
      style={{ left, width, zIndex: 10 }}
      tabIndex={0}
      aria-label={clip.label}
      onClick={onSelect}
      // TODO: Add drag and resize handlers
    >
      {/* Left resize handle */}
      <div className="w-2 h-full bg-gray-400 cursor-ew-resize rounded-l" />
      {/* Label and type icon */}
      <div className="flex-1 px-2 text-xs font-medium text-gray-800 truncate">
        {clip.label} <span className="ml-1 text-gray-500">[{clip.type}]</span>
      </div>
      {/* Right resize handle */}
      <div className="w-2 h-full bg-gray-400 cursor-ew-resize rounded-r" />
      {/* Placeholder: drag, resize, split, preview */}
    </div>
  );
};

export default Clip; 