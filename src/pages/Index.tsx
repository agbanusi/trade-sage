
import React from 'react';
import { Link } from 'react-router-dom';
import MarketOverview from '@/components/MarketOverview';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className="mr-2 h-10 w-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white font-display font-bold">TS</span>
          </div>
          <h1 className="text-2xl font-medium font-display">TradeSage</h1>
        </div>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">Home</Link>
            <Link to="/dashboard" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">Dashboard</Link>
            <a href="#" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">Signals</a>
            <a href="#" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">Settings</a>
          </nav>
          <Link to="/dashboard">
            <Button className={cn(
              "bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium transition-all",
              "border border-primary/20",
            )}>
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </header>
      
      <main className="w-full max-w-7xl mx-auto px-6 py-6">
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-medium mb-4">
            Intelligent Forex Trading Analysis
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Real-time market analysis powered by advanced algorithms to help you make informed trading decisions with precision and confidence.
          </p>
        </div>
        
        <MarketOverview />
        
        <div className="mt-12 text-center">
          <Link to="/dashboard">
            <Button size="lg" className="animate-pulse">
              Explore Advanced Dashboard
            </Button>
          </Link>
        </div>
      </main>
      
      <footer className="mt-16 py-8 border-t border-gray-200 dark:border-gray-800">
        <div className="w-full max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            TradeSage AI © {new Date().getFullYear()} — Intelligent trading analysis platform
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            Note: This is a proof of concept. Trading involves risk.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
