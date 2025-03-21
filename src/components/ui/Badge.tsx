import React from 'react';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  outline?: boolean;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  outline = false,
  icon,
  className = '',
  ...props
}) => {
  // Base styles
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-full";
  
  // Size styles
  const sizeStyles = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-0.5",
    lg: "text-sm px-3 py-1"
  };
  
  // Variant styles - Filled
  const filledStyles = {
    default: "bg-gray-700 text-gray-200",
    primary: "bg-primary-500 text-white",
    success: "bg-green-500 text-white",
    warning: "bg-yellow-500 text-black",
    danger: "bg-red-500 text-white",
    info: "bg-blue-500 text-white"
  };
  
  // Variant styles - Outline
  const outlineStyles = {
    default: "bg-transparent border border-gray-700 text-gray-200",
    primary: "bg-transparent border border-primary-500 text-primary-500",
    success: "bg-transparent border border-green-500 text-green-500",
    warning: "bg-transparent border border-yellow-500 text-yellow-500",
    danger: "bg-transparent border border-red-500 text-red-500",
    info: "bg-transparent border border-blue-500 text-blue-500"
  };
  
  const variantStyles = outline ? outlineStyles[variant] : filledStyles[variant];
  
  return (
    <span
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles} ${className}`}
      {...props}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge; 