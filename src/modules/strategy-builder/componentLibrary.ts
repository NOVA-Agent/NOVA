import { v4 as uuidv4 } from 'uuid';

interface ComponentProperty {
  type: 'number' | 'select' | 'boolean' | 'string';
  label: string;
  value: any;
  options?: string[] | number[];
  min?: number;
  max?: number;
  step?: number;
}

export interface StrategyComponent {
  id: string;
  type: 'indicator' | 'entryCondition' | 'exitCondition' | 'positionSizing' | 'riskManagement';
  name: string;
  description: string;
  properties: Record<string, ComponentProperty>;
}

// 创建组件的辅助函数
const createComponent = (
  type: StrategyComponent['type'],
  name: string,
  description: string,
  properties: Record<string, ComponentProperty>
): StrategyComponent => ({
  id: uuidv4(),
  type,
  name,
  description,
  properties,
});

// 指标组件
const indicators = [
  createComponent(
    'indicator',
    'Moving Average',
    'Calculate the moving average of a price series',
    {
      period: {
        type: 'number',
        label: '周期',
        value: 20,
        min: 2,
        max: 200,
        step: 1,
      },
      maType: {
        type: 'select',
        label: '类型',
        value: 'SMA',
        options: ['SMA', 'EMA', 'WMA'],
      },
      source: {
        type: 'select',
        label: '数据源',
        value: 'close',
        options: ['open', 'high', 'low', 'close', 'volume'],
      },
    }
  ),
  createComponent(
    'indicator',
    'Relative Strength Index (RSI)',
    'Momentum oscillator that measures the speed and change of price movements',
    {
      period: {
        type: 'number',
        label: '周期',
        value: 14,
        min: 2,
        max: 50,
        step: 1,
      },
      overbought: {
        type: 'number',
        label: '超买阈值',
        value: 70,
        min: 50,
        max: 100,
        step: 1,
      },
      oversold: {
        type: 'number',
        label: '超卖阈值',
        value: 30,
        min: 0,
        max: 50,
        step: 1,
      },
    }
  ),
  createComponent(
    'indicator',
    'Bollinger Bands',
    'Volatility bands placed above and below a moving average',
    {
      period: {
        type: 'number',
        label: '周期',
        value: 20,
        min: 5,
        max: 100,
        step: 1,
      },
      stdDev: {
        type: 'number',
        label: '标准差',
        value: 2,
        min: 0.5,
        max: 5,
        step: 0.1,
      },
    }
  ),
  createComponent(
    'indicator',
    'MACD',
    'Moving Average Convergence Divergence',
    {
      fastPeriod: {
        type: 'number',
        label: '快线周期',
        value: 12,
        min: 2,
        max: 50,
        step: 1,
      },
      slowPeriod: {
        type: 'number',
        label: '慢线周期',
        value: 26,
        min: 5,
        max: 100,
        step: 1,
      },
      signalPeriod: {
        type: 'number',
        label: '信号周期',
        value: 9,
        min: 2,
        max: 30,
        step: 1,
      },
    }
  ),
  createComponent(
    'indicator',
    'Stochastic Oscillator',
    'Compares a closing price to its price range over a given time period',
    {
      kPeriod: {
        type: 'number',
        label: '%K周期',
        value: 14,
        min: 1,
        max: 50,
        step: 1,
      },
      dPeriod: {
        type: 'number',
        label: '%D周期',
        value: 3,
        min: 1,
        max: 20,
        step: 1,
      },
      overbought: {
        type: 'number',
        label: '超买阈值',
        value: 80,
        min: 50,
        max: 100,
        step: 1,
      },
      oversold: {
        type: 'number',
        label: '超卖阈值',
        value: 20,
        min: 0,
        max: 50,
        step: 1,
      },
    }
  ),
];

// 入场条件组件
const entryConditions = [
  createComponent(
    'entryCondition',
    'Price Breakout',
    'Enter when price breaks above/below a threshold',
    {
      direction: {
        type: 'select',
        label: '方向',
        value: 'above',
        options: ['above', 'below'],
      },
      priceLevel: {
        type: 'number',
        label: '价格水平',
        value: 100,
        min: 0,
        max: 1000000,
        step: 0.01,
      },
      lookbackPeriod: {
        type: 'number',
        label: '回溯周期',
        value: 20,
        min: 1,
        max: 200,
        step: 1,
      },
    }
  ),
  createComponent(
    'entryCondition',
    'Moving Average Crossover',
    'Enter when faster MA crosses above/below slower MA',
    {
      direction: {
        type: 'select',
        label: '方向',
        value: 'crossover',
        options: ['crossover', 'crossunder'],
      },
      fastMA: {
        type: 'number',
        label: '快线周期',
        value: 10,
        min: 2,
        max: 50,
        step: 1,
      },
      slowMA: {
        type: 'number',
        label: '慢线周期',
        value: 30,
        min: 5,
        max: 200,
        step: 1,
      },
    }
  ),
  createComponent(
    'entryCondition',
    'RSI Threshold',
    'Enter when RSI crosses above/below a threshold',
    {
      condition: {
        type: 'select',
        label: '条件',
        value: 'oversold',
        options: ['overbought', 'oversold'],
      },
      period: {
        type: 'number',
        label: 'RSI周期',
        value: 14,
        min: 2,
        max: 50,
        step: 1,
      },
      threshold: {
        type: 'number',
        label: '阈值',
        value: 30,
        min: 0,
        max: 100,
        step: 1,
      },
    }
  ),
  createComponent(
    'entryCondition',
    'Bollinger Band Touch',
    'Enter when price touches or crosses a Bollinger Band',
    {
      direction: {
        type: 'select',
        label: '方向',
        value: 'upper',
        options: ['upper', 'lower'],
      },
      period: {
        type: 'number',
        label: '布林带周期',
        value: 20,
        min: 5,
        max: 100,
        step: 1,
      },
      stdDev: {
        type: 'number',
        label: '标准差',
        value: 2,
        min: 0.5,
        max: 5,
        step: 0.1,
      },
    }
  ),
];

