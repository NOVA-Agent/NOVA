import { 
  TokenSentiment, 
  WhaleMovement, 
  PatternDetection, 
  NewsItem, 
  TokenCorrelation,
  TokenPrediction,
  AnalysisReport
} from './types';

// Mock token sentiment data
export const mockTokenSentiments: TokenSentiment[] = [
  {
    symbol: 'SOL',
    sentiment: 'positive',
    score: 78,
    sources: {
      social: 'positive',
      news: 'very_positive',
      onchain: 'neutral'
    },
    keywords: [
      { term: 'adoption', weight: 9, sentiment: 'positive' },
      { term: 'growth', weight: 7, sentiment: 'positive' },
      { term: 'developer', weight: 6, sentiment: 'positive' },
      { term: 'competition', weight: 3, sentiment: 'negative' }
    ],
    lastUpdated: new Date()
  },
  {
    symbol: 'JUP',
    sentiment: 'very_positive',
    score: 89,
    sources: {
      social: 'very_positive',
      news: 'positive',
      onchain: 'positive'
    },
    keywords: [
      { term: 'airdrop', weight: 10, sentiment: 'very_positive' },
      { term: 'trading', weight: 8, sentiment: 'positive' },
      { term: 'volume', weight: 7, sentiment: 'positive' },
      { term: 'future', weight: 5, sentiment: 'positive' }
    ],
    lastUpdated: new Date()
  },
  {
    symbol: 'BONK',
    sentiment: 'neutral',
    score: 52,
    sources: {
      social: 'positive',
      news: 'neutral',
      onchain: 'negative'
    },
    keywords: [
      { term: 'community', weight: 8, sentiment: 'positive' },
      { term: 'meme', weight: 7, sentiment: 'positive' },
      { term: 'dump', weight: 6, sentiment: 'negative' },
      { term: 'volatility', weight: 5, sentiment: 'negative' }
    ],
    lastUpdated: new Date()
  }
];

// Mock whale movement data
export const mockWhaleMovements: WhaleMovement[] = [
  {
    id: 'wm1',
    wallet: '5ZWj7a1f8tWkjBESHKgrLmXshuXxqeY9SYcfbshpAqPG',
    movement: 'in',
    token: 'SOL',
    amount: 50000,
    usdValue: 5000000,
    timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
    txHash: '2rhs3iqH1c7gMJABFzRuPqQY94ZtQDCkNyJNHcnrzWP2bvjYcDNKEvgU4LGHySM8LSCiufFC9eEWoCN95KRrKN9',
    significance: 8
  },
  {
    id: 'wm2',
    wallet: 'EWmhNKRZKdtJ8GnKSzsGdz7cYmJQpUdwRJvEXzq3xJQK',
    movement: 'out',
    token: 'USDC',
    amount: 2500000,
    usdValue: 2500000,
    timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    txHash: '5QVFvqvbHWzWFq7uQMTNNjfUhRaQNP5ETs8mAhzv9gAavXfDAJn3WXBh6BteA7xVKS8kEgbFmLXCxVKDuiKnZeVY',
    significance: 7
  },
  {
    id: 'wm3',
    wallet: 'Dn1G2vX8XVdHJgcVJ4jCqq9VHJGAVFVhU2MVJGP8JpFb',
    movement: 'in',
    token: 'JUP',
    amount: 1000000,
    usdValue: 120000,
    timestamp: new Date(Date.now() - 14400000), // 4 hours ago
    txHash: '4Wq7f9QXG8kQBAcDGZhQ1KidFvDXAYJQzUN7YKQ13xJY1GcGP7iBSQU2HjbapUTMmP9jbzwqeZ5vD7nEjUuc5nYD',
    significance: 6
  }
];

