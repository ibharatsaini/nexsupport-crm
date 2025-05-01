import React, { InputHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    helperText, 
    error, 
    fullWidth = false, 
    leftIcon, 
    rightIcon, 
    className, 
    id,
    ...props 
  }, ref) => {
    // Generate a unique ID if one is not provided
    const uniqueId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
    
    return (
      <div className={cn('flex flex-col', fullWidth && 'w-full')}>
        {label && (
          <label 
            htmlFor={uniqueId}
            className="text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              {leftIcon}
            </div>
          )}
          
          <input
            id={uniqueId}
            ref={ref}
            className={cn(
              'rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
              error && 'border-error-500 focus:ring-error-500 focus:border-error-500',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              fullWidth && 'w-full',
              className
            )}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
              {rightIcon}
            </div>
          )}
        </div>
        
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
        
        {error && (
          <p className="mt-1 text-sm text-error-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;