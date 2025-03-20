
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AvatarFallback, Avatar } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Info, ChevronRight, BookmarkIcon, BarChart3Icon, Share2Icon } from 'lucide-react';
import { toast } from 'sonner';

export const TradingPatternAnalysis: React.FC = () => {
  const [activeTab, setActiveTab] = useState('technical');
  const [selectedPair, setSelectedPair] = useState('eurusd');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1h');

  return (
    <Card className="overflow-hidden">
      <div className="p-6 pb-2 flex justify-between items-start">
        <div>
          <h3 className="text-xl font-medium">Pattern Recognition</h3>
          <p className="text-sm text-muted-foreground">
            AI-powered pattern detection and analysis
          </p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedPair} onValueChange={setSelectedPair}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select pair" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="eurusd">EUR/USD</SelectItem>
              <SelectItem value="gbpusd">GBP/USD</SelectItem>
              <SelectItem value="usdjpy">USD/JPY</SelectItem>
              <SelectItem value="xauusd">Gold (XAU/USD)</SelectItem>
              <SelectItem value="btcusd">BTC/USD</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15m">15m</SelectItem>
              <SelectItem value="1h">1h</SelectItem>
              <SelectItem value="4h">4h</SelectItem>
              <SelectItem value="1d">1d</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="px-6 pb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="technical">Technical Patterns</TabsTrigger>
          <TabsTrigger value="harmonic">Harmonic Patterns</TabsTrigger>
          <TabsTrigger value="candlestick">Candlestick Patterns</TabsTrigger>
        </TabsList>
        
        <TabsContent value="technical" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="overflow-hidden flex flex-col">
              <div className="p-4 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge className="mb-2">High Confidence</Badge>
                    <h4 className="font-medium text-lg">Double Bottom</h4>
                    <p className="text-sm text-muted-foreground">
                      EUR/USD • 1H Chart
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => toast.success("Pattern saved")}>
                      <BookmarkIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => toast.info("Chart would open")}>
                      <BarChart3Icon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="relative aspect-video bg-slate-100 dark:bg-slate-800">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-muted-foreground">Chart visualization would appear here</span>
                </div>
              </div>
              
              <div className="p-4 flex-1 flex flex-col">
                <div className="mb-4">
                  <h5 className="font-medium mb-1">Pattern Description</h5>
                  <p className="text-sm text-muted-foreground">
                    Double bottom pattern detected at 1.0845 support level, indicating a potential reversal
                    of the previous downtrend. Second bottom formed with higher volume, confirming the pattern.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-muted-foreground">Pattern Completion</div>
                    <div className="font-medium">93%</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Potential Targets</div>
                    <div className="font-medium">1.0925, 1.0960</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Signal Strength</div>
                    <div className="font-medium">Strong</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Formation Time</div>
                    <div className="font-medium">3h ago</div>
                  </div>
                </div>
                
                <Button variant="outline" className="mt-auto gap-1" onClick={() => toast.info("Detailed analysis would open")}>
                  <span>View Detailed Analysis</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
            
            <Card className="overflow-hidden flex flex-col">
              <div className="p-4 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge className="mb-2">Medium Confidence</Badge>
                    <h4 className="font-medium text-lg">Ascending Triangle</h4>
                    <p className="text-sm text-muted-foreground">
                      XAU/USD • 4H Chart
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => toast.success("Pattern saved")}>
                      <BookmarkIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => toast.info("Chart would open")}>
                      <BarChart3Icon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="relative aspect-video bg-slate-100 dark:bg-slate-800">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-muted-foreground">Chart visualization would appear here</span>
                </div>
              </div>
              
              <div className="p-4 flex-1 flex flex-col">
                <div className="mb-4">
                  <h5 className="font-medium mb-1">Pattern Description</h5>
                  <p className="text-sm text-muted-foreground">
                    Ascending triangle detected with resistance at 2365.00 and rising support trendline.
                    Price consolidation with higher lows suggests bullish pressure building for a potential breakout.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-muted-foreground">Pattern Completion</div>
                    <div className="font-medium">78%</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Potential Targets</div>
                    <div className="font-medium">2380.00, 2395.00</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Signal Strength</div>
                    <div className="font-medium">Moderate</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Formation Time</div>
                    <div className="font-medium">12h ago</div>
                  </div>
                </div>
                
                <Button variant="outline" className="mt-auto gap-1" onClick={() => toast.info("Detailed analysis would open")}>
                  <span>View Detailed Analysis</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
          
          <div className="mt-6">
            <Card>
              <div className="p-4 border-b">
                <h4 className="font-medium">Recently Completed Patterns</h4>
              </div>
              
              <ScrollArea className="h-[300px]">
                <div className="divide-y">
                  <CompletedPatternRow 
                    title="Head and Shoulders"
                    pair="USD/JPY"
                    timeframe="1D"
                    result="Target Hit"
                    accuracy={92}
                    time="2d ago"
                  />
                  <CompletedPatternRow 
                    title="Cup and Handle"
                    pair="GBP/USD"
                    timeframe="4H"
                    result="Target Hit"
                    accuracy={85}
                    time="3d ago"
                  />
                  <CompletedPatternRow 
                    title="Rising Wedge"
                    pair="BTC/USD"
                    timeframe="1H"
                    result="Failed"
                    accuracy={42}
                    time="4d ago"
                  />
                  <CompletedPatternRow 
                    title="Triple Bottom"
                    pair="EUR/USD"
                    timeframe="1D"
                    result="Target Hit"
                    accuracy={88}
                    time="5d ago"
                  />
                  <CompletedPatternRow 
                    title="Falling Channel"
                    pair="XAU/USD"
                    timeframe="4H"
                    result="Partial"
                    accuracy={67}
                    time="6d ago"
                  />
                </div>
              </ScrollArea>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="harmonic" className="mt-0">
          <Card className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className="font-medium text-lg">Harmonic Pattern Analysis</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Automatically detecting Gartley, Butterfly, Bat, and Crab patterns
                </p>
              </div>
              <Info className="h-5 w-5 text-muted-foreground" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h5 className="font-medium">Bullish Gartley</h5>
                    <p className="text-sm text-muted-foreground">EUR/USD • 4H Chart</p>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-500">86% Match</Badge>
                </div>
                
                <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-md mb-4 flex items-center justify-center">
                  <span className="text-muted-foreground">Pattern visualization</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Entry Zone:</span>
                    <span className="ml-1 font-medium">1.0850-1.0865</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Target:</span>
                    <span className="ml-1 font-medium">1.0920</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Stop Loss:</span>
                    <span className="ml-1 font-medium">1.0820</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Completion:</span>
                    <span className="ml-1 font-medium">6h ago</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h5 className="font-medium">Bearish Butterfly</h5>
                    <p className="text-sm text-muted-foreground">XAU/USD • 1D Chart</p>
                  </div>
                  <Badge className="bg-amber-500/10 text-amber-500">72% Match</Badge>
                </div>
                
                <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-md mb-4 flex items-center justify-center">
                  <span className="text-muted-foreground">Pattern visualization</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Entry Zone:</span>
                    <span className="ml-1 font-medium">2345.00-2350.00</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Target:</span>
                    <span className="ml-1 font-medium">2320.00</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Stop Loss:</span>
                    <span className="ml-1 font-medium">2362.00</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Completion:</span>
                    <span className="ml-1 font-medium">1d ago</span>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="mt-6">
              <Card className="p-4">
                <h4 className="font-medium mb-4">Fibonacci Relationships</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-md">
                    <div className="text-sm font-medium mb-1">XA/AB Ratio</div>
                    <div className="text-2xl font-semibold">0.618</div>
                  </div>
                  <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-md">
                    <div className="text-sm font-medium mb-1">BC/AB Ratio</div>
                    <div className="text-2xl font-semibold">0.382</div>
                  </div>
                  <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-md">
                    <div className="text-sm font-medium mb-1">CD/BC Ratio</div>
                    <div className="text-2xl font-semibold">1.272</div>
                  </div>
                  <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-md">
                    <div className="text-sm font-medium mb-1">AD/XA Ratio</div>
                    <div className="text-2xl font-semibold">0.786</div>
                  </div>
                </div>
              </Card>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="candlestick" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CandlestickPatternCard 
              pattern="Bullish Engulfing"
              pair="EUR/USD"
              timeframe="1H"
              confidence={89}
              description="A bullish engulfing pattern has formed, with the current candle completely engulfing the previous bearish candle, indicating strong buying pressure after a downtrend."
              implications="Indicates potential trend reversal from bearish to bullish."
            />
            
            <CandlestickPatternCard 
              pattern="Evening Star"
              pair="GBP/USD"
              timeframe="4H"
              confidence={76}
              description="Three-candle pattern with a small-bodied middle candle followed by a strong bearish candle, indicating exhaustion of the uptrend."
              implications="Often signals the start of a downtrend after an uptrend."
            />
            
            <CandlestickPatternCard 
              pattern="Hammer"
              pair="USD/JPY"
              timeframe="1D"
              confidence={83}
              description="Single candle with a small body and long lower shadow, showing rejection of lower prices and potential bullish reversal."
              implications="Indicates strong buying pressure at lower levels after a downtrend."
            />
            
            <CandlestickPatternCard 
              pattern="Shooting Star"
              pair="XAU/USD"
              timeframe="4H"
              confidence={81}
              description="Single candle with a small body at the bottom and a long upper shadow, showing rejection of higher prices."
              implications="Bearish signal appearing after an uptrend, suggesting potential reversal."
            />
            
            <CandlestickPatternCard 
              pattern="Doji"
              pair="BTC/USD"
              timeframe="1D"
              confidence={65}
              description="Candle with very small or no body, indicating indecision in the market with opening and closing prices nearly identical."
              implications="May signal potential reversal when appearing after a strong trend."
            />
            
            <CandlestickPatternCard 
              pattern="Three Black Crows"
              pair="USD/CHF"
              timeframe="1D"
              confidence={92}
              description="Three consecutive bearish candles with each closing lower than the previous, showing sustained selling pressure."
              implications="Strong bearish signal indicating continuation of downtrend."
            />
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

