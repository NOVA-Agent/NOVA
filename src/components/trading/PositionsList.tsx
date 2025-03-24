import React, { useState, useMemo } from 'react';

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

// Mock data
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

  // Filter positions based on tab
  const filteredPositions = useMemo(() => {
    if (activeTab === 'all') return positions;
    return positions.filter(position => position.type === activeTab);
  }, [positions, activeTab]);

  // Close position
  const handleClosePosition = (positionId: string) => {
    if (onClosePosition) {
      onClosePosition(positionId);
    }
    // In a real scenario, this would trigger a close position API call
    // For demo purposes, we'll just remove it from the UI
    setPositions(positions.filter(pos => pos.id !== positionId));
  };

  // Format price
  const formatPrice = (price: number) => {
    if (price < 0.0001) {
      return price.toFixed(8);
    }
    return price.toFixed(2);
  };

  // Format PnL
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
        <h3 className="text-lg font-semibold text-white">Positions</h3>
        
        {/* Tabs */}
        <div className="flex space-x-4 mb-4 mt-2">
          <button
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'all'
                ? 'bg-gray-700 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'long'
                ? 'bg-green-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('long')}
          >
            Long
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'short'
                ? 'bg-red-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('short')}
          >
            Short
          </button>
        </div>
      </div>

      {/* Position List */}
      {filteredPositions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="text-xs text-gray-400 uppercase bg-gray-800">
              <tr>
                <th className="px-4 py-2">Token</th>
                <th className="px-4 py-2">Size</th>
                <th className="px-4 py-2">Leverage</th>
                <th className="px-4 py-2">Entry Price</th>
                <th className="px-4 py-2">Current Price</th>
                <th className="px-4 py-2">Liquidation Price</th>
                <th className="px-4 py-2">PnL</th>
                <th className="px-4 py-2">Action</th>
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
                      className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm"
                      onClick={() => handleClosePosition(position.id)}
                    >
                      Close
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-6 text-center text-gray-400">
          <p>No positions</p>
          <p className="text-sm mt-1">Open a position to see it here</p>
        </div>
      )}
    </div>
  );
};

export default PositionsList; 