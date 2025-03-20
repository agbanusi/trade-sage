
import React from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpIcon, ArrowDownIcon, MinusIcon, LockIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockTradingSignals } from '@/utils/mockData';

interface SignalsWidgetProps {
  isPremium: boolean;
}

export const SignalsWidget: React.FC<SignalsWidgetProps> = ({ isPremium }) => {
  // Filter signals for non-premium users
  const signals = isPremium ? mockTradingSignals : mockTradingSignals.slice(0, 2);

  return (
    <Card className="overflow-hidden">
      <div className="p-6 pb-2">
        <h3 className="text-xl font-medium">Recent Trading Signals</h3>
      </div>
      
      {isPremium ? (
        <ScrollArea className="h-[400px]">
          <div className="grid grid-cols-1 divide-y">
            {signals.map((signal) => (
              <SignalRow key={signal.id} signal={signal} />
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div>
          <div className="grid grid-cols-1 divide-y">
            {signals.map((signal) => (
              <SignalRow key={signal.id} signal={signal} />
            ))}
          </div>
          <div className="p-8 flex flex-col items-center justify-center gap-3 border-t bg-muted/20">
            <div className="rounded-full bg-primary/10 p-3">
              <LockIcon className="h-6 w-6 text-primary" />
            </div>
            <div className="text-center">
              <h4 className="font-medium mb-1">Unlock All Trading Signals</h4>
              <p className="text-muted-foreground text-sm mb-4">
                Get access to all trading signals, detailed analysis, and real-time alerts.
              </p>
              <Button>Upgrade to Pro</Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

const SignalRow = ({ signal }) => {
  const getSignalColor = (type) => {
    switch (type) {
      case 'BUY':
        return 'text-green-500 bg-green-500/10';
      case 'SELL':
        return 'text-red-500 bg-red-500/10';
      default:
        return 'text-yellow-500 bg-yellow-500/10';
    }
  };

  const getSignalIcon = (type) => {
    switch (type) {
      case 'BUY':
        return <ArrowUpIcon className="h-4 w-4" />;
      case 'SELL':
        return <ArrowDownIcon className="h-4 w-4" />;
      default:
        return <MinusIcon className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-4 hover:bg-muted/20 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <div className="font-medium">{signal.symbol}</div>
          <Badge className={cn(
            "font-medium",
            getSignalColor(signal.type)
          )}>
            {getSignalIcon(signal.type)}
            <span className="ml-1">{signal.type}</span>
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          {new Date(signal.timestamp).toLocaleString()}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-3">
        <div className="text-sm">
          <div className="text-muted-foreground">Entry</div>
          <div className="font-mono font-medium">${signal.entryPrice.toFixed(2)}</div>
        </div>
        <div className="text-sm">
          <div className="text-muted-foreground">Target</div>
          <div className="font-mono font-medium">${signal.takeProfit.toFixed(2)}</div>
        </div>
        <div className="text-sm">
          <div className="text-muted-foreground">Stop Loss</div>
          <div className="font-mono font-medium">${signal.stopLoss.toFixed(2)}</div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {signal.indicators.map((indicator, index) => (
          <Badge key={index} variant="outline" className={cn(
            indicator.signal === 'BUY' && "border-green-300",
            indicator.signal === 'SELL' && "border-red-300",
          )}>
            {indicator.name}: {indicator.value}
          </Badge>
        ))}
      </div>
    </div>
  );
};
