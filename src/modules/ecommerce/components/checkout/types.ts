export interface CheckoutForm {
  // Shipping Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  
  // Delivery Method
  deliveryMethod: "standard" | "express" | "overnight";
  
  // Payment Information
  paymentMethod: "credit_card" | "paypal" | "cod";
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  cardholderName: string;
  
  // Additional
  saveInfo: boolean;
  specialInstructions: string;
}

export interface StepProps {
  formData: CheckoutForm;
  setFormData: (data: Partial<CheckoutForm>) => void;
  onNext: () => void;
  onBack: () => void;
  isLastStep: boolean;
}

export interface StepIndicatorProps {
  number: number;
  label: string;
  active: boolean;
  completed: boolean;
} 