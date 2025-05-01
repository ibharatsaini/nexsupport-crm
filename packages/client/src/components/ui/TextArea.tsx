import React, { TextareaHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ 
    label, 
    helperText, 
    error, 
    fullWidth = false,
    className, 
    id,
    rows = 4,
    ...props 
  }, ref) => {
    // Generate a unique ID if one is not provided
    const uniqueId = id || `textarea-${Math.random().toString(36).substring(2, 9)}`;
    
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
        
        <textarea
          id={uniqueId}
          ref={ref}
          rows={rows}
          className={cn(
            'rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
            error && 'border-error-500 focus:ring-error-500 focus:border-error-500',
            fullWidth && 'w-full',
            className
          )}
          {...props}
        />
        
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

TextArea.displayName = 'TextArea';

export default TextArea;