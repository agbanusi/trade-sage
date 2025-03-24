
import React, { useEffect, useState, useRef } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<any>(null);
  
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

  // Function to load TradingView script
  const loadTradingViewScript = () => {
    return new Promise<void>((resolve, reject) => {
      if (window.TradingView) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load TradingView script"));
      document.head.appendChild(script);
    });
  };

  // Function to create widget
  const createWidget = (containerId: string) => {
    if (!window.TradingView) {
      console.error("TradingView is not loaded");
      return null;
    }

    try {
      return new window.TradingView.widget({
        container_id: containerId,
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
      });
    } catch (error) {
      console.error("Failed to initialize TradingView widget:", error);
      return null;
    }
  };

  useEffect(() => {
    // Generate a unique container ID that doesn't change on re-renders
    const containerId = `tv-chart-${symbol.replace(/[^a-zA-Z0-9]/g, '')}-${timeframe}`;
    
    let isMounted = true;
    setIsLoading(true);
    
    const initWidget = async () => {
      if (!containerRef.current || !isMounted) return;
      
      try {
        // Clear the container first
        containerRef.current.innerHTML = '';
        
        // Create a new container for this chart
        const chartContainer = document.createElement('div');
        chartContainer.id = containerId;
        chartContainer.style.width = '100%';
        chartContainer.style.height = isMobile ? '400px' : '600px';
        
        // Add to DOM
        containerRef.current.appendChild(chartContainer);
        
        // Load TradingView if needed
        await loadTradingViewScript();
        
        // If still mounted, create the widget
        if (isMounted && containerRef.current) {
          widgetRef.current = createWidget(containerId);
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
      
      // Simply empty the container - don't try to access widget directly
      if (containerRef.current) {
        try {
          // Wait a small delay to prevent race conditions
          setTimeout(() => {
            if (containerRef.current) {
              containerRef.current.innerHTML = '';
            }
          }, 0);
        } catch (error) {
          console.error("Error cleaning up widget:", error);
        }
      }
      
      // Clear the reference
      widgetRef.current = null;
    };
  }, [symbol, timeframe, isMobile]); // Dependencies

  return (
    <div 
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
