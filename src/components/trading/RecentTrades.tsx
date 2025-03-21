import React, { useState, useEffect } from 'react';

interface Trade {
  id: string;
  price: number;
  size: number;
  side: 'buy' | 'sell';
  timestamp: Date;
  market: string;
}

interface RecentTradesProps {
  market?: string;
  limit?: number;
}

// 生成随机交易
const generateRandomTrade = (market: string = 'SOL-PERP', basePrice: number = 101.20): Trade => {
  const side = Math.random() > 0.5 ? 'buy' : 'sell';
  const priceDelta = (Math.random() * 0.2 - 0.1) * basePrice;
  const price = basePrice + priceDelta;
  const size = Math.round((Math.random() * 10 + 0.1) * 100) / 100;

  return {
    id: Math.random().toString(36).substring(2, 15),
    price,
    size,
    side,
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 300000)), // 最近5分钟内
    market
  };
};

// 模拟数据
const generateMockTrades = (count: number, market: string = 'SOL-PERP'): Trade[] => {
  const basePrice = 101.20;
  return Array.from({ length: count }, () => generateRandomTrade(market, basePrice))
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

const RecentTrades: React.FC<RecentTradesProps> = ({ 
  market = 'SOL-PERP',
  limit = 30 
}) => {
  const [trades, setTrades] = useState<Trade[]>(generateMockTrades(limit, market));
  
  // 格式化时间
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit', 
      hour12: false 
    });
  };

  // 格式化价格
  const formatPrice = (price: number): string => {
    if (price < 0.0001) return price.toFixed(8);
    if (price < 0.1) return price.toFixed(6);
    if (price < 1) return price.toFixed(4);
    return price.toFixed(2);
  };

  // 每3秒添加一个新交易模拟数据流
  useEffect(() => {
    const interval = setInterval(() => {
      const newTrade = generateRandomTrade(market);
      setTrades(prevTrades => [newTrade, ...prevTrades.slice(0, limit - 1)]);
    }, 3000);

    return () => clearInterval(interval);
  }, [market, limit]);

  return (
    <div className="w-full h-full bg-gray-900 rounded-lg shadow-md overflow-hidden">
      <div className="p-3 border-b border-gray-800">
        <h3 className="text-lg font-semibold text-white">近期成交</h3>
      </div>
      
      {/* 表头 */}
      <div className="grid grid-cols-3 text-xs text-gray-400 uppercase p-2 border-b border-gray-800">
        <div>价格(USDC)</div>
        <div className="text-right">数量({market.split('-')[0]})</div>
        <div className="text-right">时间</div>
      </div>
      
      {/* 交易列表 */}
      <div className="overflow-y-auto h-[calc(100%-80px)] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        {trades.map((trade) => (
          <div 
            key={trade.id} 
            className="grid grid-cols-3 text-sm p-2 border-b border-gray-800 hover:bg-gray-800"
          >
            <div className={`${trade.side === 'buy' ? 'text-green-500' : 'text-red-500'}`}>
              {formatPrice(trade.price)}
            </div>
            <div className="text-right text-gray-300">{trade.size.toFixed(3)}</div>
            <div className="text-right text-gray-400">{formatTime(trade.timestamp)}</div>
          </div>
        ))}
        
        {trades.length === 0 && (
          <div className="text-center text-gray-400 p-4">
            暂无交易数据
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTrades; 