import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEcommerceStore } from '../store';

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orders } = useEcommerceStore();
  
  const orderId = location.state?.orderId;
  const order = orders.find(o => o.id === orderId);

  // Confetti animation effect
  useEffect(() => {
    if (order) {
      // Simple confetti effect using CSS
      const createConfetti = () => {
        const colors = ['#f56565', '#4299e1', '#48bb78', '#ed8936', '#9f7aea'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
          const confetti = document.createElement('div');
          confetti.style.position = 'fixed';
          confetti.style.left = Math.random() * 100 + 'vw';
          confetti.style.top = '-10px';
          confetti.style.width = '10px';
          confetti.style.height = '10px';
          confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          confetti.style.borderRadius = '50%';
          confetti.style.pointerEvents = 'none';
          confetti.style.zIndex = '9999';
          confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear forwards`;
          
          document.body.appendChild(confetti);
          
          // Remove confetti after animation
          setTimeout(() => {
            document.body.removeChild(confetti);
          }, 5000);
        }
      };

      createConfetti();
    }
  }, [order]);

  // Add confetti CSS animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes confetti-fall {
        to {
          transform: translateY(100vh) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
          <p className="text-gray-600 mb-6">The order you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/ecommerce/products')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const formatOrderNumber = (id: string) => {
    // Convert order ID to a more readable format
    const timestamp = new Date(order.createdAt).getTime();
    const randomPart = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `ECO-${timestamp.toString().slice(-6)}-${randomPart}`;
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-green-600 mb-4">Thank You for Your Order!</h1>
        <p className="text-xl text-gray-600 mb-2">Your order has been received and is being processed.</p>
        <p className="text-lg text-gray-500">Order #{formatOrderNumber(order.id)}</p>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
        
        {/* Order Items */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Items Ordered</h3>
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500 text-sm">📦</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Product #{item.productId}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${(item.quantity * 29.99).toFixed(2)}</p>
                  <p className="text-sm text-gray-600">${29.99} each</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Customer Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Customer Information</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p><span className="font-medium">Name:</span> {order.customerInfo.name}</p>
              <p><span className="font-medium">Email:</span> {order.customerInfo.email}</p>
              <p><span className="font-medium">Phone:</span> {order.customerInfo.phone}</p>
            </div>
          </div>

          {/* Shipping Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Shipping Address</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Order Date:</span>
              <p className="text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Order Status:</span>
              <p className="text-gray-600">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                  {order.status}
                </span>
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Total Amount:</span>
              <p className="text-lg font-bold text-green-600">${order.total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">What's Next?</h2>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
              1
            </div>
            <p>You'll receive an order confirmation email shortly</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
              2
            </div>
            <p>We'll process your order and send you tracking information</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
              3
            </div>
            <p>Your order will be shipped within 1-2 business days</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => navigate('/ecommerce/products')}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Continue Shopping
        </button>
        <button
          onClick={() => navigate('/ecommerce/orders')}
          className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
        >
          View Orders
        </button>
      </div>

      {/* Email Confirmation Notice */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center space-x-2 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          <span className="text-sm text-green-800">
            A confirmation email has been sent to {order.customerInfo.email}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation; 