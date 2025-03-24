import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

import { 
  Strategy, 
  StrategyComponent,
  BacktestResult
} from '@/types/strategy';
import { componentLibrary } from '@/modules/strategy-builder/componentLibrary';

// Strategy Component Types
type ComponentType = 'indicator' | 'condition' | 'action';

// Strategy Component Interface
interface Component {
  id: string;
  type: ComponentType;
  name: string;
  description: string;
  properties: Record<string, any>;
}

// Strategy Interface
interface Strategy {
  id: string;
  name: string;
  description: string;
  components: Component[];
  parameters: Record<string, any>;
}

// Strategy State Interface
interface StrategyState {
  strategies: Strategy[];
  selectedStrategy: Strategy | null;
  components: Component[];
  canvas: {
    nodes: any[];
    edges: any[];
  };
}

// Strategy Management Methods
interface StrategyActions {
  createStrategy: (strategy: Strategy) => void;
  updateStrategy: (id: string, updates: Partial<Strategy>) => void;
  deleteStrategy: (id: string) => void;
  selectStrategy: (id: string) => void;
}

// Component Management Methods
interface ComponentActions {
  addComponent: (component: Component) => void;
  updateComponent: (id: string, updates: Partial<Component>) => void;
  deleteComponent: (id: string) => void;
}

// Template Management
interface TemplateActions {
  saveAsTemplate: (strategy: Strategy) => void;
  loadTemplate: (id: string) => void;
}

// Canvas Operations
interface CanvasActions {
  addNode: (node: any) => void;
  updateNode: (id: string, updates: any) => void;
  deleteNode: (id: string) => void;
  addEdge: (edge: any) => void;
  updateEdge: (id: string, updates: any) => void;
  deleteEdge: (id: string) => void;
}

// Backtest Results
interface BacktestResult {
  totalReturn: number;
  sharpeRatio: number;
  maxDrawdown: number;
  winRate: number;
  trades: any[];
}

// Strategy Templates
const defaultTemplates: Strategy[] = [
  {
    id: 'ma-crossover',
    name: 'Moving Average Crossover',
    description: 'Buy when fast MA crosses above slow MA, sell when crosses below',
    components: [],
    parameters: {
      fastPeriod: 10,
      slowPeriod: 20
    }
  }
];

// Default Components
const defaultComponents: Component[] = [
  {
    id: 'ma',
    type: 'indicator',
    name: 'Moving Average',
    description: 'Calculate moving average of price',
    properties: {
      period: 14,
      source: 'close'
    }
  }
];

// Strategy Component Interface
export interface StrategyComponent {
  id: string;
  type: ComponentType;
  name: string;
  description: string;
  properties: Record<string, any>;
  position: { x: number; y: number };
  connections: { to: string; from: string; type: string }[];
}

// Strategy Interface
export interface Strategy {
  id: string;
  name: string;
  description?: string;
  market: string;
  timeframe: string;
  initialCapital: number;
  positionSize: number;
  components: StrategyComponent[];
  createdAt: string;
  updatedAt: string;
}

// Strategy State Interface
interface StrategyState {
  strategies: Strategy[];
  currentStrategy: Strategy | null;
  selectedComponent: string | null;
  
  // Strategy Management Methods
  createNewStrategy: (name: string, market: string, timeframe: string) => void;
  updateStrategy: (strategy: Strategy) => void;
  deleteStrategy: (id: string) => void;
  duplicateStrategy: (id: string) => void;
  setCurrentStrategy: (strategy: Strategy | null) => void;
  
  // Component Management Methods
  addComponent: (component: Omit<StrategyComponent, 'id'>) => void;
  updateComponent: (component: StrategyComponent) => void;
  removeComponent: (id: string) => void;
  selectComponent: (id: string | null) => void;
  connectComponents: (from: string, to: string, type: string) => void;
  
  // Template Management
  loadStrategyTemplate: (templateId: string) => void;
  
  // Canvas Operations
  canvasComponents: Array<{
    id: string;
    componentId: string;
    position: { x: number; y: number };
    connections: Array<{ to: string; fromOutput?: string; toInput?: string }>;
  }>;
  addCanvasComponent: (componentId: string, position: { x: number; y: number }) => void;
  updateCanvasComponentPosition: (id: string, position: { x: number; y: number }) => void;
  disconnectComponents: (fromId: string, toId: string) => void;
  removeCanvasComponent: (id: string) => void;
  
  // Backtest Results
  backtestResults: BacktestResult[];
  addBacktestResult: (result: BacktestResult) => void;
  getBacktestResultsForStrategy: (strategyId: string) => BacktestResult[];
}

