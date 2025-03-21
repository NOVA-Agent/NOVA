import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeMode, UserSettings } from '@/types/common';

interface SettingsState {
  // Theme settings
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  
  // Language settings
  language: string;
  setLanguage: (language: string) => void;
  
  // Notification settings
  notifications: {
    email: boolean;
    push: boolean;
    priceAlerts: boolean;
    news: boolean;
    trades: boolean;
  };
  setNotificationSetting: (key: keyof UserSettings['notifications'], value: boolean) => void;
  
  // Trading settings
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
  setTradingSetting: <K extends keyof UserSettings['tradingSettings']>(
    key: K, 
    value: UserSettings['tradingSettings'][K]
  ) => void;
  setChartSetting: <K extends keyof UserSettings['tradingSettings']['chartSettings']>(
    key: K,
    value: UserSettings['tradingSettings']['chartSettings'][K]
  ) => void;
  
  // Reset settings
  resetSettings: () => void;
}

// Default settings
const DEFAULT_SETTINGS: Pick<SettingsState, 'theme' | 'language' | 'notifications' | 'tradingSettings'> = {
  theme: 'dark',
  language: 'en',
  notifications: {
    email: true,
    push: true,
    priceAlerts: true,
    news: false,
    trades: true,
  },
  tradingSettings: {
    defaultLeverage: 1,
    confirmTrades: true,
    showPnlInHeader: true,
    orderBookDepth: 10,
    chartSettings: {
      defaultTimeframe: '1h',
      showVolume: true,
      indicators: ['ema', 'macd'],
    },
  },
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,
      
      setTheme: (theme) => set({ theme }),
      
      setLanguage: (language) => set({ language }),
      
      setNotificationSetting: (key, value) => 
        set((state) => ({
          notifications: {
            ...state.notifications,
            [key]: value,
          },
        })),
      
      setTradingSetting: (key, value) => 
        set((state) => ({
          tradingSettings: {
            ...state.tradingSettings,
            [key]: value,
          },
        })),
      
      setChartSetting: (key, value) =>
        set((state) => ({
          tradingSettings: {
            ...state.tradingSettings,
            chartSettings: {
              ...state.tradingSettings.chartSettings,
              [key]: value,
            },
          },
        })),
      
      resetSettings: () => set(DEFAULT_SETTINGS),
    }),
    {
      name: 'nova-settings',
    }
  )
); 