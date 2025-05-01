import React, { SelectHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface Option {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  options: Option[];
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    label, 
    options, 
    helperText, 
    error, 
    fullWidth = false, 
    className, 
    id,
    onChange,
    value,
    ...props 
  }, ref) => {
    // Generate a unique ID if one is not provided
    const uniqueId = id || `select-${Math.random().toString(36).substring(2, 9)}`;
    
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e.target.value);
    };
    
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
        
        <select
          id={uniqueId}
          ref={ref}
          value={value}
          className={cn(
            'rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
            error && 'border-error-500 focus:ring-error-500 focus:border-error-500',
            fullWidth && 'w-full',
            className
          )}
          onChange={handleChange}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
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

Select.displayName = 'Select';

export default Select;