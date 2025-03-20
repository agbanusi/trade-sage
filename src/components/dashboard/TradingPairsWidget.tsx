
import React from 'react';
import { ArrowUpIcon, ArrowDownIcon, LockIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TradingPair, TimeFrame } from '@/types';
import { cn } from '@/lib/utils';
import { mockTradingPairs } from '@/utils/mockData';

interface TradingPairsWidgetProps {
  timeframe: TimeFrame;
  isPremium: boolean;
}

export const TradingPairsWidget: React.FC<TradingPairsWidgetProps> = ({ timeframe, isPremium }) => {
  // We'll use mock data here
  const tradingPairs = mockTradingPairs.slice(0, isPremium ? mockTradingPairs.length : 3);
  
  return (
    <Card className="overflow-hidden">
      <div className="p-6 pb-2">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-medium">Trading Pairs</h3>
          <Badge variant="outline">{timeframe} Timeframe</Badge>
        </div>
      </div>
      <ScrollArea className="h-[320px]">
        <div className="grid grid-cols-1 divide-y">
          {tradingPairs.map((pair) => (
            <TradingPairRow key={pair.id} pair={pair} />
          ))}
          {!isPremium && (
            <div className="p-4 flex flex-col items-center justify-center gap-2 bg-muted/20">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <LockIcon className="h-4 w-4" />
                <span>Unlock all trading pairs with Pro</span>
              </div>
              <Button size="sm" variant="outline">Upgrade Now</Button>
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};

interface TradingPairRowProps {
  pair: TradingPair;
}

const TradingPairRow: React.FC<TradingPairRowProps> = ({ pair }) => {
  const isPositive = pair.change >= 0;

  return (
    <div className="p-4 hover:bg-muted/20 transition-colors flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
          {pair.symbol.substring(0, 3)}
        </div>
        <div>
          <div className="font-medium">{pair.name}</div>
          <div className="text-sm text-muted-foreground">{pair.symbol}</div>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="text-right">
          <div className="font-mono font-medium">${pair.price.toFixed(2)}</div>
          <div className={cn(
            "text-sm flex items-center gap-1",
            isPositive ? "text-green-500" : "text-red-500"
          )}>
            {isPositive ? (
              <ArrowUpIcon className="h-3 w-3" />
            ) : (
              <ArrowDownIcon className="h-3 w-3" />
            )}
            {Math.abs(pair.changePercent).toFixed(2)}%
          </div>
        </div>
        
        <Button size="sm" variant="outline">View</Button>
      </div>
    </div>
  );
};
