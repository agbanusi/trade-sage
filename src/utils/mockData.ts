
import { TradingPair, PricePoint, TradingSignal, IndicatorSettings } from '../types';

// Mock trading pairs
export const mockTradingPairs: TradingPair[] = [
  {
    id: 'xauusd',
    symbol: 'XAU/USD',
    name: 'Gold',
    price: 2024.75,
    change: 12.50,
    changePercent: 0.62,
    high24h: 2030.15,
    low24h: 2010.30,
    volume24h: 156487,
  },
  {
    id: 'xagusd',
    symbol: 'XAG/USD',
    name: 'Silver',
    price: 23.15,
    change: -0.28,
    changePercent: -1.20,
    high24h: 23.55,
    low24h: 22.96,
    volume24h: 89542,
  },
  {
    id: 'eurusd',
    symbol: 'EUR/USD',
    name: 'Euro / US Dollar',
    price: 1.0785,
    change: 0.0023,
    changePercent: 0.21,
    high24h: 1.0802,
    low24h: 1.0755,
    volume24h: 245689,
  },
  {
    id: 'gbpusd',
    symbol: 'GBP/USD',
    name: 'British Pound / US Dollar',
    price: 1.2650,
    change: -0.0045,
    changePercent: -0.35,
    high24h: 1.2705,
    low24h: 1.2635,
    volume24h: 187456,
  },
  {
    id: 'usdjpy',
    symbol: 'USD/JPY',
    name: 'US Dollar / Japanese Yen',
    price: 155.75,
    change: 0.45,
    changePercent: 0.29,
    high24h: 156.10,
    low24h: 154.95,
    volume24h: 201542,
  },
  {
    id: 'usdchf',
    symbol: 'USD/CHF',
    name: 'US Dollar / Swiss Franc',
    price: 0.9050,
    change: 0.0025,
    changePercent: 0.28,
    high24h: 0.9075,
    low24h: 0.9015,
    volume24h: 134567,
  },
];

// Function to generate mock price data
export const generateMockPriceData = (
  basePrice: number,
  volatility: number,
  dataPoints: number,
  trend: 'up' | 'down' | 'sideways' = 'sideways'
): PricePoint[] => {
  const now = Date.now();
  const data: PricePoint[] = [];
  
  let price = basePrice;
  let trendFactor = trend === 'up' ? 0.0002 : trend === 'down' ? -0.0002 : 0;
  
  for (let i = 0; i < dataPoints; i++) {
    // Random walk with slight trend bias
    const change = (Math.random() - 0.5) * volatility + (price * trendFactor);
    price += change;
    
    // Ensure price doesn't go negative
    price = Math.max(price, 0.001);
    
    data.push({
      timestamp: now - (dataPoints - i) * 60000, // 1 minute intervals
      price,
    });
  }
  
  return data;
};

// Generate mock trading signals
export const mockTradingSignals: TradingSignal[] = [
  {
    id: '1',
    pairId: 'xauusd',
    symbol: 'XAU/USD',
    type: 'BUY',
    confidence: 87,
    entryPrice: 2024.75,
    stopLoss: 2020.00,
    takeProfit: 2035.50,
    timeframe: '1h',
    timestamp: Date.now() - 15 * 60000, // 15 minutes ago
    indicators: [
      { name: 'RSI', value: '28', signal: 'BUY' },
      { name: 'MACD', value: 'Crossing Up', signal: 'BUY' },
      { name: 'MA Cross', value: '50/200 SMA Bullish', signal: 'BUY' },
      { name: 'Bollinger Bands', value: 'Lower Band Touch', signal: 'BUY' },
    ],
  },
  {
    id: '2',
    pairId: 'usdjpy',
    symbol: 'USD/JPY',
    type: 'SELL',
    confidence: 75,
    entryPrice: 155.75,
    stopLoss: 156.25,
    takeProfit: 154.50,
    timeframe: '15m',
    timestamp: Date.now() - 8 * 60000, // 8 minutes ago
    indicators: [
      { name: 'RSI', value: '74', signal: 'SELL' },
      { name: 'MACD', value: 'Crossing Down', signal: 'SELL' },
      { name: 'MA Cross', value: 'Negative', signal: 'NEUTRAL' },
      { name: 'Bollinger Bands', value: 'Upper Band Touch', signal: 'SELL' },
    ],
  },
  {
    id: '3',
    pairId: 'eurusd',
    symbol: 'EUR/USD',
    type: 'BUY',
    confidence: 68,
    entryPrice: 1.0785,
    stopLoss: 1.0770,
    takeProfit: 1.0820,
    timeframe: '5m',
    timestamp: Date.now() - 4 * 60000, // 4 minutes ago
    indicators: [
      { name: 'RSI', value: '32', signal: 'BUY' },
      { name: 'MACD', value: 'Bullish Divergence', signal: 'BUY' },
      { name: 'MA Cross', value: 'Positive', signal: 'BUY' },
      { name: 'Bollinger Bands', value: 'Middle', signal: 'NEUTRAL' },
    ],
  },
];

// Default indicator settings
export const defaultIndicatorSettings: IndicatorSettings[] = [
  {
    id: 'rsi',
    name: 'Relative Strength Index (RSI)',
    enabled: true,
    parameters: {
      period: 14,
      overbought: 70,
      oversold: 30,
    },
    weight: 1,
  },
  {
    id: 'macd',
    name: 'Moving Average Convergence Divergence (MACD)',
    enabled: true,
    parameters: {
      fastPeriod: 12,
      slowPeriod: 26,
      signalPeriod: 9,
    },
    weight: 1,
  },
  {
    id: 'ma',
    name: 'Moving Average Crossover',
    enabled: true,
    parameters: {
      fastPeriod: 50,
      slowPeriod: 200,
      type: 'SMA',
    },
    weight: 1,
  },
  {
    id: 'bb',
    name: 'Bollinger Bands',
    enabled: true,
    parameters: {
      period: 20,
      standardDeviations: 2,
    },
    weight: 1,
  },
  {
    id: 'fib',
    name: 'Fibonacci Retracement',
    enabled: false,
    parameters: {
      useAutoHighLow: true,
      levels: [0.236, 0.382, 0.5, 0.618, 0.786],
    },
    weight: 0.8,
  },
  {
    id: 'stoch',
    name: 'Stochastic Oscillator',
    enabled: false,
    parameters: {
      kPeriod: 14,
      dPeriod: 3,
      slowing: 3,
    },
    weight: 0.7,
  },
];
