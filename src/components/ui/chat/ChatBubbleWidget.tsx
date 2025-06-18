import React from 'react';

export const ChatBubbleWidget: React.FC = () => (
  <div className="w-80 h-96 bg-white border rounded-lg shadow-lg">
    <div className="bg-pink-600 text-white p-3 rounded-t-lg">
      <h3 className="font-semibold">Chat Bubbles</h3>
    </div>
    <div className="p-4 text-center text-gray-500">
      <div className="w-16 h-16 bg-pink-100 rounded-full mx-auto mb-3 flex items-center justify-center">💬</div>
      <p>Chat Bubble Component</p>
    </div>
  </div>
);

export const DarkModeChatWidget: React.FC = () => (
  <div className="w-80 h-96 bg-gray-900 border border-gray-700 rounded-lg shadow-lg">
    <div className="bg-gray-800 text-white p-3 rounded-t-lg">
      <h3 className="font-semibold">Dark Chat</h3>
    </div>
    <div className="p-4 text-center text-gray-400">
      <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-3 flex items-center justify-center">🌙</div>
      <p>Dark Mode Chat Component</p>
    </div>
  </div>
);

export const CustomizableChatWidget: React.FC = () => (
  <div className="w-80 h-96 bg-white border rounded-lg shadow-lg">
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-t-lg">
      <h3 className="font-semibold">Custom Chat</h3>
    </div>
    <div className="p-4 text-center text-gray-500">
      <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mx-auto mb-3 flex items-center justify-center">⚙️</div>
      <p>Customizable Chat Component</p>
    </div>
  </div>
); 