
import React, { useEffect } from 'react';
import { Card } from '@/components/ui/card';

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
  useEffect(() => {
    // Load TradingView widget
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => initTradingViewWidget();
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
          height: 500,
          width: '100%',
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
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse">Loading TradingView chart...</div>
      </div>
    </div>
  );
};