// Mock pattern detection data
export const mockPatternDetections: PatternDetection[] = [
  {
    id: 'pd1',
    token: 'SOL',
    timeframe: '4h',
    patternType: 'cup_and_handle',
    confidence: 82,
    direction: 'bullish',
    detectedAt: new Date(Date.now() - 3600000), // 1 hour ago
    potentialTargets: [
      { price: 125, probability: 70, timeframe: '1d' },
      { price: 140, probability: 45, timeframe: '1w' }
    ],
    chart: {
      startTime: new Date(Date.now() - 86400000 * 7), // 7 days ago
      endTime: new Date(),
      keyPoints: [
        { x: new Date(Date.now() - 86400000 * 6), y: 95, type: 'starting point' },
        { x: new Date(Date.now() - 86400000 * 3), y: 85, type: 'cup bottom' },
        { x: new Date(Date.now() - 86400000 * 1), y: 97, type: 'cup right lip' },
        { x: new Date(Date.now() - 3600000 * 6), y: 94, type: 'handle bottom' },
        { x: new Date(), y: 101, type: 'breakout' }
      ]
    }
  },
  {
    id: 'pd2',
    token: 'BTC',
    timeframe: '1d',
    patternType: 'triangle_ascending',
    confidence: 75,
    direction: 'bullish',
    detectedAt: new Date(Date.now() - 7200000), // 2 hours ago
    potentialTargets: [
      { price: 58000, probability: 65, timeframe: '1w' },
      { price: 60000, probability: 40, timeframe: '2w' }
    ],
    chart: {
      startTime: new Date(Date.now() - 86400000 * 30), // 30 days ago
      endTime: new Date(),
      keyPoints: [
        { x: new Date(Date.now() - 86400000 * 25), y: 52000, type: 'starting point' },
        { x: new Date(Date.now() - 86400000 * 20), y: 51000, type: 'low point 1' },
        { x: new Date(Date.now() - 86400000 * 10), y: 54000, type: 'high point 1' },
        { x: new Date(Date.now() - 86400000 * 5), y: 53000, type: 'low point 2' },
        { x: new Date(), y: 55000, type: 'breakout' }
      ]
    }
  }
];

// Mock news items
export const mockNewsItems: NewsItem[] = [
  {
    id: 'news1',
    title: 'Solana Releases Major Network Upgrade to Improve Performance',
    source: 'Crypto News Daily',
    url: 'https://example.com/news/solana-upgrade',
    publishedAt: new Date(Date.now() - 86400000), // 1 day ago
    summary: 'Solana has released a significant network upgrade aimed at improving performance and reducing network congestion issues. The upgrade includes changes to the consensus mechanism and fee model.',
    sentiment: 'positive',
    relevance: 90,
    impactScore: 75,
    tokens: [
      { symbol: 'SOL', relevance: 95 },
      { symbol: 'JUP', relevance: 40 },
      { symbol: 'BONK', relevance: 35 }
    ]
  },
  {
    id: 'news2',
    title: 'Jupiter Exchange Volume Surpasses $1 Billion Daily',
    source: 'DeFi Insights',
    url: 'https://example.com/news/jupiter-volume',
    publishedAt: new Date(Date.now() - 43200000), // 12 hours ago
    summary: 'Jupiter Exchange has reached a milestone of $1 billion in daily trading volume, cementing its position as the leading DEX aggregator on Solana. The platform continues to add new features and token listings.',
    sentiment: 'very_positive',
    relevance: 85,
    impactScore: 80,
    tokens: [
      { symbol: 'JUP', relevance: 95 },
      { symbol: 'SOL', relevance: 75 }
    ]
  },
  {
    id: 'news3',
    title: 'Regulatory Concerns Grow for Crypto Markets',
    source: 'Financial Times',
    url: 'https://example.com/news/crypto-regulation',
    publishedAt: new Date(Date.now() - 129600000), // 36 hours ago
    summary: 'Regulatory bodies in several countries have expressed concerns about the crypto market, with some proposing new frameworks for oversight. The news has created uncertainty in the market.',
    sentiment: 'negative',
    relevance: 70,
    impactScore: 65,
    tokens: [
      { symbol: 'BTC', relevance: 80 },
      { symbol: 'SOL', relevance: 65 },
      { symbol: 'ETH', relevance: 75 }
    ]
  }
];