// Strategy Template
const strategyTemplates: Record<string, Omit<Strategy, 'id' | 'createdAt' | 'updatedAt'>> = {
  'moving-average-crossover': {
    name: 'Moving Average Crossover',
    description: 'Buy when fast MA crosses above slow MA, sell when crosses below',
    market: 'SOL/USDC',
    timeframe: '1h',
    initialCapital: 1000,
    positionSize: 10,
    components: [
      {
        id: 'ma-fast',
        type: 'indicator',
        name: 'Moving Average',
        description: 'Calculate moving average of price',
        properties: { period: 9, source: 'close', type: 'simple' },
        position: { x: 100, y: 100 },
        connections: []
      },
      {
        id: 'ma-slow',
        type: 'indicator',
        name: 'Moving Average',
        description: 'Calculate moving average of price',
        properties: { period: 21, source: 'close', type: 'simple' },
        position: { x: 100, y: 200 },
        connections: []
      },
      {
        id: 'crossover',
        type: 'condition',
        name: 'Cross Above',
        description: 'When fast MA crosses above slow MA',
        properties: { type: 'above' },
        position: { x: 300, y: 150 },
        connections: [
          { from: 'ma-fast', to: 'crossover', type: 'input1' },
          { from: 'ma-slow', to: 'crossover', type: 'input2' }
        ]
      },
      {
        id: 'crossunder',
        type: 'action',
        name: 'Cross Below',
        description: 'When fast MA crosses below slow MA',
        properties: { type: 'below' },
        position: { x: 300, y: 250 },
        connections: [
          { from: 'ma-fast', to: 'crossunder', type: 'input1' },
          { from: 'ma-slow', to: 'crossunder', type: 'input2' }
        ]
      }
    ]
  },
  'rsi-reversal': {
    name: 'RSI Reversal',
    description: 'Buy when RSI is below 30, sell when RSI is above 70',
    market: 'BTC/USDC',
    timeframe: '4h',
    initialCapital: 1000,
    positionSize: 10,
    components: [
      {
        id: 'rsi',
        type: 'indicator',
        name: 'RSI',
        description: 'Relative Strength Index',
        properties: { period: 14, source: 'close' },
        position: { x: 100, y: 100 },
        connections: []
      },
      {
        id: 'oversold',
        type: 'condition',
        name: 'RSI Below 30',
        description: 'RSI is below 30',
        properties: { threshold: 30 },
        position: { x: 300, y: 100 },
        connections: [
          { from: 'rsi', to: 'oversold', type: 'input' }
        ]
      },
      {
        id: 'overbought',
        type: 'action',
        name: 'RSI Above 70',
        description: 'RSI is above 70',
        properties: { threshold: 70 },
        position: { x: 300, y: 200 },
        connections: [
          { from: 'rsi', to: 'overbought', type: 'input' }
        ]
      },
      {
        id: 'stopLoss',
        type: 'action',
        name: 'Stop Loss',
        description: 'Set stop loss',
        properties: { percentage: 5 },
        position: { x: 500, y: 150 },
        connections: []
      }
    ]
  }
};

