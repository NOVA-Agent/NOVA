// Market sentiment types
export type SentimentLevel = 'very_negative' | 'negative' | 'neutral' | 'positive' | 'very_positive';

export interface TokenSentiment {
  symbol: string;
  sentiment: SentimentLevel;
  score: number; // 0-100
  sources: {
    social: SentimentLevel;
    news: SentimentLevel;
    onchain: SentimentLevel;
  };
  keywords: Array<{
    term: string;
    weight: number;
    sentiment: SentimentLevel;
  }>;
  lastUpdated: Date;
}

// Whale tracking types
export interface WhaleMovement {
  id: string;
  wallet: string;
  movement: 'in' | 'out';
  token: string;
  amount: number;
  usdValue: number;
  timestamp: Date;
  txHash: string;
  significance: number; // 1-10
}

// Pattern recognition types
export type PatternType = 
  | 'head_and_shoulders' 
  | 'inverse_head_and_shoulders'
  | 'double_top'
  | 'double_bottom'
  | 'cup_and_handle'
  | 'triangle_ascending'
  | 'triangle_descending'
  | 'triangle_symmetrical'
  | 'flag_bullish'
  | 'flag_bearish'
  | 'wedge_rising'
  | 'wedge_falling';

export interface PatternDetection {
  id: string;
  token: string;
  timeframe: string;
  patternType: PatternType;
  confidence: number; // 0-100
  direction: 'bullish' | 'bearish' | 'neutral';
  detectedAt: Date;
  potentialTargets: {
    price: number;
    probability: number;
    timeframe: string;
  }[];
  chart: {
    startTime: Date;
    endTime: Date;
    keyPoints: Array<{
      x: Date;
      y: number;
      type: string;
    }>;
  };
}

// News analysis types
export interface NewsItem {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedAt: Date;
  summary: string;
  sentiment: SentimentLevel;
  relevance: number; // 0-100
  impactScore: number; // 0-100
  tokens: Array<{
    symbol: string;
    relevance: number; // 0-100
  }>;
}

// Correlation analysis types
export interface TokenCorrelation {
  token1: string;
  token2: string;
  correlation: number; // -1 to 1
  period: string; // 1d, 7d, 30d, etc.
  strength: 'strong' | 'moderate' | 'weak';
  direction: 'positive' | 'negative';
  lastUpdated: Date;
}

// AI prediction types
export interface TokenPrediction {
  symbol: string;
  timeframe: string;
  prediction: {
    price: number;
    direction: 'up' | 'down' | 'sideways';
    confidence: number; // 0-100
    volatility: number; // 0-100
  };
  factors: Array<{
    name: string;
    influence: number; // -100 to 100
    description: string;
  }>;
  timestamp: Date;
  nextUpdate: Date;
}

// AI analysis report types
export interface AnalysisReport {
  id: string;
  token: string;
  timestamp: Date;
  summary: string;
  technicalAnalysis: {
    rating: 'strong_buy' | 'buy' | 'neutral' | 'sell' | 'strong_sell';
    indicators: {
      moving_averages: 'bullish' | 'bearish' | 'neutral';
      oscillators: 'bullish' | 'bearish' | 'neutral';
      support_resistance: Array<{
        type: 'support' | 'resistance';
        level: number;
        strength: number; // 0-100
      }>;
    };
  };
  fundamentalAnalysis: {
    rating: 'strong_buy' | 'buy' | 'neutral' | 'sell' | 'strong_sell';
    metrics: {
      onchain_activity: number; // 0-100
      development_activity: number; // 0-100
      network_growth: number; // 0-100
      adoption_metrics: number; // 0-100
    };
  };
  sentimentAnalysis: {
    rating: SentimentLevel;
    sources: {
      social: SentimentLevel;
      news: SentimentLevel;
      onchain: SentimentLevel;
    };
  };
  recommendedActions: Array<{
    action: string;
    reasoning: string;
    confidence: number; // 0-100
  }>;
} 