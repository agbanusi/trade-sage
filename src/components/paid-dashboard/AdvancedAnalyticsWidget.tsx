
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, LineChart, AreaChart, XAxis, YAxis, Bar, Line, Area, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { cn } from '@/lib/utils';

interface AdvancedAnalyticsWidgetProps {
  title: string;
  type: 'performance' | 'accuracy';
}

export const AdvancedAnalyticsWidget: React.FC<AdvancedAnalyticsWidgetProps> = ({ 
  title,
  type
}) => {
  // Mock data for performance
  const performanceData = [
    { date: 'Apr 01', signals: 15, winRate: 73, profit: 2.8 },
    { date: 'Apr 08', signals: 18, winRate: 67, profit: 1.9 },
    { date: 'Apr 15', signals: 12, winRate: 75, profit: 3.2 },
    { date: 'Apr 22', signals: 22, winRate: 82, profit: 4.5 },
    { date: 'Apr 29', signals: 19, winRate: 79, profit: 3.7 },
    { date: 'May 06', signals: 21, winRate: 71, profit: 2.6 },
    { date: 'May 13', signals: 25, winRate: 76, profit: 3.1 },
  ];

  // Mock data for accuracy by instrument
  const accuracyData = [
    { name: 'EUR/USD', accuracy: 82 },
    { name: 'GBP/USD', accuracy: 78 },
    { name: 'USD/JPY', accuracy: 73 },
    { name: 'XAU/USD', accuracy: 86 },
    { name: 'BTC/USD', accuracy: 69 },
    { name: 'USD/CHF', accuracy: 75 },
  ];
  
  // Mock data for timeframe accuracy
  const timeframeData = [
    { name: '1m', buys: 65, sells: 60 },
    { name: '5m', buys: 68, sells: 63 },
    { name: '15m', buys: 76, sells: 70 },
    { name: '1h', buys: 82, sells: 78 },
    { name: '4h', buys: 79, sells: 76 },
    { name: '1d', buys: 74, sells: 71 },
  ];

  return (
    <Card className="overflow-hidden">
      <div className="p-6 pb-2">
        <h3 className="text-xl font-medium">{title}</h3>
      </div>
      
      {type === 'performance' ? (
        <Tabs defaultValue="profit" className="p-4">
          <TabsList className="mb-4">
            <TabsTrigger value="profit">Profit/Loss</TabsTrigger>
            <TabsTrigger value="winrate">Win Rate</TabsTrigger>
            <TabsTrigger value="signals">Signal Volume</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profit" className="mt-0">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <defs>
                    <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="date" />
                  <YAxis 
                    tickFormatter={(value) => `${value}%`}
                    domain={[0, 'dataMax + 1']} 
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Profit']}
                    labelFormatter={(label) => `Week: ${label}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="#10b981" 
                    fillOpacity={1} 
                    fill="url(#profitGradient)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="winrate" className="mt-0">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="date" />
                  <YAxis 
                    tickFormatter={(value) => `${value}%`}
                    domain={[50, 100]} 
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Win Rate']}
                    labelFormatter={(label) => `Week: ${label}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="winRate" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="signals" className="mt-0">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [value, 'Signals']}
                    labelFormatter={(label) => `Week: ${label}`}
                  />
                  <Bar dataKey="signals" fill="#8b5cf6" barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <Tabs defaultValue="byPair" className="p-4">
          <TabsList className="mb-4">
            <TabsTrigger value="byPair">By Instrument</TabsTrigger>
            <TabsTrigger value="byTimeframe">By Timeframe</TabsTrigger>
          </TabsList>
          
          <TabsContent value="byPair" className="mt-0">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={accuracyData} 
                  layout="vertical"
                  margin={{ top: 10, right: 10, left: 70, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#eee" />
                  <XAxis 
                    type="number" 
                    domain={[0, 100]} 
                    tickFormatter={(value) => `${value}%`}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    width={60}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Accuracy']}
                  />
                  <Bar 
                    dataKey="accuracy" 
                    fill={(entry) => {
                      const value = entry.accuracy;
                      if (value >= 80) return "#10b981";
                      if (value >= 70) return "#8b5cf6";
                      return "#f59e0b";
                    }}
                    barSize={20} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="byTimeframe" className="mt-0">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={timeframeData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="name" />
                  <YAxis 
                    tickFormatter={(value) => `${value}%`}
                    domain={[50, 100]}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Accuracy']}
                  />
                  <Legend />
                  <Bar dataKey="buys" name="Buy Signals" fill="#10b981" barSize={20} />
                  <Bar dataKey="sells" name="Sell Signals" fill="#ef4444" barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </Card>
  );
};