// Create Strategy Store
export const useStrategyStore = create<StrategyState>()(
  persist(
    (set, get) => ({
      strategies: [],
      currentStrategy: null,
      selectedComponent: null,
      
      // Strategy Management Methods
      createNewStrategy: (name, market, timeframe) => {
        const newStrategy: Strategy = {
          id: uuidv4(),
          name,
          market,
          timeframe,
          initialCapital: 1000,
          positionSize: 10,
          components: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        set(state => ({
          strategies: [...state.strategies, newStrategy],
          currentStrategy: newStrategy
        }));
      },
      
      updateStrategy: (strategy) => {
        const updatedStrategy = {
          ...strategy,
          updatedAt: new Date().toISOString()
        };
        
        set(state => ({
          strategies: state.strategies.map(s => 
            s.id === strategy.id ? updatedStrategy : s
          ),
          currentStrategy: state.currentStrategy?.id === strategy.id 
            ? updatedStrategy 
            : state.currentStrategy
        }));
      },
      
      deleteStrategy: (id) => {
        set(state => ({
          strategies: state.strategies.filter(s => s.id !== id),
          currentStrategy: state.currentStrategy?.id === id 
            ? null 
            : state.currentStrategy
        }));
      },
      
      duplicateStrategy: (id) => {
        const strategy = get().strategies.find(s => s.id === id);
        if (!strategy) return;
        
        const duplicate: Strategy = {
          ...strategy,
          id: uuidv4(),
          name: `${strategy.name} (Copy)`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        set(state => ({
          strategies: [...state.strategies, duplicate]
        }));
      },
      
      setCurrentStrategy: (strategy) => {
        set({ currentStrategy: strategy });
      },
      
      // Component Management Methods
      addComponent: (component) => {
        if (!get().currentStrategy) return;
        
        const newComponent: StrategyComponent = {
          ...component,
          id: uuidv4()
        };
        
        const updatedStrategy = {
          ...get().currentStrategy,
          components: [...get().currentStrategy.components, newComponent],
          updatedAt: new Date().toISOString()
        };
        
        set(state => ({
          currentStrategy: updatedStrategy,
          strategies: state.strategies.map(s => 
            s.id === updatedStrategy.id ? updatedStrategy : s
          )
        }));
      },
      
      updateComponent: (component) => {
        if (!get().currentStrategy) return;
        
        const updatedStrategy = {
          ...get().currentStrategy,
          components: get().currentStrategy.components.map(c => 
            c.id === component.id ? component : c
          ),
          updatedAt: new Date().toISOString()
        };
        
        set(state => ({
          currentStrategy: updatedStrategy,
          strategies: state.strategies.map(s => 
            s.id === updatedStrategy.id ? updatedStrategy : s
          )
        }));
      },
      
      removeComponent: (id) => {
        if (!get().currentStrategy) return;
        
        const updatedStrategy = {
          ...get().currentStrategy,
          components: get().currentStrategy.components.filter(c => c.id !== id),
          updatedAt: new Date().toISOString()
        };
        
        set(state => ({
          currentStrategy: updatedStrategy,
          strategies: state.strategies.map(s => 
            s.id === updatedStrategy.id ? updatedStrategy : s
          ),
          selectedComponent: state.selectedComponent === id ? null : state.selectedComponent
        }));
      },
      
      selectComponent: (id) => {
        set({ selectedComponent: id });
      },
      
      connectComponents: (from, to, type) => {
        if (!get().currentStrategy) return;
        
        const updatedStrategy = {
          ...get().currentStrategy,
          components: get().currentStrategy.components.map(c => {
            if (c.id === to) {
              return {
                ...c,
                connections: [
                  ...c.connections.filter(conn => conn.type !== type),
                  { from, to, type }
                ]
              };
            }
            return c;
          }),
          updatedAt: new Date().toISOString()
        };
        
        set(state => ({
          currentStrategy: updatedStrategy,
          strategies: state.strategies.map(s => 
            s.id === updatedStrategy.id ? updatedStrategy : s
          )
        }));
      },
      
      // Template Management
      loadStrategyTemplate: (templateId) => {
        const template = strategyTemplates[templateId];
        if (!template) return;
        
        const strategy: Strategy = {
          ...template,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        set(state => ({
          strategies: [...state.strategies, strategy],
          currentStrategy: strategy
        }));
      },
      
      // Canvas Operations
      canvasComponents: [],
      addCanvasComponent: (componentId, position) => set((state) => ({
        canvasComponents: [
          ...state.canvasComponents,
          {
            id: uuidv4(),
            componentId,
            position,
            connections: []
          }
        ]
      })),
      updateCanvasComponentPosition: (id, position) => set((state) => ({
        canvasComponents: state.canvasComponents.map(comp =>
          comp.id === id ? { ...comp, position } : comp
        )
      })),
      disconnectComponents: (fromId, toId) => set((state) => ({
        canvasComponents: state.canvasComponents.map(comp => {
          if (comp.id !== fromId) return comp;
          
          return {
            ...comp,
            connections: comp.connections.filter(conn => conn.to !== toId)
          };
        })
      })),
      removeCanvasComponent: (id) => set((state) => {
        // First filter out the component to be deleted
        const filteredComponents = state.canvasComponents.filter(comp => comp.id !== id);
        
        // Then remove all connections related to the deleted component
        const updatedComponents = filteredComponents.map(comp => ({
          ...comp,
          connections: comp.connections.filter(conn => conn.to !== id)
        }));
        
        return { canvasComponents: updatedComponents };
      }),
      
      // Backtest Results
      backtestResults: [],
      addBacktestResult: (result) => set((state) => ({
        backtestResults: [...state.backtestResults, result]
      })),
      getBacktestResultsForStrategy: (strategyId) => {
        const state = get();
        return state.backtestResults.filter(result => result.strategyId === strategyId);
      }
    }),
    {
      name: 'nova-strategy-storage'
    }
  )
); 