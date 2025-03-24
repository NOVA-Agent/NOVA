import React from 'react';
import Layout from '@/components/Layout';
import TradingView from '@/components/trading/TradingView';
import OrderBook from '@/components/trading/OrderBook';
import TradeForm from '@/components/trading/TradeForm';
import PositionsList from '@/components/trading/PositionsList';
import RecentTrades from '@/components/trading/RecentTrades';
import TokenSelector from '@/components/trading/TokenSelector';

export default function TradingPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Title and Token Selector */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Trading Terminal</h1>
          <div className="flex items-center space-x-4">
            <TokenSelector />
          </div>
        </div>

        {/* Main Content Area - Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Side - Chart and Positions */}
          <div className="lg:col-span-3 space-y-6">
            {/* Trading Chart */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-4">
              <TradingView />
            </div>

            {/* Positions and Recent Trades */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-lg shadow-lg p-4">
                <PositionsList />
              </div>
              <div className="bg-gray-800 rounded-lg shadow-lg p-4">
                <RecentTrades />
              </div>
            </div>
          </div>

          {/* Right Side - Order Book and Trade Form */}
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg shadow-lg p-4">
              <OrderBook />
            </div>
            <div className="bg-gray-800 rounded-lg shadow-lg p-4">
              <TradeForm />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 