import React, { useState } from 'react';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
  onChange?: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  fullWidth?: boolean;
  className?: string;
  tabClassName?: string;
  activeClassName?: string;
  children?: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTabId,
  onChange,
  variant = 'default',
  fullWidth = false,
  className = '',
  tabClassName = '',
  activeClassName = '',
  children
}) => {
  const [activeTabId, setActiveTabId] = useState<string>(defaultTabId || (tabs.length > 0 ? tabs[0].id : ''));

  const handleTabClick = (tabId: string) => {
    setActiveTabId(tabId);
    if (onChange) {
      onChange(tabId);
    }
  };

  // Base container styles
  const containerStyles = "flex border-b border-gray-700";
  
  // Full width styles
  const widthStyles = fullWidth ? "w-full" : "";
  
  // Base tab styles
  const tabBaseStyles = "flex items-center px-4 py-2 cursor-pointer transition-colors duration-200";
  
  // Variant styles
  const variantStyles = {
    default: {
      tab: "text-gray-400 hover:text-gray-200",
      active: "text-white font-medium border-b-2 border-primary-500"
    },
    pills: {
      tab: "text-gray-400 hover:text-gray-200 rounded-md hover:bg-gray-800",
      active: "text-white font-medium bg-gray-800 rounded-md"
    },
    underline: {
      tab: "text-gray-400 hover:text-gray-200",
      active: "text-white font-medium border-b-2 border-white"
    }
  };

  return (
    <div className={className}>
      <div className={`${containerStyles} ${widthStyles}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && handleTabClick(tab.id)}
            className={`
              ${tabBaseStyles}
              ${tab.disabled ? 'opacity-50 cursor-not-allowed' : ''}
              ${tab.id === activeTabId 
                ? `${variantStyles[variant].active} ${activeClassName}` 
                : `${variantStyles[variant].tab} ${tabClassName}`
              }
              ${fullWidth ? 'flex-1 justify-center' : ''}
            `}
            disabled={tab.disabled}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {children}
      </div>
    </div>
  );
};

export default Tabs; 