import React from 'react';

interface TimeRulerProps {
  duration: number; // in seconds
  zoom: number; // px per 10s
}

const TimeRuler: React.FC<TimeRulerProps> = ({ duration, zoom }) => {
  const tickInterval = zoom > 200 ? 5 : 10; // px per 10s: more zoom = more ticks
  const numTicks = Math.ceil(duration / tickInterval);
  const ticks = Array.from({ length: numTicks + 1 }, (_, i) => i * tickInterval);

  return (
    <div className="relative h-8 border-b border-gray-300 bg-white select-none">
      {ticks.map((t, i) => (
        <div
          key={t}
          className="absolute top-0 h-8 flex flex-col items-center"
          style={{ left: `${(t / 10) * zoom}px`, width: 1 }}
        >
          <div className="w-px h-4 bg-gray-400" />
          <span className="text-xs text-gray-600 mt-1">{t}s</span>
        </div>
      ))}
    </div>
  );
};

export default TimeRuler; 