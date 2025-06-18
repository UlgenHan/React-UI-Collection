import React from 'react';
import TimelineEditor from '../components/complex-components/timeline-editor/TimelineEditor';

const TimelineEditorGallery: React.FC = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold mb-2">Timeline Editor Component Gallery</h1>
      <p className="text-gray-700 mb-6 max-w-2xl">
        A professional-grade, CapCut-style media timeline editor. Built with React, TypeScript, and Tailwind CSS. Supports multi-track editing, draggable and resizable clips, zoomable grid, and advanced editing interactions. Ready for future features like snapping, splitting, and keyboard controls.
      </p>
      <div className="bg-white rounded shadow border p-6">
        <TimelineEditor />
      </div>
      {/* Add more feature demos here as you expand functionality */}
    </div>
  );
};

export default TimelineEditorGallery; 