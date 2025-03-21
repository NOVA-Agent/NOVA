import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ComponentLibrary from '@/components/strategy/ComponentLibrary';
import StrategyCanvas from '@/components/strategy/StrategyCanvas';
import Link from 'next/link';
import { useStrategyStore } from '@/store/useStrategyStore';

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
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">策略构建器</h1>
            <p className="text-gray-400 mt-1">创建和回测自定义交易策略</p>
          </div>
          
          <div className="flex gap-3">
            <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              保存策略
            </button>
            <button className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
              运行回测
            </button>
          </div>
        </div>
        
        {/* 策略名称和描述编辑 */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              placeholder="策略名称"
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="简短描述"
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>
        </div>
        
        {/* 主布局：组件库和画布 */}
        <div className="grid grid-cols-4 gap-6 h-[calc(100vh-300px)]">
          {/* 组件库 */}
          <div className="col-span-1">
            <ComponentLibrary />
          </div>
          
          {/* 策略画布 */}
          <div className="col-span-3">
            <StrategyCanvas />
          </div>
        </div>
        
        {/* 回测参数 */}
        <div className="mt-6 bg-gray-900 rounded-lg p-4 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">回测参数</h2>
          
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">开始日期</label>
              <input
                type="date"
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-2">结束日期</label>
              <input
                type="date"
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-2">初始资金</label>
              <input
                type="number"
                defaultValue={10000}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-2">交易对</label>
              <select
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
              >
                <option value="SOL/USDC">SOL/USDC</option>
                <option value="BTC/USDC">BTC/USDC</option>
                <option value="ETH/USDC">ETH/USDC</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4 mt-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">手续费率</label>
              <input
                type="number"
                defaultValue={0.1}
                step="0.01"
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-2">滑点</label>
              <input
                type="number"
                defaultValue={0.05}
                step="0.01"
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-2">K线周期</label>
              <select
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
              >
                <option value="1m">1分钟</option>
                <option value="5m">5分钟</option>
                <option value="15m">15分钟</option>
                <option value="1h">1小时</option>
                <option value="4h">4小时</option>
                <option value="1d">日线</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button className="w-full bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
                应用参数
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* 新建策略模态框 */}
      {showNewStrategyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-white mb-4">新建策略</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-gray-400 text-sm">策略名称</label>
                <input 
                  type="text" 
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  placeholder="输入策略名称"
                  value={newStrategyName}
                  onChange={(e) => setNewStrategyName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-gray-400 text-sm">市场</label>
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
                <label className="text-gray-400 text-sm">时间周期</label>
                <select 
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                >
                  <option value="1m">1分钟</option>
                  <option value="5m">5分钟</option>
                  <option value="15m">15分钟</option>
                  <option value="1h">1小时</option>
                  <option value="4h">4小时</option>
                  <option value="1d">1天</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end mt-6 gap-3">
              <button 
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                onClick={() => setShowNewStrategyModal(false)}
              >
                取消
              </button>
              <button 
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                onClick={handleCreateStrategy}
                disabled={!newStrategyName.trim()}
              >
                创建
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
} 