
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TradingSignal } from '../types';
import { cn } from '@/lib/utils';

interface PredictionCardProps {
  signal: TradingSignal;
}

export const PredictionCard: React.FC<PredictionCardProps> = ({ signal }) => {
  const getSignalColor = (type: 'BUY' | 'SELL' | 'NEUTRAL') => {
    switch(type) {
      case 'BUY': return 'text-market-up';
      case 'SELL': return 'text-market-down';
      default: return 'text-market-neutral';
    }
  };
  
  const getSignalBg = (type: 'BUY' | 'SELL' | 'NEUTRAL') => {
    switch(type) {
      case 'BUY': return 'bg-market-up/10';
      case 'SELL': return 'bg-market-down/10';
      default: return 'bg-market-neutral/10';
    }
  };
  
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-market-up';
    if (confidence >= 60) return 'text-amber-500';
    return 'text-market-down';
  };
  
  const timeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <Card className="glass-card overflow-hidden transition-all duration-300 hover:shadow-md animate-fade-in">
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-medium">{signal.symbol}</h3>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 block">
              {signal.timeframe} • {timeAgo(signal.timestamp)}
            </span>
          </div>
          <Badge className={cn(
            "text-sm px-3 py-1",
            getSignalBg(signal.type),
            getSignalColor(signal.type)
          )}>
            {signal.type}
          </Badge>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-800/50 rounded-md">
            <p className="text-xs text-gray-500 dark:text-gray-400">Entry</p>
            <p className="font-medium">{signal.entryPrice.toFixed(signal.entryPrice < 10 ? 5 : 2)}</p>
          </div>
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-800/50 rounded-md">
            <p className="text-xs text-gray-500 dark:text-gray-400">Stop Loss</p>
            <p className="font-medium text-market-down">{signal.stopLoss.toFixed(signal.stopLoss < 10 ? 5 : 2)}</p>
          </div>
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-800/50 rounded-md">
            <p className="text-xs text-gray-500 dark:text-gray-400">Take Profit</p>
            <p className="font-medium text-market-up">{signal.takeProfit.toFixed(signal.takeProfit < 10 ? 5 : 2)}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium">Confidence</p>
          <p className={cn("text-sm font-medium", getConfidenceColor(signal.confidence))}>
            {signal.confidence}%
          </p>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
          <div 
            className={cn(
              "h-1.5 rounded-full", 
              signal.confidence >= 80 ? "bg-market-up" : 
              signal.confidence >= 60 ? "bg-amber-500" : "bg-market-down"
            )} 
            style={{ width: `${signal.confidence}%` }}
          ></div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Indicators</p>
          <div className="flex flex-wrap gap-2">
            {signal.indicators.map((indicator, idx) => (
              <Badge 
                key={idx} 
                variant="outline" 
                className={cn(
                  "text-xs",
                  getSignalColor(indicator.signal)
                )}
              >
                {indicator.name}: {indicator.value}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PredictionCard;
