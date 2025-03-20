
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import {
  ChartBarIcon,
  BellIcon,
  ClockIcon,
  LineChartIcon,
  BrainIcon,
  Settings2Icon,
  CreditCardIcon,
  LogOutIcon,
  BarChart3Icon,
  HeartIcon,
  SlackIcon,
  TrendingUpIcon,
  ZapIcon,
  WalletIcon,
  HomeIcon,
  PieChartIcon,
  GaugeIcon,
  CrosshairIcon,
  CalendarIcon,
  BookmarkIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { PaidTradingPairsWidget } from '@/components/paid-dashboard/PaidTradingPairsWidget';
import { PaidSignalsWidget } from '@/components/paid-dashboard/PaidSignalsWidget';
import { AdvancedAnalyticsWidget } from '@/components/paid-dashboard/AdvancedAnalyticsWidget';
import { IndicatorSettingsPanel } from '@/components/paid-dashboard/IndicatorSettingsPanel';
import { TradingPatternAnalysis } from '@/components/paid-dashboard/TradingPatternAnalysis';
import { TimeFrame, IndicatorSettings } from '@/types';
import { mockTradingSignals, defaultIndicatorSettings } from '@/utils/mockData';

const PaidDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeFrame>('1h');
  const [indicators, setIndicators] = useState<IndicatorSettings[]>(defaultIndicatorSettings);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [mobileNotifications, setMobileNotifications] = useState(true);
  const [signalCount, setSignalCount] = useState(15);
  const [chartLoaded, setChartLoaded] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [notificationSounds, setNotificationSounds] = useState(true);
  
  // Simulate chart loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setChartLoaded(true);
      toast.success("TradingView chart loaded successfully");
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [activeTab]);
  
  // Show welcome message on initial load
  useEffect(() => {
    toast.success("Welcome to TradeSage Pro Dashboard");
  }, []);

  const handleTimeframeChange = (timeframe: TimeFrame) => {
    setSelectedTimeframe(timeframe);
    toast.info(`Timeframe changed to ${timeframe}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-72 h-screen bg-background/95 backdrop-blur-sm border-r border-gray-200 dark:border-gray-800 fixed">
          <div className="p-6">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-display font-bold text-sm">TS</span>
              </div>
              <div>
                <h2 className="text-xl font-medium font-display">TradeSage</h2>
                <Badge className="bg-primary/20 text-primary hover:bg-primary/30 mt-1">PRO</Badge>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <nav className="space-y-1">
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('overview')}>
                <HomeIcon className="mr-2 h-5 w-5" />
                Dashboard Overview
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('signals')}>
                <LineChartIcon className="mr-2 h-5 w-5" />
                Advanced Signals
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('chart')}>
                <BarChart3Icon className="mr-2 h-5 w-5" />
                Live Chart Analysis
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('patterns')}>
                <CrosshairIcon className="mr-2 h-5 w-5" />
                Pattern Recognition
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('analytics')}>
                <BrainIcon className="mr-2 h-5 w-5" />
                Advanced Analytics
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('indicators')}>
                <GaugeIcon className="mr-2 h-5 w-5" />
                Indicator Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('notifications')}>
                <BellIcon className="mr-2 h-5 w-5" />
                Notification Center
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('calendar')}>
                <CalendarIcon className="mr-2 h-5 w-5" />
                Economic Calendar
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('saved')}>
                <BookmarkIcon className="mr-2 h-5 w-5" />
                Saved Setups
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('settings')}>
                <Settings2Icon className="mr-2 h-5 w-5" />
                Account Settings
              </Button>
            </nav>
          </div>
          
          <div className="absolute bottom-0 w-full p-6 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Premium Account</div>
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Active</Badge>
              </div>
              <div className="text-xs text-muted-foreground mb-2">
                Next billing: June 15, 2023
              </div>
              <Button asChild variant="outline" className="w-full">
                <Link to="/dashboard">
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  Switch to Basic
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="pl-72 w-full">
          <header className="border-b border-gray-200 dark:border-gray-800 bg-background/95 backdrop-blur-sm px-8 py-4 sticky top-0 z-10">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-medium font-display">Pro Dashboard</h1>
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  {(['1m', '5m', '15m', '1h', '4h', '1d'] as TimeFrame[]).map((tf) => (
                    <Button
                      key={tf}
                      variant={selectedTimeframe === tf ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleTimeframeChange(tf)}
                    >
                      {tf}
                    </Button>
                  ))}
                </div>
                <div className="relative">
                  <Button variant="ghost" size="icon" onClick={() => toast.info("Notifications viewed")}>
                    <BellIcon className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] flex items-center justify-center text-white">
                      5
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </header>

          <main className="p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <TabsContent value="overview" className="space-y-8 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4 flex flex-col">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Signals Today</p>
                        <h3 className="text-2xl font-bold mt-2">24</h3>
                      </div>
                      <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <ZapIcon className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="flex items-center mt-4 text-xs text-emerald-500">
                      <TrendingUpIcon className="h-3 w-3 mr-1" />
                      <span>+15% from yesterday</span>
                    </div>
                  </Card>
                  
                  <Card className="p-4 flex flex-col">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Signal Accuracy</p>
                        <h3 className="text-2xl font-bold mt-2">78.3%</h3>
                      </div>
                      <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <HeartIcon className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="flex items-center mt-4 text-xs text-emerald-500">
                      <TrendingUpIcon className="h-3 w-3 mr-1" />
                      <span>+3.2% from last week</span>
                    </div>
                  </Card>
                  
                  <Card className="p-4 flex flex-col">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Favorite Pairs</p>
                        <h3 className="text-2xl font-bold mt-2">6</h3>
                      </div>
                      <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <SlackIcon className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="flex gap-1 mt-4">
                      <Badge variant="outline" className="text-xs">EURUSD</Badge>
                      <Badge variant="outline" className="text-xs">GBPUSD</Badge>
                      <Badge variant="outline" className="text-xs">XAUUSD</Badge>
                    </div>
                  </Card>
                </div>
                
                <PaidTradingPairsWidget timeframe={selectedTimeframe} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AdvancedAnalyticsWidget title="Performance Analysis" type="performance" />
                  <AdvancedAnalyticsWidget title="Signal Accuracy Metrics" type="accuracy" />
                </div>
              </TabsContent>

              <TabsContent value="signals" className="animate-fade-in">
                <PaidSignalsWidget signals={mockTradingSignals} maxSignals={signalCount} />
              </TabsContent>

              <TabsContent value="chart" className="animate-fade-in">
                <Card className="overflow-hidden">
                  <div className="p-6 pb-2 flex justify-between items-center">
                    <h3 className="text-xl font-medium">Live Chart Analysis</h3>
                    <div className="flex gap-2">
                      <Select defaultValue="eurusd">
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
                      <Button variant="outline" size="sm" onClick={() => toast.info("Chart refreshed")}>
                        Refresh
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="aspect-[16/9] bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 relative">
                      {chartLoaded ? (
                        <div className="w-full h-full">
                          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                            <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Support: 1.0845</Badge>
                            <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Resistance: 1.0925</Badge>
                          </div>
                          <iframe 
                            title="TradingView Chart" 
                            src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_59a4e&symbol=OANDA%3AEURUSD&interval=D&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=light&style=1&timezone=exchange&withdateranges=1&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en" 
                            style={{ width: '100%', height: '100%' }} 
                            frameBorder="0"
                          ></iframe>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="flex flex-col items-center">
                            <div className="h-10 w-10 border-4 border-primary border-r-transparent rounded-full animate-spin mb-4"></div>
                            <p>Loading TradingView chart...</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 border-t">
                    <Card className="p-3">
                      <h4 className="text-sm font-medium">Technical Analysis</h4>
                      <div className="flex items-center justify-between mt-2">
                        <div className="text-sm">Overall Signal</div>
                        <Badge className="bg-green-500/10 text-green-500">Buy</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground">Oscillators</div>
                          <div className="text-xl font-semibold text-emerald-500">7</div>
                          <div className="text-xs">Buy</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground">Moving Avgs</div>
                          <div className="text-xl font-semibold text-red-500">2</div>
                          <div className="text-xs">Sell</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground">Patterns</div>
                          <div className="text-xl font-semibold text-amber-500">3</div>
                          <div className="text-xs">Neutral</div>
                        </div>
                      </div>
                    </Card>
                    
                    <Card className="p-3">
                      <h4 className="text-sm font-medium">Price Statistics</h4>
                      <div className="grid grid-cols-2 gap-3 mt-3">
                        <div>
                          <div className="text-xs text-muted-foreground">Current Price</div>
                          <div className="text-sm font-mono font-medium">1.0876</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">24h Change</div>
                          <div className="text-sm font-mono font-medium text-emerald-500">+0.21%</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">24h High</div>
                          <div className="text-sm font-mono font-medium">1.0901</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">24h Low</div>
                          <div className="text-sm font-mono font-medium">1.0845</div>
                        </div>
                      </div>
                    </Card>
                    
                    <Card className="p-3">
                      <h4 className="text-sm font-medium">Volatility</h4>
                      <div className="flex items-center justify-between mt-2">
                        <div className="text-sm">Current</div>
                        <Badge variant="outline">Moderate</Badge>
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span>Low</span>
                          <span>High</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                          <div className="bg-amber-500 h-2 rounded-full w-[60%]"></div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="patterns" className="animate-fade-in">
                <TradingPatternAnalysis />
              </TabsContent>

              <TabsContent value="analytics" className="animate-fade-in">
                <Card className="p-6">
                  <h3 className="text-xl font-medium mb-4">Advanced Analytics</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-4">
                      <h4 className="font-medium mb-3">Performance by Timeframe</h4>
                      <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center relative">
                        <div className="absolute inset-0 p-4">
                          <div className="grid grid-cols-6 h-full relative">
                            <div className="flex flex-col justify-end">
                              <div className="bg-green-500 w-full rounded-t-sm" style={{ height: '45%' }}></div>
                              <div className="text-xs text-center mt-2">1m</div>
                            </div>
                            <div className="flex flex-col justify-end">
                              <div className="bg-green-500 w-full rounded-t-sm" style={{ height: '65%' }}></div>
                              <div className="text-xs text-center mt-2">5m</div>
                            </div>
                            <div className="flex flex-col justify-end">
                              <div className="bg-green-500 w-full rounded-t-sm" style={{ height: '85%' }}></div>
                              <div className="text-xs text-center mt-2">15m</div>
                            </div>
                            <div className="flex flex-col justify-end">
                              <div className="bg-green-500 w-full rounded-t-sm" style={{ height: '78%' }}></div>
                              <div className="text-xs text-center mt-2">1h</div>
                            </div>
                            <div className="flex flex-col justify-end">
                              <div className="bg-green-500 w-full rounded-t-sm" style={{ height: '62%' }}></div>
                              <div className="text-xs text-center mt-2">4h</div>
                            </div>
                            <div className="flex flex-col justify-end">
                              <div className="bg-green-500 w-full rounded-t-sm" style={{ height: '55%' }}></div>
                              <div className="text-xs text-center mt-2">1d</div>
                            </div>
                            {/* Horizontal lines */}
                            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                              <div className="border-t border-dashed border-slate-300 dark:border-slate-600 h-0"></div>
                              <div className="border-t border-dashed border-slate-300 dark:border-slate-600 h-0"></div>
                              <div className="border-t border-dashed border-slate-300 dark:border-slate-600 h-0"></div>
                              <div className="border-t border-dashed border-slate-300 dark:border-slate-600 h-0"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between mt-3">
                        <div className="text-xs text-muted-foreground">Accuracy by timeframe</div>
                        <div className="text-xs font-medium">Average: 65%</div>
                      </div>
                    </Card>
                    
                    <Card className="p-4">
                      <h4 className="font-medium mb-3">Indicator Performance</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">RSI</span>
                            <span className="text-sm font-medium">82%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: '82%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">MACD</span>
                            <span className="text-sm font-medium">76%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: '76%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Bollinger Bands</span>
                            <span className="text-sm font-medium">68%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: '68%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Stochastic</span>
                            <span className="text-sm font-medium">65%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Ichimoku</span>
                            <span className="text-sm font-medium">72%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: '72%' }}></div>
                          </div>
                        </div>
                      </div>
                    </Card>
                    
                    <Card className="p-4">
                      <h4 className="font-medium mb-3">Success Rate by Currency</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">EUR/USD</span>
                            <span className="text-sm font-medium">79%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '79%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">GBP/USD</span>
                            <span className="text-sm font-medium">72%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">USD/JPY</span>
                            <span className="text-sm font-medium">68%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">XAU/USD</span>
                            <span className="text-sm font-medium">82%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">BTC/USD</span>
                            <span className="text-sm font-medium">70%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                          </div>
                        </div>
                      </div>
                    </Card>
                    
                    <Card className="p-4">
                      <h4 className="font-medium mb-3">Risk Analysis</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                          <div className="text-sm text-muted-foreground mb-1">Average RR Ratio</div>
                          <div className="text-2xl font-semibold">1:2.5</div>
                        </div>
                        
                        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                          <div className="text-sm text-muted-foreground mb-1">Win Rate</div>
                          <div className="text-2xl font-semibold">78.3%</div>
                        </div>
                        
                        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                          <div className="text-sm text-muted-foreground mb-1">Max Drawdown</div>
                          <div className="text-2xl font-semibold">12.6%</div>
                        </div>
                        
                        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                          <div className="text-sm text-muted-foreground mb-1">Profit Factor</div>
                          <div className="text-2xl font-semibold">2.1</div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="indicators" className="animate-fade-in">
                <IndicatorSettingsPanel 
                  indicators={indicators}
                  onIndicatorChange={setIndicators}
                />
              </TabsContent>

              <TabsContent value="notifications" className="animate-fade-in">
                <Card className="p-6">
                  <h3 className="text-xl font-medium mb-6">Notification Settings</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Signal Notifications</Label>
                        <div className="text-sm text-muted-foreground">
                          Receive real-time alerts when new trading signals are generated
                        </div>
                      </div>
                      <Switch 
                        checked={notificationsEnabled} 
                        onCheckedChange={setNotificationsEnabled}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Notification Methods</h4>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Email Notifications</Label>
                          <div className="text-sm text-muted-foreground">
                            Receive notifications via email
                          </div>
                        </div>
                        <Switch 
                          checked={emailNotifications} 
                          onCheckedChange={setEmailNotifications}
                          disabled={!notificationsEnabled}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Mobile Push Notifications</Label>
                          <div className="text-sm text-muted-foreground">
                            Receive push notifications on your mobile device
                          </div>
                        </div>
                        <Switch 
                          checked={mobileNotifications} 
                          onCheckedChange={setMobileNotifications}
                          disabled={!notificationsEnabled}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Play Sound Alerts</Label>
                          <div className="text-sm text-muted-foreground">
                            Play sound when notifications are received
                          </div>
                        </div>
                        <Switch 
                          checked={notificationSounds} 
                          onCheckedChange={setNotificationSounds}
                          disabled={!notificationsEnabled}
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Alert Types</h4>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="signal" defaultChecked disabled={!notificationsEnabled} />
                          <Label htmlFor="signal">Signal Alerts</Label>
                        </div>
                        <div className="text-sm text-muted-foreground ml-6">
                          Receive alerts when new trading signals are generated
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="price" defaultChecked disabled={!notificationsEnabled} />
                          <Label htmlFor="price">Price Alerts</Label>
                        </div>
                        <div className="text-sm text-muted-foreground ml-6">
                          Receive alerts when prices hit your specified targets
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="pattern" defaultChecked disabled={!notificationsEnabled} />
                          <Label htmlFor="pattern">Pattern Recognition</Label>
                        </div>
                        <div className="text-sm text-muted-foreground ml-6">
                          Get notified when chart patterns are identified
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="news" defaultChecked disabled={!notificationsEnabled} />
                          <Label htmlFor="news">Economic News Alerts</Label>
                        </div>
                        <div className="text-sm text-muted-foreground ml-6">
                          Receive alerts before major economic news events
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Signal Frequency</h4>
                      
                      <div className="space-y-2">
                        <Label htmlFor="signal-count">Maximum signals per day ({signalCount})</Label>
                        <Slider 
                          id="signal-count"
                          min={5} 
                          max={30} 
                          step={1} 
                          value={[signalCount]} 
                          onValueChange={(vals) => setSignalCount(vals[0])}
                          disabled={!notificationsEnabled}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>5</span>
                          <span>30</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2 pt-2">
                        <Label>Signal Quality Filter</Label>
                        <RadioGroup defaultValue="high" disabled={!notificationsEnabled}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="high" id="high" />
                            <Label htmlFor="high">High quality signals only (70%+ confidence)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="medium" id="medium" />
                            <Label htmlFor="medium">Medium and high quality (50%+ confidence)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="all" id="all" />
                            <Label htmlFor="all">All signals</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        onClick={() => toast.success("Notification settings saved")}
                      >
                        Save Settings
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="calendar" className="animate-fade-in">
                <Card className="p-6">
                  <h3 className="text-xl font-medium mb-4">Economic Calendar</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <Select defaultValue="week">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="View" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="day">Day View</SelectItem>
                          <SelectItem value="week">Week View</SelectItem>
                          <SelectItem value="month">Month View</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Previous</Button>
                        <Button variant="outline" size="sm">Today</Button>
                        <Button variant="outline" size="sm">Next</Button>
                      </div>
                    </div>
                    
                    <ScrollArea className="h-[500px]">
                      <div className="space-y-2">
                        <div className="font-medium text-sm py-2 sticky top-0 bg-background z-10">Wednesday, May 15, 2023</div>
                        
                        <Card className="p-3 border-l-4 border-l-red-500">
                          <div className="flex justify-between">
                            <div>
                              <span className="text-sm font-medium">USD CPI Data</span>
                              <div className="text-xs text-muted-foreground">08:30 EST</div>
                            </div>
                            <Badge className="bg-red-500/10 text-red-500 border-red-500/20">High Impact</Badge>
                          </div>
                          <div className="text-sm mt-2">
                            Expected: 0.4% | Previous: 0.3%
                          </div>
                        </Card>
                        
                        <Card className="p-3 border-l-4 border-l-amber-500">
                          <div className="flex justify-between">
                            <div>
                              <span className="text-sm font-medium">EUR Industrial Production</span>
                              <div className="text-xs text-muted-foreground">10:00 EST</div>
                            </div>
                            <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">Medium Impact</Badge>
                          </div>
                          <div className="text-sm mt-2">
                            Expected: 0.8% | Previous: 0.9%
                          </div>
                        </Card>
                        
                        <div className="font-medium text-sm py-2 sticky top-0 bg-background z-10">Thursday, May 16, 2023</div>
                        
                        <Card className="p-3 border-l-4 border-l-red-500">
                          <div className="flex justify-between">
                            <div>
                              <span className="text-sm font-medium">BOE Interest Rate Decision</span>
                              <div className="text-xs text-muted-foreground">07:00 EST</div>
                            </div>
                            <Badge className="bg-red-500/10 text-red-500 border-red-500/20">High Impact</Badge>
                          </div>
                          <div className="text-sm mt-2">
                            Expected: 5.00% | Previous: 5.00%
                          </div>
                        </Card>
                        
                        <Card className="p-3 border-l-4 border-l-amber-500">
                          <div className="flex justify-between">
                            <div>
                              <span className="text-sm font-medium">USD Retail Sales</span>
                              <div className="text-xs text-muted-foreground">08:30 EST</div>
                            </div>
                            <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">Medium Impact</Badge>
                          </div>
                          <div className="text-sm mt-2">
                            Expected: 0.2% | Previous: 0.8%
                          </div>
                        </Card>
                        
                        <Card className="p-3 border-l-4 border-l-blue-500">
                          <div className="flex justify-between">
                            <div>
                              <span className="text-sm font-medium">FOMC Member Speech</span>
                              <div className="text-xs text-muted-foreground">14:00 EST</div>
                            </div>
                            <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Low Impact</Badge>
                          </div>
                        </Card>
                        
                        <div className="font-medium text-sm py-2 sticky top-0 bg-background z-10">Friday, May 17, 2023</div>
                        
                        <Card className="p-3 border-l-4 border-l-red-500">
                          <div className="flex justify-between">
                            <div>
                              <span className="text-sm font-medium">JPY GDP (QoQ)</span>
                              <div className="text-xs text-muted-foreground">19:50 EST</div>
                            </div>
                            <Badge className="bg-red-500/10 text-red-500 border-red-500/20">High Impact</Badge>
                          </div>
                          <div className="text-sm mt-2">
                            Expected: 0.1% | Previous: -0.1%
                          </div>
                        </Card>
                      </div>
                    </ScrollArea>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="saved" className="animate-fade-in">
                <Card className="p-6">
                  <h3 className="text-xl font-medium mb-4">Saved Trading Setups</h3>
                  <div className="space-y-4">
                    <div className="flex justify-end">
                      <Button variant="outline" onClick={() => toast.info("This would save your current setup")}>
                        + Save Current Setup
                      </Button>
                    </div>
                    
                    <ScrollArea className="h-[500px]">
                      <div className="space-y-4">
                        <Card className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">EURUSD Scalping Strategy</h4>
                              <div className="text-sm text-muted-foreground">Created: May 12, 2023</div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm">Load</Button>
                            </div>
                          </div>
                          <div className="mt-3 border-t pt-3">
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <div className="text-sm text-muted-foreground">Timeframe</div>
                                <div className="font-medium">5m</div>
                              </div>
                              <div>
                                <div className="text-sm text-muted-foreground">Indicators</div>
                                <div className="font-medium">RSI, MACD, Bollinger</div>
                              </div>
                              <div>
                                <div className="text-sm text-muted-foreground">Risk Ratio</div>
                                <div className="font-medium">1:2</div>
                              </div>
                            </div>
                            <div className="mt-2 text-sm">
                              Optimized for short-term scalping during London session with tight stops.
                            </div>
                          </div>
                        </Card>
                        
                        <Card className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">Gold Swing Trading</h4>
                              <div className="text-sm text-muted-foreground">Created: April 28, 2023</div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm">Load</Button>
                            </div>
                          </div>
                          <div className="mt-3 border-t pt-3">
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <div className="text-sm text-muted-foreground">Timeframe</div>
                                <div className="font-medium">4h, 1d</div>
                              </div>
                              <div>
                                <div className="text-sm text-muted-foreground">Indicators</div>
                                <div className="font-medium">EMA, Ichimoku, Stochastic</div>
                              </div>
                              <div>
                                <div className="text-sm text-muted-foreground">Risk Ratio</div>
                                <div className="font-medium">1:3</div>
                              </div>
                            </div>
                            <div className="mt-2 text-sm">
                              Medium-term swing trading strategy for Gold, focused on key support/resistance levels.
                            </div>
                          </div>
                        </Card>
                        
                        <Card className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">USDJPY News Trading</h4>
                              <div className="text-sm text-muted-foreground">Created: May 5, 2023</div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm">Load</Button>
                            </div>
                          </div>
                          <div className="mt-3 border-t pt-3">
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <div className="text-sm text-muted-foreground">Timeframe</div>
                                <div className="font-medium">15m, 1h</div>
                              </div>
                              <div>
                                <div className="text-sm text-muted-foreground">Indicators</div>
                                <div className="font-medium">Volatility, ATR, RSI</div>
                              </div>
                              <div>
                                <div className="text-sm text-muted-foreground">Risk Ratio</div>
                                <div className="font-medium">1:1.5</div>
                              </div>
                            </div>
                            <div className="mt-2 text-sm">
                              Strategy for trading major economic news events with asymmetric risk/reward.
                            </div>
                          </div>
                        </Card>
                      </div>
                    </ScrollArea>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="animate-fade-in">
                <Card className="p-6">
                  <h3 className="text-xl font-medium mb-6">Account Settings</h3>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h4 className="font-medium">Profile</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" defaultValue="John Trader" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" defaultValue="john@example.com" />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Application Settings</h4>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Dark Mode</Label>
                          <div className="text-sm text-muted-foreground">
                            Toggle between light and dark theme
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Auto-refresh Data</Label>
                          <div className="text-sm text-muted-foreground">
                            Automatically refresh trading data
                          </div>
                        </div>
                        <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="refresh">Auto-refresh Interval</Label>
                        <Select defaultValue="30" disabled={!autoRefresh}>
                          <SelectTrigger id="refresh">
                            <SelectValue placeholder="Select interval" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5 seconds</SelectItem>
                            <SelectItem value="15">15 seconds</SelectItem>
                            <SelectItem value="30">30 seconds</SelectItem>
                            <SelectItem value="60">1 minute</SelectItem>
                            <SelectItem value="300">5 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Risk Management</h4>
                      
                      <div className="space-y-2">
                        <Label>Risk Level</Label>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">Low</Button>
                          <Button variant="default" size="sm">Medium</Button>
                          <Button variant="outline" size="sm">High</Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="position-size">Default Position Size (% of Portfolio)</Label>
                        <Slider 
                          id="position-size"
                          defaultValue={[2]} 
                          max={10} 
                          step={0.1} 
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>0.5%</span>
                          <span>10%</span>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Subscription</h4>
                      
                      <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium">Pro Plan</h5>
                            <div className="text-sm text-muted-foreground">$29.99/month</div>
                          </div>
                          <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Active</Badge>
                        </div>
                        <div className="text-sm mt-3">
                          Next billing date: June 15, 2023
                        </div>
                        <div className="mt-4">
                          <Button variant="outline" onClick={() => toast.info("Subscription management would open")}>
                            Manage Subscription
                          </Button>
                        </div>
                      </div>
                      
                    </div>
                    
                    <div className="flex justify-end">
                      <Button onClick={() => toast.success("Account settings saved")}>
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PaidDashboard;
