import React from 'react';

interface TimelineGridProps {
  zoomLevel: number;
}

const TimelineGrid: React.FC<TimelineGridProps> = ({ zoomLevel }) => {
  // For now, render ticks every 1s, scale with zoomLevel
  const duration = 60; // seconds
  const pxPerSec = 40 * zoomLevel;
  const ticks = Array.from({ length: duration + 1 }, (_, i) => i);
  return (
    <div className="relative h-8 border-b border-gray-300 bg-white select-none">
      {ticks.map((t) => (
        <div
          key={t}
          className="absolute top-0 h-8 flex flex-col items-center"
          style={{ left: `${t * pxPerSec}px`, width: 1 }}
        >
          <div className="w-px h-4 bg-gray-400" />
          <span className="text-xs text-gray-600 mt-1">{t}s</span>
        </div>
      ))}
    </div>
  );
};

export default TimelineGrid; 