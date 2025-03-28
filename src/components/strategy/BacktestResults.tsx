import React from 'react';

interface Trade {
  id: number;
  type: 'BUY' | 'SELL';
  entry: number;
  exit: number;
  entryTime: string;
  exitTime: string;
  quantity: number;
  profitLoss: number;
  profitLossPercent: number;
}

interface BacktestStats {
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  profitFactor: number;
  averageProfit: number;
  averageLoss: number;
  largestProfit: number;
  largestLoss: number;
  maxDrawdown: number;
  sharpeRatio: number;
  totalReturn: number;
  annualizedReturn: number;
}

interface BacktestResultsProps {
  marketName: string;
  timeframe: string;
  strategyName: string;
  period: {
    start: string;
    end: string;
  };
  initialCapital: number;
  stats: BacktestStats;
  trades: Trade[];
  equity: {
    date: string;
    value: number;
  }[];
}

// Mock data for development
const mockStats: BacktestStats = {
  totalTrades: 42,
  winningTrades: 28,
  losingTrades: 14,
  winRate: 66.7,
  profitFactor: 2.8,
  averageProfit: 3.2,
  averageLoss: -1.5,
  largestProfit: 8.5,
  largestLoss: -4.2,
  maxDrawdown: 12.3,
  sharpeRatio: 1.85,
  totalReturn: 34.5,
  annualizedReturn: 28.7
};

const mockTrades: Trade[] = [
  {
    id: 1,
    type: 'BUY',
    entry: 105.25,
    exit: 112.80,
    entryTime: '2023-11-01 10:15',
    exitTime: '2023-11-03 14:30',
    quantity: 10,
    profitLoss: 75.5,
    profitLossPercent: 7.2
  },
  {
    id: 2,
    type: 'SELL',
    entry: 118.40,
    exit: 110.20,
    entryTime: '2023-11-05 09:45',
    exitTime: '2023-11-07 11:10',
    quantity: 8,
    profitLoss: 65.6,
    profitLossPercent: 6.9
  },
  {
    id: 3,
    type: 'BUY',
    entry: 109.75,
    exit: 107.30,
    entryTime: '2023-11-10 13:20',
    exitTime: '2023-11-11 15:45',
    quantity: 12,
    profitLoss: -29.4,
    profitLossPercent: -2.2
  },
  {
    id: 4,
    type: 'BUY',
    entry: 106.50,
    exit: 114.20,
    entryTime: '2023-11-15 10:00',
    exitTime: '2023-11-18 16:30',
    quantity: 15,
    profitLoss: 115.5,
    profitLossPercent: 7.2
  },
  {
    id: 5,
    type: 'SELL',
    entry: 112.80,
    exit: 115.60,
    entryTime: '2023-11-20 11:30',
    exitTime: '2023-11-21 14:15',
    quantity: 10,
    profitLoss: -28,
    profitLossPercent: -2.5
  }
];

const mockEquity = Array.from({ length: 30 }, (_, i) => ({
  date: `2023-11-${i + 1 < 10 ? '0' + (i + 1) : i + 1}`,
  value: 10000 * (1 + 0.01 * Math.sin(i * 0.5) + i * 0.01)
}));

