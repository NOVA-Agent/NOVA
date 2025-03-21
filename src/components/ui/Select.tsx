import React, { useState, useRef, useEffect, forwardRef } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'onChange'> {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: React.ReactNode;
  error?: string;
  helperText?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'filled' | 'flushed';
  fullWidth?: boolean;
  isSearchable?: boolean;
  className?: string;
  menuClassName?: string;
  optionClassName?: string;
  labelClassName?: string;
  helperClassName?: string;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options,
      value,
      defaultValue,
      onChange,
      placeholder = 'Select an option',
      label,
      error,
      helperText,
      size = 'md',
      variant = 'outline',
      fullWidth = false,
      isSearchable = false,
      className = '',
      menuClassName = '',
      optionClassName = '',
      labelClassName = '',
      helperClassName = '',
      disabled = false,
      ...rest
    },
    ref
  ) => {
    // Initial value setup
    const initialValue = value !== undefined ? value : defaultValue || '';
    const [selectedValue, setSelectedValue] = useState(initialValue);
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const selectRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);
    
    // Update internal state when value prop changes
    useEffect(() => {
      if (value !== undefined && value !== selectedValue) {
        setSelectedValue(value);
      }
    }, [value]);
    
    // Handle option selection
    const handleSelectOption = (option: SelectOption) => {
      if (option.disabled) return;
      
      setSelectedValue(option.value);
      onChange && onChange(option.value);
      setIsOpen(false);
      setSearchTerm('');
    };
    
    // Handle click outside to close dropdown
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setSearchTerm('');
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
    
    // Focus search input when dropdown opens
    useEffect(() => {
      if (isOpen && isSearchable && searchRef.current) {
        searchRef.current.focus();
      }
    }, [isOpen, isSearchable]);
    
    // Size styles
    const sizeStyles = {
      sm: 'py-1 px-2 text-sm',
      md: 'py-2 px-3',
      lg: 'py-3 px-4 text-lg'
    };
    
    // Variant styles
    const variantStyles = {
      outline: 'border border-gray-300 focus:border-blue-500 focus:ring-blue-200 bg-white',
      filled: 'border border-gray-100 bg-gray-100 focus:bg-white focus:border-blue-500',
      flushed: 'border-b border-gray-300 rounded-none px-0 focus:border-blue-500'
    };
    
    // Width style
    const widthStyle = fullWidth ? 'w-full' : 'min-w-[200px]';
    
    // Filter options by search term
    const filteredOptions = isSearchable && searchTerm
      ? options.filter(option => 
          option.label.toLowerCase().includes(searchTerm.toLowerCase()))
      : options;
    
    // Get selected option
    const selectedOption = options.find(option => option.value === selectedValue);
    
    return (
      <div 
        className={`relative ${widthStyle} ${className}`}
        ref={selectRef as React.RefObject<HTMLDivElement>}
      >
        {/* Label */}
        {label && (
          <label className={`block mb-1 font-medium text-gray-700 ${labelClassName}`}>
            {label}
          </label>
        )}
        
        {/* Select trigger */}
        <div
          className={`
            flex items-center justify-between cursor-pointer select-none
            ${sizeStyles[size]}
            ${variantStyles[variant]}
            ${error ? 'border-red-500 focus:border-red-500' : ''}
            ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
            rounded
          `}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <div className="flex-grow truncate">
            {selectedOption 
              ? selectedOption.label 
              : <span className="text-gray-500">{placeholder}</span>
            }
          </div>
          <div className="ml-2">
            <svg 
              className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        {/* Dropdown menu */}
        {isOpen && (
          <div 
            className={`
              absolute z-10 mt-1 w-full rounded-md bg-white py-1 shadow-lg border border-gray-300
              max-h-60 overflow-auto
              ${menuClassName}
            `}
          >
            {/* Search box */}
            {isSearchable && (
              <div className="px-3 py-2 sticky top-0 bg-white border-b border-gray-200">
                <input
                  ref={searchRef}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            
            {/* Options */}
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`
                    px-3 py-2 cursor-pointer hover:bg-gray-100
                    ${selectedValue === option.value ? 'bg-blue-50 text-blue-700' : ''}
                    ${option.disabled ? 'opacity-50 cursor-not-allowed text-gray-500' : ''}
                    ${optionClassName}
                  `}
                  onClick={() => !option.disabled && handleSelectOption(option)}
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-gray-500 text-center">No options found</div>
            )}
          </div>
        )}
        
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

export default Select; 