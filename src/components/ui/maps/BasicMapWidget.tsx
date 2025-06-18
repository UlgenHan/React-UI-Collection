import React from 'react';

interface BasicMapWidgetProps {
  address?: string;
  width?: string;
  height?: string;
  zoom?: number;
  className?: string;
}

export const BasicMapWidget: React.FC<BasicMapWidgetProps> = ({
  address = 'New York, NY',
  width = '100%',
  height = '300px',
  zoom = 14,
  className = '',
}) => {
  // Using Google Maps Embed API (requires API key in production)
  const encodedAddress = encodeURIComponent(address);
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=demo&q=${encodedAddress}&zoom=${zoom}`;

  return (
    <div className={`relative rounded-lg overflow-hidden shadow-md border border-gray-200 ${className}`}>
      <div style={{ width, height }}>
        {/* Demo placeholder map */}
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Map Location</h3>
            <p className="text-sm text-gray-600">{address}</p>
            <p className="text-xs text-gray-500 mt-2">Interactive map preview</p>
          </div>
        </div>
      </div>
      
      {/* Map Controls Overlay */}
      <div className="absolute top-2 right-2 flex flex-col space-y-1">
        <button className="w-8 h-8 bg-white shadow-md rounded flex items-center justify-center hover:bg-gray-50">
          <span className="text-lg font-bold">+</span>
        </button>
        <button className="w-8 h-8 bg-white shadow-md rounded flex items-center justify-center hover:bg-gray-50">
          <span className="text-lg font-bold">-</span>
        </button>
      </div>

      {/* Location Info */}
      <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-3">
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium text-gray-800">{address}</span>
        </div>
      </div>
    </div>
  );
}; 