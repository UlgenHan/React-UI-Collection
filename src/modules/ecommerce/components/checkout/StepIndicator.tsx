import React from 'react';
import { StepIndicatorProps } from './types';

const StepIndicator: React.FC<StepIndicatorProps> = ({ number, label, active, completed }) => {
  return (
    <div className="flex items-center">
      <div className="flex items-center">
        <div className={`
          w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2
          ${completed 
            ? 'bg-green-500 border-green-500 text-white' 
            : active 
              ? 'bg-blue-600 border-blue-600 text-white' 
              : 'bg-gray-200 border-gray-300 text-gray-500'
          }
        `}>
          {completed ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            number
          )}
        </div>
        <span className={`
          ml-3 text-sm font-medium
          ${completed 
            ? 'text-green-600' 
            : active 
              ? 'text-blue-600' 
              : 'text-gray-500'
          }
        `}>
          {label}
        </span>
      </div>
      {number < 4 && (
        <div className={`
          w-16 h-0.5 mx-4
          ${completed ? 'bg-green-500' : 'bg-gray-300'}
        `} />
      )}
    </div>
  );
};

export default StepIndicator; 