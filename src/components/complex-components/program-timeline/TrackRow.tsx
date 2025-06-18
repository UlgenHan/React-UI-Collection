import React from 'react';
import type { TrackData, ClipData } from './ProgramTimeline';
import Clip from './Clip';

interface TrackRowProps {
  track: TrackData;
  zoom: number;
  rowIndex: number;
  timelineDuration: number;
}

const ROW_HEIGHT = 48;

const TrackRow: React.FC<TrackRowProps> = ({ track, zoom, rowIndex, timelineDuration }) => {
  return (
    <div className="relative flex items-center border-b border-gray-200 bg-gray-100" style={{ height: ROW_HEIGHT }}>
      <div className="w-32 px-2 text-sm font-semibold text-gray-700 truncate border-r border-gray-300 bg-gray-200 h-full flex items-center">
        {track.label}
      </div>
      <div className="relative flex-1 h-full">
        {track.clips.map((clip) => (
          <Clip
            key={clip.id}
            clip={clip}
            zoom={zoom}
            rowIndex={rowIndex}
            timelineDuration={timelineDuration}
          />
        ))}
      </div>
    </div>
  );
};

export default TrackRow; 