import React, { useState } from 'react';

interface FormStep {
  id: string;
  label: string;
  description?: string;
  fields: FormField[];
  validation?: (data: Record<string, string>) => Record<string, string>;
}

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}

interface FormStepperProps {
  steps: FormStep[];
  currentStep: number;
  onStepChange: (stepIndex: number) => void;
  onSubmit: (allData: Record<string, Record<string, string>>) => void;
  formData: Record<string, Record<string, string>>;
  onFormDataChange: (stepId: string, data: Record<string, string>) => void;
  className?: string;
}

export const FormStepper: React.FC<FormStepperProps> = ({
  steps,
  currentStep,
  onStepChange,
  onSubmit,
  formData,
  onFormDataChange,
  className = ''
}) => {
  const [errors, setErrors] = useState<Record<string, Record<string, string>>>({});
  const [touched, setTouched] = useState<Record<string, Record<string, boolean>>>({});

  const validateCurrentStep = () => {
    const currentStepData = steps[currentStep];
    const stepFormData = formData[currentStepData.id] || {};
    const stepErrors: Record<string, string> = {};

    // Required field validation
    currentStepData.fields.forEach(field => {
      if (field.required && !stepFormData[field.name]) {
        stepErrors[field.name] = `${field.label} is required`;
      }
    });

    // Custom validation
    if (currentStepData.validation) {
      const customErrors = currentStepData.validation(stepFormData);
      Object.assign(stepErrors, customErrors);
    }

    setErrors(prev => ({ ...prev, [currentStepData.id]: stepErrors }));
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < steps.length - 1) {
        onStepChange(currentStep + 1);
      } else {
        onSubmit(formData);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      onStepChange(currentStep - 1);
    }
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    const stepId = steps[currentStep].id;
    const updatedStepData = { ...formData[stepId], [fieldName]: value };
    onFormDataChange(stepId, updatedStepData);

    // Clear error for this field if it exists
    if (errors[stepId]?.[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [stepId]: { ...prev[stepId], [fieldName]: '' }
      }));
    }

    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [stepId]: { ...prev[stepId], [fieldName]: true }
    }));
  };

  const isStepValid = (stepIndex: number) => {
    const step = steps[stepIndex];
    const stepFormData = formData[step.id] || {};
    const stepErrors = errors[step.id] || {};
    
    // Check if all required fields are filled
    const requiredFieldsFilled = step.fields.every(field => 
      !field.required || stepFormData[field.name]
    );
    
    // Check if there are no errors
    const noErrors = Object.keys(stepErrors).length === 0 || 
      Object.values(stepErrors).every(error => !error);
    
    return requiredFieldsFilled && noErrors;
  };

  const getCompletedSteps = () => {
    return steps.map((_, index) => index).filter(index => 
      index < currentStep || isStepValid(index)
    );
  };

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {/* Step Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep || isStepValid(index);
            const isCurrent = index === currentStep;
            const isValid = isStepValid(index);

            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center relative">
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                      ${isCompleted 
                        ? 'bg-green-600 border-green-600 text-white' 
                        : isCurrent 
                          ? isValid 
                            ? 'bg-blue-600 border-blue-600 text-white' 
                            : 'bg-red-100 border-red-400 text-red-600'
                          : 'bg-white border-gray-300 text-gray-400'
                      }
                    `}
                  >
                    {isCompleted && index < currentStep ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span className="text-sm font-semibold">{index + 1}</span>
                    )}
                  </div>
                  
                  <div className="mt-2 text-center">
                    <div className={`text-sm font-medium ${isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                      {step.label}
                    </div>
                    {step.description && (
                      <div className="text-xs text-gray-400 mt-1 max-w-24">
                        {step.description}
                      </div>
                    )}
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-4">
                    <div className="h-0.5 bg-gray-200 relative">
                      <div 
                        className={`h-full bg-green-600 transition-all duration-500 ${
                          index < currentStep ? 'w-full' : 'w-0'
                        }`}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {steps[currentStep].label}
        </h2>
        {steps[currentStep].description && (
          <p className="text-gray-600 mb-6">{steps[currentStep].description}</p>
        )}

        <div className="grid grid-cols-1 gap-6">
          {steps[currentStep].fields.map((field) => {
            const stepId = steps[currentStep].id;
            const fieldValue = formData[stepId]?.[field.name] || '';
            const fieldError = errors[stepId]?.[field.name];
            const fieldTouched = touched[stepId]?.[field.name];

            return (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                
                {field.type === 'textarea' ? (
                  <textarea
                    value={fieldValue}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    rows={4}
                    className={`
                      w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      ${fieldError && fieldTouched ? 'border-red-300' : 'border-gray-300'}
                    `}
                  />
                ) : field.type === 'select' ? (
                  <select
                    value={fieldValue}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    className={`
                      w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      ${fieldError && fieldTouched ? 'border-red-300' : 'border-gray-300'}
                    `}
                  >
                    <option value="">Select an option</option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    value={fieldValue}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className={`
                      w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      ${fieldError && fieldTouched ? 'border-red-300' : 'border-gray-300'}
                    `}
                  />
                )}
                
                {fieldError && fieldTouched && (
                  <p className="mt-1 text-sm text-red-600">{fieldError}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          ← Previous
        </button>
        
        <div className="text-sm text-gray-500 flex items-center">
          Step {currentStep + 1} of {steps.length}
        </div>
        
        <button
          onClick={handleNext}
          className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 transition-colors"
        >
          {currentStep === steps.length - 1 ? 'Submit' : 'Next →'}
        </button>
      </div>
    </div>
  );
}; 