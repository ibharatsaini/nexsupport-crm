import React, { ButtonHTMLAttributes, ElementType } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { cn } from '../../lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'as'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  as?: ElementType;
}

// Separate props for Link variant
interface LinkButtonProps extends Omit<LinkProps, keyof ButtonProps>, ButtonProps {
  to: LinkProps['to'];
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps | LinkButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    isLoading = false, 
    leftIcon, 
    rightIcon, 
    fullWidth = false,
    className, 
    children, 
    disabled,
    as,
    ...props 
  }, ref) => {
    // Base styles
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    
    // Size styles
    const sizeStyles = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-10 px-4 py-2',
      lg: 'h-11 px-6 py-3 text-lg',
    };
    
    // Variant styles
    const variantStyles = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500',
      secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus-visible:ring-secondary-500',
      success: 'bg-success-500 text-white hover:bg-success-700 focus-visible:ring-success-500',
      danger: 'bg-error-500 text-white hover:bg-error-700 focus-visible:ring-error-500',
      warning: 'bg-warning-500 text-white hover:bg-warning-700 focus-visible:ring-warning-500',
      outline: 'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500',
      ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500',
    };
    
    // Width style
    const widthStyle = fullWidth ? 'w-full' : '';
    
    const styles = cn(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      widthStyle,
      isLoading && 'opacity-70 cursor-not-allowed',
      className
    );

    const content = (
      <>
        {isLoading && (
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        
        {!isLoading && leftIcon && (
          <span className="mr-2">{leftIcon}</span>
        )}
        
        {children}
        
        {!isLoading && rightIcon && (
          <span className="ml-2">{rightIcon}</span>
        )}
      </>
    );

    // If "to" prop exists, render as Link
    if ('to' in props) {
      return (
        <Link
          className={styles}
          {...(props as LinkProps)}
        >
          {content}
        </Link>
      );
    }

    // Otherwise render as button or custom component
    const Component = as || 'button';
    return (
      <Component
        ref={ref}
        className={styles}
        disabled={isLoading || disabled}
        {...(props as ButtonProps)}
      >
        {content}
      </Component>
    );
  }
);

Button.displayName = 'Button';

export default Button;