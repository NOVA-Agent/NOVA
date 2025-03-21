import React, { useState } from 'react';
import { useStrategyStore } from '@/store/useStrategyStore';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for demonstration
const generateBacktestData = (length = 100, volatility = 0.02) => {
  let equity = 10000;
  const data = [];
  
  for (let i = 0; i < length; i++) {
    // Random daily change with slight upward bias
    const change = (Math.random() - 0.45) * volatility;
    equity = equity * (1 + change);
    
    // Add some drawdowns for realism
    if (i > 0 && i % 20 === 0) {
      equity = equity * 0.95;
    }
    
    data.push({
      date: new Date(2023, 0, i + 1).toISOString().split('T')[0],
      equity: Math.round(equity * 100) / 100,
    });
  }
  
  return data;
};

const calculatePerformanceMetrics = (data: any[]) => {
  if (!data || data.length < 2) return null;
  
  const startEquity = data[0].equity;
  const endEquity = data[data.length - 1].equity;
  
  // Calculate total return
  const totalReturn = ((endEquity - startEquity) / startEquity) * 100;
  
  // Find max drawdown
  let maxDrawdown = 0;
  let peak = data[0].equity;
  
  data.forEach(day => {
    if (day.equity > peak) {
      peak = day.equity;
    }
    const drawdown = ((peak - day.equity) / peak) * 100;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }
  });
  
  // Calculate Sharpe ratio (simplified)
  const returns = [];
  for (let i = 1; i < data.length; i++) {
    returns.push((data[i].equity - data[i-1].equity) / data[i-1].equity);
  }
  
  const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
  const stdDev = Math.sqrt(
    returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length
  );
  
  const sharpeRatio = (avgReturn / stdDev) * Math.sqrt(252); // Annualized
  
  return {
    totalReturn: totalReturn.toFixed(2),
    maxDrawdown: maxDrawdown.toFixed(2),
    sharpeRatio: sharpeRatio.toFixed(2),
    winRate: "58.3", // Mock data
    profitFactor: "1.87", // Mock data
    expectancy: "$245.67", // Mock data
  };
};

