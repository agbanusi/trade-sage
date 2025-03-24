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
  ChevronRight,
  X,
  Menu,
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
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { useIsMobile } from '@/hooks/use-mobile';
import { PaidTradingPairsWidget } from '@/components/paid-dashboard/PaidTradingPairsWidget';
import { PaidSignalsWidget } from '@/components/paid-dashboard/PaidSignalsWidget';
import { AdvancedAnalyticsWidget } from '@/components/paid-dashboard/AdvancedAnalyticsWidget';
import { IndicatorSettingsPanel } from '@/components/paid-dashboard/IndicatorSettingsPanel';
import { TradingPatternAnalysis } from '@/components/paid-dashboard/TradingPatternAnalysis';
import { EconomicCalendarWidget } from '@/components/paid-dashboard/EconomicCalendarWidget';
import { TradingPairDetailChart } from '@/components/paid-dashboard/TradingPairDetailChart';
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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const isMobile = useIsMobile();
  
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

  const mockNotifications = [
    {
      id: 1,
      title: "EURUSD Signal",
      description: "New buy signal detected with 78% confidence",
      time: "2 minutes ago",
      read: false
    },
    {
      id: 2,
      title: "Pattern Detected",
      description: "Head and Shoulders pattern forming on GBPUSD",
      time: "15 minutes ago",
      read: false
    },
    {
      id: 3,
      title: "Price Alert",
      description: "XAUUSD reached your target price of $1,950",
      time: "1 hour ago",
      read: true
    },
    {
      id: 4,
      title: "Market Update",
      description: "US CPI data released, markets showing high volatility",
      time: "3 hours ago",
      read: true
    },
    {
      id: 5,
      title: "Signal Completed",
      description: "USDJPY sell signal hit take profit target",
      time: "Yesterday",
      read: true
    }
  ];

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 flex w-full overflow-hidden">
        {/* Mobile Menu Trigger */}
        <div className="md:hidden fixed top-4 left-4 z-50">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>
        </div>

        {/* Mobile Sidebar */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="left" className="p-0 w-72">
            <div className="h-full flex flex-col bg-background">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-display font-bold text-sm">TS</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-medium font-display">TradeSage</h2>
                      <Badge className="bg-primary/20 text-primary hover:bg-primary/30 mt-1">PRO</Badge>
                    </div>
                  </div>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </div>
                
                <Separator className="my-6" />
                
                <nav className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start" onClick={() => { setActiveTab('overview'); setMobileMenuOpen(false); }}>
                    <HomeIcon className="mr-2 h-5 w-5" />
                    Dashboard Overview
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => { setActiveTab('signals'); setMobileMenuOpen(false); }}>
                    <LineChartIcon className="mr-2 h-5 w-5" />
                    Advanced Signals
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => { setActiveTab('chart'); setMobileMenuOpen(false); }}>
                    <BarChart3Icon className="mr-2 h-5 w-5" />
                    Live Chart Analysis
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => { setActiveTab('patterns'); setMobileMenuOpen(false); }}>
                    <CrosshairIcon className="mr-2 h-5 w-5" />
                    Pattern Recognition
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => { setActiveTab('analytics'); setMobileMenuOpen(false); }}>
                    <BrainIcon className="mr-2 h-5 w-5" />
                    Advanced Analytics
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => { setActiveTab('indicators'); setMobileMenuOpen(false); }}>
                    <GaugeIcon className="mr-2 h-5 w-5" />
                    Indicator Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => { setActiveTab('notifications'); setMobileMenuOpen(false); }}>
                    <BellIcon className="mr-2 h-5 w-5" />
                    Notification Center
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => { setActiveTab('calendar'); setMobileMenuOpen(false); }}>
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    Economic Calendar
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => { setActiveTab('saved'); setMobileMenuOpen(false); }}>
                    <BookmarkIcon className="mr-2 h-5 w-5" />
                    Saved Setups
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => { setActiveTab('settings'); setMobileMenuOpen(false); }}>
                    <Settings2Icon className="mr-2 h-5 w-5" />
                    Account Settings
                  </Button>
                </nav>
              </div>
              
              <div className="mt-auto p-6 border-t border-gray-200 dark:border-gray-800">
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
          </SheetContent>
        </Sheet>

        {/* Desktop Sidebar */}
        <Sidebar side="left" className="hidden md:flex border-r border-gray-200 dark:border-gray-800">
          <SidebarHeader className="p-6">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-display font-bold text-sm">TS</span>
              </div>
              <div>
                <h2 className="text-xl font-medium font-display">TradeSage</h2>
                <Badge className="bg-primary/20 text-primary hover:bg-primary/30 mt-1">PRO</Badge>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="py-2 px-3">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activeTab === 'overview'} onClick={() => setActiveTab('overview')} tooltip="Dashboard Overview">
                  <HomeIcon className="h-5 w-5" />
                  <span>Dashboard Overview</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activeTab === 'signals'} onClick={() => setActiveTab('signals')} tooltip="Advanced Signals">
                  <LineChartIcon className="h-5 w-5" />
                  <span>Advanced Signals</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activeTab === 'chart'} onClick={() => setActiveTab('chart')} tooltip="Live Chart Analysis">
                  <BarChart3Icon className="h-5 w-5" />
                  <span>Live Chart Analysis</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activeTab === 'patterns'} onClick={() => setActiveTab('patterns')} tooltip="Pattern Recognition">
                  <CrosshairIcon className="h-5 w-5" />
                  <span>Pattern Recognition</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} tooltip="Advanced Analytics">
                  <BrainIcon className="h-5 w-5" />
                  <span>Advanced Analytics</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activeTab === 'indicators'} onClick={() => setActiveTab('indicators')} tooltip="Indicator Settings">
                  <GaugeIcon className="h-5 w-5" />
                  <span>Indicator Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} tooltip="Notification Center">
                  <BellIcon className="h-5 w-5" />
                  <span>Notification Center</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activeTab === 'calendar'} onClick={() => setActiveTab('calendar')} tooltip="Economic Calendar">
                  <CalendarIcon className="h-5 w-5" />
                  <span>Economic Calendar</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activeTab === 'saved'} onClick={() => setActiveTab('saved')} tooltip="Saved Setups">
                  <BookmarkIcon className="h-5 w-5" />
                  <span>Saved Setups</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activeTab === 'settings'} onClick={() => setActiveTab('settings')} tooltip="Account Settings">
                  <Settings2Icon className="h-5 w-5" />
                  <span>Account Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter className="mt-auto border-t border-gray-200 dark:border-gray-800 p-6">
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
          </SidebarFooter>
        </Sidebar>

        {/* Main content */}
        <SidebarInset className="flex-1">
          <header className="border-b border-gray-200 dark:border-gray-800 bg-background/95 backdrop-blur-sm px-8 py-4 sticky top-0 z-10">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="hidden md:flex" />
                <h1 className="text-2xl font-medium font-display">Pro Dashboard</h1>
              </div>
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
                
                {/* Notifications Dropdown */}
                <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <BellIcon className="h-5 w-5" />
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] flex items-center justify-center text-white">
                          {unreadCount}
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0" align="end">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                      <h4 className="font-medium">Notifications</h4>
                      <Button variant="ghost" size="sm" className="text-xs h-7">Mark all as read</Button>
                    </div>
                    <ScrollArea className="h-[300px]">
                      <div className="py-2">
                        {mockNotifications.map((notification) => (
                          <div 
                            key={notification.id} 
                            className={cn(
                              "px-4 py-3 hover:bg-accent transition-colors cursor-pointer",
                              !notification.read && "bg-primary/5"
                            )}
                            onClick={() => toast.info(`Viewed notification: ${notification.title}`)}
                          >
                            <div className="flex justify-between items-start">
                              <h5 className="font-medium text-sm">{notification.title}</h5>
                              <span className="text-xs text-muted-foreground">{notification.time}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="p-2 border-t border-gray-200 dark:border-gray-800">
                      <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => {
                        setActiveTab('notifications');
                        setNotificationsOpen(false);
                      }}>
                        View all notifications
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
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
                      <Button variant="outline" size="sm" asChild>
                        <Link to="/analysis/eurusd">Full Analysis</Link>
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
                            <span className="
