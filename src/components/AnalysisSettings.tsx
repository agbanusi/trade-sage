
import React, { useState } from 'react';
import { IndicatorSettings, TimeFrame } from '../types';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface AnalysisSettingsProps {
  indicators: IndicatorSettings[];
  onIndicatorChange: (updatedIndicators: IndicatorSettings[]) => void;
  timeframe: TimeFrame;
  onTimeframeChange: (timeframe: TimeFrame) => void;
  onClose?: () => void;
}

const AnalysisSettings: React.FC<AnalysisSettingsProps> = ({
  indicators,
  onIndicatorChange,
  timeframe,
  onTimeframeChange,
  onClose,
}) => {
  const [selectedTab, setSelectedTab] = useState('indicators');
  const [editedIndicators, setEditedIndicators] = useState<IndicatorSettings[]>(indicators);

  const handleIndicatorToggle = (id: string, enabled: boolean) => {
    const updated = editedIndicators.map(indicator => 
      indicator.id === id ? { ...indicator, enabled } : indicator
    );
    setEditedIndicators(updated);
    onIndicatorChange(updated);
  };

  const handleIndicatorWeightChange = (id: string, weight: number) => {
    const updated = editedIndicators.map(indicator => 
      indicator.id === id ? { ...indicator, weight } : indicator
    );
    setEditedIndicators(updated);
    onIndicatorChange(updated);
  };

  const handleParameterChange = (
    indicatorId: string, 
    paramKey: string, 
    value: number | string | boolean
  ) => {
    const updated = editedIndicators.map(indicator => {
      if (indicator.id === indicatorId) {
        return {
          ...indicator,
          parameters: {
            ...indicator.parameters,
            [paramKey]: value,
          }
        };
      }
      return indicator;
    });
    setEditedIndicators(updated);
    onIndicatorChange(updated);
  };

  return (
    <Card className="glass-panel w-full overflow-hidden animate-fade-in">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-medium">Analysis Settings</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          Close
        </Button>
      </div>
      
      <Tabs 
        defaultValue="indicators" 
        className="p-4"
        onValueChange={setSelectedTab}
        value={selectedTab}
      >
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="indicators">Indicators</TabsTrigger>
          <TabsTrigger value="timeframe">Timeframe</TabsTrigger>
        </TabsList>
        
        <TabsContent value="indicators" className="space-y-4">
          {editedIndicators.map((indicator) => (
            <div 
              key={indicator.id} 
              className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={indicator.enabled}
                    onCheckedChange={(checked) => handleIndicatorToggle(indicator.id, checked)}
                  />
                  <Label className={cn(
                    "font-medium",
                    !indicator.enabled && "text-gray-400 dark:text-gray-500"
                  )}>
                    {indicator.name}
                  </Label>
                </div>
              </div>
              
              {indicator.enabled && (
                <>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <Label className="text-xs text-gray-500">Weight</Label>
                      <span className="text-xs text-gray-500">{indicator.weight.toFixed(1)}</span>
                    </div>
                    <Slider
                      value={[indicator.weight * 10]}
                      min={1}
                      max={10}
                      step={1}
                      onValueChange={(value) => handleIndicatorWeightChange(indicator.id, value[0] / 10)}
                    />
                  </div>
                  
                  <div className="space-y-3 pt-2">
                    <Label className="text-xs text-gray-500">Parameters</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(indicator.parameters).map(([key, value]) => (
                        <div key={key} className="space-y-1">
                          <Label className="text-xs capitalize">{key}</Label>
                          <Input
                            type={typeof value === 'boolean' ? 'checkbox' : typeof value === 'number' ? 'number' : 'text'}
                            value={typeof value !== 'boolean' ? value : undefined}
                            checked={typeof value === 'boolean' ? value : undefined}
                            onChange={(e) => {
                              const newValue = e.target.type === 'checkbox' 
                                ? e.target.checked 
                                : e.target.type === 'number' 
                                  ? parseFloat(e.target.value) 
                                  : e.target.value;
                              handleParameterChange(indicator.id, key, newValue);
                            }}
                            className="h-8 text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="timeframe">
          <div className="space-y-4">
            <Label>Select Timeframe</Label>
            <div className="grid grid-cols-3 gap-2">
              {(['1m', '5m', '15m', '1h', '4h', '1d'] as TimeFrame[]).map((tf) => (
                <Button
                  key={tf}
                  variant={timeframe === tf ? "default" : "outline"}
                  onClick={() => onTimeframeChange(tf)}
                  className="h-10"
                >
                  {tf}
                </Button>
              ))}
            </div>
            
            <div className="pt-4">
              <Label className="block mb-2">Market Volatility</Label>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">Low</span>
                <span className="text-xs text-gray-500">Medium</span>
                <span className="text-xs text-gray-500">High</span>
              </div>
              <Slider
                defaultValue={[50]}
                min={0}
                max={100}
                step={1}
              />
              <p className="text-xs text-gray-500 mt-2">
                Adjust volatility sensitivity to fine-tune signal filtering.
                Higher values will generate more signals in choppy markets.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AnalysisSettings;