export default function BacktestPage() {
  const { activeStrategy } = useStrategyStore();
  const [timeframe, setTimeframe] = useState('1D');
  const [dateRange, setDateRange] = useState('3M');
  
  // Generate mock backtest data
  const backtestData = generateBacktestData();
  const metrics = calculatePerformanceMetrics(backtestData);
  
  // Check if strategy exists and has components to backtest
  const canBacktest = activeStrategy && activeStrategy.components.length > 0;
  
  return (
    <div className="flex flex-col h-full bg-gray-950 p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white">
        {canBacktest 
          ? `Backtest: ${activeStrategy.name}`
          : "Backtest Your Strategy"}
      </h1>
      
      {!canBacktest ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center bg-gray-900 p-8 rounded-lg border border-gray-800 max-w-md">
            <div className="text-5xl mb-4">📊</div>
            <h2 className="text-xl text-white mb-2">No Active Strategy</h2>
            <p className="text-gray-400 mb-4">
              Create a strategy with at least one component to run a backtest.
            </p>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
              Go to Strategy Builder
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Controls */}
          <div className="flex flex-wrap gap-4">
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
              <h3 className="text-sm text-gray-400 mb-2">Timeframe</h3>
              <div className="flex space-x-1">
                {['1m', '5m', '15m', '1H', '4H', '1D', '1W'].map(tf => (
                  <button
                    key={tf}
                    className={`px-3 py-1 rounded ${
                      timeframe === tf
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                    onClick={() => setTimeframe(tf)}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
              <h3 className="text-sm text-gray-400 mb-2">Date Range</h3>
              <div className="flex space-x-1">
                {['1M', '3M', '6M', '1Y', '5Y', 'Max'].map(range => (
                  <button
                    key={range}
                    className={`px-3 py-1 rounded ${
                      dateRange === range
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                    onClick={() => setDateRange(range)}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 ml-auto">
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Run Backtest
              </button>
            </div>
          </div>
          
          {/* Results */}
          <div className="flex-1 grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Equity curve */}
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 xl:col-span-2">
              <h3 className="text-lg font-medium text-white mb-4">Equity Curve</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={backtestData}
                    margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <defs>
                      <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fill: '#888' }}
                      tickFormatter={(tick) => {
                        const date = new Date(tick);
                        return `${date.getMonth()+1}/${date.getDate()}`;
                      }}
                    />
                    <YAxis tick={{ fill: '#888' }} />
                    <Tooltip 
                      contentStyle={{ background: '#333', border: '1px solid #555' }}
                      itemStyle={{ color: '#fff' }}
                      formatter={(value: any) => [`$${value}`, 'Equity']}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="equity" 
                      stroke="#8884d8" 
                      fillOpacity={1} 
                      fill="url(#colorEquity)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Performance metrics */}
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
              <h3 className="text-lg font-medium text-white mb-4">Performance Metrics</h3>
              {metrics && (
                <div className="space-y-4">
                  <div className="bg-gray-800 p-3 rounded">
                    <div className="text-gray-400 text-sm">Total Return</div>
                    <div className="text-2xl font-bold text-white">{metrics.totalReturn}%</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800 p-3 rounded">
                      <div className="text-gray-400 text-sm">Max Drawdown</div>
                      <div className="text-xl font-bold text-red-500">-{metrics.maxDrawdown}%</div>
                    </div>
                    <div className="bg-gray-800 p-3 rounded">
                      <div className="text-gray-400 text-sm">Sharpe Ratio</div>
                      <div className="text-xl font-bold text-green-500">{metrics.sharpeRatio}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-800 p-3 rounded">
                      <div className="text-gray-400 text-sm">Win Rate</div>
                      <div className="text-lg font-bold text-white">{metrics.winRate}%</div>
                    </div>
                    <div className="bg-gray-800 p-3 rounded">
                      <div className="text-gray-400 text-sm">Profit Factor</div>
                      <div className="text-lg font-bold text-white">{metrics.profitFactor}</div>
                    </div>
                    <div className="bg-gray-800 p-3 rounded">
                      <div className="text-gray-400 text-sm">Expectancy</div>
                      <div className="text-lg font-bold text-white">{metrics.expectancy}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Trade list */}
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 xl:col-span-3">
              <h3 className="text-lg font-medium text-white mb-4">Trade List</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-800">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 bg-gray-800 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date & Time</th>
                      <th className="px-4 py-3 bg-gray-800 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                      <th className="px-4 py-3 bg-gray-800 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Entry Price</th>
                      <th className="px-4 py-3 bg-gray-800 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Exit Price</th>
                      <th className="px-4 py-3 bg-gray-800 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Quantity</th>
                      <th className="px-4 py-3 bg-gray-800 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">P&L</th>
                      <th className="px-4 py-3 bg-gray-800 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {/* Mock data for trades */}
                    {[...Array(5)].map((_, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-gray-750' : 'bg-gray-800'}>
                        <td className="px-4 py-3 text-sm text-gray-300">{new Date(2023, 0, 15 + i * 3).toLocaleDateString()}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded text-xs ${i % 2 === 0 ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                            {i % 2 === 0 ? 'LONG' : 'SHORT'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-right text-gray-300">${(10000 + i * 150).toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm text-right text-gray-300">${(10000 + i * 150 + (i % 2 === 0 ? 250 : -180)).toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm text-right text-gray-300">{0.5 + i * 0.1}</td>
                        <td className={`px-4 py-3 text-sm font-medium text-right ${i % 2 === 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {i % 2 === 0 ? '+' : '-'}${(i % 2 === 0 ? 250 : 180).toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-sm text-right text-gray-300">{(1 + i) * 4}h {(1 + i) * 23}m</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 