import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ecommerceRoutes } from './routes';

// Example of how to integrate the e-commerce module into your main application
const ExampleApp: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {/* Main Navigation */}
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="text-xl font-bold text-gray-900">
                  My App
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link 
                  to="/ecommerce" 
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  E-commerce
                </Link>
                <Link 
                  to="/other-feature" 
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Other Feature
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            {/* Home Route */}
            <Route path="/" element={
              <div className="text-center py-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Welcome to My App
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  This is an example of how to integrate the e-commerce module.
                </p>
                <Link 
                  to="/ecommerce" 
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Go to E-commerce
                </Link>
              </div>
            } />

            {/* E-commerce Routes */}
            {ecommerceRoutes}

            {/* Other Routes */}
            <Route path="/other-feature" element={
              <div className="bg-white rounded-lg shadow p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Other Feature</h1>
                <p className="text-gray-600">This is another feature of your application.</p>
              </div>
            } />

            {/* 404 Route */}
            <Route path="*" element={
              <div className="text-center py-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
                <p className="text-lg text-gray-600 mb-8">
                  The page you're looking for doesn't exist.
                </p>
                <Link 
                  to="/" 
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Go Home
                </Link>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default ExampleApp; 