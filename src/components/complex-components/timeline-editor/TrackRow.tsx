import React from 'react';
import Clip from './Clip';
import type { Track, Clip as ClipType } from './types';

interface TrackRowProps {
  track: Track;
  clips: ClipType[];
  zoomLevel: number;
  selectedClipId?: string;
  onSelectClip: (id: string) => void;
  onMoveClip: (id: string, newStart: number) => void;
  onResizeClip: (id: string, newStart: number, newEnd: number) => void;
  onSplitClip: (id: string, at: number) => void;
}

const ROW_HEIGHT = 56;

const TrackRow: React.FC<TrackRowProps> = ({ track, clips, zoomLevel, selectedClipId, onSelectClip, onMoveClip, onResizeClip, onSplitClip }) => {
  return (
    <div className="relative flex items-center border-b border-gray-200 bg-gray-100" style={{ height: ROW_HEIGHT }}>
      <div className="w-32 px-2 text-sm font-semibold text-gray-700 truncate border-r border-gray-300 bg-gray-200 h-full flex items-center">
        {track.label}
      </div>
      <div className="relative flex-1 h-full">
        {clips.map((clip) => (
          <Clip
            key={clip.id}
            clip={clip}
            zoomLevel={zoomLevel}
            selected={clip.id === selectedClipId}
            onSelect={() => onSelectClip(clip.id)}
            onMove={onMoveClip}
            onResize={onResizeClip}
            onSplit={onSplitClip}
          />
        ))}
      </div>
    </div>
  );
};

export default TrackRow; 