import React, { forwardRef } from 'react';

export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'info' | 'warning' | 'danger';
  labelPosition?: 'left' | 'right';
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({
    label,
    description,
    size = 'md',
    color = 'primary',
    labelPosition = 'right',
    className = '',
    disabled = false,
    ...props
  }, ref) => {
    // Size configuration
    const sizeConfig = {
      sm: {
        toggle: 'h-4 w-7',
        dot: 'h-3 w-3',
        translate: 'translate-x-3',
        text: 'text-sm'
      },
      md: {
        toggle: 'h-5 w-9',
        dot: 'h-4 w-4',
        translate: 'translate-x-4',
        text: 'text-base'
      },
      lg: {
        toggle: 'h-6 w-11',
        dot: 'h-5 w-5',
        translate: 'translate-x-5',
        text: 'text-lg'
      }
    };
    
    // Color configuration
    const colorConfig = {
      primary: 'bg-primary-500',
      success: 'bg-green-500',
      info: 'bg-blue-500',
      warning: 'bg-yellow-500',
      danger: 'bg-red-500'
    };
    
    const selectedSize = sizeConfig[size];
    const selectedColor = colorConfig[color];
    
    return (
      <label className={`flex items-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
        {labelPosition === 'left' && label && (
          <div className={`mr-3 ${selectedSize.text}`}>
            <span className="font-medium text-gray-200">{label}</span>
            {description && <p className="text-gray-400 text-sm">{description}</p>}
          </div>
        )}
        
        <div className="relative inline-block">
          <input
            type="checkbox"
            className="sr-only"
            disabled={disabled}
            ref={ref}
            {...props}
          />
          <div
            className={`block ${selectedSize.toggle} rounded-full bg-gray-700 peer-checked:${selectedColor}`}
          ></div>
          <div
            className={`dot absolute left-0.5 top-0.5 ${selectedSize.dot} rounded-full bg-white transition peer-checked:${selectedSize.translate}`}
          ></div>
        </div>
        
        {labelPosition === 'right' && label && (
          <div className={`ml-3 ${selectedSize.text}`}>
            <span className="font-medium text-gray-200">{label}</span>
            {description && <p className="text-gray-400 text-sm">{description}</p>}
          </div>
        )}
      </label>
    );
  }
);

Toggle.displayName = 'Toggle';

export default Toggle; 