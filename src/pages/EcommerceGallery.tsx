import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ecommerceRoutes } from '../modules/ecommerce/routes';

const EcommerceGallery: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <BrowserRouter>
        <Routes>
          {ecommerceRoutes}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default EcommerceGallery; 