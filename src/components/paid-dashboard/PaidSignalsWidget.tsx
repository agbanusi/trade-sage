
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpIcon, ArrowDownIcon, MinusIcon, Search, FilterIcon, XIcon, StarIcon, ExternalLinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TradingSignal } from '@/types';
import { toast } from 'sonner';

interface PaidSignalsWidgetProps {
  signals: TradingSignal[];
  maxSignals?: number;
}

export const PaidSignalsWidget: React.FC<PaidSignalsWidgetProps> = ({ 
  signals,
  maxSignals = 15
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'BUY' | 'SELL' | 'NEUTRAL'>('ALL');
  const [confidenceFilter, setConfidenceFilter] = useState<number>(0);
  const [timeframeFilter, setTimeframeFilter] = useState<string>('ALL');
  
  // Filter signals
  const filteredSignals = signals
    .filter(signal => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        signal.symbol.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Type filter
      const matchesType = filterType === 'ALL' || signal.type === filterType;
      
      // Confidence filter
      const matchesConfidence = signal.confidence >= confidenceFilter;
      
      // Timeframe filter
      const matchesTimeframe = timeframeFilter === 'ALL' || signal.timeframe === timeframeFilter;
      
      return matchesSearch && matchesType && matchesConfidence && matchesTimeframe;
    })
    .slice(0, maxSignals);

  return (
    <Card className="overflow-hidden">
      <div className="p-6 pb-2 flex justify-between items-start">
        <div>
          <h3 className="text-xl font-medium">Advanced Trading Signals</h3>
          <p className="text-sm text-muted-foreground">
            Showing {filteredSignals.length} of {signals.length} signals
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => toast.success("Signals refreshed")}>
          Refresh
        </Button>
      </div>
      
      <div className="p-4 border-b">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search signals..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={filterType} onValueChange={(v) => setFilterType(v as any)}>
            <SelectTrigger className="w-[130px]">
              <FilterIcon className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Types</SelectItem>
              <SelectItem value="BUY">Buy Signals</SelectItem>
              <SelectItem value="SELL">Sell Signals</SelectItem>
              <SelectItem value="NEUTRAL">Neutral</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={confidenceFilter.toString()} 
            onValueChange={(v) => setConfidenceFilter(Number(v))}
          >
            <SelectTrigger className="w-[180px]">
              <StarIcon className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Confidence" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">All Confidence</SelectItem>
              <SelectItem value="50">Above 50%</SelectItem>
              <SelectItem value="70">Above 70%</SelectItem>
              <SelectItem value="80">Above 80%</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={timeframeFilter} 
            onValueChange={setTimeframeFilter}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Timeframes</SelectItem>
              <SelectItem value="1m">1 Minute</SelectItem>
              <SelectItem value="5m">5 Minutes</SelectItem>
              <SelectItem value="15m">15 Minutes</SelectItem>
              <SelectItem value="1h">1 Hour</SelectItem>
              <SelectItem value="4h">4 Hours</SelectItem>
              <SelectItem value="1d">1 Day</SelectItem>
            </SelectContent>
          </Select>
          
          {(searchQuery || filterType !== 'ALL' || confidenceFilter > 0 || timeframeFilter !== 'ALL') && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => {
                setSearchQuery('');
                setFilterType('ALL');
                setConfidenceFilter(0);
                setTimeframeFilter('ALL');
              }}
            >
              <XIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      <ScrollArea className="h-[600px]">
        <div className="grid grid-cols-1 divide-y">
          {filteredSignals.map((signal) => (
            <DetailedSignalRow key={signal.id} signal={signal} />
          ))}
          
          {filteredSignals.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              No signals match your current filters
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};

const DetailedSignalRow = ({ signal }: { signal: TradingSignal }) => {
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
  
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-emerald-500';
    if (confidence >= 60) return 'text-amber-500';
    return 'text-red-500';
  };
  
  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className="p-6 hover:bg-muted/20 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div>
            <div className="font-medium text-lg">{signal.symbol}</div>
            <div className="text-sm text-muted-foreground">
              {signal.timeframe} • {formatTimeAgo(signal.timestamp)}
            </div>
          </div>
          <Badge className={cn(
            "font-medium px-3 py-1",
            getSignalColor(signal.type)
          )}>
            {getSignalIcon(signal.type)}
            <span className="ml-1">{signal.type}</span>
          </Badge>
          <Badge variant="outline" className={cn(
            "font-medium",
            getConfidenceColor(signal.confidence)
          )}>
            {signal.confidence}% Confidence
          </Badge>
        </div>
        
        <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => toast.info("Detailed analysis would open")}>
          <span>View Analysis</span>
          <ExternalLinkIcon className="h-3.5 w-3.5" />
        </Button>
      </div>
      
      <div className="grid grid-cols-4 gap-6 mb-5">
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">Entry Price</div>
          <div className="font-mono font-medium text-lg">${signal.entryPrice.toFixed(signal.entryPrice < 10 ? 5 : 2)}</div>
          <div className="text-xs text-muted-foreground">Recommended entry point</div>
        </div>
        
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">Stop Loss</div>
          <div className="font-mono font-medium text-lg text-red-500">${signal.stopLoss.toFixed(signal.stopLoss < 10 ? 5 : 2)}</div>
          <div className="text-xs text-muted-foreground">Risk: {((Math.abs(signal.entryPrice - signal.stopLoss) / signal.entryPrice) * 100).toFixed(2)}%</div>
        </div>
        
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">Take Profit</div>
          <div className="font-mono font-medium text-lg text-emerald-500">${signal.takeProfit.toFixed(signal.takeProfit < 10 ? 5 : 2)}</div>
          <div className="text-xs text-muted-foreground">Reward: {((Math.abs(signal.takeProfit - signal.entryPrice) / signal.entryPrice) * 100).toFixed(2)}%</div>
        </div>
        
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">Risk/Reward Ratio</div>
          <div className="font-mono font-medium text-lg">
            1:{(Math.abs(signal.takeProfit - signal.entryPrice) / Math.abs(signal.entryPrice - signal.stopLoss)).toFixed(1)}
          </div>
          <div className="text-xs text-muted-foreground">
            {Math.abs(signal.takeProfit - signal.entryPrice) / Math.abs(signal.entryPrice - signal.stopLoss) >= 2 
              ? "Favorable" 
              : "Moderate"} ratio
          </div>
        </div>
      </div>
      
      <div className="mb-3">
        <h4 className="font-medium text-sm mb-2">Technical Indicators</h4>
        <div className="flex flex-wrap gap-2">
          {signal.indicators.map((indicator, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className={cn(
                "px-3 py-1.5",
                indicator.signal === 'BUY' && "border-emerald-500 text-emerald-500",
                indicator.signal === 'SELL' && "border-red-500 text-red-500",
                indicator.signal === 'NEUTRAL' && "border-amber-500 text-amber-500",
              )}
            >
              <div className="font-medium">{indicator.name}</div>
              <div className="mx-1">•</div>
              <div>{indicator.value}</div>
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="mt-5 pt-3 border-t border-dashed">
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">Analysis:</span> This signal is based on a confluence of {signal.indicators.length} technical indicators
          with a {signal.confidence}% confidence score. The {signal.type.toLowerCase()} signal suggests
          {signal.type === 'BUY' 
            ? " potential upward movement with strong support at " + signal.stopLoss.toFixed(2) 
            : signal.type === 'SELL'
              ? " potential downward movement with resistance at " + signal.takeProfit.toFixed(2)
              : " sideways consolidation within the range"}.
          {signal.confidence > 75 && " This is a high-confidence setup with favorable risk/reward."}
        </div>
      </div>
    </div>
  );
};
