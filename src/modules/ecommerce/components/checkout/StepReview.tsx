import React from 'react';
import { StepProps } from './types';
import { useEcommerceStore, getCartItemsWithProducts } from '../../store';

const StepReview: React.FC<StepProps> = ({ formData, setFormData }) => {
  const { getCartTotal, clearCart } = useEcommerceStore();
  const cartItems = getCartItemsWithProducts();
  const cartTotal = getCartTotal();

  const getDeliveryPrice = () => {
    switch (formData.deliveryMethod) {
      case 'express': return 9.99;
      case 'overnight': return 19.99;
      default: return 0;
    }
  };

  const getDeliveryName = () => {
    switch (formData.deliveryMethod) {
      case 'express': return 'Express Delivery (2-3 business days)';
      case 'overnight': return 'Overnight Delivery (Next business day)';
      default: return 'Standard Delivery (5-7 business days)';
    }
  };

  const getPaymentMethodName = () => {
    switch (formData.paymentMethod) {
      case 'credit_card': return 'Credit Card';
      case 'paypal': return 'PayPal';
      case 'cod': return 'Cash on Delivery';
      default: return '';
    }
  };

  const deliveryPrice = getDeliveryPrice();
  const tax = (cartTotal + deliveryPrice) * 0.08;
  const total = cartTotal + deliveryPrice + tax;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Confirm</h2>
        <p className="text-gray-600">Please review your order details before placing your order</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.productId} className="flex items-center space-x-4 py-2 border-b border-gray-100 last:border-b-0">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{item.product.name}</h4>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h3>
            <div className="space-y-2 text-sm">
              <p className="font-medium text-gray-900">
                {formData.firstName} {formData.lastName}
              </p>
              <p className="text-gray-600">{formData.email}</p>
              <p className="text-gray-600">{formData.phone}</p>
              <p className="text-gray-600">{formData.address}</p>
              <p className="text-gray-600">
                {formData.city}, {formData.state} {formData.zipCode}
              </p>
              <p className="text-gray-600">{formData.country}</p>
            </div>
          </div>

          {/* Delivery & Payment */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery & Payment</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Method:</span>
                <span className="font-medium">{getDeliveryName()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium">{getPaymentMethodName()}</span>
              </div>
              {formData.specialInstructions && (
                <div>
                  <span className="text-gray-600">Special Instructions:</span>
                  <p className="text-gray-900 mt-1">{formData.specialInstructions}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery:</span>
                <span className="font-medium">
                  {deliveryPrice === 0 ? 'Free' : `$${deliveryPrice.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (8%):</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span className="text-blue-600">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Order Confirmation */}
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-green-800 font-medium">
                  Your order is ready to be placed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepReview; 