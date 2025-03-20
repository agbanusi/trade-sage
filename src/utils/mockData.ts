
import { TradingPair, PricePoint, TradingSignal, TimeFrame, IndicatorSettings } from '@/types';

// Mock trading pairs
export const mockTradingPairs: TradingPair[] = [
  {
    id: '1',
    symbol: 'EURUSD',
    name: 'Euro / US Dollar',
    price: 1.0876,
    change: 0.0023,
    changePercent: 0.21,
    high24h: 1.0901,
    low24h: 1.0845,
    volume24h: 98765432
  },
  {
    id: '2',
    symbol: 'GBPUSD',
    name: 'British Pound / US Dollar',
    price: 1.2654,
    change: -0.0031,
    changePercent: -0.24,
    high24h: 1.2698,
    low24h: 1.2623,
    volume24h: 76543210
  },
  {
    id: '3',
    symbol: 'USDJPY',
    name: 'US Dollar / Japanese Yen',
    price: 149.87,
    change: 0.76,
    changePercent: 0.51,
    high24h: 150.23,
    low24h: 149.11,
    volume24h: 87654321
  },
  {
    id: '4',
    symbol: 'XAUUSD',
    name: 'Gold / US Dollar',
    price: 2354.12,
    change: 12.35,
    changePercent: 0.53,
    high24h: 2362.40,
    low24h: 2341.20,
    volume24h: 54321098
  },
  {
    id: '5',
    symbol: 'BTCUSD',
    name: 'Bitcoin / US Dollar',
    price: 68432.51,
    change: -1245.32,
    changePercent: -1.79,
    high24h: 69876.54,
    low24h: 67998.32,
    volume24h: 32109876
  },
  {
    id: '6',
    symbol: 'USDCHF',
    name: 'US Dollar / Swiss Franc',
    price: 0.9076,
    change: -0.0018,
    changePercent: -0.20,
    high24h: 0.9102,
    low24h: 0.9058,
    volume24h: 43210987
  }
];

// Mock price points for charts
export const generatePricePoints = (count: number, volatility: number): PricePoint[] => {
  const points: PricePoint[] = [];
  let price = 100;
  const now = Date.now();
  
  for (let i = 0; i < count; i++) {
    const change = (Math.random() - 0.5) * volatility;
    price = Math.max(50, price + change);
    points.push({
      timestamp: now - (count - i) * 3600000, // hourly points going back from now
      price
    });
  }
  
  return points;
};

// Mock trading signals
export const mockTradingSignals: TradingSignal[] = [
  {
    id: '1',
    pairId: '1',
    symbol: 'EURUSD',
    type: 'BUY',
    confidence: 0.78,
    entryPrice: 1.0865,
    stopLoss: 1.0820,
    takeProfit: 1.0940,
    timeframe: '1h',
    timestamp: Date.now() - 1800000, // 30 minutes ago
    indicators: [
      { name: 'RSI', value: '32', signal: 'BUY' },
      { name: 'MACD', value: 'Bullish Crossover', signal: 'BUY' },
      { name: 'SMA50/200', value: 'Bullish', signal: 'BUY' }
    ]
  },
  {
    id: '2',
    pairId: '2',
    symbol: 'GBPUSD',
    type: 'SELL',
    confidence: 0.65,
    entryPrice: 1.2670,
    stopLoss: 1.2710,
    takeProfit: 1.2580,
    timeframe: '4h',
    timestamp: Date.now() - 7200000, // 2 hours ago
    indicators: [
      { name: 'RSI', value: '78', signal: 'SELL' },
      { name: 'MACD', value: 'Bearish Divergence', signal: 'SELL' },
      { name: 'Bollinger', value: 'Upper Band Touched', signal: 'SELL' }
    ]
  },
  {
    id: '3',
    pairId: '3',
    symbol: 'USDJPY',
    type: 'BUY',
    confidence: 0.82,
    entryPrice: 149.65,
    stopLoss: 149.20,
    takeProfit: 150.50,
    timeframe: '1d',
    timestamp: Date.now() - 43200000, // 12 hours ago
    indicators: [
      { name: 'Ichimoku', value: 'Cloud Breakout', signal: 'BUY' },
      { name: 'MACD', value: 'Bullish', signal: 'BUY' },
      { name: 'Volume', value: 'Increasing', signal: 'BUY' }
    ]
  },
  {
    id: '4',
    pairId: '4',
    symbol: 'XAUUSD',
    type: 'NEUTRAL',
    confidence: 0.55,
    entryPrice: 2350.00,
    stopLoss: 2330.00,
    takeProfit: 2375.00,
    timeframe: '4h',
    timestamp: Date.now() - 14400000, // 4 hours ago
    indicators: [
      { name: 'RSI', value: '54', signal: 'NEUTRAL' },
      { name: 'MA', value: 'Sideways', signal: 'NEUTRAL' },
      { name: 'ATR', value: 'Low Volatility', signal: 'NEUTRAL' }
    ]
  },
  {
    id: '5',
    pairId: '5',
    symbol: 'BTCUSD',
    type: 'SELL',
    confidence: 0.72,
    entryPrice: 68900.00,
    stopLoss: 69500.00,
    takeProfit: 67500.00,
    timeframe: '1h',
    timestamp: Date.now() - 3600000, // 1 hour ago
    indicators: [
      { name: 'RSI', value: '72', signal: 'SELL' },
      { name: 'Volume', value: 'Declining', signal: 'SELL' },
      { name: 'MA', value: 'Resistance Test', signal: 'SELL' }
    ]
  }
];

// Default indicator settings
export const defaultIndicatorSettings: IndicatorSettings[] = [
  {
    id: '1',
    name: 'Relative Strength Index (RSI)',
    enabled: true,
    parameters: {
      period: 14,
      overbought: 70,
      oversold: 30
    },
    weight: 0.8
  },
  {
    id: '2',
    name: 'Moving Average Convergence Divergence (MACD)',
    enabled: true,
    parameters: {
      fastPeriod: 12,
      slowPeriod: 26,
      signalPeriod: 9
    },
    weight: 0.7
  },
  {
    id: '3',
    name: 'Bollinger Bands',
    enabled: true,
    parameters: {
      period: 20,
      deviations: 2,
      maType: 'SMA'
    },
    weight: 0.6
  },
  {
    id: '4',
    name: 'Ichimoku Cloud',
    enabled: false,
    parameters: {
      conversionPeriod: 9,
      basePeriod: 26,
      spanPeriod: 52,
      displacement: 26
    },
    weight: 0.5
  },
  {
    id: '5',
    name: 'Stochastic Oscillator',
    enabled: false,
    parameters: {
      kPeriod: 14,
      dPeriod: 3,
      slowing: 3
    },
    weight: 0.6
  }
];

// Mock chart data - fixed values used across the app
export const mockChartData = {
  priceHistory: generatePricePoints(24, 2),
  supportLevels: [95.5, 97.8],
  resistanceLevels: [102.3, 104.7]
};
