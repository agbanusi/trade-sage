
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useMediaQuery } from '@/hooks/use-mobile';

// Define the TradingView interface for TypeScript
interface TradingViewType {
  widget: new (config: any) => any;
}

// Extend the Window interface to include TradingView
declare global {
  interface Window {
    TradingView?: TradingViewType;
  }
}

interface TradingPairDetailChartProps {
  symbol: string;
  timeframe: string;
}

export const TradingPairDetailChart: React.FC<TradingPairDetailChartProps> = ({ 
  symbol,
  timeframe
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setIsLoading(true);
    // Load TradingView widget
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      initTradingViewWidget();
      setIsLoading(false);
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.getElementById('tradingview-widget-container')?.remove();
      // Only remove the script if it exists
      const scriptElement = document.querySelector('script[src="https://s3.tradingview.com/tv.js"]');
      if (scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
    };
  }, [symbol, timeframe]);

  const initTradingViewWidget = () => {
    if (window.TradingView) {
      const container = document.getElementById('tradingview-chart-container');
      if (container) {
        // Clear previous widget if exists
        container.innerHTML = '';
        
        // Create the widget container
        const widgetContainer = document.createElement('div');
        widgetContainer.id = 'tradingview-widget-container';
        container.appendChild(widgetContainer);
        
        // Map timeframe to TradingView interval
        const interval = timeframeToInterval(timeframe);
        
        // Create new widget
        new window.TradingView.widget({
          container_id: 'tradingview-widget-container',
          symbol: symbol,
          interval: interval,
          timezone: 'Etc/UTC',
          theme: 'dark',
          style: '1',
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          hide_top_toolbar: false,
          hide_legend: false,
          save_image: false,
          withdateranges: true,
          allow_symbol_change: false,
          studies: [
            'MACD@tv-basicstudies',
            'RSI@tv-basicstudies',
            'BolingerBands@tv-basicstudies'
          ],
          height: isMobile ? 400 : 600,
          width: '100%',
          // Simplify UI for mobile
          hide_side_toolbar: isMobile,
          details: !isMobile,
          hotlist: !isMobile,
          calendar: !isMobile,
        });
      }
    }
  };
  
  const timeframeToInterval = (tf: string): string => {
    switch (tf) {
      case '1m': return '1';
      case '5m': return '5';
      case '15m': return '15';
      case '1h': return '60';
      case '4h': return '240';
      case '1d': return 'D';
      default: return '60';
    }
  };

  return (
    <div id="tradingview-chart-container" className="h-full w-full overflow-hidden">
      {isLoading && (
        <div className="w-full h-[400px] md:h-[600px] flex flex-col items-center justify-center space-y-4">
          <Skeleton className="h-[300px] md:h-[500px] w-full rounded-md" />
          <div className="text-center text-muted-foreground">Loading TradingView chart...</div>
        </div>
      )}
    </div>
  );
};