interface CompletedPatternRowProps {
  title: string;
  pair: string;
  timeframe: string;
  result: 'Target Hit' | 'Failed' | 'Partial';
  accuracy: number;
  time: string;
}

const CompletedPatternRow: React.FC<CompletedPatternRowProps> = ({
  title,
  pair,
  timeframe,
  result,
  accuracy,
  time
}) => {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-muted/20 transition-colors">
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-primary/10 text-primary font-medium">
            {pair.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{title}</div>
          <div className="text-sm text-muted-foreground">
            {pair} • {timeframe}
          </div>
        </div>
      </div>
      
      <div className="flex items-center">
        <Badge 
          variant="outline" 
          className={
            result === 'Target Hit' 
              ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
              : result === 'Failed'
                ? "bg-red-500/10 text-red-500 border-red-500/20"
                : "bg-amber-500/10 text-amber-500 border-amber-500/20"
          }
        >
          {result}
        </Badge>
        <div className="text-sm ml-6 w-16">
          <div className="text-xs text-muted-foreground">Accuracy</div>
          <div className="font-medium">{accuracy}%</div>
        </div>
        <div className="text-sm ml-6 w-16">
          <div className="text-xs text-muted-foreground">Time</div>
          <div className="font-medium">{time}</div>
        </div>
        <Button variant="ghost" size="icon" className="ml-2" onClick={() => toast.info("Pattern details would open")}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

interface CandlestickPatternCardProps {
  pattern: string;
  pair: string;
  timeframe: string;
  confidence: number;
  description: string;
  implications: string;
}

const CandlestickPatternCard: React.FC<CandlestickPatternCardProps> = ({
  pattern,
  pair,
  timeframe,
  confidence,
  description,
  implications
}) => {
  return (
    <Card className="overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <div className="font-medium">{pattern}</div>
        <Badge variant="outline" className={
          confidence >= 80 
            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
            : confidence >= 70
              ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
              : "bg-red-500/10 text-red-500 border-red-500/20"
        }>
          {confidence}% Confidence
        </Badge>
      </div>
      
      <div className="p-4">
        <div className="text-sm mb-3">
          <span className="text-muted-foreground">Found on:</span>
          <span className="ml-1 font-medium">{pair} {timeframe}</span>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          {description}
        </p>
        
        <div className="text-sm mb-4">
          <div className="font-medium mb-1">Trading Implications</div>
          <p className="text-muted-foreground">
            {implications}
          </p>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={() => toast.success("Pattern saved")}>
            <BookmarkIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => toast.info("Pattern shared")}>
            <Share2Icon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast.info("Pattern details would open")}>
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
};
