import React from 'react';
import { HeaderBaseProps } from '../../../types';

export interface VerticalNavHeaderProps extends HeaderBaseProps {
  orientation?: 'left' | 'right';
  width?: string;
}

const VerticalNavHeader: React.FC<VerticalNavHeaderProps> = ({
  logo = { text: 'Vertical' },
  navItems = [],
  orientation = 'left',
  width = 'w-64',
  bgColor = 'bg-gray-900',
  className = '',
  id
}) => {
  const sidebarClasses = `
    fixed top-0 h-screen ${width} ${bgColor} text-white z-50 overflow-y-auto
    ${orientation === 'left' ? 'left-0' : 'right-0'}
    ${className}
  `.trim();

  const contentClasses = `
    ${orientation === 'left' ? `ml-64` : `mr-64`}
    min-h-screen bg-gray-50
  `;

  return (
    <>
      {/* Vertical Sidebar */}
      <aside id={id} className={sidebarClasses}>
        <div className="p-6">
          {/* Logo */}
          <div className="mb-8">
            <div className="text-2xl font-bold text-white">
              {logo?.text}
            </div>
            <div className="text-sm text-gray-400 mt-1">
              Navigation Menu
            </div>
          </div>

          {/* Navigation */}
          <nav>
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className={`
                      flex items-center px-4 py-3 rounded-lg transition-all duration-200 group
                      ${item.isActive 
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }
                    `}
                  >
                    <div className="w-5 h-5 mr-3">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <span className="font-medium">{item.label}</span>
                    {item.isActive && (
                      <div className="ml-auto">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Profile Section */}
          <div className="mt-auto pt-8 border-t border-gray-700">
            <div className="flex items-center px-4 py-3 rounded-lg bg-gray-800">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">JD</span>
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-white">John Doe</div>
                <div className="text-xs text-gray-400">Administrator</div>
              </div>
              <div className="ml-auto">
                <button className="text-gray-400 hover:text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 px-4 py-3 text-center">
            <div className="text-xs text-gray-500">
              © 2024 {logo?.text}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={contentClasses}>
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back! Here's what's happening.</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="relative p-2 text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM5 7h14v10H5z" />
                  </svg>
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Demo Content */}
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Card {item}
                </h3>
                <p className="text-gray-600">
                  This is sample content to demonstrate the vertical navigation layout.
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default VerticalNavHeader; 