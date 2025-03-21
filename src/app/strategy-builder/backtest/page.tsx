import React from 'react';
import Layout from '@/components/layout/Layout';

interface BacktestMetric {
  name: string;
  value: string | number;
  type: 'positive' | 'negative' | 'neutral';
  description: string;
}

export default function BacktestPage() {
  // 模拟回测结果数据
  const backtestMetrics: BacktestMetric[] = [
    { 
      name: '总收益', 
      value: '+42.8%', 
      type: 'positive', 
      description: '策略在回测期间的总收益率' 
    },
    { 
      name: '年化收益', 
      value: '+38.2%', 
      type: 'positive', 
      description: '策略的年化收益率' 
    },
    { 
      name: '最大回撤', 
      value: '-18.5%', 
      type: 'negative', 
      description: '最大的下跌百分比' 
    },
    { 
      name: '夏普比率', 
      value: '1.8', 
      type: 'positive', 
      description: '风险调整后的收益率指标' 
    },
    { 
      name: '胜率', 
      value: '68%', 
      type: 'positive', 
      description: '盈利交易占总交易的百分比' 
    },
    { 
      name: '交易次数', 
      value: '86', 
      type: 'neutral', 
      description: '回测期间的总交易次数' 
    },
    { 
      name: '平均持仓时间', 
      value: '3.2天', 
      type: 'neutral', 
      description: '每笔交易的平均持仓时间' 
    },
    { 
      name: '盈亏比', 
      value: '1.5', 
      type: 'positive', 
      description: '平均盈利与平均亏损之比' 
    }
  ];

  // 模拟交易历史数据
  const tradeHistory = [
    { id: 1, date: '2023-05-01', type: '买入', price: 98.25, amount: 10.5, value: 1031.63, pnl: null },
    { id: 2, date: '2023-05-05', type: '卖出', price: 103.80, amount: 10.5, value: 1089.90, pnl: '+58.27' },
    { id: 3, date: '2023-05-12', type: '买入', price: 101.20, amount: 11.0, value: 1113.20, pnl: null },
    { id: 4, date: '2023-05-18', type: '卖出', price: 99.40, amount: 11.0, value: 1093.40, pnl: '-19.80' },
    { id: 5, date: '2023-05-25', type: '买入', price: 95.30, amount: 12.0, value: 1143.60, pnl: null },
    { id: 6, date: '2023-06-02', type: '卖出', price: 104.75, amount: 12.0, value: 1257.00, pnl: '+113.40' },
    { id: 7, date: '2023-06-10', type: '买入', price: 102.50, amount: 12.5, value: 1281.25, pnl: null },
    { id: 8, date: '2023-06-15', type: '卖出', price: 108.90, amount: 12.5, value: 1361.25, pnl: '+80.00' },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">策略回测结果</h1>
            <p className="text-gray-400 mt-1">SOL/USDC 黄金交叉策略 | 2023-01-01 至 2023-06-30</p>
          </div>
          
          <div className="flex gap-3">
            <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              导出数据
            </button>
            <button className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
              部署策略
            </button>
          </div>
        </div>
        
        {/* 回测指标摘要 */}
        <div className="grid grid-cols-4 gap-4 mb-6">
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
        
        {/* 收益图表 */}
        <div className="mb-6 bg-gray-900 rounded-lg p-4 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">收益曲线</h2>
          
          {/* 图表占位符 */}
          <div className="h-80 bg-gray-800 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">此处将显示策略回测的收益曲线图表</p>
          </div>
          
          <div className="mt-4 grid grid-cols-4 gap-4">
            <div className="bg-gray-800 p-3 rounded-lg">
              <div className="text-gray-400 text-sm">基准收益</div>
              <div className="text-white font-medium mt-1">+15.3%</div>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg">
              <div className="text-gray-400 text-sm">超额收益</div>
              <div className="text-green-500 font-medium mt-1">+27.5%</div>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg">
              <div className="text-gray-400 text-sm">波动率</div>
              <div className="text-white font-medium mt-1">21.2%</div>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg">
              <div className="text-gray-400 text-sm">贝塔系数</div>
              <div className="text-white font-medium mt-1">0.83</div>
            </div>
          </div>
        </div>
        
        {/* 交易历史 */}
        <div className="mb-6 bg-gray-900 rounded-lg p-4 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">交易历史</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700 text-left">
                  <th className="pb-3 text-gray-400 font-medium">日期</th>
                  <th className="pb-3 text-gray-400 font-medium">类型</th>
                  <th className="pb-3 text-gray-400 font-medium">价格</th>
                  <th className="pb-3 text-gray-400 font-medium">数量</th>
                  <th className="pb-3 text-gray-400 font-medium">价值</th>
                  <th className="pb-3 text-gray-400 font-medium">盈亏</th>
                </tr>
              </thead>
              <tbody>
                {tradeHistory.map((trade) => (
                  <tr key={trade.id} className="border-b border-gray-800">
                    <td className="py-3 text-white">{trade.date}</td>
                    <td className={`py-3 ${trade.type === '买入' ? 'text-green-500' : 'text-red-500'}`}>
                      {trade.type}
                    </td>
                    <td className="py-3 text-white">{trade.price}</td>
                    <td className="py-3 text-white">{trade.amount}</td>
                    <td className="py-3 text-white">{trade.value}</td>
                    <td className={`py-3 ${
                      trade.pnl === null ? 'text-gray-500' :
                      trade.pnl.startsWith('+') ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {trade.pnl || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 text-right">
            <button className="text-purple-400 text-sm hover:text-purple-300">
              查看全部交易记录 →
            </button>
          </div>
        </div>
        
        {/* 月度收益 */}
        <div className="mb-6 bg-gray-900 rounded-lg p-4 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">月度收益</h2>
          
          {/* 热力图占位符 */}
          <div className="h-60 bg-gray-800 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">此处将显示月度收益热力图</p>
          </div>
        </div>
        
        {/* 回测详情 */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">回测设置</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">时间范围</span>
                <span className="text-white">2023-01-01 至 2023-06-30</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">交易对</span>
                <span className="text-white">SOL/USDC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">初始资金</span>
                <span className="text-white">10,000 USDC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">手续费率</span>
                <span className="text-white">0.1%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">滑点</span>
                <span className="text-white">0.05%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">K线周期</span>
                <span className="text-white">1小时</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">风险分析</h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400">日波动率</span>
                  <span className="text-white">2.8%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '58%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400">跌落次数</span>
                  <span className="text-white">3</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400">最长恢复期</span>
                  <span className="text-white">18天</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400">盈亏比</span>
                  <span className="text-white">1.5</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 