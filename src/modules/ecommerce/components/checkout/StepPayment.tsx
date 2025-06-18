import React from 'react';
import { StepProps } from './types';

const StepPayment: React.FC<StepProps> = ({ formData, setFormData }) => {
  const paymentMethods = [
    {
      id: 'credit_card',
      name: 'Credit Card',
      description: 'Visa, Mastercard, American Express',
      icon: '💳'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Pay with your PayPal account',
      icon: '🔵'
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      description: 'Pay when you receive your order',
      icon: '💰'
    }
  ];

  const handlePaymentMethodChange = (method: "credit_card" | "paypal" | "cod") => {
    setFormData({ paymentMethod: method });
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData({ [field]: value });
  };

  const isStepValid = () => {
    if (formData.paymentMethod === 'credit_card') {
      return (
        formData.cardNumber.trim() !== '' &&
        formData.cardExpiry.trim() !== '' &&
        formData.cardCvv.trim() !== '' &&
        formData.cardholderName.trim() !== ''
      );
    }
    return formData.paymentMethod !== undefined;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Information</h2>
        <p className="text-gray-600">Choose your preferred payment method</p>
      </div>

      {/* Payment Method Selection */}
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`
              border rounded-lg p-4 cursor-pointer transition-all duration-200
              ${formData.paymentMethod === method.id
                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                : 'border-gray-300 hover:border-gray-400'
              }
            `}
            onClick={() => handlePaymentMethodChange(method.id as "credit_card" | "paypal" | "cod")}
          >
            <div className="flex items-center space-x-4">
              <div className="text-2xl">{method.icon}</div>
              <div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    id={method.id}
                    checked={formData.paymentMethod === method.id}
                    onChange={() => handlePaymentMethodChange(method.id as "credit_card" | "paypal" | "cod")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor={method.id} className="text-lg font-medium text-gray-900 cursor-pointer">
                    {method.name}
                  </label>
                </div>
                <p className="text-gray-600 mt-1">{method.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Credit Card Form */}
      {formData.paymentMethod === 'credit_card' && (
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Credit Card Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card Number */}
            <div className="md:col-span-2">
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Card Number *
              </label>
              <input
                type="text"
                id="cardNumber"
                value={formData.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                placeholder="1234 5678 9012 3456"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={19}
              />
            </div>

            {/* Cardholder Name */}
            <div className="md:col-span-2">
              <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700 mb-1">
                Cardholder Name *
              </label>
              <input
                type="text"
                id="cardholderName"
                value={formData.cardholderName}
                onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date *
              </label>
              <input
                type="text"
                id="cardExpiry"
                value={formData.cardExpiry}
                onChange={(e) => handleInputChange('cardExpiry', e.target.value)}
                placeholder="MM/YY"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={5}
              />
            </div>

            {/* CVV */}
            <div>
              <label htmlFor="cardCvv" className="block text-sm font-medium text-gray-700 mb-1">
                CVV *
              </label>
              <input
                type="text"
                id="cardCvv"
                value={formData.cardCvv}
                onChange={(e) => handleInputChange('cardCvv', e.target.value)}
                placeholder="123"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={4}
              />
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-blue-800">
                Your payment information is secure and encrypted
              </span>
            </div>
          </div>
        </div>
      )}

      {/* PayPal Notice */}
      {formData.paymentMethod === 'paypal' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🔵</div>
            <div>
              <h4 className="font-medium text-blue-900">PayPal Payment</h4>
              <p className="text-sm text-blue-800">
                You will be redirected to PayPal to complete your payment after placing the order.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Cash on Delivery Notice */}
      {formData.paymentMethod === 'cod' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">💰</div>
            <div>
              <h4 className="font-medium text-yellow-900">Cash on Delivery</h4>
              <p className="text-sm text-yellow-800">
                Please have the exact amount ready when your order is delivered.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepPayment; 