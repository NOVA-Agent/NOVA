import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Position, Token, Trade, OrderBookItem } from '@/types/common';

interface MarketState {
  // Selected market
  selectedMarket: string;
  setSelectedMarket: (market: string) => void;
  
  // Market data
  tokens: Token[];
  updateTokens: (tokens: Token[]) => void;
  
  // Price data
  priceData: Record<string, number>;
  updatePrice: (symbol: string, price: number) => void;
  
  // Price change data (24h)
  priceChangeData: Record<string, number>;
  updatePriceChange: (symbol: string, change: number) => void;
  
  // Order book
  orderBook: {
    bids: OrderBookItem[];
    asks: OrderBookItem[];
    lastUpdated: number;
  };
  updateOrderBook: (bids: OrderBookItem[], asks: OrderBookItem[]) => void;
  
  // Recent trades
  recentTrades: Trade[];
  addTrade: (trade: Trade) => void;
  setRecentTrades: (trades: Trade[]) => void;
  
  // Positions
  positions: Position[];
  addPosition: (position: Position) => void;
  updatePosition: (id: string, updates: Partial<Position>) => void;
  removePosition: (id: string) => void;
  
  // Loading states
  isLoading: {
    marketData: boolean;
    orderBook: boolean;
    trades: boolean;
    positions: boolean;
  };
  setIsLoading: (key: keyof MarketState['isLoading'], value: boolean) => void;
}

// Mock data for initial state
const mockTokens: Token[] = [
  {
    id: 'sol',
    symbol: 'SOL',
    name: 'Solana',
    logo: '/assets/tokens/sol.png',
    decimals: 9,
    address: 'So11111111111111111111111111111111111111112',
    coingeckoId: 'solana',
  },
  {
    id: 'usdc',
    symbol: 'USDC',
    name: 'USD Coin',
    logo: '/assets/tokens/usdc.png',
    decimals: 6,
    address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    coingeckoId: 'usd-coin',
  },
];

export const useMarketStore = create<MarketState>()(
  devtools(
    (set) => ({
      // Initial state
      selectedMarket: 'SOL/USDC',
      setSelectedMarket: (market) => set({ selectedMarket: market }),
      
      tokens: mockTokens,
      updateTokens: (tokens) => set({ tokens }),
      
      priceData: { 'SOL': 101.25, 'USDC': 1.0 },
      updatePrice: (symbol, price) => 
        set((state) => ({
          priceData: {
            ...state.priceData,
            [symbol]: price,
          },
        })),
      
      priceChangeData: { 'SOL': 3.45, 'USDC': 0.01 },
      updatePriceChange: (symbol, change) =>
        set((state) => ({
          priceChangeData: {
            ...state.priceChangeData,
            [symbol]: change,
          },
        })),
      
      orderBook: {
        bids: [],
        asks: [],
        lastUpdated: Date.now(),
      },
      updateOrderBook: (bids, asks) => 
        set({
          orderBook: {
            bids,
            asks,
            lastUpdated: Date.now(),
          },
        }),
      
      recentTrades: [],
      addTrade: (trade) =>
        set((state) => ({
          recentTrades: [trade, ...state.recentTrades].slice(0, 50),
        })),
      setRecentTrades: (trades) => set({ recentTrades: trades }),
      
      positions: [],
      addPosition: (position) =>
        set((state) => ({
          positions: [position, ...state.positions],
        })),
      updatePosition: (id, updates) =>
        set((state) => ({
          positions: state.positions.map((pos) =>
            pos.id === id ? { ...pos, ...updates } : pos
          ),
        })),
      removePosition: (id) =>
        set((state) => ({
          positions: state.positions.filter((pos) => pos.id !== id),
        })),
      
      isLoading: {
        marketData: false,
        orderBook: false,
        trades: false,
        positions: false,
      },
      setIsLoading: (key, value) =>
        set((state) => ({
          isLoading: {
            ...state.isLoading,
            [key]: value,
          },
        })),
    }),
    { name: 'market-store' }
  )
); 