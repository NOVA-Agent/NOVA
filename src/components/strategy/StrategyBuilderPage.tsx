import React, { useState } from 'react';
import { useStrategyStore } from '@/store/useStrategyStore';
import ComponentLibrary from './ComponentLibrary';
import StrategyCanvas from './StrategyCanvas';
import { AlertCircle, Save, Play, ArrowLeft } from 'lucide-react';

export default function StrategyBuilderPage() {
  const { activeStrategy, saveStrategy, setActiveStrategy } = useStrategyStore();
  const [showBacktest, setShowBacktest] = useState(false);
  
  // Handle strategy name change
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (activeStrategy) {
      setActiveStrategy({
        ...activeStrategy,
        name: e.target.value
      });
    }
  };

  // Save current strategy
  const handleSave = () => {
    if (activeStrategy) {
      saveStrategy(activeStrategy);
      // Show success message (would be implemented with a toast notification in a real app)
      console.log('Strategy saved successfully');
    }
  };

  // Run backtest for the strategy
  const handleRunBacktest = () => {
    setShowBacktest(true);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-950">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-white">Strategy Builder</h1>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Untitled Strategy"
                value={activeStrategy?.name || ''}
                onChange={handleNameChange}
                className="bg-gray-800 border border-gray-700 rounded-md px-3 py-1 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              className="flex items-center gap-1 px-3 py-1.5 bg-gray-800 text-gray-300 rounded-md hover:bg-gray-700"
              onClick={() => setShowBacktest(false)}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Builder</span>
            </button>
            
            <button 
              className="flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              onClick={handleSave}
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
            
            <button 
              className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700"
              onClick={handleRunBacktest}
              disabled={!activeStrategy || activeStrategy.components.length === 0}
            >
              <Play className="w-4 h-4" />
              <span>Run Backtest</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Component Library (left sidebar) */}
        <div className="w-80 p-4 overflow-y-auto">
          <ComponentLibrary />
        </div>
        
        {/* Canvas (main area) */}
        <div className="flex-1 p-4 overflow-hidden">
          {activeStrategy ? (
            <StrategyCanvas />
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-900 rounded-lg border border-gray-800">
              <div className="text-center p-6 max-w-md">
                <div className="inline-flex items-center justify-center p-3 bg-yellow-900/30 rounded-full mb-4">
                  <AlertCircle className="w-6 h-6 text-yellow-500" />
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">No Active Strategy</h2>
                <p className="text-gray-400 mb-4">
                  Create a new strategy or select an existing one to start building.
                </p>
                <button 
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                  onClick={() => setActiveStrategy({
                    id: crypto.randomUUID(),
                    name: 'New Strategy',
                    description: '',
                    components: [],
                    created: new Date().toISOString(),
                    modified: new Date().toISOString()
                  })}
                >
                  Create New Strategy
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 