import React from 'react';
import Layout from '@/components/layout/Layout';

interface BacktestMetric {
  name: string;
  value: string | number;
  type: 'positive' | 'negative' | 'neutral';
  description: string;
}

export default function BacktestPage() {
  // Mock backtest result data
  const mockMetrics = [
    {
      name: 'Annual Return',
      value: '32.5%',
      description: 'Annualized return rate of the strategy'
    },
    {
      name: 'Maximum Drawdown',
      value: '-15.8%',
      description: 'Maximum percentage decline from peak'
    },
    {
      name: 'Sharpe Ratio',
      value: '2.1',
      description: 'Risk-adjusted return metric'
    },
    {
      name: 'Win Rate',
      value: '65.2%',
      description: 'Percentage of profitable trades'
    },
    {
      name: 'Trade Count',
      value: '156',
      description: 'Total number of trades during backtest period'
    },
    {
      name: 'Average Hold Time',
      value: '3.2 days',
      description: 'Average holding time per trade'
    },
    {
      name: 'Profit/Loss Ratio',
      value: '1.8',
      description: 'Ratio of average profit to average loss'
    }
  ];

  // Mock trade history data
  const tradeHistory = [
    { id: 1, date: '2023-05-01', type: 'Buy', price: 98.25, amount: 10.5, value: 1031.63, pnl: null },
    { id: 2, date: '2023-05-05', type: 'Sell', price: 103.80, amount: 10.5, value: 1089.90, pnl: '+58.27' },
    { id: 3, date: '2023-05-12', type: 'Buy', price: 101.20, amount: 11.0, value: 1113.20, pnl: null },
    { id: 4, date: '2023-05-18', type: 'Sell', price: 99.40, amount: 11.0, value: 1093.40, pnl: '-19.80' },
    { id: 5, date: '2023-05-25', type: 'Buy', price: 95.30, amount: 12.0, value: 1143.60, pnl: null },
    { id: 6, date: '2023-06-02', type: 'Sell', price: 104.75, amount: 12.0, value: 1257.00, pnl: '+113.40' },
    { id: 7, date: '2023-06-10', type: 'Buy', price: 102.50, amount: 12.5, value: 1281.25, pnl: null },
    { id: 8, date: '2023-06-15', type: 'Sell', price: 108.90, amount: 12.5, value: 1361.25, pnl: '+80.00' },
  ];

  // Mock backtest result data
  const backtestMetrics: BacktestMetric[] = [
    {
      name: 'Annual Return',
      value: '32.5%',
      description: 'Annualized return rate of the strategy'
    },
    {
      name: 'Maximum Drawdown',
      value: '-15.8%',
      description: 'Maximum percentage decline from peak'
    },
    {
      name: 'Sharpe Ratio',
      value: '2.1',
      description: 'Risk-adjusted return metric'
    },
    {
      name: 'Win Rate',
      value: '65.2%',
      description: 'Percentage of profitable trades'
    },
    {
      name: 'Trade Count',
      value: '156',
      description: 'Total number of trades during backtest period'
    },
    {
      name: 'Average Hold Time',
      value: '3.2 days',
      description: 'Average holding time per trade'
    },
    {
      name: 'Profit/Loss Ratio',
      value: '1.8',
      description: 'Ratio of average profit to average loss'
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Strategy Backtest Results</h1>
            <p className="text-gray-400 mt-1">SOL/USDC Golden Cross Strategy | 2023-01-01 to 2023-06-30</p>
          </div>
          
          <div className="flex gap-3">
            <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              Export Data
            </button>
            <button className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
              Deploy Strategy
            </button>
          </div>
        </div>
        
        {/* Backtest Metrics Summary */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {backtestMetrics.map((metric) => (
            <div key={metric.name} className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">{metric.name}</span>
                <span 
                  className={`font-medium ${
                    metric.type === 'positive' ? 'text-green-500' :
                    metric.type === 'negative' ? 'text-red-500' :
                    'text-gray-300'
                  }`}
                >
                  {metric.value}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">{metric.description}</p>
            </div>
          ))}
        </div>
        
        {/* Profit Chart */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Profit Curve</h2>
          {/* Chart Placeholder */}
          <p className="text-gray-500">The strategy backtest profit curve chart will be displayed here</p>
        </div>
        
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Benchmark Return</div>
            <div className="text-white font-medium mt-1">+15.3%</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Excess Return</div>
            <div className="text-green-500 font-medium mt-1">+27.5%</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Volatility</div>
            <div className="text-white font-medium mt-1">21.2%</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Beta Coefficient</div>
            <div className="text-white font-medium mt-1">0.83</div>
          </div>
        </div>
        
        {/* Trade History */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Trade History</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-800">
                  <th className="pb-3 text-gray-400 font-medium">Date</th>
                  <th className="pb-3 text-gray-400 font-medium">Type</th>
                  <th className="pb-3 text-gray-400 font-medium">Price</th>
                  <th className="pb-3 text-gray-400 font-medium">Amount</th>
                  <th className="pb-3 text-gray-400 font-medium">Value</th>
                  <th className="pb-3 text-gray-400 font-medium">PnL</th>
                </tr>
              </thead>
              <tbody>
                {tradeHistory.map((trade) => (
                  <tr key={trade.id} className="border-b border-gray-800">
                    <td className="py-3">{trade.date}</td>
                    <td className={`py-3 ${trade.type === 'Buy' ? 'text-green-500' : 'text-red-500'}`}>
                      {trade.type}
                    </td>
                    <td className="py-3">{trade.price}</td>
                    <td className="py-3">{trade.amount}</td>
                    <td className="py-3">{trade.value}</td>
                    <td className={`py-3 ${trade.pnl?.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {trade.pnl}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-right">
            <a href="#" className="text-purple-500 hover:text-purple-400 transition-colors">
              View All Trades →
            </a>
          </div>
        </div>
        
        {/* Monthly Returns */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Monthly Returns</h2>
          {/* Heatmap Placeholder */}
          <div className="h-48 bg-gray-800 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Monthly returns heatmap will be displayed here</p>
          </div>
        </div>
        
        {/* Backtest Details */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Backtest Settings</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
              <span className="text-gray-400">Time Range</span>
              <span className="text-white">2023-01-01 to 2023-06-30</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
              <span className="text-gray-400">Trading Pair</span>
              <span className="text-white">SOL/USDC</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
              <span className="text-gray-400">Initial Capital</span>
              <span className="text-white">10,000 USDC</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
              <span className="text-gray-400">Fee Rate</span>
              <span className="text-white">0.1%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
              <span className="text-gray-400">Slippage</span>
              <span className="text-white">0.05%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
              <span className="text-gray-400">Timeframe</span>
              <span className="text-white">1h</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 