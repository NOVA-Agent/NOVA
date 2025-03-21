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
        <div className="flex flex-col space-y-6">
          {/* 标题和代币选择器 */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">交易终端</h1>
            <div className="w-64">
              <TokenSelector />
            </div>
          </div>

          {/* 主要内容区域 - 采用网格布局 */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-15rem)]">
            {/* 左侧 - 图表和持仓 */}
            <div className="lg:col-span-3 grid grid-rows-[1fr,auto] gap-6">
              {/* 交易图表 */}
              <div className="bg-gray-900 p-4 rounded-lg shadow-md h-[500px]">
                <TradingView />
              </div>

              {/* 持仓和最近交易 */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <PositionsList />
                <RecentTrades />
              </div>
            </div>

            {/* 右侧 - 订单簿和交易表单 */}
            <div className="grid grid-rows-2 gap-6 h-full">
              <OrderBook />
              <TradeForm />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 