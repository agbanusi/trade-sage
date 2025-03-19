
export interface TradingPair {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  high24h: number;
  low24h: number;
  volume24h: number;
}

export interface PricePoint {
  timestamp: number;
  price: number;
}

export interface TradingSignal {
  id: string;
  pairId: string;
  symbol: string;
  type: 'BUY' | 'SELL' | 'NEUTRAL';
  confidence: number;
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  timeframe: string;
  timestamp: number;
  indicators: {
    name: string;
    value: string;
    signal: 'BUY' | 'SELL' | 'NEUTRAL';
  }[];
}

export type TimeFrame = '1m' | '5m' | '15m' | '1h' | '4h' | '1d';

export interface IndicatorSettings {
  id: string;
  name: string;
  enabled: boolean;
  parameters: {
    [key: string]: number | string | boolean;
  };
  weight: number;
}

export interface UserSettings {
  selectedPairs: string[];
  timeframe: TimeFrame;
  notificationsEnabled: boolean;
  indicators: IndicatorSettings[];
  riskLevel: 'low' | 'medium' | 'high';
}
