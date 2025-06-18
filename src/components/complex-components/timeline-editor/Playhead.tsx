import React from 'react';

interface PlayheadProps {
  playheadTime: number;
  zoomLevel: number;
}

const Playhead: React.FC<PlayheadProps> = ({ playheadTime, zoomLevel }) => {
  const left = playheadTime * 40 * zoomLevel;
  return (
    <div
      className="absolute top-0 bottom-0 w-1 bg-red-500 z-20 pointer-events-none"
      style={{ left }}
      aria-label="Playhead"
    />
  );
};

export default Playhead; 