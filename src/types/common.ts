// Solana token types
export interface Token {
  id: string;
  symbol: string;
  name: string;
  logo: string;
  decimals: number;
  address: string;
  coingeckoId?: string;
}

// Trade related types
export interface Trade {
  id: string;
  price: number;
  size: number;
  side: 'buy' | 'sell';
  timestamp: Date;
  market: string;
  value: number;
}

export interface OrderBookItem {
  price: number;
  size: number;
  total: number;
  depth: number;
}

export interface Position {
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

export interface TradeFormData {
  market: string;
  side: 'buy' | 'sell';
  type: 'market' | 'limit';
  price?: number;
  size: number;
  total: number;
  slippage?: number;
}

// User related types
export interface UserProfile {
  id: string;
  username: string;
  avatar?: string;
  isVerified: boolean;
  joinedAt: Date;
  followers: number;
  following: number;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    priceAlerts: boolean;
    news: boolean;
    trades: boolean;
  };
  tradingSettings: {
    defaultLeverage: number;
    confirmTrades: boolean;
    showPnlInHeader: boolean;
    orderBookDepth: number;
    chartSettings: {
      defaultTimeframe: string;
      showVolume: boolean;
      indicators: string[];
    };
  };
}

// UI related types
export type ThemeMode = 'light' | 'dark' | 'system';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: number;
} 