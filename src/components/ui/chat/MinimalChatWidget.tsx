import React, { useState } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

interface MinimalChatWidgetProps {
  className?: string;
}

export const MinimalChatWidget: React.FC<MinimalChatWidgetProps> = ({
  className = '',
}) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hello! How can I help?', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        text: inputValue, 
        sender: 'user' 
      }]);
      setInputValue('');
    }
  };

  return (
    <div className={`w-72 h-80 border rounded-lg bg-white ${className}`}>
      <div className="h-60 overflow-y-auto p-3 space-y-2">
        {messages.map((msg) => (
          <div key={msg.id} className={`text-sm p-2 rounded ${
            msg.sender === 'user' ? 'bg-blue-500 text-white ml-8' : 'bg-gray-200 mr-8'
          }`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="p-3 border-t flex">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 px-2 py-1 border rounded mr-2"
          placeholder="Type..."
        />
        <button onClick={handleSend} className="px-3 py-1 bg-blue-500 text-white rounded">
          Send
        </button>
      </div>
    </div>
  );
}; 