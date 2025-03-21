import React, { useState, useRef, useEffect } from 'react';

export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';
export type TooltipVariant = 'light' | 'dark' | 'info' | 'warning' | 'error';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  position?: TooltipPosition;
  variant?: TooltipVariant;
  delay?: number;
  className?: string;
  tooltipClassName?: string;
  maxWidth?: string;
  arrow?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  variant = 'dark',
  delay = 300,
  className = '',
  tooltipClassName = '',
  maxWidth = '200px',
  arrow = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Variant styles
  const variantStyles = {
    light: 'bg-white text-gray-800 border border-gray-200',
    dark: 'bg-gray-800 text-white border border-gray-700',
    info: 'bg-blue-500 text-white',
    warning: 'bg-yellow-500 text-gray-900',
    error: 'bg-red-500 text-white'
  };

  // Position styles
  const positionStyles = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 mb-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 translate-x-2 ml-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 translate-y-2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 -translate-x-2 mr-2'
  };

  // Arrow styles
  const arrowStyles = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-t-gray-800 border-r-transparent border-b-transparent border-l-transparent',
    right: 'right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-r-gray-800 border-b-transparent border-l-transparent',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-t-transparent border-r-transparent border-b-gray-800 border-l-transparent',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-r-transparent border-b-transparent border-l-gray-800'
  };

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Clone child element and add event handlers
  const childElement = React.cloneElement(children, {
    ref: childRef,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    className: `${children.props.className || ''} ${className}`
  });

  return (
    <>
      {childElement}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`
            absolute z-50 px-3 py-2 text-sm rounded shadow-lg 
            ${positionStyles[position]} 
            ${variantStyles[variant]} 
            ${tooltipClassName}
          `}
          style={{ maxWidth }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          role="tooltip"
        >
          {content}
          {arrow && (
            <div
              className={`
                absolute w-0 h-0 border-4
                ${arrowStyles[position]}
              `}
            ></div>
          )}
        </div>
      )}
    </>
  );
};

export default Tooltip; 