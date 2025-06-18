import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h1>
        <p className="text-gray-600">Welcome to your E-commerce dashboard. This is where you can view your store's performance and manage your business.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900">Total Sales</h3>
          <p className="text-3xl font-bold text-blue-600">$12,345</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900">Orders</h3>
          <p className="text-3xl font-bold text-green-600">156</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900">Products</h3>
          <p className="text-3xl font-bold text-purple-600">89</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900">Customers</h3>
          <p className="text-3xl font-bold text-orange-600">1,234</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 