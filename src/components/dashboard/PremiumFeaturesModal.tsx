
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckIcon, LockIcon, CreditCardIcon, ClockIcon, SignalIcon } from 'lucide-react';

interface PremiumFeaturesModalProps {
  open: boolean;
  onClose: () => void;
}

export const PremiumFeaturesModal: React.FC<PremiumFeaturesModalProps> = ({
  open,
  onClose,
}) => {
  const [plan, setPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = () => {
    setLoading(true);
    
    // In a real app, this would redirect to Stripe checkout
    setTimeout(() => {
      setLoading(false);
      // We'd redirect to Stripe here in a real app
      alert('This would redirect to Stripe checkout in a real application.');
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Upgrade to TradeSage Pro</DialogTitle>
          <DialogDescription>
            Unlock advanced trading tools and features to elevate your trading experience.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="features" className="space-y-4">
            <div className="grid gap-4">
              <FeatureCard 
                title="Advanced Technical Indicators" 
                description="Access to over 50+ advanced technical indicators including Ichimoku Cloud, Bollinger Bands, MACD, and more."
                icon={<SignalIcon className="h-5 w-5 text-primary" />}
              />
              <FeatureCard 
                title="Multi-Timeframe Analysis" 
                description="Analyze price movements across multiple timeframes from 1-minute to daily charts."
                icon={<ClockIcon className="h-5 w-5 text-primary" />}
              />
              <FeatureCard 
                title="Priority Signal Alerts" 
                description="Receive high-accuracy signal alerts before standard users, delivered straight to your device."
                icon={<LockIcon className="h-5 w-5 text-primary" />}
              />
              <FeatureCard 
                title="TradingView Integration" 
                description="Connect with TradingView charts for deeper analysis and customization."
                icon={<CreditCardIcon className="h-5 w-5 text-primary" />}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="pricing">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Card className="p-4 cursor-pointer border-2 border-primary" onClick={() => setPlan('monthly')}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Monthly</h3>
                    <div className="flex items-end gap-1">
                      <span className="text-2xl font-bold">$29</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                  </div>
                  {plan === 'monthly' && (
                    <Badge className="bg-primary">Selected</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Perfect for traders evaluating our advanced features.
                </p>
              </Card>
              
              <Card className="p-4 cursor-pointer relative overflow-hidden" onClick={() => setPlan('yearly')}>
                <div className="absolute -right-8 top-3 rotate-45 bg-primary text-white text-xs px-8 py-0.5">
                  Save 20%
                </div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Yearly</h3>
                    <div className="flex items-end gap-1">
                      <span className="text-2xl font-bold">$279</span>
                      <span className="text-muted-foreground">/year</span>
                    </div>
                  </div>
                  {plan === 'yearly' && (
                    <Badge className="bg-primary">Selected</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Best value for serious traders. $23.25/month.
                </p>
              </Card>
            </div>
            
            <div className="grid gap-2 mb-6">
              <div className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-primary" />
                <span className="text-sm">All premium features included</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-primary" />
                <span className="text-sm">Priority customer support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-primary" />
                <span className="text-sm">Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-primary" />
                <span className="text-sm">14-day money-back guarantee</span>
              </div>
            </div>
            
            <Button className="w-full" onClick={handleSubscribe} disabled={loading}>
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CreditCardIcon className="h-4 w-4" />
                  <span>Subscribe Now</span>
                </div>
              )}
            </Button>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Secure payment powered by Stripe
          </div>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <div className="flex gap-3 p-3 rounded-lg border">
      <div className="rounded-full bg-primary/10 p-2.5 h-10 w-10 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
