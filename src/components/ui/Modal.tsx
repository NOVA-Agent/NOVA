import React, { useEffect, useRef } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnEsc?: boolean;
  closeOnOutsideClick?: boolean;
  showCloseButton?: boolean;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnEsc = true,
  closeOnOutsideClick = true,
  showCloseButton = true,
  className = '',
  overlayClassName = '',
  contentClassName = ''
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Handle ESC key to close
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (closeOnEsc && isOpen && event.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose, closeOnEsc]);
  
  // Handle click outside to close
  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOutsideClick && modalRef.current && event.target === modalRef.current) {
      onClose();
    }
  };
  
  // Different size width settings
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-3xl',
    full: 'max-w-full mx-4'
  };
  
  if (!isOpen) return null;
  
  return (
    <div
      ref={modalRef}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} ${overlayClassName}`}
      onClick={handleOutsideClick}
    >
      <div
        className={`bg-gray-800 border border-gray-700 rounded-lg shadow-xl transform transition-all ${isOpen ? 'scale-100' : 'scale-95'} ${sizeClasses[size]} ${className}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Title bar */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            {title && <h3 className="text-lg font-medium text-white">{title}</h3>}
            {showCloseButton && (
              <button
                className="text-gray-400 hover:text-white focus:outline-none transition-colors"
                onClick={onClose}
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}
        
        {/* Content area */}
        <div className={`p-4 ${contentClassName}`}>
          {children}
        </div>
        
        {/* Footer button area */}
        {footer && (
          <div className="p-4 border-t border-gray-700 bg-gray-900 rounded-b-lg">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal; 