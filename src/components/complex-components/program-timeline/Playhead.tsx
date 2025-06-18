import React from 'react';

interface PlayheadProps {
  currentTime: number;
  zoom: number;
}

const Playhead: React.FC<PlayheadProps> = ({ currentTime, zoom }) => {
  const left = (currentTime / 10) * zoom;
  return (
    <div
      className="absolute top-0 bottom-0 w-1 bg-red-500 z-20 pointer-events-none"
      style={{ left }}
      aria-label="Playhead"
    />
  );
};

export default Playhead; 