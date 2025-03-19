
import React, { useState, useEffect } from 'react';
import { TradingPair as TradingPairType, PricePoint } from '../types';
import { generateMockPriceData } from '../utils/mockData';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

interface TradingPairProps {
  pair: TradingPairType;
  onClick?: () => void;
  selected?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-2 text-xs">
        <p className="font-medium">{new Date(label).toLocaleTimeString()}</p>
        <p className="text-primary">Price: {payload[0].value.toFixed(5)}</p>
      </div>
    );
  }
  return null;
};

export const TradingPair: React.FC<TradingPairProps> = ({ pair, onClick, selected }) => {
  const [priceData, setPriceData] = useState<PricePoint[]>([]);
  const isPositive = pair.change >= 0;
  
  useEffect(() => {
    // Generate mock price data for this pair
    const trend = pair.change > 0 ? 'up' : pair.change < 0 ? 'down' : 'sideways';
    const volatility = pair.price * 0.0005; // 0.05% volatility
    const data = generateMockPriceData(pair.price - (pair.change * 2), volatility, 60, trend);
    setPriceData(data);
  }, [pair]);

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer group",
        "bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm",
        selected && "ring-2 ring-primary"
      )}
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 block">{pair.name}</span>
            <h3 className="text-lg font-medium">{pair.symbol}</h3>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">{pair.price.toFixed(pair.price < 10 ? 5 : pair.price < 100 ? 3 : 2)}</p>
            <span 
              className={cn(
                "text-sm font-medium",
                isPositive ? "text-market-up" : "text-market-down"
              )}
            >
              {isPositive ? '+' : ''}{pair.change.toFixed(pair.price < 10 ? 5 : pair.price < 100 ? 3 : 2)} ({isPositive ? '+' : ''}{pair.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
        
        <div className="h-20 mt-3 -mx-4">
          {priceData.length > 0 && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceData}>
                <XAxis 
                  dataKey="timestamp" 
                  tick={false}
                  axisLine={false}
                  domain={['dataMin', 'dataMax']}
                  hide
                />
                <YAxis 
                  domain={['dataMin', 'dataMax']} 
                  tick={false}
                  axisLine={false}
                  hide
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke={isPositive ? '#34C759' : '#FF3B30'} 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                  animationDuration={500}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
      
      <div 
        className={cn(
          "h-1 w-full transition-opacity duration-300 group-hover:opacity-100",
          isPositive ? "bg-market-up" : "bg-market-down",
          selected ? "opacity-100" : "opacity-40"
        )}
      />
    </Card>
  );
};

export default TradingPair;
