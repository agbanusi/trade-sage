
import React, { useState } from 'react';
import { ChartBarIcon, BellIcon, ClockIcon, LineChartIcon, BrainIcon, Settings2Icon, CreditCardIcon, LogOutIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { TradingPairsWidget } from '@/components/dashboard/TradingPairsWidget';
import { AnalyticsWidget } from '@/components/dashboard/AnalyticsWidget';
import { SignalsWidget } from '@/components/dashboard/SignalsWidget';
import { PremiumFeaturesModal } from '@/components/dashboard/PremiumFeaturesModal';
import { TimeFrame } from '@/types';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeFrame>('1h');
  
  // Mock user subscription status
  const isPremium = false;

  const handleTimeframeChange = (timeframe: TimeFrame) => {
    if (!isPremium && timeframe !== '1h') {
      setShowPremiumModal(true);
      return;
    }
    setSelectedTimeframe(timeframe);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-64 h-screen bg-background/95 backdrop-blur-sm border-r border-gray-200 dark:border-gray-800 fixed">
          <div className="p-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-display font-bold text-sm">TS</span>
              </div>
              <h2 className="text-xl font-medium font-display">TradeSage</h2>
            </div>
            <Separator className="my-6" />
            <nav className="space-y-1">
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('overview')}>
                <ChartBarIcon className="mr-2 h-5 w-5" />
                Overview
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('signals')}>
                <LineChartIcon className="mr-2 h-5 w-5" />
                Signals
                {!isPremium && <Badge variant="outline" className="ml-auto text-xs">PRO</Badge>}
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('timeframes')}>
                <ClockIcon className="mr-2 h-5 w-5" />
                Timeframes
                {!isPremium && <Badge variant="outline" className="ml-auto text-xs">PRO</Badge>}
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('analytics')}>
                <BrainIcon className="mr-2 h-5 w-5" />
                Advanced Analytics
                {!isPremium && <Badge variant="outline" className="ml-auto text-xs">PRO</Badge>}
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('notifications')}>
                <BellIcon className="mr-2 h-5 w-5" />
                Notifications
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('settings')}>
                <Settings2Icon className="mr-2 h-5 w-5" />
                Settings
              </Button>
            </nav>
          </div>
          <div className="absolute bottom-0 w-full p-6 border-t border-gray-200 dark:border-gray-800">
            {!isPremium ? (
              <Button className="w-full" onClick={() => setShowPremiumModal(true)}>
                <CreditCardIcon className="mr-2 h-4 w-4" />
                Upgrade to Pro
              </Button>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="text-sm text-muted-foreground">Premium Account</div>
                <Button variant="outline" className="w-full">
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Main content */}
        <div className="pl-64 w-full">
          <header className="border-b border-gray-200 dark:border-gray-800 bg-background/95 backdrop-blur-sm px-8 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-medium font-display">Dashboard</h1>
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  {(['1m', '5m', '15m', '1h', '4h', '1d'] as TimeFrame[]).map((tf) => (
                    <Button
                      key={tf}
                      variant={selectedTimeframe === tf ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleTimeframeChange(tf)}
                      className={cn(
                        !isPremium && tf !== '1h' && "opacity-60",
                      )}
                    >
                      {tf}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </header>

          <main className="p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <TabsContent value="overview" className="space-y-8">
                <TradingPairsWidget timeframe={selectedTimeframe} isPremium={isPremium} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AnalyticsWidget title="Recent Performance" type="performance" isPremium={isPremium} />
                  <AnalyticsWidget title="Signal Accuracy" type="accuracy" isPremium={isPremium} />
                </div>
              </TabsContent>

              <TabsContent value="signals" className="space-y-8">
                <SignalsWidget isPremium={isPremium} />
              </TabsContent>

              <TabsContent value="timeframes" className="space-y-8">
                {isPremium ? (
                  <Card className="p-6">
                    <h3 className="text-xl font-medium mb-4">Timeframe Analysis</h3>
                    <div className="grid gap-6">
                      <p>Advanced timeframe analysis content would go here.</p>
                      <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                        <span className="text-muted-foreground">TradingView chart would be embedded here</span>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <Card className="p-6 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="rounded-full bg-primary/10 p-4">
                      <ClockIcon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium">Premium Feature</h3>
                    <p className="text-muted-foreground max-w-md">
                      Unlock advanced timeframe analysis by upgrading to our Pro plan.
                    </p>
                    <Button onClick={() => setShowPremiumModal(true)}>Upgrade Now</Button>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="analytics" className="space-y-8">
                {isPremium ? (
                  <Card className="p-6">
                    <h3 className="text-xl font-medium mb-4">Advanced Analytics</h3>
                    <div className="grid gap-6">
                      <p>Advanced analytics content would go here.</p>
                      <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                        <span className="text-muted-foreground">Advanced analytics visualizations would be here</span>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <Card className="p-6 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="rounded-full bg-primary/10 p-4">
                      <BrainIcon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium">Premium Feature</h3>
                    <p className="text-muted-foreground max-w-md">
                      Unlock advanced analytics by upgrading to our Pro plan.
                    </p>
                    <Button onClick={() => setShowPremiumModal(true)}>Upgrade Now</Button>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="notifications" className="space-y-8">
                <Card className="p-6">
                  <h3 className="text-xl font-medium mb-4">Notification Settings</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Signal Alerts</Label>
                        <div className="text-sm text-muted-foreground">
                          Receive alerts when new trading signals are generated
                        </div>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Price Alerts</Label>
                        <div className="text-sm text-muted-foreground">
                          Receive alerts when prices hit your specified targets
                        </div>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Pattern Recognition</Label>
                        <div className="text-sm text-muted-foreground">
                          Get notified when chart patterns are identified
                        </div>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <div className="text-sm text-muted-foreground">
                          Send all notifications to your email
                        </div>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-8">
                <Card className="p-6">
                  <h3 className="text-xl font-medium mb-4">Settings</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Dark Mode</Label>
                        <div className="text-sm text-muted-foreground">
                          Toggle between light and dark theme
                        </div>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto-refresh Data</Label>
                        <div className="text-sm text-muted-foreground">
                          Automatically refresh trading data
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Risk Level</Label>
                        <div className="text-sm text-muted-foreground">
                          Set your preferred risk tolerance level
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">Low</Button>
                        <Button variant="default" size="sm">Medium</Button>
                        <Button variant="outline" size="sm">High</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>

      {/* Premium features modal */}
      <PremiumFeaturesModal open={showPremiumModal} onClose={() => setShowPremiumModal(false)} />
    </div>
  );
};

export default Dashboard;
