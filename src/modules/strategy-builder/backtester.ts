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
  type: 'buy' | 'sell';
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
 * Execute strategy backtest
 * @param components Strategy component list
 * @param params Backtest parameters
 * @returns Backtest results
 */
export async function runBacktest(
  components: CanvasComponent[],
  params: BacktestParameters
): Promise<BacktestResult> {
  // Simulate backtest process: In actual development, this part needs to execute real backtest logic based on strategy components
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Generate sample backtest results
  return generateMockBacktestResult();
}

/**
 * Generate mock backtest results (for demonstration only)
 */
function generateMockBacktestResult(): BacktestResult {
  // Generate mock backtest metrics
  return {
    metrics: [
      {
        name: 'Total Return',
        value: '15.8%',
        description: 'Total return rate during backtest period'
      }
    ],
    trades: []
  };
} 