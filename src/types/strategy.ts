// Strategy type definitions

// Strategy component types
export type ComponentType = 'indicator' | 'entry' | 'exit' | 'position' | 'risk';

// Strategy component interface
export interface Component {
  id: string;
  type: ComponentType;
  name: string;
  description: string;
  position?: { x: number; y: number };
  connections?: string[];
  configurable?: boolean;
  parameters?: ParameterConfig[];
}

// Parameter definitions
export interface ParameterConfig {
  id: string;
  name: string;
  type: 'number' | 'string' | 'boolean' | 'select';
  default: any;
  min?: number;
  max?: number;
  step?: number;
  options?: { value: string; label: string }[];
  description?: string;
  value?: any;
}

// Indicator component
export interface IndicatorComponent extends Component {
  type: 'indicator';
  outputs?: { id: string; name: string; type: string }[];
}

// Entry condition component
export interface EntryComponent extends Component {
  type: 'entry';
  signalType?: 'long' | 'short' | 'both';
  requiredInputs?: string[];
}

// Exit condition component
export interface ExitComponent extends Component {
  type: 'exit';
  signalType?: 'long' | 'short' | 'both';
  requiredInputs?: string[];
}

// Position sizing component
export interface PositionComponent extends Component {
  type: 'position';
}

// Risk management component
export interface RiskComponent extends Component {
  type: 'risk';
}

// Strategy interface
export interface Strategy {
  id: string;
  name: string;
  description: string;
  components: Component[];
  createdAt: Date;
  updatedAt: Date;
  author: string;
  isPublic: boolean;
  tags: string[];
  performance?: BacktestPerformance;
}

// Backtest trade
export interface BacktestTrade {
  id: string;
  entryTime: Date;
  entryPrice: number;
  exitTime?: Date;
  exitPrice?: number;
  quantity: number;
  direction: 'long' | 'short';
  pnl?: number;
  pnlPercentage?: number;
  status: 'open' | 'closed';
  exitReason?: string;
}

// Backtest period
export interface BacktestPeriod {
  startTime: Date;
  endTime: Date;
  trades: BacktestTrade[];
}

// Backtest performance metrics
export interface BacktestPerformance {
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  averageWin: number;
  averageLoss: number;
  largestWin: number;
  largestLoss: number;
  profitFactor: number;
  sharpeRatio: number;
  sortino: number;
  maxDrawdown: number;
  maxDrawdownPercentage: number;
  totalPnl: number;
  totalPnlPercentage: number;
  annualizedReturn: number;
  dailyPnl: { date: Date; pnl: number }[];
  equity: { date: Date; value: number }[];
  monthlyReturns: { month: string; return: number }[];
}

// Backtest results
export interface BacktestResult {
  strategyId: string;
  period: BacktestPeriod;
  performance: BacktestPerformance;
  symbol: string;
  timeframe: string;
  startBalance: number;
  endBalance: number;
} 