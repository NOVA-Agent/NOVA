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

// Helper function to create components
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

// Indicator components
const indicators = [
  createComponent(
    'indicator',
    'Moving Average',
    'Calculate the moving average of a price series',
    {
      period: {
        type: 'number',
        label: 'Period',
        value: 20,
        min: 2,
        max: 200,
        step: 1,
      },
      maType: {
        type: 'select',
        label: 'Type',
        value: 'SMA',
        options: ['SMA', 'EMA', 'WMA'],
      },
      source: {
        type: 'select',
        label: 'Data Source',
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
        label: 'Period',
        value: 14,
        min: 2,
        max: 50,
        step: 1,
      },
      overbought: {
        type: 'number',
        label: 'Overbought Level',
        value: 70,
        min: 50,
        max: 100,
        step: 1,
      },
      oversold: {
        type: 'number',
        label: 'Oversold Level',
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
        label: 'Period',
        value: 20,
        min: 5,
        max: 100,
        step: 1,
      },
      stdDev: {
        type: 'number',
        label: 'Standard Deviation',
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
        label: 'Fast Period',
        value: 12,
        min: 2,
        max: 50,
        step: 1,
      },
      slowPeriod: {
        type: 'number',
        label: 'Slow Period',
        value: 26,
        min: 5,
        max: 100,
        step: 1,
      },
      signalPeriod: {
        type: 'number',
        label: 'Signal Period',
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
        label: '%K Period',
        value: 14,
        min: 1,
        max: 50,
        step: 1,
      },
      dPeriod: {
        type: 'number',
        label: '%D Period',
        value: 3,
        min: 1,
        max: 20,
        step: 1,
      },
      overbought: {
        type: 'number',
        label: 'Overbought Level',
        value: 80,
        min: 50,
        max: 100,
        step: 1,
      },
      oversold: {
        type: 'number',
        label: 'Oversold Level',
        value: 20,
        min: 0,
        max: 50,
        step: 1,
      },
    }
  ),
];

// Entry condition components
const entryConditions = [
  createComponent(
    'entryCondition',
    'Price Breakout',
    'Enter when price breaks above/below a threshold',
    {
      direction: {
        type: 'select',
        label: 'Direction',
        value: 'above',
        options: ['above', 'below'],
      },
      priceLevel: {
        type: 'number',
        label: 'Price Level',
        value: 100,
        min: 0,
        max: 1000000,
        step: 0.01,
      },
      lookbackPeriod: {
        type: 'number',
        label: 'Lookback Period',
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
        label: 'Direction',
        value: 'crossover',
        options: ['crossover', 'crossunder'],
      },
      fastMA: {
        type: 'number',
        label: 'Fast Period',
        value: 10,
        min: 2,
        max: 50,
        step: 1,
      },
      slowMA: {
        type: 'number',
        label: 'Slow Period',
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
        label: 'Condition',
        value: 'oversold',
        options: ['overbought', 'oversold'],
      },
      period: {
        type: 'number',
        label: 'RSI Period',
        value: 14,
        min: 2,
        max: 50,
        step: 1,
      },
      threshold: {
        type: 'number',
        label: 'Threshold',
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
        label: 'Direction',
        value: 'upper',
        options: ['upper', 'lower'],
      },
      period: {
        type: 'number',
        label: 'BB Period',
        value: 20,
        min: 5,
        max: 100,
        step: 1,
      },
      stdDev: {
        type: 'number',
        label: 'Standard Deviation',
        value: 2,
        min: 0.5,
        max: 5,
        step: 0.1,
      },
    }
  ),
];

// Exit condition components
const exitConditions = [
  createComponent(
    'exitCondition',
    'Take Profit',
    'Exit when profit threshold is reached',
    {
      percentage: {
        type: 'number',
        label: 'Percentage',
        value: 10,
        min: 0.1,
        max: 1000,
        step: 0.1,
      },
      trailingStop: {
        type: 'boolean',
        label: 'Use Trailing Stop',
        value: false,
      },
      trailingDistance: {
        type: 'number',
        label: 'Trailing Distance (%)',
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
        label: 'Percentage',
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
        label: 'K Line Count',
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
        label: 'From Area',
        value: 'overbought',
        options: ['overbought', 'oversold'],
      },
      period: {
        type: 'number',
        label: 'RSI Period',
        value: 14,
        min: 2,
        max: 50,
        step: 1,
      },
      threshold: {
        type: 'number',
        label: 'Threshold',
        value: 70,
        min: 0,
        max: 100,
        step: 1,
      },
    }
  ),
];

// Position sizing components
const positionSizing = [
  createComponent(
    'positionSizing',
    'Fixed Size',
    'Trade with a fixed position size',
    {
      amount: {
        type: 'number',
        label: 'Amount',
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
        label: 'Percentage',
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
        label: 'Risk Amount',
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
        label: 'ATR Period',
        value: 14,
        min: 5,
        max: 100,
        step: 1,
      },
      atrMultiplier: {
        type: 'number',
        label: 'ATR Multiplier',
        value: 1,
        min: 0.5,
        max: 5,
        step: 0.1,
      },
    }
  ),
];

// Risk management components
const riskManagement = [
  createComponent(
    'riskManagement',
    'Max Risk Per Trade',
    'Limit the maximum risk per individual trade',
    {
      maxRiskPercentage: {
        type: 'number',
        label: 'Max Risk Percentage',
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
        label: 'Max Position Count',
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
        label: 'Max Daily Loss Percentage',
        value: 5,
        min: 0.1,
        max: 100,
        step: 0.1,
      },
      resetDaily: {
        type: 'boolean',
        label: 'Daily Reset',
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
        label: 'Max Exposure Percentage',
        value: 20,
        min: 1,
        max: 100,
        step: 1,
      },
      correlationThreshold: {
        type: 'number',
        label: 'Correlation Threshold',
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
        label: 'Min Risk-Reward Ratio',
        value: 2,
        min: 0.1,
        max: 10,
        step: 0.1,
      },
    }
  ),
];

// Export all components
export const componentLibrary = {
  indicators,
  entryConditions,
  exitConditions,
  positionSizing,
  riskManagement,
}; 