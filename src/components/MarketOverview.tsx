
import React, { useState, useEffect } from 'react';
import { TradingPair as TradingPairType, TradingSignal, IndicatorSettings, TimeFrame, UserSettings } from '../types';
import { mockTradingPairs, mockTradingSignals, defaultIndicatorSettings } from '../utils/mockData';
import TradingPair from './TradingPair';
import PredictionCard from './PredictionCard';
import AnalysisSettings from './AnalysisSettings';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Bell, ChevronRight } from 'lucide-react';

const MarketOverview: React.FC = () => {
  const [pairs, setPairs] = useState<TradingPairType[]>(mockTradingPairs);
  const [signals, setSignals] = useState<TradingSignal[]>(mockTradingSignals);
  const [selectedPair, setSelectedPair] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [indicators, setIndicators] = useState<IndicatorSettings[]>(defaultIndicatorSettings);
  const [timeframe, setTimeframe] = useState<TimeFrame>('15m');
  
  // Filter signals based on selected pair
  const filteredSignals = selectedPair 
    ? signals.filter(signal => signal.pairId === selectedPair)
    : signals;
  
  // Update pricing data every few seconds to simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPairs(prevPairs => 
        prevPairs.map(pair => {
          // Small random price change
          const changePercent = (Math.random() - 0.5) * 0.1; // -0.05% to +0.05%
          const change = pair.price * (changePercent / 100);
          const newPrice = pair.price + change;
          
          return {
            ...pair,
            price: newPrice,
            change: pair.change + change,
            changePercent: pair.changePercent + changePercent,
          };
        })
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left column - Pairs */}
        <div className="w-full lg:w-7/12 space-y-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex justify-between items-center">
            <div>
              <Badge variant="outline" className="mb-2">Live Market Data</Badge>
              <h2 className="text-2xl font-medium line-animation">Trading Pairs</h2>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-1"
            >
              <Settings size={16} />
              <span>Settings</span>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pairs.map((pair) => (
              <TradingPair 
                key={pair.id} 
                pair={pair}
                selected={selectedPair === pair.id}
                onClick={() => setSelectedPair(pair.id === selectedPair ? null : pair.id)}
              />
            ))}
          </div>
          
          <div className="flex justify-between items-center pt-2">
            <div>
              <Badge variant="outline" className="mb-2">Current Timeframe: {timeframe}</Badge>
              <h2 className="text-2xl font-medium line-animation">Market Signals</h2>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className="flex items-center gap-1 text-primary"
            >
              <Bell size={16} />
              <span>Enable Alerts</span>
            </Button>
          </div>
          
          {showSettings ? (
            <AnalysisSettings 
              indicators={indicators}
              onIndicatorChange={setIndicators}
              timeframe={timeframe}
              onTimeframeChange={setTimeframe}
              onClose={() => setShowSettings(false)}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
              {filteredSignals.length > 0 ? (
                filteredSignals.map((signal) => (
                  <PredictionCard key={signal.id} signal={signal} />
                ))
              ) : (
                <div className="col-span-2 text-center py-10 bg-gray-50 dark:bg-gray-800/20 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400">
                    {selectedPair ? 'No signals for the selected pair.' : 'Select a pair to view signals.'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Right column - Advanced Analysis */}
        <div className="w-full lg:w-5/12 space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div>
            <Badge variant="outline" className="mb-2">AI-Powered</Badge>
            <h2 className="text-2xl font-medium line-animation">Advanced Analysis</h2>
          </div>
          
          <Tabs defaultValue="predictions">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="predictions">Predictions</TabsTrigger>
              <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
              <TabsTrigger value="patterns">Patterns</TabsTrigger>
            </TabsList>
            
            <TabsContent value="predictions" className="mt-4">
              <div className="glass-card p-6 rounded-lg space-y-4">
                <h3 className="text-xl font-medium">Market Forecast</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  AI-powered forecast based on technical indicators, market sentiment, and historical patterns.
                </p>
                
                <div className="space-y-4 mt-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Gold (XAU/USD)</h4>
                      <Badge className="bg-market-up/10 text-market-up">Bullish</Badge>
                    </div>
                    <p className="text-sm">
                      Bullish momentum on 1H timeframe. RSI suggests oversold conditions and MACD shows bullish divergence. 
                      Consider long positions with tight stops.
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-gray-500">Confidence: 87%</span>
                      <Button variant="link" size="sm" className="text-xs p-0 h-auto flex items-center">
                        View Detailed Analysis
                        <ChevronRight size={14} className="ml-1" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">USD/JPY</h4>
                      <Badge className="bg-market-down/10 text-market-down">Bearish</Badge>
                    </div>
                    <p className="text-sm">
                      Showing signs of reversal after reaching resistance. RSI in overbought territory with 
                      bearish divergence forming on 15m chart.
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-gray-500">Confidence: 75%</span>
                      <Button variant="link" size="sm" className="text-xs p-0 h-auto flex items-center">
                        View Detailed Analysis
                        <ChevronRight size={14} className="ml-1" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">EUR/USD</h4>
                      <Badge className="bg-market-up/10 text-market-up">Bullish</Badge>
                    </div>
                    <p className="text-sm">
                      Found support at key level with multiple indicators confirming potential reversal. 
                      Watch for confirmation on 1H chart before entry.
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-gray-500">Confidence: 68%</span>
                      <Button variant="link" size="sm" className="text-xs p-0 h-auto flex items-center">
                        View Detailed Analysis
                        <ChevronRight size={14} className="ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="sentiment" className="mt-4">
              <div className="glass-card p-6 rounded-lg space-y-4">
                <h3 className="text-xl font-medium">Market Sentiment</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Analysis of market sentiment based on news, social media, and institutional positioning.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <h4 className="font-medium mb-2">Gold (XAU/USD)</h4>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm">Bullish</span>
                      <span className="text-sm text-market-up font-medium">62%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div className="bg-market-up h-1.5 rounded-full" style={{ width: '62%' }}></div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <h4 className="font-medium mb-2">USD/JPY</h4>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm">Bearish</span>
                      <span className="text-sm text-market-down font-medium">71%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div className="bg-market-down h-1.5 rounded-full" style={{ width: '71%' }}></div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <h4 className="font-medium mb-2">EUR/USD</h4>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm">Bullish</span>
                      <span className="text-sm text-market-up font-medium">55%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div className="bg-market-up h-1.5 rounded-full" style={{ width: '55%' }}></div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <h4 className="font-medium mb-2">GBP/USD</h4>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm">Neutral</span>
                      <span className="text-sm text-market-neutral font-medium">49%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div className="bg-market-neutral h-1.5 rounded-full" style={{ width: '49%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="patterns" className="mt-4">
              <div className="glass-card p-6 rounded-lg space-y-4">
                <h3 className="text-xl font-medium">Chart Patterns</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Detected chart patterns and potential breakout/breakdown points.
                </p>
                
                <div className="space-y-4 mt-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Gold (XAU/USD)</h4>
                      <Badge>Inverse Head & Shoulders</Badge>
                    </div>
                    <p className="text-sm">
                      Forming an inverse head and shoulders pattern on the 4H chart with neckline at 2030.50.
                      Potential breakout target: 2060.00.
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-gray-500">Pattern Completion: 85%</span>
                      <Button variant="link" size="sm" className="text-xs p-0 h-auto flex items-center">
                        View Chart
                        <ChevronRight size={14} className="ml-1" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">USD/JPY</h4>
                      <Badge>Double Top</Badge>
                    </div>
                    <p className="text-sm">
                      Double top formation at 156.00 level with confirmation level at 154.80.
                      Potential target if pattern completes: 153.60.
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-gray-500">Pattern Completion: 92%</span>
                      <Button variant="link" size="sm" className="text-xs p-0 h-auto flex items-center">
                        View Chart
                        <ChevronRight size={14} className="ml-1" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">EUR/USD</h4>
                      <Badge>Ascending Triangle</Badge>
                    </div>
                    <p className="text-sm">
                      Forming an ascending triangle with resistance at 1.0820 on the 1H timeframe.
                      Watch for breakout confirmation with increase in volume.
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-gray-500">Pattern Completion: 78%</span>
                      <Button variant="link" size="sm" className="text-xs p-0 h-auto flex items-center">
                        View Chart
                        <ChevronRight size={14} className="ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;
