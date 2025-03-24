
import React, { useState, useRef, useEffect } from 'react';
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
  const [chartId] = useState(() => `tradingview_${Math.random().toString(36).substring(2, 15)}`);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const scriptLoaded = useRef(false);
  
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

  // Function to load TradingView script if not already loaded
  const loadTradingViewScript = () => {
    return new Promise<void>((resolve, reject) => {
      if (window.TradingView) {
        scriptLoaded.current = true;
        resolve();
        return;
      }

      if (document.getElementById('tradingview-script')) {
        // Script is loading but not ready yet
        const checkIfLoaded = setInterval(() => {
          if (window.TradingView) {
            clearInterval(checkIfLoaded);
            scriptLoaded.current = true;
            resolve();
          }
        }, 100);
        return;
      }

      const script = document.createElement('script');
      script.id = 'tradingview-script';
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      
      script.onload = () => {
        scriptLoaded.current = true;
        resolve();
      };
      
      script.onerror = () => {
        reject(new Error("Failed to load TradingView script"));
      };
      
      document.head.appendChild(script);
    });
  };

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    
    const initWidget = async () => {
      try {
        await loadTradingViewScript();
        
        if (!isMounted || !containerRef.current || !window.TradingView) {
          return;
        }
        
        // Make sure container is empty
        containerRef.current.innerHTML = '';
        
        // Create container element for the widget
        const widgetContainer = document.createElement('div');
        widgetContainer.id = chartId;
        containerRef.current.appendChild(widgetContainer);
        
        // Create widget
        new window.TradingView.widget({
          container_id: chartId,
          symbol: symbol,
          interval: timeframeToInterval(timeframe),
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
          height: '100%',
          width: '100%',
          // Simplify UI for mobile
          hide_side_toolbar: isMobile,
          details: !isMobile,
          hotlist: !isMobile,
          calendar: !isMobile,
          // Slow down auto-refresh rate to prevent potential memory issues
          autosize: true,
          auto_refresh_delay: 5
        });
        
        if (isMounted) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error initializing TradingView chart:", error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    initWidget();
    
    // Cleanup function
    return () => {
      isMounted = false;
      
      // Safe cleanup approach
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [symbol, timeframe, chartId, isMobile]);

  return (
    <div className="w-full h-full">
      {isLoading && (
        <div className="w-full h-[400px] md:h-[600px] flex flex-col items-center justify-center space-y-4">
          <Skeleton className="h-[300px] md:h-[500px] w-full rounded-md" />
          <div className="text-center text-muted-foreground">Loading TradingView chart...</div>
        </div>
      )}
      <div 
        ref={containerRef}
        className={`w-full overflow-hidden ${isLoading ? 'hidden' : ''}`}
        style={{ height: isMobile ? '400px' : '600px' }}
      />
    </div>
  );
};
