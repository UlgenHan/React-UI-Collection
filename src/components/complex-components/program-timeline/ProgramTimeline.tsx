import React, { useState, useRef, useEffect } from 'react';
import TimeRuler from './TimeRuler';
import TrackRow from './TrackRow';
import Playhead from './Playhead';

export type ClipType = 'audio' | 'video';
export interface ClipData {
  id: string;
  startTime: number;
  endTime: number;
  label: string;
  type: ClipType;
}

export interface TrackData {
  id: string;
  label: string;
  clips: ClipData[];
}

interface ProgramTimelineProps {
  tracks: TrackData[];
  duration: number;
}

const DEFAULT_ZOOM = 100; // px per 10s

const ProgramTimeline: React.FC<ProgramTimelineProps> = ({ tracks, duration }) => {
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const requestRef = useRef<number | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Playback logic
  useEffect(() => {
    if (!playing) return;
    const start = performance.now();
    const startTime = currentTime;
    const animate = (now: number) => {
      const elapsed = (now - start) / 1000;
      let newTime = startTime + elapsed;
      if (newTime > duration) newTime = duration;
      setCurrentTime(newTime);
      if (newTime < duration) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        setPlaying(false);
      }
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [playing]);

  // Zoom controls
  const handleZoomIn = () => setZoom(z => Math.min(z * 1.25, 800));
  const handleZoomOut = () => setZoom(z => Math.max(z * 0.8, 20));

  // Play/pause controls
  const handlePlayPause = () => setPlaying(p => !p);
  const handleStop = () => { setPlaying(false); setCurrentTime(0); };

  return (
    <div className="w-full max-w-full overflow-x-auto bg-gray-50 rounded shadow p-4">
      <div className="flex items-center mb-2 gap-2">
        <button onClick={handlePlayPause} className="px-3 py-1 bg-blue-600 text-white rounded">{playing ? 'Pause' : 'Play'}</button>
        <button onClick={handleStop} className="px-3 py-1 bg-gray-300 rounded">Stop</button>
        <button onClick={handleZoomIn} className="px-2 py-1 bg-gray-200 rounded">+</button>
        <button onClick={handleZoomOut} className="px-2 py-1 bg-gray-200 rounded">-</button>
        <span className="ml-4 text-sm text-gray-700">Current: {currentTime.toFixed(1)}s / {duration}s</span>
      </div>
      <div ref={timelineRef} className="relative w-full" style={{ minWidth: duration * zoom / 10 + 100 }}>
        <TimeRuler duration={duration} zoom={zoom} />
        <div className="relative">
          {tracks.map((track, idx) => (
            <TrackRow
              key={track.id}
              track={track}
              zoom={zoom}
              rowIndex={idx}
              timelineDuration={duration}
            />
          ))}
          <Playhead currentTime={currentTime} zoom={zoom} />
        </div>
      </div>
      {/* Placeholder: snapping, exporting, media preview, etc. */}
    </div>
  );
};

export default ProgramTimeline; 