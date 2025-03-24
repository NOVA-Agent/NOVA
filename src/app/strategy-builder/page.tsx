import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ComponentLibrary from '@/components/strategy/ComponentLibrary';
import StrategyCanvas from '@/components/strategy/StrategyCanvas';
import Link from 'next/link';
import { useStrategyStore } from '@/store/useStrategyStore';
import BacktestSettings from '@/components/strategy/BacktestSettings';
import BacktestResults from '@/components/strategy/BacktestResults';
import { Dialog } from '@/components/ui/dialog';

export default function StrategyBuilderPage() {
  const [showNewStrategyModal, setShowNewStrategyModal] = useState(false);
  const [newStrategyName, setNewStrategyName] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('SOL/USDC');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1h');
  
  const { 
    createNewStrategy, 
    strategies, 
    currentStrategy,
    setCurrentStrategy,
    loadStrategyTemplate
  } = useStrategyStore();
  
  const handleCreateStrategy = () => {
    if (newStrategyName.trim()) {
      createNewStrategy(newStrategyName, selectedMarket, selectedTimeframe);
      setShowNewStrategyModal(false);
      setNewStrategyName('');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Strategy Builder</h1>
            <p className="text-gray-400 mt-1">Create and backtest custom trading strategies</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-gray-800 rounded-lg shadow-lg p-4">
                <ComponentLibrary />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="bg-gray-800 rounded-lg shadow-lg p-4">
                <StrategyCanvas />
              </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
              <div className="bg-gray-800 rounded-lg shadow-lg p-4">
                <BacktestSettings />
              </div>
              <div className="bg-gray-800 rounded-lg shadow-lg p-4">
                <BacktestResults />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Create Strategy Modal */}
      <Dialog>
        {showNewStrategyModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-semibold text-white mb-4">New Strategy</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-gray-400 text-sm">Strategy Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    placeholder="Enter strategy name"
                    value={newStrategyName}
                    onChange={(e) => setNewStrategyName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-gray-400 text-sm">Market</label>
                  <select 
                    className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    value={selectedMarket}
                    onChange={(e) => setSelectedMarket(e.target.value)}
                  >
                    <option>SOL/USDC</option>
                    <option>BTC/USDC</option>
                    <option>ETH/USDC</option>
                    <option>JUP/USDC</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-gray-400 text-sm">Timeframe</label>
                  <select 
                    className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    value={selectedTimeframe}
                    onChange={(e) => setSelectedTimeframe(e.target.value)}
                  >
                    <option value="1m">1 minute</option>
                    <option value="5m">5 minutes</option>
                    <option value="15m">15 minutes</option>
                    <option value="1h">1 hour</option>
                    <option value="4h">4 hours</option>
                    <option value="1d">1 day</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end mt-6 gap-3">
                <button 
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                  onClick={() => setShowNewStrategyModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                  onClick={handleCreateStrategy}
                  disabled={!newStrategyName.trim()}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
} 