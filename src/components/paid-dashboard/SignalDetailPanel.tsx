
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  MinusIcon, 
  BellIcon, 
  BellOffIcon 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TradingSignal } from '@/types';
import { toast } from 'sonner';

interface SignalDetailPanelProps {
  signal: TradingSignal;
}

export const SignalDetailPanel: React.FC<SignalDetailPanelProps> = ({ signal }) => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  
  const getSignalColor = (type: 'BUY' | 'SELL' | 'NEUTRAL') => {
    switch (type) {
      case 'BUY':
        return 'text-emerald-500 bg-emerald-500/10';
      case 'SELL':
        return 'text-red-500 bg-red-500/10';
      default:
        return 'text-amber-500 bg-amber-500/10';
    }
  };

  const getSignalIcon = (type: 'BUY' | 'SELL' | 'NEUTRAL') => {
    switch (type) {
      case 'BUY':
        return <ArrowUpIcon className="h-4 w-4" />;
      case 'SELL':
        return <ArrowDownIcon className="h-4 w-4" />;
      default:
        return <MinusIcon className="h-4 w-4" />;
    }
  };
  
  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };
  
  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    toast.success(`${notificationsEnabled ? 'Disabled' : 'Enabled'} notifications for ${signal.symbol}`);
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Signal Details</h3>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleNotifications}
            title={notificationsEnabled ? "Disable notifications" : "Enable notifications"}
          >
            {notificationsEnabled ? (
              <BellIcon className="h-4 w-4" />
            ) : (
              <BellOffIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Badge className={cn(
            "font-medium px-3 py-1",
            getSignalColor(signal.type)
          )}>
            {getSignalIcon(signal.type)}
            <span className="ml-1">{signal.type}</span>
          </Badge>
          <Badge variant="outline">
            {signal.confidence}% Confidence
          </Badge>
          <span className="text-sm text-muted-foreground ml-auto">
            {formatTimeAgo(signal.timestamp)}
          </span>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <PriceCard 
              label="Entry Price" 
              value={signal.entryPrice} 
              subtext="Recommended entry" 
            />
            <PriceCard 
              label="Current Price" 
              value={signal.entryPrice * (1 + (Math.random() * 0.01 * (signal.type === 'BUY' ? 1 : -1)))} 
              subtext="Market price" 
              highlight
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <PriceCard 
              label="Stop Loss" 
              value={signal.stopLoss} 
              subtext={`${((Math.abs(signal.entryPrice - signal.stopLoss) / signal.entryPrice) * 100).toFixed(2)}% from entry`} 
              variant="loss"
            />
            <PriceCard 
              label="Take Profit" 
              value={signal.takeProfit} 
              subtext={`${((Math.abs(signal.takeProfit - signal.entryPrice) / signal.entryPrice) * 100).toFixed(2)}% from entry`} 
              variant="profit"
            />
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Risk/Reward Analysis</h4>
            <div className="bg-muted/30 p-3 rounded-lg space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Risk/Reward Ratio</span>
                <span className="font-mono font-medium">
                  1:{(Math.abs(signal.takeProfit - signal.entryPrice) / Math.abs(signal.entryPrice - signal.stopLoss)).toFixed(1)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Potential Loss</span>
                <span className="font-mono font-medium text-red-500">
                  -{((Math.abs(signal.entryPrice - signal.stopLoss) / signal.entryPrice) * 100).toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Potential Gain</span>
                <span className="font-mono font-medium text-emerald-500">
                  +{((Math.abs(signal.takeProfit - signal.entryPrice) / signal.entryPrice) * 100).toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Signal Timeframe</h4>
            <Badge variant="outline" className="px-3 py-1">
              {signal.timeframe}
            </Badge>
          </div>
          
          <div className="pt-3 border-t">
            <Button 
              className="w-full" 
              onClick={() => toast.success(`Set alerts for ${signal.symbol}`)}
            >
              <BellIcon className="mr-2 h-4 w-4" />
              Set Price Alerts
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

interface PriceCardProps {
  label: string;
  value: number;
  subtext: string;
  variant?: 'neutral' | 'profit' | 'loss';
  highlight?: boolean;
}

const PriceCard: React.FC<PriceCardProps> = ({ 
  label, 
  value, 
  subtext, 
  variant = 'neutral',
  highlight = false
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'profit':
        return 'text-emerald-500';
      case 'loss':
        return 'text-red-500';
      default:
        return '';
    }
  };
  
  return (
    <div className={cn(
      "border rounded-lg p-3",
      highlight && "bg-muted/30"
    )}>
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className={cn(
        "font-mono font-medium text-lg mt-1",
        getVariantClasses()
      )}>
        ${value.toFixed(value < 10 ? 5 : 2)}
      </div>
      <div className="text-xs text-muted-foreground mt-1">{subtext}</div>
    </div>
  );
};