// 出场条件组件
const exitConditions = [
  createComponent(
    'exitCondition',
    'Take Profit',
    'Exit when profit threshold is reached',
    {
      percentage: {
        type: 'number',
        label: '百分比',
        value: 10,
        min: 0.1,
        max: 1000,
        step: 0.1,
      },
      trailingStop: {
        type: 'boolean',
        label: '使用追踪止损',
        value: false,
      },
      trailingDistance: {
        type: 'number',
        label: '追踪距离 (%)',
        value: 2,
        min: 0.1,
        max: 20,
        step: 0.1,
      },
    }
  ),
  createComponent(
    'exitCondition',
    'Stop Loss',
    'Exit when loss threshold is reached',
    {
      percentage: {
        type: 'number',
        label: '百分比',
        value: 5,
        min: 0.1,
        max: 100,
        step: 0.1,
      },
    }
  ),
  createComponent(
    'exitCondition',
    'Time-Based Exit',
    'Exit after holding for a specific number of bars',
    {
      bars: {
        type: 'number',
        label: 'K线数量',
        value: 20,
        min: 1,
        max: 1000,
        step: 1,
      },
    }
  ),
  createComponent(
    'exitCondition',
    'Technical Indicator Exit',
    'Exit based on a technical indicator signal',
    {
      condition: {
        type: 'select',
        label: '从区域',
        value: 'overbought',
        options: ['overbought', 'oversold'],
      },
      period: {
        type: 'number',
        label: 'RSI周期',
        value: 14,
        min: 2,
        max: 50,
        step: 1,
      },
      threshold: {
        type: 'number',
        label: '阈值',
        value: 70,
        min: 0,
        max: 100,
        step: 1,
      },
    }
  ),
];

// 仓位规模组件
const positionSizing = [
  createComponent(
    'positionSizing',
    'Fixed Size',
    'Trade with a fixed position size',
    {
      amount: {
        type: 'number',
        label: '金额',
        value: 1000,
        min: 1,
        max: 1000000,
        step: 1,
      },
    }
  ),
  createComponent(
    'positionSizing',
    'Percentage of Equity',
    'Size based on a percentage of account equity',
    {
      percentage: {
        type: 'number',
        label: '百分比',
        value: 10,
        min: 0.1,
        max: 100,
        step: 0.1,
      },
    }
  ),
  createComponent(
    'positionSizing',
    'Fixed Risk',
    'Size position to risk a fixed amount per trade',
    {
      riskAmount: {
        type: 'number',
        label: '风险金额',
        value: 100,
        min: 1,
        max: 1000000,
        step: 1,
      },
    }
  ),
  createComponent(
    'positionSizing',
    'Volatility-Based Sizing',
    'Size position based on market volatility',
    {
      atrPeriod: {
        type: 'number',
        label: 'ATR周期',
        value: 14,
        min: 5,
        max: 100,
        step: 1,
      },
      atrMultiplier: {
        type: 'number',
        label: 'ATR乘数',
        value: 1,
        min: 0.5,
        max: 5,
        step: 0.1,
      },
    }
  ),
];

// 风险管理组件
const riskManagement = [
  createComponent(
    'riskManagement',
    'Max Risk Per Trade',
    'Limit the maximum risk per individual trade',
    {
      maxRiskPercentage: {
        type: 'number',
        label: '最大风险百分比',
        value: 2,
        min: 0.1,
        max: 100,
        step: 0.1,
      },
    }
  ),
  createComponent(
    'riskManagement',
    'Max Open Positions',
    'Limit the maximum number of open positions',
    {
      maxPositions: {
        type: 'number',
        label: '最大持仓数',
        value: 5,
        min: 1,
        max: 100,
        step: 1,
      },
    }
  ),
  createComponent(
    'riskManagement',
    'Daily Loss Limit',
    'Stop trading if daily loss threshold is hit',
    {
      maxDailyLoss: {
        type: 'number',
        label: '最大日损失百分比',
        value: 5,
        min: 0.1,
        max: 100,
        step: 0.1,
      },
      resetDaily: {
        type: 'boolean',
        label: '每日重置',
        value: true,
      },
    }
  ),
  createComponent(
    'riskManagement',
    'Correlation Filter',
    'Avoid correlated trades to reduce risk',
    {
      maxExposurePercentage: {
        type: 'number',
        label: '最大敞口百分比',
        value: 20,
        min: 1,
        max: 100,
        step: 1,
      },
      correlationThreshold: {
        type: 'number',
        label: '相关性阈值',
        value: 0.7,
        min: 0,
        max: 1,
        step: 0.01,
      },
    }
  ),
  createComponent(
    'riskManagement',
    'Risk-Reward Ratio',
    'Filter trades based on risk-reward ratio',
    {
      minRatio: {
        type: 'number',
        label: '最小风险回报比',
        value: 2,
        min: 0.1,
        max: 10,
        step: 0.1,
      },
    }
  ),
];

// 导出所有组件
export const componentLibrary = {
  indicators,
  entryConditions,
  exitConditions,
  positionSizing,
  riskManagement,
}; 