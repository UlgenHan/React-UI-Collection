import React from 'react';
import type { ClipData } from './ProgramTimeline';

interface ClipProps {
  clip: ClipData;
  zoom: number;
  rowIndex: number;
  timelineDuration: number;
}

const ROW_HEIGHT = 48;

const Clip: React.FC<ClipProps> = ({ clip, zoom, rowIndex, timelineDuration }) => {
  const left = (clip.startTime / 10) * zoom;
  const width = ((clip.endTime - clip.startTime) / 10) * zoom;
  return (
    <div
      className={`absolute top-1 h-10 rounded shadow flex items-center cursor-move select-none ${clip.type === 'audio' ? 'bg-blue-200' : 'bg-green-200'}`}
      style={{ left, width, zIndex: 10 }}
      // TODO: Add drag and resize handlers
      tabIndex={0}
      aria-label={clip.label}
    >
      {/* Left resize handle */}
      <div className="w-2 h-full bg-gray-400 cursor-ew-resize rounded-l" />
      {/* Label and type icon */}
      <div className="flex-1 px-2 text-xs font-medium text-gray-800 truncate">
        {clip.label} <span className="ml-1 text-gray-500">[{clip.type}]</span>
      </div>
      {/* Right resize handle */}
      <div className="w-2 h-full bg-gray-400 cursor-ew-resize rounded-r" />
      {/* Placeholder: media preview, advanced features */}
    </div>
  );
};

export default Clip; 