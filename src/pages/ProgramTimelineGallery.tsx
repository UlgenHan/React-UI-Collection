import React from 'react';
import ProgramTimeline, { TrackData } from '../components/complex-components/program-timeline/ProgramTimeline';

const mockTracks: TrackData[] = [
  {
    id: 'track1',
    label: 'Video Track',
    clips: [
      { id: 'v1', startTime: 0, endTime: 20, label: 'Intro Video', type: 'video' },
      { id: 'v2', startTime: 25, endTime: 50, label: 'Main Scene', type: 'video' },
    ],
  },
  {
    id: 'track2',
    label: 'Audio Track',
    clips: [
      { id: 'a1', startTime: 5, endTime: 30, label: 'Background Music', type: 'audio' },
      { id: 'a2', startTime: 35, endTime: 55, label: 'Voiceover', type: 'audio' },
    ],
  },
  {
    id: 'track3',
    label: 'SFX',
    clips: [
      { id: 's1', startTime: 15, endTime: 18, label: 'Door Slam', type: 'audio' },
      { id: 's2', startTime: 40, endTime: 42, label: 'Laugh', type: 'audio' },
    ],
  },
];

const TIMELINE_DURATION = 60; // seconds

const ProgramTimelineGallery: React.FC = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold mb-2">Program Timeline Component Gallery</h1>
      <p className="text-gray-700 mb-6 max-w-2xl">
        A modular, draggable, and zoomable horizontal timeline for video/audio editing. Built with React, TypeScript, and Tailwind CSS. Supports multiple tracks, media types, and playback preview. Ready for advanced features like snapping, exporting, and media preview.
      </p>
      <div className="bg-white rounded shadow border p-6">
        <ProgramTimeline tracks={mockTracks} duration={TIMELINE_DURATION} />
      </div>
      {/* Add more feature demos here as you expand functionality */}
    </div>
  );
};

export default ProgramTimelineGallery; 