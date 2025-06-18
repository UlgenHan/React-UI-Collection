import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEcommerceStore, getCartItemsWithProducts } from '../store';
import {
  StepIndicator,
  StepShipping,
  StepDelivery,
  StepPayment,
  StepReview,
  CheckoutForm
} from '../components/checkout';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { getCartTotal, addOrder, clearCart } = useEcommerceStore();
  const cartItems = getCartItemsWithProducts();
  const cartTotal = getCartTotal();

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/ecommerce/cart');
    }
  }, [cartItems.length, navigate]);

  // Form state
  const [formData, setFormData] = useState<CheckoutForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    deliveryMethod: 'standard',
    paymentMethod: 'credit_card',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardholderName: '',
    saveInfo: false,
    specialInstructions: ''
  });

  // Step state
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { number: 1, label: 'Shipping', component: StepShipping },
    { number: 2, label: 'Delivery', component: StepDelivery },
    { number: 3, label: 'Payment', component: StepPayment },
    { number: 4, label: 'Review', component: StepReview }
  ];

  const updateFormData = (data: Partial<CheckoutForm>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 0: // Shipping
        return (
          formData.firstName.trim() !== '' &&
          formData.lastName.trim() !== '' &&
          formData.email.trim() !== '' &&
          formData.phone.trim() !== '' &&
          formData.address.trim() !== '' &&
          formData.city.trim() !== '' &&
          formData.state.trim() !== '' &&
          formData.zipCode.trim() !== '' &&
          formData.country.trim() !== ''
        );
      case 1: // Delivery
        return formData.deliveryMethod !== undefined;
      case 2: // Payment
        if (formData.paymentMethod === 'credit_card') {
          return (
            formData.cardNumber.trim() !== '' &&
            formData.cardExpiry.trim() !== '' &&
            formData.cardCvv.trim() !== '' &&
            formData.cardholderName.trim() !== ''
          );
        }
        return formData.paymentMethod !== undefined;
      case 3: // Review
        return true; // Always valid on review step
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (isStepValid(currentStep) && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlaceOrder = async () => {
    if (!isStepValid(currentStep)) return;

    setIsSubmitting(true);

    try {
      // Calculate totals
      const deliveryPrice = formData.deliveryMethod === 'express' ? 9.99 : 
                           formData.deliveryMethod === 'overnight' ? 19.99 : 0;
      const tax = (cartTotal + deliveryPrice) * 0.08;
      const total = cartTotal + deliveryPrice + tax;

      // Create order
      const order = {
        id: `order-${Date.now()}`,
        items: cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        })),
        total,
        status: 'pending' as const,
        createdAt: new Date().toISOString(),
        shippingAddress: {
          street: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        customerInfo: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone
        }
      };

      // Add order to store
      addOrder(order);

      // Clear cart
      clearCart();

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Redirect to order confirmation
      navigate('/ecommerce/order-confirmation', { 
        state: { orderId: order.id }
      });

    } catch (error) {
      console.error('Error placing order:', error);
      setIsSubmitting(false);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  if (cartItems.length === 0) {
    return null; // Will redirect due to useEffect
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
        <p className="text-gray-600">Complete your purchase in a few simple steps</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <StepIndicator
            key={step.number}
            number={step.number}
            label={step.label}
            active={currentStep === index}
            completed={currentStep > index}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg shadow p-8 mb-8">
        <CurrentStepComponent
          formData={formData}
          setFormData={updateFormData}
          onNext={handleNext}
          onBack={handleBack}
          isLastStep={currentStep === steps.length - 1}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className={`
            px-6 py-3 rounded-lg font-medium transition-colors
            ${currentStep === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
        >
          Back
        </button>

        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Step {currentStep + 1} of {steps.length}
          </span>
          
          {currentStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={!isStepValid(currentStep)}
              className={`
                px-6 py-3 rounded-lg font-medium transition-colors
                ${isStepValid(currentStep)
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handlePlaceOrder}
              disabled={!isStepValid(currentStep) || isSubmitting}
              className={`
                px-8 py-3 rounded-lg font-medium transition-colors
                ${isStepValid(currentStep) && !isSubmitting
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Processing...</span>
                </div>
              ) : (
                'Place Order'
              )}
            </button>
          )}
        </div>
      </div>

      {/* Order Summary Sidebar */}
      <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 border">
        <div className="text-sm">
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">${cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">Items:</span>
            <span className="font-medium">{cartItems.length}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span className="text-blue-600">${cartTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 