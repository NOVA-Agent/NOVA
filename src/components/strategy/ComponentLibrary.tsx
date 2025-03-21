import React, { useState } from 'react';
import { useStrategyStore } from '@/store/useStrategyStore';
import { v4 as uuidv4 } from 'uuid';
import { componentLibrary } from '@/modules/strategy-builder/componentLibrary';

export default function ComponentLibrary() {
  const [activeTab, setActiveTab] = useState<string>('indicator');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { addComponent } = useStrategyStore();

  // Get components filtered by active tab and search term
  const getFilteredComponents = () => {
    return componentLibrary
      .filter(comp => comp.type === activeTab)
      .filter(comp => 
        comp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        comp.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
  };

  // Get friendly tab label
  const getTabLabel = (tabId: string): string => {
    switch (tabId) {
      case 'indicator':
        return 'Indicators';
      case 'entryCondition':
        return 'Entry';
      case 'exitCondition':
        return 'Exit';
      case 'positionSizing':
        return 'Position Sizing';
      case 'riskManagement':
        return 'Risk Management';
      default:
        return tabId;
    }
  };

  // Get icon for tab
  const getTabIcon = (tabId: string): string => {
    switch (tabId) {
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

  // Handle drag start for component
  const handleDragStart = (e: React.DragEvent, component: any) => {
    e.dataTransfer.setData('application/json', JSON.stringify(component));
  };

  // Add component to canvas
  const handleAddComponent = (component: any) => {
    // Create a new component with unique ID and default position
    const newComponent = {
      ...component,
      id: uuidv4(),
      position: {
        x: 50,
        y: 50
      },
      connections: []
    };
    
    addComponent(newComponent);
  };

  return (
    <div className="flex flex-col h-full border border-gray-800 rounded-lg overflow-hidden bg-gray-900">
      {/* Search bar */}
      <div className="p-4 border-b border-gray-800">
        <input
          type="text"
          placeholder="Search components..."
          className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Tab buttons */}
      <div className="flex overflow-x-auto border-b border-gray-800">
        {['indicator', 'entryCondition', 'exitCondition', 'positionSizing', 'riskManagement'].map(tabId => (
          <button
            key={tabId}
            className={`px-4 py-2 whitespace-nowrap ${
              activeTab === tabId 
                ? 'bg-gray-800 text-purple-400 border-b-2 border-purple-500' 
                : 'text-gray-400 hover:bg-gray-800'
            }`}
            onClick={() => setActiveTab(tabId)}
          >
            <span className="mr-2">{getTabIcon(tabId)}</span>
            {getTabLabel(tabId)}
          </button>
        ))}
      </div>
      
      {/* Component list */}
      <div className="flex-1 overflow-y-auto p-2">
        {getFilteredComponents().length > 0 ? (
          getFilteredComponents().map(component => (
            <div
              key={component.id}
              className="p-3 mb-2 border border-gray-700 rounded-md bg-gray-800 hover:bg-gray-750 cursor-grab"
              draggable
              onDragStart={(e) => handleDragStart(e, component)}
              onClick={() => handleAddComponent(component)}
            >
              <div className="flex items-start gap-2">
                <div className="text-xl">{getTabIcon(component.type)}</div>
                <div>
                  <h3 className="font-medium text-white">{component.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">{component.description}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-4 text-gray-500">
            {searchTerm 
              ? `No ${getTabLabel(activeTab).toLowerCase()} found matching "${searchTerm}"`
              : `No ${getTabLabel(activeTab).toLowerCase()} available`
            }
          </div>
        )}
      </div>
      
      {/* Help tips */}
      <div className="p-3 border-t border-gray-800 bg-gray-850">
        <h4 className="text-sm font-medium text-gray-300 mb-1">Tips:</h4>
        <ul className="text-xs text-gray-500">
          <li className="mb-1">• Click a component to add it to the canvas</li>
          <li className="mb-1">• Drag components to arrange your strategy</li>
          <li className="mb-1">• Connect components to create a workflow</li>
        </ul>
      </div>
    </div>
  );
} 