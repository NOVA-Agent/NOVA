import { useState, useEffect } from 'react';
import { 
  TokenSentiment, 
  WhaleMovement, 
  PatternDetection, 
  NewsItem,
  TokenCorrelation,
  TokenPrediction,
  AnalysisReport
} from './types';
import {
  mockTokenSentiments,
  mockWhaleMovements,
  mockPatternDetections,
  mockNewsItems,
  mockTokenCorrelations,
  mockTokenPredictions,
  mockAnalysisReport
} from './mockData';
import { sleep } from '@/lib/utils';

/**
 * Hook to fetch sentiment analysis for tokens
 * @param symbols Array of token symbols to fetch sentiment for
 * @returns Object containing sentiment data, loading state, and error
 */
export function useSentimentAnalysis(symbols: string[] = []) {
  const [data, setData] = useState<TokenSentiment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // TODO: Replace with actual API call
        await sleep(1000);
        
        // Filter mock data based on provided symbols
        const filteredData = symbols.length > 0
          ? mockTokenSentiments.filter(sentiment => symbols.includes(sentiment.symbol))
          : mockTokenSentiments;
        
        if (isMounted) {
          setData(filteredData);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch sentiment data'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, [symbols.join(',')]);

  return { data, isLoading, error };
}

/**
 * Hook to fetch whale movements
 * @param tokens Array of token symbols to fetch whale movements for
 * @param limit Maximum number of movements to fetch
 * @returns Object containing whale movement data, loading state, and error
 */
export function useWhaleMovements(tokens: string[] = [], limit: number = 10) {
  const [data, setData] = useState<WhaleMovement[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // TODO: Replace with actual API call
        await sleep(1500);
        
        // Filter mock data based on provided tokens
        let filteredData = tokens.length > 0
          ? mockWhaleMovements.filter(movement => tokens.includes(movement.token))
          : mockWhaleMovements;
          
        // Apply limit
        filteredData = filteredData.slice(0, limit);
        
        if (isMounted) {
          setData(filteredData);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch whale movement data'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, [tokens.join(','), limit]);

  return { data, isLoading, error };
}

/**
 * Hook to fetch pattern detections
 * @param token Token symbol to fetch patterns for
 * @param timeframe Timeframe to fetch patterns for
 * @returns Object containing pattern detection data, loading state, and error
 */
export function usePatternDetections(token?: string, timeframe?: string) {
  const [data, setData] = useState<PatternDetection[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // TODO: Replace with actual API call
        await sleep(2000);
        
        // Filter mock data based on provided token and timeframe
        let filteredData = mockPatternDetections;
        
        if (token) {
          filteredData = filteredData.filter(pattern => pattern.token === token);
        }
        
        if (timeframe) {
          filteredData = filteredData.filter(pattern => pattern.timeframe === timeframe);
        }
        
        if (isMounted) {
          setData(filteredData);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch pattern detection data'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, [token, timeframe]);

  return { data, isLoading, error };
}

/**
 * Hook to fetch news items
 * @param tokens Array of token symbols to fetch news for
 * @param limit Maximum number of news items to fetch
 * @returns Object containing news data, loading state, and error
 */
export function useNewsAnalysis(tokens: string[] = [], limit: number = 10) {
  const [data, setData] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // TODO: Replace with actual API call
        await sleep(1200);
        
        // Filter mock data based on provided tokens
        let filteredData = mockNewsItems;
        
        if (tokens.length > 0) {
          filteredData = filteredData.filter(newsItem => 
            newsItem.tokens.some(token => tokens.includes(token.symbol))
          );
        }
        
        // Sort by published date (newest first)
        filteredData.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
        
        // Apply limit
        filteredData = filteredData.slice(0, limit);
        
        if (isMounted) {
          setData(filteredData);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch news analysis data'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, [tokens.join(','), limit]);

  return { data, isLoading, error };
}

/**
 * Hook to fetch token correlations
 * @param token The base token to find correlations for
 * @param period The time period for correlation (e.g., '30d')
 * @returns Object containing correlation data, loading state, and error
 */
export function useTokenCorrelations(token: string, period: string = '30d') {
  const [data, setData] = useState<TokenCorrelation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // TODO: Replace with actual API call
        await sleep(1800);
        
        // Filter mock data based on provided token and period
        const filteredData = mockTokenCorrelations.filter(
          correlation => 
            (correlation.token1 === token || correlation.token2 === token) && 
            correlation.period === period
        );
        
        if (isMounted) {
          setData(filteredData);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch token correlation data'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, [token, period]);

  return { data, isLoading, error };
}

/**
 * Hook to fetch AI prediction for a token
 * @param symbol The token symbol to get predictions for
 * @param timeframe The prediction timeframe
 * @returns Object containing prediction data, loading state, and error
 */
export function useTokenPrediction(symbol: string, timeframe: string = '7d') {
  const [data, setData] = useState<TokenPrediction | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // TODO: Replace with actual API call
        await sleep(2200);
        
        // Find matching prediction in mock data
        const prediction = mockTokenPredictions.find(
          pred => pred.symbol === symbol && pred.timeframe === timeframe
        );
        
        if (isMounted) {
          setData(prediction || null);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch token prediction'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, [symbol, timeframe]);

  return { data, isLoading, error };
}

/**
 * Hook to fetch AI analysis report for a token
 * @param token The token symbol to get analysis for
 * @returns Object containing analysis report data, loading state, and error
 */
export function useAnalysisReport(token: string) {
  const [data, setData] = useState<AnalysisReport | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // TODO: Replace with actual API call
        await sleep(2500);
        
        // For demo purposes, we're always returning the same mock report
        // In a real app, we would filter based on the token
        const report = token === mockAnalysisReport.token ? mockAnalysisReport : null;
        
        if (isMounted) {
          setData(report);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch analysis report'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, [token]);

  return { data, isLoading, error };
} 