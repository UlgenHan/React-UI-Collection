import React from 'react';
import { StepProps } from './types';

const StepDelivery: React.FC<StepProps> = ({ formData, setFormData }) => {
  const deliveryOptions = [
    {
      id: 'standard',
      name: 'Standard Delivery',
      description: '5-7 business days',
      price: 0,
      icon: '🚚'
    },
    {
      id: 'express',
      name: 'Express Delivery',
      description: '2-3 business days',
      price: 9.99,
      icon: '⚡'
    },
    {
      id: 'overnight',
      name: 'Overnight Delivery',
      description: 'Next business day',
      price: 19.99,
      icon: '🛩️'
    }
  ];

  const handleDeliveryChange = (method: "standard" | "express" | "overnight") => {
    setFormData({ deliveryMethod: method });
  };

  const isStepValid = () => {
    return formData.deliveryMethod !== undefined;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Delivery Method</h2>
        <p className="text-gray-600">Choose your preferred delivery option</p>
      </div>

      <div className="space-y-4">
        {deliveryOptions.map((option) => (
          <div
            key={option.id}
            className={`
              border rounded-lg p-4 cursor-pointer transition-all duration-200
              ${formData.deliveryMethod === option.id
                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                : 'border-gray-300 hover:border-gray-400'
              }
            `}
            onClick={() => handleDeliveryChange(option.id as "standard" | "express" | "overnight")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{option.icon}</div>
                <div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      id={option.id}
                      checked={formData.deliveryMethod === option.id}
                      onChange={() => handleDeliveryChange(option.id as "standard" | "express" | "overnight")}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor={option.id} className="text-lg font-medium text-gray-900 cursor-pointer">
                      {option.name}
                    </label>
                  </div>
                  <p className="text-gray-600 mt-1">{option.description}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-semibold text-gray-900">
                  {option.price === 0 ? 'Free' : `$${option.price.toFixed(2)}`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Special Instructions */}
      <div>
        <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mb-1">
          Special Instructions (Optional)
        </label>
        <textarea
          id="specialInstructions"
          value={formData.specialInstructions}
          onChange={(e) => setFormData({ specialInstructions: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Any special delivery instructions..."
        />
      </div>

      {/* Delivery Summary */}
      {formData.deliveryMethod && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Delivery Summary</h3>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              {deliveryOptions.find(opt => opt.id === formData.deliveryMethod)?.name}
            </span>
            <span className="font-medium">
              {deliveryOptions.find(opt => opt.id === formData.deliveryMethod)?.price === 0 
                ? 'Free' 
                : `$${deliveryOptions.find(opt => opt.id === formData.deliveryMethod)?.price.toFixed(2)}`
              }
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepDelivery; 