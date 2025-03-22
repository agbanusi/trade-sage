
import React, { useEffect, useState, useRef } from 'react';
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
  const widgetRef = useRef<any>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetContainerId = `tradingview-widget-container-${symbol.replace(/[^a-zA-Z0-9]/g, '')}-${timeframe}`;

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

  const initTradingViewWidget = () => {
    if (!window.TradingView || !containerRef.current) return;
    
    // Clear previous widget container by setting innerHTML
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }
    
    // Create new widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.id = widgetContainerId;
    
    if (containerRef.current) {
      containerRef.current.appendChild(widgetContainer);
      
      // Map timeframe to TradingView interval
      const interval = timeframeToInterval(timeframe);
      
      try {
        // Create new widget
        const widget = new window.TradingView.widget({
          container_id: widgetContainerId,
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
        
        // Store widget instance for cleanup
        widgetRef.current = widget;
      } catch (e) {
        console.error("Error creating TradingView widget:", e);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    // Function to load script
    const loadScript = () => {
      // Check if script already exists
      const existingScript = document.querySelector('script[src="https://s3.tradingview.com/tv.js"]');
      
      if (existingScript) {
        // Script already exists, initialize widget directly
        initTradingViewWidget();
        setIsLoading(false);
      } else {
        // Load TradingView widget
        const newScript = document.createElement('script');
        newScript.src = 'https://s3.tradingview.com/tv.js';
        newScript.async = true;
        newScript.onload = () => {
          initTradingViewWidget();
          setIsLoading(false);
        };
        document.body.appendChild(newScript);
        scriptRef.current = newScript;
      }
    };

    setIsLoading(true);
    loadScript();

    // Cleanup function
    return () => {
      // Safely cleanup widget
      if (widgetRef.current) {
        try {
          // Some TradingView widgets might have a remove method
          if (typeof widgetRef.current.remove === 'function') {
            widgetRef.current.remove();
          }
          widgetRef.current = null;
        } catch (e) {
          console.log("Error cleaning up widget:", e);
        }
      }

      // Safe clear of container contents
      if (containerRef.current) {
        try {
          containerRef.current.innerHTML = '';
        } catch (e) {
          console.log("Error clearing container:", e);
        }
      }

      // We deliberately do not remove the script from the DOM
      // as it might be used by other instances of this component
      scriptRef.current = null;
    };
  }, [symbol, timeframe, widgetContainerId]);

  return (
    <div 
      id="tradingview-chart-container" 
      ref={containerRef} 
      className="h-full w-full overflow-hidden"
    >
      {isLoading && (
        <div className="w-full h-[400px] md:h-[600px] flex flex-col items-center justify-center space-y-4">
          <Skeleton className="h-[300px] md:h-[500px] w-full rounded-md" />
          <div className="text-center text-muted-foreground">Loading TradingView chart...</div>
        </div>
      )}
    </div>
  );
};