// Mock token correlation data
export const mockTokenCorrelations: TokenCorrelation[] = [
  {
    token1: 'SOL',
    token2: 'BTC',
    correlation: 0.75,
    period: '30d',
    strength: 'strong',
    direction: 'positive',
    lastUpdated: new Date()
  },
  {
    token1: 'SOL',
    token2: 'ETH',
    correlation: 0.82,
    period: '30d',
    strength: 'strong',
    direction: 'positive',
    lastUpdated: new Date()
  },
  {
    token1: 'SOL',
    token2: 'JUP',
    correlation: 0.68,
    period: '30d',
    strength: 'moderate',
    direction: 'positive',
    lastUpdated: new Date()
  },
  {
    token1: 'SOL',
    token2: 'BONK',
    correlation: 0.45,
    period: '30d',
    strength: 'moderate',
    direction: 'positive',
    lastUpdated: new Date()
  }
];

// Mock token prediction data
export const mockTokenPredictions: TokenPrediction[] = [
  {
    symbol: 'SOL',
    timeframe: '7d',
    prediction: {
      price: 125,
      direction: 'up',
      confidence: 72,
      volatility: 45
    },
    factors: [
      { name: 'Technical pattern', influence: 65, description: 'Cup and handle pattern detected on 4h chart' },
      { name: 'Market sentiment', influence: 55, description: 'Overall positive sentiment from social media and news' },
      { name: 'Whale activity', influence: 40, description: 'Increased accumulation by large holders' },
      { name: 'Overall market trend', influence: 35, description: 'Positive correlation with BTC uptrend' }
    ],
    timestamp: new Date(),
    nextUpdate: new Date(Date.now() + 86400000) // Tomorrow
  },
  {
    symbol: 'JUP',
    timeframe: '7d',
    prediction: {
      price: 0.85,
      direction: 'up',
      confidence: 68,
      volatility: 60
    },
    factors: [
      { name: 'Trading volume trend', influence: 70, description: 'Increasing trading volume on Jupiter DEX' },
      { name: 'Social sentiment', influence: 65, description: 'Very positive sentiment on social platforms' },
      { name: 'News impact', influence: 45, description: 'Positive recent news coverage' },
      { name: 'Technical pattern', influence: 35, description: 'Breakout from consolidation phase' }
    ],
    timestamp: new Date(),
    nextUpdate: new Date(Date.now() + 86400000) // Tomorrow
  }
];

// Mock AI analysis report
export const mockAnalysisReport: AnalysisReport = {
  id: 'ar1',
  token: 'SOL',
  timestamp: new Date(),
  summary: 'Solana (SOL) is showing strong bullish signals across technical indicators, fundamentals, and market sentiment. The recent network upgrades and increasing developer activity are positive catalysts. Technical patterns suggest a potential breakout towards the $125-140 range in the short term.',
  technicalAnalysis: {
    rating: 'buy',
    indicators: {
      moving_averages: 'bullish',
      oscillators: 'neutral',
      support_resistance: [
        { type: 'support', level: 98.5, strength: 75 },
        { type: 'support', level: 95.0, strength: 85 },
        { type: 'resistance', level: 105.0, strength: 65 },
        { type: 'resistance', level: 110.0, strength: 70 }
      ]
    }
  },
  fundamentalAnalysis: {
    rating: 'strong_buy',
    metrics: {
      onchain_activity: 82,
      development_activity: 88,
      network_growth: 75,
      adoption_metrics: 80
    }
  },
  sentimentAnalysis: {
    rating: 'positive',
    sources: {
      social: 'positive',
      news: 'very_positive',
      onchain: 'neutral'
    }
  },
  recommendedActions: [
    {
      action: 'Consider accumulating SOL at current levels for medium-term holding',
      reasoning: 'Strong fundamentals combined with positive technical setup',
      confidence: 75
    },
    {
      action: 'Set take-profit targets at $125 and $140',
      reasoning: 'Based on technical pattern price projections',
      confidence: 65
    },
    {
      action: 'Place protective stop-loss below $95',
      reasoning: 'Major support level with high strength',
      confidence: 70
    }
  ]
};
 