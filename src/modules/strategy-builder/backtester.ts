import { CanvasComponent } from '@/store/useStrategyStore';

export interface BacktestParameters {
  startDate: string;
  endDate: string;
  initialCapital: number;
  symbol: string;
  feeRate: number;
  slippage: number;
  timeframe: string;
}

export interface TradeHistoryItem {
  id: number;
  date: string;
  type: '买入' | '卖出';
  price: number;
  amount: number;
  value: number;
  pnl: string | null;
}

export interface BacktestMetric {
  name: string;
  value: string | number;
  type: 'positive' | 'negative' | 'neutral';
  description: string;
}

export interface MonthlyReturn {
  year: number;
  month: number;
  return: number;
}

export interface BacktestResult {
  metrics: BacktestMetric[];
  trades: TradeHistoryItem[];
  equityCurve: { date: string; equity: number; benchmark: number }[];
  monthlyReturns: MonthlyReturn[];
  drawdowns: { start: string; end: string; depth: number; recovery: number }[];
  settings: BacktestParameters;
}

/**
 * 执行策略回测
 * @param components 策略组件列表
 * @param params 回测参数
 * @returns 回测结果
 */
export async function runBacktest(
  components: CanvasComponent[],
  params: BacktestParameters
): Promise<BacktestResult> {
  // 模拟回测过程：实际开发时，此部分需要根据策略组件执行真实的回测逻辑
  
  // 模拟1-3秒的处理时间
  await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  // 生成示例回测结果
  return generateMockBacktestResult(params);
}

/**
 * 生成模拟回测结果（仅用于演示）
 */
function generateMockBacktestResult(params: BacktestParameters): BacktestResult {
  // 生成模拟的回测指标
  const metrics: BacktestMetric[] = [
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

  // 生成模拟的交易历史
  const trades: TradeHistoryItem[] = [
    { id: 1, date: '2023-05-01', type: '买入', price: 98.25, amount: 10.5, value: 1031.63, pnl: null },
    { id: 2, date: '2023-05-05', type: '卖出', price: 103.80, amount: 10.5, value: 1089.90, pnl: '+58.27' },
    { id: 3, date: '2023-05-12', type: '买入', price: 101.20, amount: 11.0, value: 1113.20, pnl: null },
    { id: 4, date: '2023-05-18', type: '卖出', price: 99.40, amount: 11.0, value: 1093.40, pnl: '-19.80' },
    { id: 5, date: '2023-05-25', type: '买入', price: 95.30, amount: 12.0, value: 1143.60, pnl: null },
    { id: 6, date: '2023-06-02', type: '卖出', price: 104.75, amount: 12.0, value: 1257.00, pnl: '+113.40' },
    { id: 7, date: '2023-06-10', type: '买入', price: 102.50, amount: 12.5, value: 1281.25, pnl: null },
    { id: 8, date: '2023-06-15', type: '卖出', price: 108.90, amount: 12.5, value: 1361.25, pnl: '+80.00' },
  ];

  // 生成模拟的账户价值曲线
  const startDate = new Date(params.startDate);
  const endDate = new Date(params.endDate);
  const daysDiff = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  const equityCurve = [];
  let equity = params.initialCapital;
  let benchmark = params.initialCapital;
  
  for (let i = 0; i <= daysDiff; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    // 随机生成每日价值变化
    equity = equity * (1 + (Math.random() * 0.01 - 0.003));
    benchmark = benchmark * (1 + (Math.random() * 0.006 - 0.002));
    
    equityCurve.push({
      date: currentDate.toISOString().split('T')[0],
      equity: Math.round(equity * 100) / 100,
      benchmark: Math.round(benchmark * 100) / 100,
    });
  }

  // 生成模拟的月度收益
  const monthlyReturns: MonthlyReturn[] = [];
  
  // 获取回测期间的年月
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();
  const endYear = endDate.getFullYear();
  const endMonth = endDate.getMonth();
  
  for (let year = startYear; year <= endYear; year++) {
    const monthStart = year === startYear ? startMonth : 0;
    const monthEnd = year === endYear ? endMonth : 11;
    
    for (let month = monthStart; month <= monthEnd; month++) {
      monthlyReturns.push({
        year,
        month,
        return: Math.round((Math.random() * 12 - 2) * 100) / 100,
      });
    }
  }

  // 生成模拟的回撤
  const drawdowns = [
    { start: '2023-05-15', end: '2023-05-25', depth: 8.2, recovery: 10 },
    { start: '2023-06-05', end: '2023-06-20', depth: 5.4, recovery: 15 },
    { start: '2023-07-10', end: '2023-07-28', depth: 18.5, recovery: 18 },
  ];

  return {
    metrics,
    trades,
    equityCurve,
    monthlyReturns,
    drawdowns,
    settings: params,
  };
} 