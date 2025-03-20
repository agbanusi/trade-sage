
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { LockIcon } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface AnalyticsWidgetProps {
  title: string;
  type: 'performance' | 'accuracy' | 'sentiment';
  isPremium: boolean;
}

export const AnalyticsWidget: React.FC<AnalyticsWidgetProps> = ({ 
  title, 
  type,
  isPremium 
}) => {
  // Mock data for charts
  const performanceData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
    { name: 'Jun', value: 900 },
    { name: 'Jul', value: 1000 },
  ];

  const accuracyData = [
    { name: 'Jan', value: 65 },
    { name: 'Feb', value: 59 },
    { name: 'Mar', value: 80 },
    { name: 'Apr', value: 81 },
    { name: 'May', value: 56 },
    { name: 'Jun', value: 75 },
    { name: 'Jul', value: 90 },
  ];

  const chartConfig = {
    performance: { theme: { light: '#8B5CF6', dark: '#8B5CF6' } },
    accuracy: { theme: { light: '#10B981', dark: '#10B981' } },
  };

  const data = type === 'accuracy' ? accuracyData : performanceData;

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-xl font-medium mb-4">{title}</h3>
        {isPremium ? (
          <ChartContainer config={chartConfig} className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id={`gradient-${type}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-performance)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-performance)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  name="performance" 
                  stroke="var(--color-performance)" 
                  fillOpacity={1} 
                  fill={`url(#gradient-${type})`} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <div className="h-[200px] flex flex-col items-center justify-center gap-2 border rounded-md">
            <div className="rounded-full bg-primary/10 p-3">
              <LockIcon className="h-6 w-6 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-muted-foreground mb-2">Unlock detailed analytics with Pro</p>
              <Button size="sm">Upgrade</Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
