import React from 'react';

export const InteractiveMapWidget: React.FC = () => (
  <div className="w-80 h-64 bg-white border rounded-lg shadow-lg overflow-hidden">
    <div className="bg-teal-600 text-white p-3">
      <h3 className="font-semibold">Interactive Map</h3>
    </div>
    <div className="h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
      <div className="text-center text-gray-600">
        <div className="w-16 h-16 bg-teal-100 rounded-full mx-auto mb-3 flex items-center justify-center">🗺️</div>
        <p>Interactive Map Component</p>
      </div>
    </div>
  </div>
);

export const LocationMapWidget: React.FC = () => (
  <div className="w-80 h-64 bg-white border rounded-lg shadow-lg overflow-hidden">
    <div className="bg-red-600 text-white p-3">
      <h3 className="font-semibold">Location Map</h3>
    </div>
    <div className="h-full bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center">
      <div className="text-center text-gray-600">
        <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-3 flex items-center justify-center">📍</div>
        <p>Location Map Component</p>
      </div>
    </div>
  </div>
);

export const RouteMapWidget: React.FC = () => (
  <div className="w-80 h-64 bg-white border rounded-lg shadow-lg overflow-hidden">
    <div className="bg-blue-600 text-white p-3">
      <h3 className="font-semibold">Route Map</h3>
    </div>
    <div className="h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
      <div className="text-center text-gray-600">
        <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">🛣️</div>
        <p>Route Map Component</p>
      </div>
    </div>
  </div>
);

export const GeolocationMapWidget: React.FC = () => (
  <div className="w-80 h-64 bg-white border rounded-lg shadow-lg overflow-hidden">
    <div className="bg-green-600 text-white p-3">
      <h3 className="font-semibold">Geolocation Map</h3>
    </div>
    <div className="h-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
      <div className="text-center text-gray-600">
        <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center">🎯</div>
        <p>Geolocation Map Component</p>
      </div>
    </div>
  </div>
);

export const CustomMarkersMapWidget: React.FC = () => (
  <div className="w-80 h-64 bg-white border rounded-lg shadow-lg overflow-hidden">
    <div className="bg-purple-600 text-white p-3">
      <h3 className="font-semibold">Custom Markers</h3>
    </div>
    <div className="h-full bg-gradient-to-br from-purple-100 to-violet-100 flex items-center justify-center">
      <div className="text-center text-gray-600">
        <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-3 flex items-center justify-center">📌</div>
        <p>Custom Markers Component</p>
      </div>
    </div>
  </div>
);

export const HeatmapWidget: React.FC = () => (
  <div className="w-80 h-64 bg-white border rounded-lg shadow-lg overflow-hidden">
    <div className="bg-orange-600 text-white p-3">
      <h3 className="font-semibold">Heatmap</h3>
    </div>
    <div className="h-full bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center">
      <div className="text-center text-gray-600">
        <div className="w-16 h-16 bg-orange-100 rounded-full mx-auto mb-3 flex items-center justify-center">🔥</div>
        <p>Heatmap Component</p>
      </div>
    </div>
  </div>
);

export const ClusterMapWidget: React.FC = () => (
  <div className="w-80 h-64 bg-white border rounded-lg shadow-lg overflow-hidden">
    <div className="bg-indigo-600 text-white p-3">
      <h3 className="font-semibold">Cluster Map</h3>
    </div>
    <div className="h-full bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
      <div className="text-center text-gray-600">
        <div className="w-16 h-16 bg-indigo-100 rounded-full mx-auto mb-3 flex items-center justify-center">🪩</div>
        <p>Cluster Map Component</p>
      </div>
    </div>
  </div>
);

export const DarkModeMapWidget: React.FC = () => (
  <div className="w-80 h-64 bg-gray-900 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
    <div className="bg-gray-800 text-white p-3">
      <h3 className="font-semibold">Dark Map</h3>
    </div>
    <div className="h-full bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
      <div className="text-center text-gray-400">
        <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-3 flex items-center justify-center">🌙</div>
        <p>Dark Mode Map Component</p>
      </div>
    </div>
  </div>
);

export const FullscreenMapWidget: React.FC = () => (
  <div className="w-80 h-64 bg-white border rounded-lg shadow-lg overflow-hidden">
    <div className="bg-gray-600 text-white p-3">
      <h3 className="font-semibold">Fullscreen Map</h3>
    </div>
    <div className="h-full bg-gradient-to-br from-gray-100 to-slate-100 flex items-center justify-center">
      <div className="text-center text-gray-600">
        <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center">⛶</div>
        <p>Fullscreen Map Component</p>
      </div>
    </div>
  </div>
); 