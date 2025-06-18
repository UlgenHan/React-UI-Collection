import React from 'react';

interface SupportChatWidgetProps {
  className?: string;
}

export const SupportChatWidget: React.FC<SupportChatWidgetProps> = ({
  className = '',
}) => {
  return (
    <div className={`w-80 h-96 bg-white border rounded-lg shadow-lg ${className}`}>
      <div className="bg-blue-600 text-white p-3 rounded-t-lg">
        <h3 className="font-semibold">Support Chat</h3>
        <p className="text-sm opacity-90">Agent is online</p>
      </div>
      <div className="p-4 text-center text-gray-500">
        <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
          🎧
        </div>
        <p>Support Chat Component</p>
      </div>
    </div>
  );
}; 