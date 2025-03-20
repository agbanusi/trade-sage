import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeftIcon, BarChart3Icon, LineChartIcon, TrendingUpIcon, ActivityIcon, SettingsIcon } from 'lucide-react';
import { mockTradingSignals } from '@/utils/mockData';
import { TradingSignal } from '@/types';
import { TradingPairDetailChart } from '@/components/paid-dashboard/TradingPairDetailChart';
import { TradingPatternAnalysis } from '@/components/paid-dashboard/TradingPatternAnalysis';
import { AdvancedAnalyticsWidget } from '@/components/paid-dashboard/AdvancedAnalyticsWidget';
import { SignalDetailPanel } from '@/components/paid-dashboard/SignalDetailPanel';

const TradingPairAnalysis = () => {
  const { pairId } = useParams<{ pairId: string }>();
  const [selectedSignal, setSelectedSignal] = useState<TradingSignal | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('1h');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const signals = mockTradingSignals.filter(signal => signal.pairId === pairId);
      if (signals.length > 0) {
        setSelectedSignal(signals[0]);
      }
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [pairId]);

  if (isLoading) {
    return (
      <div className="container max-w-7xl mx-auto p-4 h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <ActivityIcon className="h-12 w-12 text-primary animate-pulse mx-auto" />
          <h2 className="text-2xl font-semibold">Loading Analysis</h2>
          <p className="text-muted-foreground">Fetching comprehensive trading data...</p>
        </div>
      </div>
    );
  }

  if (!selectedSignal) {
    return (
      <div className="container max-w-7xl mx-auto p-4">
        <div className="text-center space-y-4 p-8">
          <h2 className="text-2xl font-semibold">No Data Available</h2>
          <p className="text-muted-foreground">Unable to find trading data for this pair.</p>
          <Button asChild>
            <Link to="/paid-dashboard">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const timeframes = ['1m', '5m', '15m', '1h', '4h', '1d'];

  return (
    <div className="container max-w-7xl mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" asChild>
            <Link to="/paid-dashboard">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{selectedSignal.symbol}</h1>
          <Badge className="text-sm px-3 py-1">
            Premium Analysis
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <SettingsIcon className="mr-2 h-4 w-4" />
            Customize Analysis
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-xl font-medium">Price Chart</h3>
              <div className="flex gap-1">
                {timeframes.map(tf => (
                  <Button 
                    key={tf}
                    size="sm"
                    variant={selectedTimeframe === tf ? "default" : "outline"}
                    className="h-8 px-3"
                    onClick={() => setSelectedTimeframe(tf)}
                  >
                    {tf}
                  </Button>
                ))}
              </div>
            </div>
            <div className="h-[500px] w-full">
              <TradingPairDetailChart 
                symbol={selectedSignal.symbol} 
                timeframe={selectedTimeframe}
              />
            </div>
          </Card>
        </div>
        
        <div className="space-y-6">
          <SignalDetailPanel signal={selectedSignal} />
        </div>
      </div>
      
      <Tabs defaultValue="patterns" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="patterns" className="gap-2">
            <TrendingUpIcon className="h-4 w-4" />
            <span>Pattern Analysis</span>
          </TabsTrigger>
          <TabsTrigger value="indicators" className="gap-2">
            <BarChart3Icon className="h-4 w-4" />
            <span>Technical Indicators</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="gap-2">
            <LineChartIcon className="h-4 w-4" />
            <span>Performance</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="patterns" className="space-y-6">
          <TradingPatternAnalysis />
        </TabsContent>
        
        <TabsContent value="indicators" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <IndicatorAnalysis 
              symbol={selectedSignal.symbol}
              indicators={selectedSignal.indicators}
              type="momentum"
            />
            <IndicatorAnalysis 
              symbol={selectedSignal.symbol}
              indicators={selectedSignal.indicators}
              type="trend"
            />
            <IndicatorAnalysis 
              symbol={selectedSignal.symbol}
              indicators={selectedSignal.indicators}
              type="volatility"
            />
            <IndicatorAnalysis 
              symbol={selectedSignal.symbol}
              indicators={selectedSignal.indicators}
              type="volume"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AdvancedAnalyticsWidget
              title="Signal Performance"
              type="performance"
            />
            <AdvancedAnalyticsWidget
              title="Signal Accuracy"
              type="accuracy"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface IndicatorAnalysisProps {
  symbol: string;
  indicators: {
    name: string;
    value: string;
    signal: 'BUY' | 'SELL' | 'NEUTRAL';
  }[];
  type: 'momentum' | 'trend' | 'volatility' | 'volume';
}

const IndicatorAnalysis: React.FC<IndicatorAnalysisProps> = ({ 
  symbol, 
  indicators,
  type 
}) => {
  const getTitle = () => {
    switch (type) {
      case 'momentum': return 'Momentum Indicators';
      case 'trend': return 'Trend Indicators';
      case 'volatility': return 'Volatility Indicators';
      case 'volume': return 'Volume Indicators';
    }
  };
  
  const filteredIndicators = indicators.filter((_, index) => {
    if (type === 'momentum') return index % 4 === 0;
    if (type === 'trend') return index % 4 === 1;
    if (type === 'volatility') return index % 4 === 2;
    if (type === 'volume') return index % 4 === 3;
    return false;
  });

  return (
    <Card className="overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium">{getTitle()}</h3>
      </div>
      <div className="p-4 space-y-4">
        {filteredIndicators.map((indicator, index) => (
          <div key={index} className="flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0">
            <div>
              <div className="font-medium">{indicator.name}</div>
              <div className="text-sm text-muted-foreground">Current value: {indicator.value}</div>
            </div>
            <Badge className={
              indicator.signal === 'BUY' 
                ? "bg-green-500/10 text-green-500 border-green-500/20" 
                : indicator.signal === 'SELL'
                  ? "bg-red-500/10 text-red-500 border-red-500/20"
                  : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
            }>
              {indicator.signal}
            </Badge>
          </div>
        ))}
        
        {filteredIndicators.length === 0 && (
          <div className="text-center text-muted-foreground py-4">
            No {type} indicators available
          </div>
        )}
      </div>
    </Card>
  );
};

export default TradingPairAnalysis;
