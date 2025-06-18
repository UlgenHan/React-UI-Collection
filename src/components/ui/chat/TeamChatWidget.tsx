import React from 'react';

export const TeamChatWidget: React.FC = () => (
  <div className="w-80 h-96 bg-white border rounded-lg shadow-lg">
    <div className="bg-green-600 text-white p-3 rounded-t-lg">
      <h3 className="font-semibold">Team Chat</h3>
    </div>
    <div className="p-4 text-center text-gray-500">
      <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center">👥</div>
      <p>Team Chat Component</p>
    </div>
  </div>
); 