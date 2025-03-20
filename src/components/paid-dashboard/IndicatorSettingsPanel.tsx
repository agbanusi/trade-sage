
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { IndicatorSettings } from '@/types';
import { cn } from '@/lib/utils';

interface IndicatorSettingsPanelProps {
  indicators: IndicatorSettings[];
  onIndicatorChange: (indicators: IndicatorSettings[]) => void;
}

export const IndicatorSettingsPanel: React.FC<IndicatorSettingsPanelProps> = ({
  indicators,
  onIndicatorChange
}) => {
  const [allSettings, setAllSettings] = useState<IndicatorSettings[]>(indicators);
  
  const handleToggleIndicator = (id: string, enabled: boolean) => {
    const updatedSettings = allSettings.map(indicator => 
      indicator.id === id ? { ...indicator, enabled } : indicator
    );
    setAllSettings(updatedSettings);
  };
  
  const handleParameterChange = (id: string, paramName: string, value: number | string | boolean) => {
    const updatedSettings = allSettings.map(indicator => {
      if (indicator.id === id) {
        return {
          ...indicator,
          parameters: {
            ...indicator.parameters,
            [paramName]: value
          }
        };
      }
      return indicator;
    });
    setAllSettings(updatedSettings);
  };
  
  const handleWeightChange = (id: string, weight: number) => {
    const updatedSettings = allSettings.map(indicator => 
      indicator.id === id ? { ...indicator, weight } : indicator
    );
    setAllSettings(updatedSettings);
  };
  
  const handleSaveSettings = () => {
    onIndicatorChange(allSettings);
    toast.success("Indicator settings saved successfully");
  };
  
  const handleResetSettings = () => {
    setAllSettings(indicators);
    toast.info("Settings reset to previous values");
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-6 pb-2 flex justify-between items-start">
        <div>
          <h3 className="text-xl font-medium">Indicator Settings</h3>
          <p className="text-sm text-muted-foreground">
            Customize indicators and their parameters
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleResetSettings}>
            Reset
          </Button>
          <Button size="sm" onClick={handleSaveSettings}>
            Save
          </Button>
        </div>
      </div>
      
      <div className="px-6 py-3">
        <Card className="p-4 bg-muted/40">
          <div className="text-sm">
            <p className="font-medium mb-2">How Signals Are Generated</p>
            <p className="text-muted-foreground">
              Signals are generated based on the enabled indicators below. Each indicator's weight determines
              how much it influences the final signal. For the best results, enable 3-5 complementary indicators.
            </p>
          </div>
        </Card>
      </div>
      
      <ScrollArea className="h-[600px]">
        <div className="p-6">
          <Accordion type="multiple" className="space-y-4">
            {allSettings.map((indicator) => (
              <IndicatorSettingItem
                key={indicator.id}
                indicator={indicator}
                onToggle={(enabled) => handleToggleIndicator(indicator.id, enabled)}
                onParameterChange={(paramName, value) => handleParameterChange(indicator.id, paramName, value)}
                onWeightChange={(weight) => handleWeightChange(indicator.id, weight)}
              />
            ))}
          </Accordion>
        </div>
      </ScrollArea>
    </Card>
  );
};

interface IndicatorSettingItemProps {
  indicator: IndicatorSettings;
  onToggle: (enabled: boolean) => void;
  onParameterChange: (paramName: string, value: number | string | boolean) => void;
  onWeightChange: (weight: number) => void;
}

const IndicatorSettingItem: React.FC<IndicatorSettingItemProps> = ({
  indicator,
  onToggle,
  onParameterChange,
  onWeightChange
}) => {
  return (
    <AccordionItem value={indicator.id} className="border rounded-lg px-4">
      <div className="flex items-center justify-between py-4">
        <AccordionTrigger className="flex-1 hover:no-underline">
          <div className="flex flex-col items-start text-left">
            <div className="font-medium">{indicator.name}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Weight: {indicator.weight.toFixed(1)}
            </div>
          </div>
        </AccordionTrigger>
        <div className="flex items-center gap-3 ml-2">
          <Badge 
            variant="outline" 
            className={cn(
              indicator.enabled 
                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
                : "bg-gray-200 text-gray-500 border-gray-300"
            )}
          >
            {indicator.enabled ? "Active" : "Inactive"}
          </Badge>
          <Switch
            checked={indicator.enabled}
            onCheckedChange={onToggle}
          />
        </div>
      </div>
      
      <AccordionContent className="pb-4 pt-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Signal Weight: {indicator.weight.toFixed(1)}</Label>
              <span className="text-xs text-muted-foreground">Impact on overall signal</span>
            </div>
            <Slider
              min={0}
              max={1}
              step={0.1}
              value={[indicator.weight]}
              onValueChange={(vals) => onWeightChange(vals[0])}
              disabled={!indicator.enabled}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Low impact</span>
              <span>High impact</span>
            </div>
          </div>
          
          <div className="grid gap-3">
            {Object.entries(indicator.parameters).map(([paramName, paramValue]) => (
              <div key={paramName} className="space-y-1">
                <Label htmlFor={`${indicator.id}-${paramName}`} className="capitalize">
                  {paramName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </Label>
                
                {typeof paramValue === 'number' ? (
                  <Input
                    id={`${indicator.id}-${paramName}`}
                    type="number"
                    value={paramValue}
                    onChange={(e) => onParameterChange(paramName, parseFloat(e.target.value))}
                    disabled={!indicator.enabled}
                  />
                ) : typeof paramValue === 'boolean' ? (
                  <Switch
                    id={`${indicator.id}-${paramName}`}
                    checked={paramValue as boolean}
                    onCheckedChange={(checked) => onParameterChange(paramName, checked)}
                    disabled={!indicator.enabled}
                  />
                ) : (
                  <Select
                    value={paramValue as string}
                    onValueChange={(value) => onParameterChange(paramName, value)}
                    disabled={!indicator.enabled}
                  >
                    <SelectTrigger id={`${indicator.id}-${paramName}`}>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      {paramName === 'maType' ? (
                        <>
                          <SelectItem value="SMA">Simple Moving Average</SelectItem>
                          <SelectItem value="EMA">Exponential Moving Average</SelectItem>
                          <SelectItem value="WMA">Weighted Moving Average</SelectItem>
                        </>
                      ) : (
                        <SelectItem value={paramValue as string}>{paramValue as string}</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                )}
              </div>
            ))}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
