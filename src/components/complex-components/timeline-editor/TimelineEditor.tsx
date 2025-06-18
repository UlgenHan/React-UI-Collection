import React from 'react';
import TimelineGrid from './TimelineGrid';
import TrackRow from './TrackRow';
import Playhead from './Playhead';
import { useTimelineState } from './useTimelineState';

const TimelineEditor: React.FC = () => {
  const {
    tracks,
    clips,
    playheadTime,
    zoomLevel,
    selectedClipId,
    setZoomLevel,
    setPlayheadTime,
    selectClip,
    moveClip,
    resizeClip,
    splitClip,
    addTrack,
    removeTrack,
  } = useTimelineState();

  return (
    <div className="w-full bg-gray-50 rounded shadow p-4">
      <div className="mb-2 flex items-center gap-2">
        <button onClick={() => setZoomLevel(z => Math.max(z - 1, 1))} className="px-2 py-1 bg-gray-200 rounded">-</button>
        <button onClick={() => setZoomLevel(z => Math.min(z + 1, 10))} className="px-2 py-1 bg-gray-200 rounded">+</button>
        <span className="ml-4 text-sm text-gray-700">Zoom: {zoomLevel}</span>
      </div>
      <div className="relative w-full overflow-x-auto" style={{ minWidth: 800 }}>
        <TimelineGrid zoomLevel={zoomLevel} />
        <div className="relative">
          {tracks.map((track, idx) => (
            <TrackRow
              key={track.id}
              track={track}
              clips={clips.filter(c => c.trackId === track.id)}
              zoomLevel={zoomLevel}
              selectedClipId={selectedClipId}
              onSelectClip={selectClip}
              onMoveClip={moveClip}
              onResizeClip={resizeClip}
              onSplitClip={splitClip}
            />
          ))}
          <Playhead playheadTime={playheadTime} zoomLevel={zoomLevel} />
        </div>
      </div>
      {/* Placeholders: add/remove track, keyboard controls, snapping, etc. */}
    </div>
  );
};

export default TimelineEditor; 