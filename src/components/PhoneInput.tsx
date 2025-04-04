
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { validateBangladeshiPhone } from '@/lib/utils';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  onValidation?: (isValid: boolean) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ 
  value, 
  onChange,
  onValidation 
}) => {
  const [isValid, setIsValid] = useState<boolean>(false);
  
  // Handle formatting and validation
  useEffect(() => {
    let formattedValue = value;
    
    // Auto-add +88 prefix if not present
    if (value && !value.includes('+88') && value.length > 2) {
      if (value.startsWith('0')) {
        formattedValue = `+88 ${value}`;
      } else {
        formattedValue = `+88 ${value}`;
      }
      onChange(formattedValue);
    }
    
    // Validate the phone number
    const valid = validateBangladeshiPhone(formattedValue);
    setIsValid(valid);
    
    if (onValidation) {
      onValidation(valid);
    }
  }, [value, onChange, onValidation]);

  return (
    <div className="relative">
      <Input
        type="tel"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="+88 01XXXXXXXXX"
        className={`h-12 px-4 text-base transition-all duration-200 
        ${isValid ? 'border-green-500 focus:ring-green-200' : ''}`}
      />
      {value && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {isValid ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-300"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      )}
      <div className="mt-1 text-xs text-gray-500">
        Format: +88 followed by your 11-digit phone number
      </div>
    </div>
  );
};

export default PhoneInput;
