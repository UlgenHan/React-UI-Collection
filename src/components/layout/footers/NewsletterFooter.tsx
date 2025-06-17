import React, { useState } from 'react';

export interface NewsletterFooterProps {
  companyName?: string;
  year?: number;
  bgColor?: string;
  onSubscribe?: (email: string) => void;
  className?: string;
}

const NewsletterFooter: React.FC<NewsletterFooterProps> = ({
  companyName = 'Your Company',
  year = new Date().getFullYear(),
  bgColor = 'bg-white',
  onSubscribe,
  className = ''
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage('Please enter your email address');
      setIsError(true);
      return;
    }

    if (!validateEmail(email)) {
      setMessage('Please enter a valid email address');
      setIsError(true);
      return;
    }

    setIsSubmitting(true);
    setMessage('');
    setIsError(false);

    try {
      if (onSubscribe) {
        await onSubscribe(email);
        setMessage('Thank you for subscribing!');
        setEmail('');
      } else {
        // Simulate API call
        setTimeout(() => {
          setMessage('Thank you for subscribing!');
          setEmail('');
          setIsSubmitting(false);
        }, 1000);
        return;
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className={`py-12 border-t border-gray-200 ${bgColor} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Newsletter Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter and get the latest updates, news, and special offers delivered to your inbox.
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  px-6 py-3 bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200
                  ${isSubmitting 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                  }
                `}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subscribing...
                  </div>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
            
            {/* Message */}
            {message && (
              <p className={`mt-3 text-sm ${isError ? 'text-red-600' : 'text-green-600'}`}>
                {message}
              </p>
            )}
            
            <p className="text-xs text-gray-500 mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            © {year} {companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default NewsletterFooter; 