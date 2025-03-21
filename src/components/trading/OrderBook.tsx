import React, { useState } from 'react';

interface OrderType {
  price: number;
  size: number;
  total: number;
  depth: number;
}

// 模拟数据
const generateOrders = (
  basePrice: number, 
  count: number, 
  isBid: boolean
): OrderType[] => {
  let orders: OrderType[] = [];
  let runningTotal = 0;
  let maxDepth = 0;

  for (let i = 0; i < count; i++) {
    const randomDelta = Math.random() * 0.5;
    const price = isBid 
      ? basePrice - (i * 0.1) - randomDelta
      : basePrice + (i * 0.1) + randomDelta;
    const size = Math.floor(Math.random() * 10) + 1;
    runningTotal += size;
    const total = runningTotal;
    
    if (total > maxDepth) maxDepth = total;
    
    orders.push({
      price: Number(price.toFixed(2)),
      size,
      total,
      depth: 0 // 将在后面计算
    });
  }

  // 计算相对深度百分比
  orders = orders.map(order => ({
    ...order,
    depth: (order.total / maxDepth) * 100
  }));

  return orders;
};

// 模拟数据
const mockAsks = generateOrders(101.25, 12, false);
const mockBids = generateOrders(101.20, 12, true);

const OrderBook: React.FC = () => {
  const [asks, setAsks] = useState<OrderType[]>(mockAsks);
  const [bids, setBids] = useState<OrderType[]>(mockBids);
  const [aggregationLevel, setAggregationLevel] = useState<number>(0.1);

  // 格式化数字
  const formatNumber = (num: number, precision: number = 2) => {
    return num.toFixed(precision);
  };

  return (
    <div className="w-full h-full bg-gray-900 rounded-lg shadow-md overflow-hidden">
      <div className="p-3 border-b border-gray-800">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">订单簿</h3>
          <div className="flex space-x-2">
            <button className="px-2 py-1 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md">
              0.1
            </button>
            <button className="px-2 py-1 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md">
              0.01
            </button>
            <button className="px-2 py-1 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md">
              0.001
            </button>
          </div>
        </div>
      </div>
      
      <div className="text-sm font-medium text-gray-500 grid grid-cols-3 px-3 py-2">
        <div>数量</div>
        <div className="text-center">价格</div>
        <div className="text-right">总量</div>
      </div>
      
      {/* 卖单 */}
      <div className="overflow-y-auto h-40 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        {asks.map((ask, index) => (
          <div key={`ask-${index}`} className="group px-3 py-1 hover:bg-gray-800 relative">
            <div 
              className="absolute top-0 right-0 h-full bg-red-900/30"
              style={{ width: `${ask.depth}%` }}
            />
            <div className="grid grid-cols-3 text-sm relative z-10">
              <div className="text-red-400">{formatNumber(ask.size)}</div>
              <div className="text-center text-red-400">{formatNumber(ask.price)}</div>
              <div className="text-right text-gray-400">{formatNumber(ask.total)}</div>
            </div>
          </div>
        ))}
      </div>
      
      {/* 中间区域 - 最新价格 */}
      <div className="py-2 px-3 bg-gray-800 flex justify-between items-center">
        <span className="text-xl font-bold text-green-500">101.20</span>
        <span className="text-sm text-gray-400">$101.20</span>
      </div>
      
      {/* 买单 */}
      <div className="overflow-y-auto h-40 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        {bids.map((bid, index) => (
          <div key={`bid-${index}`} className="group px-3 py-1 hover:bg-gray-800 relative">
            <div 
              className="absolute top-0 left-0 h-full bg-green-900/30"
              style={{ width: `${bid.depth}%` }}
            />
            <div className="grid grid-cols-3 text-sm relative z-10">
              <div className="text-green-400">{formatNumber(bid.size)}</div>
              <div className="text-center text-green-400">{formatNumber(bid.price)}</div>
              <div className="text-right text-gray-400">{formatNumber(bid.total)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderBook; 