import React from 'react';
import {
  BasicMapWidget,
} from '../components';

const MapGallery: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Map Widgets</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Interactive map components for location display, navigation, and geographic data visualization.
          </p>
        </div>

        {/* Map Components Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Basic Map Widget */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Map Widget</h3>
            <BasicMapWidget address="San Francisco, CA" height="200px" />
            <p className="text-sm text-gray-600 mt-4">Simple map display with location marker and basic controls.</p>
          </div>

          {/* Additional Map Components */}
          {[
            { 
              name: 'Interactive Map Widget', 
              description: 'Fully interactive map with zoom, pan, and marker controls.',
              demo: 'New York, NY'
            },
            { 
              name: 'Location Map Widget', 
              description: 'Map focused on a specific location with detailed info.',
              demo: 'London, UK'
            },
            { 
              name: 'Route Map Widget', 
              description: 'Map showing directions between two or more points.',
              demo: 'Route Planning'
            },
            { 
              name: 'Custom Marker Map Widget', 
              description: 'Map with custom markers and popup information.',
              demo: 'Custom Markers'
            },
            { 
              name: 'Satellite Map Widget', 
              description: 'Satellite view map for detailed geographical information.',
              demo: 'Satellite View'
            },
            { 
              name: 'Embedded Map Widget', 
              description: 'Embeddable map iframe for easy integration.',
              demo: 'Embedded Map'
            },
            { 
              name: 'Responsive Map Widget', 
              description: 'Map that adapts to different screen sizes.',
              demo: 'Responsive Design'
            },
            { 
              name: 'Dark Mode Map Widget', 
              description: 'Map optimized for dark theme interfaces.',
              demo: 'Dark Theme'
            },
            { 
              name: 'Minimal Map Widget', 
              description: 'Simple map with minimal UI elements.',
              demo: 'Minimal Design'
            }
          ].map((component, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{component.name}</h3>
              
              {/* Map Preview */}
              <div className="relative rounded-lg overflow-hidden shadow-md border border-gray-200 mb-4">
                <div style={{ width: '100%', height: '200px' }}>
                  <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-red-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-gray-700">{component.demo}</p>
                      <p className="text-xs text-gray-500 mt-1">Map Preview</p>
                    </div>
                  </div>
                </div>
                
                {/* Map Controls */}
                <div className="absolute top-2 right-2 flex flex-col space-y-1">
                  <button className="w-6 h-6 bg-white shadow-sm rounded flex items-center justify-center text-xs">+</button>
                  <button className="w-6 h-6 bg-white shadow-sm rounded flex items-center justify-center text-xs">-</button>
                </div>
              </div>
              
              <p className="text-sm text-gray-600">{component.description}</p>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Map Widget Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">🗺️ Map Types</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Standard street maps</li>
                <li>• Satellite imagery</li>
                <li>• Terrain visualization</li>
                <li>• Hybrid map views</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">📍 Interactive Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Custom markers</li>
                <li>• Info popup windows</li>
                <li>• Route planning</li>
                <li>• Location search</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">⚙️ Customization</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Custom styling</li>
                <li>• Responsive design</li>
                <li>• API integration</li>
                <li>• Theme support</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Integration Options */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Map Service Integration</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-green-500 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <span className="text-white font-bold">G</span>
              </div>
              <h4 className="font-semibold">Google Maps</h4>
              <p className="text-sm text-gray-600 mt-1">Full-featured mapping with Google's data</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-blue-500 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <span className="text-white font-bold">M</span>
              </div>
              <h4 className="font-semibold">Mapbox</h4>
              <p className="text-sm text-gray-600 mt-1">Customizable maps with vector tiles</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-orange-500 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <span className="text-white font-bold">L</span>
              </div>
              <h4 className="font-semibold">Leaflet</h4>
              <p className="text-sm text-gray-600 mt-1">Open-source interactive maps</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-purple-500 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <span className="text-white font-bold">O</span>
              </div>
              <h4 className="font-semibold">OpenStreetMap</h4>
              <p className="text-sm text-gray-600 mt-1">Community-driven mapping data</p>
            </div>
          </div>
        </div>

        {/* Usage Guidelines */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Usage Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Common Use Cases</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Store locators</li>
                <li>• Delivery tracking</li>
                <li>• Event locations</li>
                <li>• Property listings</li>
                <li>• Travel planning</li>
                <li>• Contact pages</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Best Practices</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Provide fallback for slow connections</li>
                <li>• Use appropriate zoom levels</li>
                <li>• Include accessibility features</li>
                <li>• Consider mobile touch interactions</li>
                <li>• Respect user privacy settings</li>
                <li>• Optimize for performance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapGallery; 