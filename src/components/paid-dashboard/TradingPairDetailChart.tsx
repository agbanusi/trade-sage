
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
  const containerRef = useRef<HTMLDivElement>(null);
  
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

  useEffect(() => {
    // Reset loading state on new render
    setIsLoading(true);
    
    // Create a unique ID for this specific instance
    const uniqueContainerId = `tv-chart-${symbol.replace(/[^a-zA-Z0-9]/g, '')}-${timeframe}-${Date.now()}`;
    
    // Create a new div for this specific chart instance
    if (containerRef.current) {
      // Clear previous content
      containerRef.current.innerHTML = '';
      
      // Create a new container for this chart
      const chartContainer = document.createElement('div');
      chartContainer.id = uniqueContainerId;
      chartContainer.style.width = '100%';
      chartContainer.style.height = isMobile ? '400px' : '600px';
      
      // Add to DOM
      containerRef.current.appendChild(chartContainer);
      
      // Load TradingView script
      const loadChart = () => {
        if (window.TradingView) {
          try {
            // Create widget with the unique container ID
            new window.TradingView.widget({
              container_id: uniqueContainerId,
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
            
            // Hide loading state
            setIsLoading(false);
          } catch (error) {
            console.error("Failed to initialize TradingView widget:", error);
            setIsLoading(false);
          }
        }
      };
      
      // Check if script already exists
      if (window.TradingView) {
        loadChart();
      } else {
        // Script doesn't exist, create it
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/tv.js';
        script.async = true;
        script.onload = loadChart;
        script.onerror = () => {
          console.error("Failed to load TradingView script");
          setIsLoading(false);
        };
        document.head.appendChild(script);
      }
    }
    
    // Clean up function - very minimal
    return () => {
      // We only clear our container - we never touch the widget's internals
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [symbol, timeframe, isMobile]); // Include all dependencies

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