export default function BacktestResults({
  marketName = 'SOL/USDC',
  timeframe = '1h',
  strategyName = 'Moving Average Crossover',
  period = { start: '2023-11-01', end: '2023-11-30' },
  initialCapital = 10000,
  stats = mockStats,
  trades = mockTrades,
  equity = mockEquity
}: Partial<BacktestResultsProps>) {
  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700 p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Backtest Results for {strategyName}</h2>
          <p className="text-gray-400">
            {marketName} ({timeframe}) • {period.start} to {period.end} • Initial Capital: {initialCapital} USDC
          </p>
        </div>
        <div className="flex gap-2">
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded-lg text-sm">
            Export Report
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg text-sm">
            Optimize Strategy
          </button>
        </div>
      </div>
      
      {/* Overall Performance */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Total Return</p>
          <p className={`text-xl font-bold ${stats.totalReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {stats.totalReturn >= 0 ? '+' : ''}{stats.totalReturn.toFixed(2)}%
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Maximum Drawdown</p>
          <p className="text-xl font-bold text-red-400">
            -{stats.maxDrawdown.toFixed(2)}%
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Win Rate</p>
          <p className="text-xl font-bold text-white">
            {stats.winRate.toFixed(1)}%
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Sharpe Ratio</p>
          <p className="text-xl font-bold text-white">
            {stats.sharpeRatio.toFixed(2)}
          </p>
        </div>
      </div>
      
      {/* Profit Curve */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-white font-medium mb-4">Profit Curve</h3>
        <div className="h-64 w-full flex items-end justify-between space-x-2">
          {equity.map((point, index) => {
            const heightPercent = 30 + ((point.value - initialCapital) / initialCapital) * 100 * 2;
            const isPositive = point.value >= initialCapital;
            return (
              <div 
                key={index} 
                className="relative group flex-1 h-full flex items-end"
                title={`${point.date}: ${point.value.toFixed(2)} USDC`}
              >
                <div 
                  className={`w-full ${isPositive ? 'bg-green-500' : 'bg-red-500'} hover:opacity-80 cursor-pointer transition-opacity`}
                  style={{ height: `${Math.min(100, Math.max(5, heightPercent))}%` }}
                />
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {point.date}: {point.value.toFixed(2)} USDC
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Detailed Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Statistics */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-white font-medium mb-4">Detailed Statistics</h3>
          <div className="grid grid-cols-2 gap-y-3 text-sm">
            <div className="text-gray-400">Total Trades</div>
            <div className="text-white text-right">{stats.totalTrades}</div>
            
            <div className="text-gray-400">Winning Trades</div>
            <div className="text-white text-right">{stats.winningTrades}</div>
            
            <div className="text-gray-400">Losing Trades</div>
            <div className="text-white text-right">{stats.losingTrades}</div>
            
            <div className="text-gray-400">Profit Factor</div>
            <div className="text-white text-right">{stats.profitFactor.toFixed(2)}</div>
            
            <div className="text-gray-400">Average Profit</div>
            <div className="text-green-400 text-right">+{stats.averageProfit.toFixed(2)}%</div>
            
            <div className="text-gray-400">Average Loss</div>
            <div className="text-red-400 text-right">{stats.averageLoss.toFixed(2)}%</div>
            
            <div className="text-gray-400">Largest Profit</div>
            <div className="text-green-400 text-right">+{stats.largestProfit.toFixed(2)}%</div>
            
            <div className="text-gray-400">Largest Loss</div>
            <div className="text-red-400 text-right">{stats.largestLoss.toFixed(2)}%</div>
            
            <div className="text-gray-400">Annualized Return</div>
            <div className={`text-right ${stats.annualizedReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {stats.annualizedReturn >= 0 ? '+' : ''}{stats.annualizedReturn.toFixed(2)}%
            </div>
          </div>
        </div>
        
        {/* Right: Trade History */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-white font-medium mb-4">Recent Trades</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 text-sm">
                  <th className="pb-2">Type</th>
                  <th className="pb-2">Entry Price</th>
                  <th className="pb-2">Exit Price</th>
                  <th className="pb-2">Profit</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {trades.map((trade) => (
                  <tr key={trade.id} className="border-t border-gray-700">
                    <td className={`py-2 ${trade.type === 'BUY' ? 'text-green-400' : 'text-red-400'}`}>
                      {trade.type === 'BUY' ? 'Long' : 'Short'}
                    </td>
                    <td className="py-2 text-gray-300">{trade.entry.toFixed(2)}</td>
                    <td className="py-2 text-gray-300">{trade.exit.toFixed(2)}</td>
                    <td className={`py-2 ${trade.profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {trade.profitLoss >= 0 ? '+' : ''}{trade.profitLossPercent.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-center">
            <button className="text-purple-400 text-sm hover:text-purple-300">
              View All Trades →
            </button>
          </div>
        </div>
      </div>
      
      {/* Bottom Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
        <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
          Save to My Strategy
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
          Use This Strategy for Trading
        </button>
      </div>
    </div>
  );
} 