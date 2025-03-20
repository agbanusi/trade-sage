
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, SortAsc, SortDesc, Star, BarChart3 } from 'lucide-react';
import { mockTradingPairs } from '@/utils/mockData';
import { TradingPair, TimeFrame } from '@/types';
import { cn } from '@/lib/utils';

interface PaidTradingPairsWidgetProps {
  timeframe?: TimeFrame;
}

export const PaidTradingPairsWidget: React.FC<PaidTradingPairsWidgetProps> = ({ 
  timeframe = '1h'
}) => {
  const [pairs, setPairs] = useState(mockTradingPairs);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'name' | 'price' | 'change'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [favorites, setFavorites] = useState<string[]>([]);

  // Filter pairs based on search and tab
  const filteredPairs = pairs.filter(pair => {
    // Search filter
    const matchesSearch = 
      pair.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pair.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Tab filter
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'favorites') return matchesSearch && favorites.includes(pair.id);
    if (activeTab === 'gainers') return matchesSearch && pair.change > 0;
    if (activeTab === 'losers') return matchesSearch && pair.change < 0;
    
    return matchesSearch;
  });

  // Sort pairs
  const sortedPairs = [...filteredPairs].sort((a, b) => {
    let comparison = 0;
    
    if (sortField === 'name') {
      comparison = a.symbol.localeCompare(b.symbol);
    } else if (sortField === 'price') {
      comparison = a.price - b.price;
    } else if (sortField === 'change') {
      comparison = a.changePercent - b.changePercent;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const toggleSort = (field: 'name' | 'price' | 'change') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-6 pb-2">
        <h3 className="text-xl font-medium">Trading Pairs</h3>
        <p className="text-sm text-muted-foreground">
          Current market data for {timeframe} timeframe
        </p>
      </div>
      
      <div className="px-6 py-3">
        <div className="flex justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search pairs..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="gainers">Gainers</TabsTrigger>
              <TabsTrigger value="losers">Losers</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="px-6">
        <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr] border-b py-2">
          <Button variant="ghost" size="sm" className="flex items-center gap-1 font-medium" onClick={() => toggleSort('name')}>
            Symbol
            {sortField === 'name' && (
              sortDirection === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />
            )}
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1 font-medium" onClick={() => toggleSort('price')}>
            Price
            {sortField === 'price' && (
              sortDirection === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />
            )}
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1 font-medium" onClick={() => toggleSort('change')}>
            Change (24h)
            {sortField === 'change' && (
              sortDirection === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />
            )}
          </Button>
          <div className="text-sm font-medium flex items-center justify-start px-3">Range (24h)</div>
          <div className="text-sm font-medium flex items-center justify-start px-3">Actions</div>
        </div>
      </div>
      
      <ScrollArea className="h-[400px]">
        <div className="grid grid-cols-1 divide-y">
          {sortedPairs.map((pair) => (
            <PairRow 
              key={pair.id} 
              pair={pair}
              isFavorite={favorites.includes(pair.id)}
              onToggleFavorite={() => toggleFavorite(pair.id)}
            />
          ))}
          
          {sortedPairs.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              No trading pairs match your filters
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};

interface PairRowProps {
  pair: TradingPair;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const PairRow: React.FC<PairRowProps> = ({ pair, isFavorite, onToggleFavorite }) => {
  const priceChange = pair.changePercent;
  const isPositive = priceChange > 0;
  
  return (
    <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr] py-3 px-6 hover:bg-muted/20 transition-colors">
      <div className="flex items-center gap-2">
        <button 
          onClick={onToggleFavorite}
          className="text-gray-400 hover:text-amber-400 focus:outline-none"
        >
          <Star className={cn("h-4 w-4", isFavorite && "fill-amber-400 text-amber-400")} />
        </button>
        <div>
          <div className="font-medium">{pair.symbol}</div>
          <div className="text-xs text-muted-foreground">{pair.name}</div>
        </div>
      </div>
      
      <div className="font-mono font-medium flex items-center">
        ${pair.price.toFixed(pair.price < 100 ? 4 : 2)}
      </div>
      
      <div className={cn(
        "flex items-center",
        isPositive ? "text-emerald-500" : "text-red-500"
      )}>
        <span className="font-mono">
          {isPositive ? '+' : ''}{pair.changePercent.toFixed(2)}%
        </span>
      </div>
      
      <div className="flex items-center">
        <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full relative">
          <div 
            className="absolute h-3 w-3 bg-slate-400 rounded-full border-2 border-background top-1/2 -translate-y-1/2"
            style={{ 
              left: `${((pair.price - pair.low24h) / (pair.high24h - pair.low24h)) * 100}%`,
            }}
          ></div>
          <div className="absolute -bottom-4 left-0 text-xs text-muted-foreground">
            {pair.low24h.toFixed(2)}
          </div>
          <div className="absolute -bottom-4 right-0 text-xs text-muted-foreground">
            {pair.high24h.toFixed(2)}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="h-8">
          <BarChart3 className="h-3.5 w-3.5 mr-1" />
          Chart
        </Button>
      </div>
    </div>
  );
};
