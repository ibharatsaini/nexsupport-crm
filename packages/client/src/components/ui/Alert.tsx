import React from 'react';
import { cn } from '../../lib/utils';
import { AlertCircle, CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  children: React.ReactNode;
  variant?: AlertVariant;
  title?: string;
  onClose?: () => void;
  className?: string;
}

const Alert = ({ 
  children, 
  variant = 'info', 
  title, 
  onClose,
  className 
}: AlertProps) => {
  // Variant styles
  const variantStyles = {
    info: 'bg-blue-50 border-blue-300 text-blue-800',
    success: 'bg-success-50 border-success-500 text-success-700',
    warning: 'bg-warning-50 border-warning-500 text-warning-700',
    error: 'bg-error-50 border-error-500 text-error-700',
  };

  // Icon based on variant
  const iconMap = {
    info: <Info className="h-5 w-5" />,
    success: <CheckCircle className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />,
    error: <AlertCircle className="h-5 w-5" />,
  };

  return (
    <div
      className={cn(
        'border-l-4 p-4 rounded-md relative',
        variantStyles[variant],
        className
      )}
      role="alert"
    >
      <div className="flex">
        <div className="flex-shrink-0 mr-3">
          {iconMap[variant]}
        </div>
        <div className="flex-1">
          {title && (
            <h3 className="text-sm font-medium mb-1">{title}</h3>
          )}
          <div className="text-sm">
            {children}
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 flex-shrink-0 p-1.5 rounded-md focus:outline-none focus:ring-2"
            onClick={onClose}
          >
            <span className="sr-only">Close</span>
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;