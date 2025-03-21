import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface TokenBalance {
  symbol: string;
  name: string;
  amount: number;
  usdValue: number;
  address: string;
  logo: string;
}

interface WalletState {
  // Connection state
  connected: boolean;
  setConnected: (connected: boolean) => void;
  
  // Wallet public key
  publicKey: string | null;
  setPublicKey: (publicKey: string | null) => void;
  
  // Balances
  balances: TokenBalance[];
  setBalances: (balances: TokenBalance[]) => void;
  updateBalance: (symbol: string, amount: number, usdValue: number) => void;
  
  // Total balance in USD
  totalBalanceUSD: number;
  updateTotalBalance: () => void;
  
  // Loading states
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  
  // Transaction history
  transactionHistory: {
    id: string;
    type: 'send' | 'receive' | 'swap' | 'stake' | 'unstake' | 'trade';
    amount: number;
    token: string;
    timestamp: number;
    status: 'confirmed' | 'pending' | 'failed';
    from?: string;
    to?: string;
    fee?: number;
  }[];
  addTransaction: (transaction: WalletState['transactionHistory'][0]) => void;
  updateTransactionStatus: (id: string, status: 'confirmed' | 'pending' | 'failed') => void;
  
  // Clear all wallet data (for disconnecting)
  clearWalletData: () => void;
}

// Mock data
const mockBalances: TokenBalance[] = [
  {
    symbol: 'SOL',
    name: 'Solana',
    amount: 10.5,
    usdValue: 1050.75,
    address: 'So11111111111111111111111111111111111111112',
    logo: '/assets/tokens/sol.png',
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    amount: 2500,
    usdValue: 2500,
    address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    logo: '/assets/tokens/usdc.png',
  },
  {
    symbol: 'JUP',
    name: 'Jupiter',
    amount: 1000,
    usdValue: 120,
    address: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
    logo: '/assets/tokens/jup.png',
  },
];

export const useWalletStore = create<WalletState>()(
  devtools(
    (set, get) => ({
      // Initial state
      connected: false,
      setConnected: (connected) => set({ connected }),
      
      publicKey: null,
      setPublicKey: (publicKey) => set({ publicKey }),
      
      balances: [],
      setBalances: (balances) => set({ balances }),
      updateBalance: (symbol, amount, usdValue) => 
        set((state) => ({
          balances: state.balances.map((balance) => 
            balance.symbol === symbol 
              ? { ...balance, amount, usdValue } 
              : balance
          ),
        })),
      
      totalBalanceUSD: 0,
      updateTotalBalance: () => 
        set((state) => ({
          totalBalanceUSD: state.balances.reduce(
            (total, balance) => total + balance.usdValue, 
            0
          ),
        })),
      
      isLoading: false,
      setIsLoading: (isLoading) => set({ isLoading }),
      
      transactionHistory: [],
      addTransaction: (transaction) => 
        set((state) => ({
          transactionHistory: [transaction, ...state.transactionHistory],
        })),
      updateTransactionStatus: (id, status) =>
        set((state) => ({
          transactionHistory: state.transactionHistory.map((tx) =>
            tx.id === id ? { ...tx, status } : tx
          ),
        })),
      
      clearWalletData: () => 
        set({
          connected: false,
          publicKey: null,
          balances: [],
          totalBalanceUSD: 0,
          transactionHistory: [],
        }),
    }),
    { name: 'wallet-store' }
  )
);

// Mock wallet connection (for development)
export const connectMockWallet = () => {
  const wallet = useWalletStore.getState();
  wallet.setConnected(true);
  wallet.setPublicKey('5ZWj7a1f8tWkjBESHKgrLmXshuXxqeY9SYcfbshpAqPG');
  wallet.setBalances(mockBalances);
  wallet.updateTotalBalance();
}; 