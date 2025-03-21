import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

import { 
  Strategy, 
  StrategyComponent,
  BacktestResult
} from '@/types/strategy';
import { componentLibrary } from '@/modules/strategy-builder/componentLibrary';

// 策略组件类型
export type ComponentType = 'indicator' | 'entryCondition' | 'exitCondition' | 'positionSizing' | 'riskManagement';

// 策略组件接口
export interface StrategyComponent {
  id: string;
  type: ComponentType;
  name: string;
  description: string;
  properties: Record<string, any>;
  position: { x: number; y: number };
  connections: { to: string; from: string; type: string }[];
}

// 策略接口
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

// 策略状态接口
interface StrategyState {
  strategies: Strategy[];
  currentStrategy: Strategy | null;
  selectedComponent: string | null;
  
  // 策略管理方法
  createNewStrategy: (name: string, market: string, timeframe: string) => void;
  updateStrategy: (strategy: Strategy) => void;
  deleteStrategy: (id: string) => void;
  duplicateStrategy: (id: string) => void;
  setCurrentStrategy: (strategy: Strategy | null) => void;
  
  // 组件管理方法
  addComponent: (component: Omit<StrategyComponent, 'id'>) => void;
  updateComponent: (component: StrategyComponent) => void;
  removeComponent: (id: string) => void;
  selectComponent: (id: string | null) => void;
  connectComponents: (from: string, to: string, type: string) => void;
  
  // 模板管理
  loadStrategyTemplate: (templateId: string) => void;
  
  // 画布操作
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
  
  // 回测结果
  backtestResults: BacktestResult[];
  addBacktestResult: (result: BacktestResult) => void;
  getBacktestResultsForStrategy: (strategyId: string) => BacktestResult[];
}

// 策略模板
const strategyTemplates: Record<string, Omit<Strategy, 'id' | 'createdAt' | 'updatedAt'>> = {
  'moving-average-crossover': {
    name: '移动平均线交叉策略',
    description: '当快速移动平均线上穿慢速移动平均线时买入，下穿时卖出',
    market: 'SOL/USDC',
    timeframe: '1h',
    initialCapital: 1000,
    positionSize: 10,
    components: [
      {
        id: 'ma-fast',
        type: 'indicator',
        name: '移动平均线',
        description: '计算价格的移动平均值',
        properties: { period: 9, source: 'close', type: 'simple' },
        position: { x: 100, y: 100 },
        connections: []
      },
      {
        id: 'ma-slow',
        type: 'indicator',
        name: '移动平均线',
        description: '计算价格的移动平均值',
        properties: { period: 21, source: 'close', type: 'simple' },
        position: { x: 100, y: 200 },
        connections: []
      },
      {
        id: 'crossover',
        type: 'entryCondition',
        name: '交叉',
        description: '当一条线上穿另一条线时触发',
        properties: { type: 'above' },
        position: { x: 300, y: 150 },
        connections: [
          { from: 'ma-fast', to: 'crossover', type: 'input1' },
          { from: 'ma-slow', to: 'crossover', type: 'input2' }
        ]
      },
      {
        id: 'crossunder',
        type: 'exitCondition',
        name: '交叉',
        description: '当一条线下穿另一条线时触发',
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
    name: 'RSI反转策略',
    description: '当RSI超卖时买入，超买时卖出',
    market: 'BTC/USDC',
    timeframe: '4h',
    initialCapital: 1000,
    positionSize: 10,
    components: [
      {
        id: 'rsi',
        type: 'indicator',
        name: 'RSI',
        description: '相对强弱指标',
        properties: { period: 14, source: 'close' },
        position: { x: 100, y: 100 },
        connections: []
      },
      {
        id: 'oversold',
        type: 'entryCondition',
        name: 'RSI超卖',
        description: 'RSI低于特定值时触发',
        properties: { threshold: 30 },
        position: { x: 300, y: 100 },
        connections: [
          { from: 'rsi', to: 'oversold', type: 'input' }
        ]
      },
      {
        id: 'overbought',
        type: 'exitCondition',
        name: 'RSI超买',
        description: 'RSI高于特定值时触发',
        properties: { threshold: 70 },
        position: { x: 300, y: 200 },
        connections: [
          { from: 'rsi', to: 'overbought', type: 'input' }
        ]
      },
      {
        id: 'stopLoss',
        type: 'riskManagement',
        name: '止损',
        description: '设置止损点',
        properties: { percentage: 5 },
        position: { x: 500, y: 150 },
        connections: []
      }
    ]
  }
};

// 创建策略存储
export const useStrategyStore = create<StrategyState>()(
  persist(
    (set, get) => ({
      strategies: [],
      currentStrategy: null,
      selectedComponent: null,
      
      // 策略管理方法
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
          name: `${strategy.name} (复制)`,
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
      
      // 组件管理方法
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
      
      // 模板管理
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
      
      // 画布操作
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
        // 先过滤掉要删除的组件
        const filteredComponents = state.canvasComponents.filter(comp => comp.id !== id);
        
        // 然后移除与该组件相关的所有连接
        const updatedComponents = filteredComponents.map(comp => ({
          ...comp,
          connections: comp.connections.filter(conn => conn.to !== id)
        }));
        
        return { canvasComponents: updatedComponents };
      }),
      
      // 回测结果
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