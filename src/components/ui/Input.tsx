import React, { forwardRef } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'outline' | 'filled' | 'flushed';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  size?: InputSize;
  variant?: InputVariant;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  helperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      variant = 'outline',
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = '',
      inputClassName = '',
      labelClassName = '',
      helperClassName = '',
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyle = 'focus:ring-2 focus:outline-none rounded transition-all';
    
    // Size styles
    const sizeStyles = {
      sm: 'px-2 py-1 text-sm',
      md: 'px-3 py-2',
      lg: 'px-4 py-3 text-lg'
    };
    
    // Variant styles
    const variantStyles = {
      outline: 'border border-gray-300 focus:border-blue-500 focus:ring-blue-200 bg-white',
      filled: 'border border-gray-100 bg-gray-100 focus:bg-white focus:border-blue-500 focus:ring-blue-200',
      flushed: 'border-b border-gray-300 rounded-none px-0 focus:border-blue-500 focus:ring-blue-200 bg-transparent'
    };
    
    // Error styles
    const errorStyle = error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : '';
    
    // Full width styles
    const widthStyle = fullWidth ? 'w-full' : '';
    
    // Container styles
    const containerStyle = fullWidth ? 'w-full' : 'inline-block';
    
    return (
      <div className={`${containerStyle} ${className}`}>
        {/* Label */}
        {label && (
          <label className={`block mb-1 font-medium text-gray-700 ${labelClassName}`}>
            {label}
          </label>
        )}
        
        {/* Input container */}
        <div className="relative">
          {/* Left icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              {leftIcon}
            </div>
          )}
          
          {/* Input */}
          <input
            ref={ref}
            className={`
              ${baseStyle}
              ${sizeStyles[size]}
              ${variantStyles[variant]}
              ${errorStyle}
              ${widthStyle}
              ${leftIcon ? 'pl-10' : ''}
              ${rightIcon ? 'pr-10' : ''}
              ${inputClassName}
            `}
            {...props}
          />
          
          {/* Right icon */}
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              {rightIcon}
            </div>
          )}
        </div>
        
        {/* Helper text or error message */}
        {(helperText || error) && (
          <div className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-gray-500'} ${helperClassName}`}>
            {error || helperText}
          </div>
        )}
      </div>
    );
  }
);

export default Input; 