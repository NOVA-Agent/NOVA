import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    fullWidth = false, 
    leftIcon, 
    rightIcon, 
    isLoading = false, 
    className = '', 
    disabled = false, 
    ...props 
  }, ref) => {
    // Base styles
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50";
    
    // Size styles
    const sizeStyles = {
      sm: "text-xs px-2.5 py-1.5",
      md: "text-sm px-4 py-2",
      lg: "text-base px-6 py-3"
    };
    
    // Variant styles
    const variantStyles = {
      primary: "bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-400",
      secondary: "bg-gray-700 hover:bg-gray-600 text-white focus:ring-gray-500",
      outline: "bg-transparent border border-gray-600 hover:bg-gray-800 text-gray-300 focus:ring-gray-500",
      ghost: "bg-transparent hover:bg-gray-800 text-gray-300 focus:ring-gray-500",
      danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-400"
    };
    
    // Disabled state styles
    const disabledStyles = "opacity-50 cursor-not-allowed pointer-events-none";
    
    // Full width styles
    const widthStyles = fullWidth ? "w-full" : "";
    
    return (
      <button
        ref={ref}
        className={`
          ${baseStyles} 
          ${sizeStyles[size]} 
          ${variantStyles[variant]} 
          ${(disabled || isLoading) ? disabledStyles : ""} 
          ${widthStyles} 
          ${className}
        `}
        disabled={disabled || isLoading}
        {...props}
      >
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
        
        {leftIcon && !isLoading && (
          <span className="mr-2">{leftIcon}</span>
        )}
        
        {children}
        
        {rightIcon && (
          <span className="ml-2">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button; 