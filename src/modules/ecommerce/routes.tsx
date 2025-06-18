import React from 'react';
import { Route } from 'react-router-dom';
import EcommerceLayout from './layout/EcommerceLayout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import OrderConfirmation from './pages/OrderConfirmation';
import AdminDashboard from './pages/AdminDashboard';

export const ecommerceRoutes = (
  <Route path="/ecommerce" element={<EcommerceLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="products" element={<Products />} />
    <Route path="product/:id" element={<ProductDetail />} />
    <Route path="cart" element={<Cart />} />
    <Route path="checkout" element={<Checkout />} />
    <Route path="order-confirmation" element={<OrderConfirmation />} />
    <Route path="orders" element={<Orders />} />
    <Route path="admin" element={<AdminDashboard />} />
  </Route>
);

// Alternative export for use with createBrowserRouter
export const ecommerceRouteConfig = {
  path: "/ecommerce",
  element: <EcommerceLayout />,
  children: [
    { index: true, element: <Dashboard /> },
    { path: "dashboard", element: <Dashboard /> },
    { path: "products", element: <Products /> },
    { path: "product/:id", element: <ProductDetail /> },
    { path: "cart", element: <Cart /> },
    { path: "checkout", element: <Checkout /> },
    { path: "order-confirmation", element: <OrderConfirmation /> },
    { path: "orders", element: <Orders /> },
    { path: "admin", element: <AdminDashboard /> },
  ]
}; 