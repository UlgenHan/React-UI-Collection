import React from 'react';
import {
  BasicChatWidget,
  MinimalChatWidget,
  FloatingChatWidget,
} from '../components';

const ChatGallery: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Chat Widgets</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Interactive chat components for customer support, live chat, and messaging interfaces.
          </p>
        </div>

        {/* Chat Components Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {/* Basic Chat Widget */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Chat Widget</h3>
            <div className="flex justify-center">
              <BasicChatWidget title="Support Chat" />
            </div>
            <p className="text-sm text-gray-600 mt-4">Simple chat interface with message history and input field.</p>
          </div>

          {/* Minimal Chat Widget */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Minimal Chat Widget</h3>
            <div className="flex justify-center">
              <MinimalChatWidget />
            </div>
            <p className="text-sm text-gray-600 mt-4">Clean and simple chat interface with minimal styling.</p>
          </div>

          {/* Floating Chat Widget */}
          <div className="bg-white rounded-lg shadow-md p-6 relative h-96">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Floating Chat Widget</h3>
            <div className="text-center text-gray-500 mt-8">
              <p>Check the bottom-right corner →</p>
              <p className="text-sm mt-2">Interactive floating chat button</p>
            </div>
            <FloatingChatWidget position="bottom-right" />
            <p className="text-sm text-gray-600 mt-4 absolute bottom-6 left-6 right-6">
              Floating chat button that expands into a full chat interface.
            </p>
          </div>

          {/* Additional Placeholder Components */}
          {[
            { name: 'Support Chat Widget', description: 'Specialized chat for customer support with agent status.' },
            { name: 'Team Chat Widget', description: 'Internal team messaging with presence indicators.' },
            { name: 'AI Chat Widget', description: 'AI-powered chatbot with smart responses.' },
            { name: 'Customer Chat Widget', description: 'Customer service chat with ticket integration.' },
            { name: 'Chat Bubble Widget', description: 'Simple bubble-style chat interface.' },
            { name: 'Dark Mode Chat Widget', description: 'Chat widget optimized for dark themes.' },
            { name: 'Customizable Chat Widget', description: 'Highly customizable chat with themes and options.' }
          ].map((component, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{component.name}</h3>
              <div className="bg-gray-100 rounded-lg p-8 mb-4 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600">Chat Widget Preview</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">{component.description}</p>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Chat Widget Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">💬 Real-time Messaging</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Live message updates</li>
                <li>• Typing indicators</li>
                <li>• Message status</li>
                <li>• Auto-scroll to latest</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">🎨 Customization</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Custom themes</li>
                <li>• Brand colors</li>
                <li>• Avatar customization</li>
                <li>• Position controls</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">🚀 Performance</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Lightweight components</li>
                <li>• Efficient rendering</li>
                <li>• Mobile optimized</li>
                <li>• Accessibility support</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Usage Guidelines */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Usage Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">When to Use</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Customer support portals</li>
                <li>• E-commerce assistance</li>
                <li>• Internal team communication</li>
                <li>• Chatbot interfaces</li>
                <li>• Live help systems</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Best Practices</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Keep messages concise</li>
                <li>• Provide clear call-to-actions</li>
                <li>• Use appropriate positioning</li>
                <li>• Implement proper error handling</li>
                <li>• Consider mobile experience</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatGallery; 