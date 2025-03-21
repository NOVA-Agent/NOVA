import React from 'react';

export type CardVariant = 'elevated' | 'outline' | 'filled';

export interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  className?: string;
  contentClassName?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  headerClassName?: string;
  footer?: React.ReactNode;
  footerClassName?: string;
  noPadding?: boolean;
  bordered?: boolean;
  shadow?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  className = '',
  contentClassName = '',
  title,
  subtitle,
  headerClassName = '',
  footer,
  footerClassName = '',
  noPadding = false,
  bordered = false,
  shadow = 'md',
  onClick
}) => {
  // Base styles
  const baseStyles = 'rounded-lg overflow-hidden transition-all duration-200';
  
  // Border styles
  const borderStyles = bordered || variant === 'outline' ? 'border border-gray-200 dark:border-gray-700' : '';
  
  // Shadow styles
  const shadowMap = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };
  
  // Variant styles
  const variantStyles = {
    elevated: `bg-white dark:bg-gray-800 ${variant === 'elevated' ? shadowMap[shadow] : ''}`,
    outline: 'bg-white dark:bg-gray-800',
    filled: 'bg-gray-100 dark:bg-gray-700'
  };
  
  // Content padding
  const contentPadding = noPadding ? '' : 'p-4';
  
  // Clickable styles
  const clickableStyles = onClick ? 'cursor-pointer hover:shadow-md' : '';
  
  return (
    <div 
      className={`
        ${baseStyles}
        ${borderStyles}
        ${variantStyles[variant]}
        ${clickableStyles}
        ${className}
      `}
      onClick={onClick}
    >
      {/* Card header */}
      {(title || subtitle) && (
        <div className={`border-b border-gray-200 dark:border-gray-700 px-4 py-3 ${headerClassName}`}>
          {title && (
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
      )}
      
      {/* Card content */}
      <div className={`${contentPadding} ${contentClassName}`}>
        {children}
      </div>
      
      {/* Card footer */}
      {footer && (
        <div className={`border-t border-gray-200 dark:border-gray-700 px-4 py-3 ${footerClassName}`}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card; 