import React from 'react';
import { StrategyComponent } from '@/store/useStrategyStore';
import { 
  TrendingUp, 
  ArrowDownUp, 
  Sparkles, 
  DollarSign, 
  AlertTriangle,
  Info
} from 'lucide-react';

interface ComponentProps {
  id: string;
  name: string;
  description: string;
  type: string;
  properties: Record<string, any>;
}

interface ComponentCardProps {
  component: ComponentProps;
  onClick: (component: ComponentProps) => void;
  draggable?: boolean;
}

export default function ComponentCard({ component, onClick, draggable = true }: ComponentCardProps) {
  // Handle drag start for component
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('application/json', JSON.stringify(component));
  };

  // Get icon based on component type
  const getIconForType = (type: string): string => {
    switch (type) {
      case 'indicator':
        return '📊';
      case 'entryCondition':
        return '⬆️';
      case 'exitCondition':
        return '⬇️';
      case 'positionSizing':
        return '💰';
      case 'riskManagement':
        return '🛡️';
      default:
        return '🧩';
    }
  };

  return (
    <div
      className="p-3 border border-gray-700 rounded-md bg-gray-800 hover:bg-gray-750 cursor-pointer"
      draggable={draggable}
      onDragStart={handleDragStart}
      onClick={() => onClick(component)}
    >
      <div className="flex items-start gap-2">
        <div className="text-xl">{getIconForType(component.type)}</div>
        <div>
          <h3 className="font-medium text-white">{component.name}</h3>
          <p className="text-xs text-gray-400 mt-1">{component.description}</p>
        </div>
      </div>
      
      {/* Component properties */}
      {Object.keys(component.properties).length > 0 && (
        <div className="mt-2 pt-2 border-t border-gray-700">
          <p className="text-xs text-gray-500 mb-1">Properties:</p>
          {Object.entries(component.properties).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center text-xs mt-1">
              <span className="text-gray-400">{key}:</span>
              <span className="text-white">{renderPropertyValue(value)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Convert property value to string for display
const renderPropertyValue = (value: any): string => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'object') return JSON.stringify(value);
  return value.toString();
}; 