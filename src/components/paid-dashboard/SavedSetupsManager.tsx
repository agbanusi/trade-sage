
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { 
  Save, 
  Edit, 
  MoreVertical, 
  Trash2, 
  Copy, 
  Share2, 
  Plus, 
  LayoutGrid, 
  Settings,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

// Mock data for saved setups
const mockSavedSetups = [
  {
    id: 'setup1',
    name: 'Fibonacci Retracement Strategy',
    description: 'A setup using Fibonacci retracement levels with MACD and RSI indicators',
    dateCreated: new Date(2023, 9, 15),
    dateModified: new Date(2023, 10, 5),
    indicators: ['MACD', 'RSI', 'Fibonacci Retracement'],
    timeframe: '1h',
    pairTypes: ['forex', 'crypto'],
  },
  {
    id: 'setup2',
    name: 'Bollinger Bands with Volume',
    description: 'Bollinger Bands strategy with volume confirmation signals',
    dateCreated: new Date(2023, 8, 20),
    dateModified: new Date(2023, 8, 20),
    indicators: ['Bollinger Bands', 'Volume', 'Moving Average'],
    timeframe: '4h',
    pairTypes: ['crypto', 'commodities'],
  },
  {
    id: 'setup3',
    name: 'Scalping Setup for Day Trading',
    description: 'Fast signal generation for day trading scalping strategy',
    dateCreated: new Date(2023, 7, 10),
    dateModified: new Date(2023, 9, 25),
    indicators: ['Stochastic Oscillator', 'EMA 9/21', 'ATR'],
    timeframe: '5m',
    pairTypes: ['forex', 'indices'],
  },
];

// Interface for setup object
interface SavedSetup {
  id: string;
  name: string;
  description: string;
  dateCreated: Date;
  dateModified: Date;
  indicators: string[];
  timeframe: string;
  pairTypes: string[];
}

export const SavedSetupsManager: React.FC = () => {
  const [setups, setSetups] = useState<SavedSetup[]>(mockSavedSetups);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentSetup, setCurrentSetup] = useState<SavedSetup | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state for editing
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    timeframe: '',
  });
  
  const handleEditSetup = (setup: SavedSetup) => {
    setCurrentSetup(setup);
    setFormState({
      name: setup.name,
      description: setup.description,
      timeframe: setup.timeframe,
    });
    setIsEditDialogOpen(true);
  };
  
  const handleDeleteSetup = (setupId: string) => {
    setSetups(prev => prev.filter(setup => setup.id !== setupId));
    toast.success('Setup deleted successfully');
  };
  
  const handleDuplicateSetup = (setup: SavedSetup) => {
    const newSetup = {
      ...setup,
      id: `setup${Math.floor(Math.random() * 10000)}`,
      name: `${setup.name} (Copy)`,
      dateCreated: new Date(),
      dateModified: new Date(),
    };
    setSetups(prev => [...prev, newSetup]);
    toast.success('Setup duplicated successfully');
  };
  
  const handleSaveSetup = () => {
    if (!currentSetup) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setSetups(prev => prev.map(setup => 
        setup.id === currentSetup.id 
          ? { 
              ...setup, 
              name: formState.name, 
              description: formState.description,
              timeframe: formState.timeframe,
              dateModified: new Date()
            } 
          : setup
      ));
      
      setIsEditDialogOpen(false);
      setIsLoading(false);
      toast.success('Setup updated successfully');
    }, 800);
  };
  
  const handleLoadSetup = (setup: SavedSetup) => {
    toast.success(`Loading ${setup.name} setup...`, {
      icon: <Settings className="h-4 w-4 animate-spin" />,
      duration: 1500,
    });
    
    // Simulate loading
    setTimeout(() => {
      toast.success(`Setup "${setup.name}" loaded successfully`, {
        icon: <CheckCircle className="h-4 w-4 text-green-500" />
      });
    }, 1500);
  };
  
  const handleShareSetup = (setup: SavedSetup) => {
    toast.info(`Sharing "${setup.name}" setup...`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">Saved Setups</h2>
          <p className="text-sm text-muted-foreground">Manage your saved indicator configurations</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Setup
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {setups.map(setup => (
          <Card key={setup.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base">{setup.name}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditSetup(setup)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDuplicateSetup(setup)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShareSetup(setup)}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDeleteSetup(setup.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="text-xs">
                {setup.description.length > 80 
                  ? `${setup.description.substring(0, 80)}...` 
                  : setup.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1 mb-3">
                {setup.indicators.map(indicator => (
                  <Badge key={indicator} variant="outline" className="text-xs">
                    {indicator}
                  </Badge>
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Timeframe</span>
                <span className="font-medium">{setup.timeframe}</span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Last Modified</span>
                <span className="font-medium">{setup.dateModified.toLocaleDateString()}</span>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button 
                onClick={() => handleLoadSetup(setup)} 
                variant="default" 
                className="w-full"
              >
                <LayoutGrid className="h-4 w-4 mr-2" />
                Load Setup
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Setup</DialogTitle>
            <DialogDescription>
              Make changes to your indicator setup
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Setup Name</Label>
              <Input 
                id="name" 
                value={formState.name} 
                onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input 
                id="description" 
                value={formState.description} 
                onChange={(e) => setFormState(prev => ({ ...prev, description: e.target.value }))} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timeframe">Timeframe</Label>
              <Input 
                id="timeframe" 
                value={formState.timeframe} 
                onChange={(e) => setFormState(prev => ({ ...prev, timeframe: e.target.value }))} 
              />
            </div>
            
            <div className="space-y-2">
              <Label>Indicators</Label>
              <div className="flex flex-wrap gap-1 border rounded-md p-2">
                {currentSetup?.indicators.map(indicator => (
                  <Badge key={indicator} variant="secondary" className="text-xs">
                    {indicator} <span className="ml-1 cursor-pointer">×</span>
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                To change indicators, use the indicators panel
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveSetup} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Settings className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SavedSetupsManager;
