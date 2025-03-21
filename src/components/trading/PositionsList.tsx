import React, { useState } from 'react';

interface Position {
  id: string;
  symbol: string;
  type: 'long' | 'short';
  entryPrice: number;
  currentPrice: number;
  size: number;
  leverage: number;
  liquidationPrice: number;
  pnl: number;
  pnlPercentage: number;
  timestamp: string;
}

interface PositionsListProps {
  onClosePosition?: (positionId: string) => void;
}

// 模拟数据
const mockPositions: Position[] = [
  {
    id: 'pos-1',
    symbol: 'SOL-PERP',
    type: 'long',
    entryPrice: 98.45,
    currentPrice: 101.20,
    size: 5,
    leverage: 10,
    liquidationPrice: 89.75,
    pnl: 137.5,
    pnlPercentage: 2.79,
    timestamp: '2023-12-10T14:30:00Z'
  },
  {
    id: 'pos-2',
    symbol: 'JTO-PERP',
    type: 'short',
    entryPrice: 3.05,
    currentPrice: 2.83,
    size: 100,
    leverage: 5,
    liquidationPrice: 3.55,
    pnl: 22.0,
    pnlPercentage: 7.21,
    timestamp: '2023-12-12T09:15:00Z'
  },
  {
    id: 'pos-3',
    symbol: 'BONK-PERP',
    type: 'long',
    entryPrice: 0.00000882,
    currentPrice: 0.00000932,
    size: 5000000,
    leverage: 3,
    liquidationPrice: 0.00000588,
    pnl: 25.0,
    pnlPercentage: 5.67,
    timestamp: '2023-12-15T11:45:00Z'
  }
];

const PositionsList: React.FC<PositionsListProps> = ({ onClosePosition }) => {
  const [positions, setPositions] = useState<Position[]>(mockPositions);
  const [activeTab, setActiveTab] = useState<'all' | 'long' | 'short'>('all');

  // 根据选项卡过滤头寸
  const filteredPositions = positions.filter(position => {
    if (activeTab === 'all') return true;
    return position.type === activeTab;
  });

  // 关闭头寸
  const handleClosePosition = (positionId: string) => {
    if (onClosePosition) {
      onClosePosition(positionId);
    }
    // 在UI中删除头寸（实际场景中应该在确认关闭后才移除）
    setPositions(positions.filter(pos => pos.id !== positionId));
  };

  // 格式化价格
  const formatPrice = (price: number) => {
    if (price < 0.0001) {
      return price.toFixed(8);
    }
    return price.toFixed(2);
  };

  // 格式化PnL
  const formatPnL = (pnl: number, percentage: number) => {
    const sign = pnl >= 0 ? '+' : '';
    return (
      <>
        <span className={pnl >= 0 ? 'text-green-500' : 'text-red-500'}>
          {sign}${Math.abs(pnl).toFixed(2)} ({sign}{percentage.toFixed(2)}%)
        </span>
      </>
    );
  };

  return (
    <div className="w-full bg-gray-900 rounded-lg shadow-md overflow-hidden">
      <div className="p-3 border-b border-gray-800">
        <h3 className="text-lg font-semibold text-white">持仓</h3>
        
        {/* 选项卡 */}
        <div className="flex mt-2 space-x-2">
          <button
            className={`px-3 py-1 text-sm rounded-md ${
              activeTab === 'all'
                ? 'bg-gray-700 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
            onClick={() => setActiveTab('all')}
          >
            全部
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md ${
              activeTab === 'long'
                ? 'bg-green-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
            onClick={() => setActiveTab('long')}
          >
            多头
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md ${
              activeTab === 'short'
                ? 'bg-red-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
            onClick={() => setActiveTab('short')}
          >
            空头
          </button>
        </div>
      </div>

      {/* 头寸列表 */}
      {filteredPositions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="text-xs text-gray-400 uppercase bg-gray-800">
              <tr>
                <th className="px-4 py-2">代币</th>
                <th className="px-4 py-2">规模</th>
                <th className="px-4 py-2">杠杆</th>
                <th className="px-4 py-2">入场价</th>
                <th className="px-4 py-2">当前价</th>
                <th className="px-4 py-2">清算价</th>
                <th className="px-4 py-2">PnL</th>
                <th className="px-4 py-2">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredPositions.map((position) => (
                <tr key={position.id} className="border-b border-gray-800 hover:bg-gray-800">
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-2 ${
                        position.type === 'long' ? 'bg-green-500' : 'bg-red-500'
                      }`}></span>
                      <span>{position.symbol}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{position.size}</td>
                  <td className="px-4 py-3">{position.leverage}x</td>
                  <td className="px-4 py-3">${formatPrice(position.entryPrice)}</td>
                  <td className="px-4 py-3">${formatPrice(position.currentPrice)}</td>
                  <td className="px-4 py-3">${formatPrice(position.liquidationPrice)}</td>
                  <td className="px-4 py-3">
                    {formatPnL(position.pnl, position.pnlPercentage)}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-white rounded"
                      onClick={() => handleClosePosition(position.id)}
                    >
                      平仓
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-6 text-center text-gray-400">
          <p>没有持仓</p>
          <p className="text-sm mt-1">开仓后将在此显示</p>
        </div>
      )}
    </div>
  );
};

export default PositionsList; 