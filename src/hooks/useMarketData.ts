import { useState, useEffect } from 'react';
import { sleep } from '@/lib/utils';

// Market data types
export interface TokenPrice {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  lastUpdated: Date;
}

export interface MarketSummary {
  totalMarketCap: number;
  totalVolume24h: number;
  topGainers: TokenPrice[];
  topLosers: TokenPrice[];
  trending: TokenPrice[];
}

/**
 * Fetches market data for a specific token
 * @param symbol Token symbol (e.g. 'SOL')
 * @returns Token price data and loading state
 */
export function useTokenPrice(symbol: string) {
  const [data, setData] = useState<TokenPrice | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // TODO: Replace with actual API call
        // Mock data for development
        await sleep(500);
        
        const mockData: TokenPrice = {
          symbol,
          price: 100 + Math.random() * 10,
          change24h: (Math.random() * 10) - 5,
          volume24h: 1000000 + Math.random() * 5000000,
          marketCap: 10000000000 + Math.random() * 1000000000,
          lastUpdated: new Date()
        };
        
        if (isMounted) {
          setData(mockData);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
    
    // Set up interval to refresh data
    const intervalId = setInterval(fetchData, 30000);
    
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [symbol]);

  return { data, isLoading, error };
}

/**
 * Fetches market summary data
 * @returns Market summary data and loading state
 */
export function useMarketSummary() {
  const [data, setData] = useState<MarketSummary | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // TODO: Replace with actual API call
        // Mock data for development
        await sleep(800);
        
        // Generate mock data
        const generateMockToken = (symbol: string, changeRange: [number, number]): TokenPrice => {
          const [min, max] = changeRange;
          return {
            symbol,
            price: 10 + Math.random() * 1000,
            change24h: min + Math.random() * (max - min),
            volume24h: 1000000 + Math.random() * 10000000,
            marketCap: 10000000 + Math.random() * 1000000000,
            lastUpdated: new Date()
          };
        };
        
        const mockData: MarketSummary = {
          totalMarketCap: 1000000000000 + Math.random() * 100000000000,
          totalVolume24h: 50000000000 + Math.random() * 10000000000,
          topGainers: [
            generateMockToken('JUP', [5, 15]),
            generateMockToken('BONK', [4, 12]),
            generateMockToken('PYTH', [3, 10]),
            generateMockToken('RAY', [2, 8]),
            generateMockToken('MNGO', [1, 6]),
          ],
          topLosers: [
            generateMockToken('SLND', [-15, -5]),
            generateMockToken('MAPS', [-12, -4]),
            generateMockToken('COPE', [-10, -3]),
            generateMockToken('SBR', [-8, -2]),
            generateMockToken('FIDA', [-6, -1]),
          ],
          trending: [
            generateMockToken('SOL', [-3, 8]),
            generateMockToken('JUP', [2, 10]),
            generateMockToken('BONK', [-2, 12]),
            generateMockToken('ORCA', [-5, 5]),
            generateMockToken('MSOL', [0, 6]),
          ]
        };
        
        if (isMounted) {
          setData(mockData);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
    
    // Set up interval to refresh data less frequently (60 seconds)
    const intervalId = setInterval(fetchData, 60000);
    
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  return { data, isLoading, error };
} 