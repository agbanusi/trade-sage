
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { 
  CreditCard, 
  Clock, 
  Download, 
  CheckCircle2, 
  Calendar, 
  ArrowLeft, 
  Star, 
  ShieldCheck 
} from 'lucide-react';

const SubscriptionManagement: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('plans');
  
  // Mock data for subscription details
  const subscription = {
    plan: 'Pro',
    status: 'active',
    nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    price: 49.99,
    billingCycle: 'monthly',
    paymentMethod: {
      type: 'card',
      last4: '4242',
      expiry: '06/2025',
      brand: 'Visa',
    },
    features: [
      'Real-time market data',
      'Advanced indicator combinations',
      'AI-powered pattern recognition',
      'Priority support',
      'Unlimited trading pair analysis',
      'API access',
      'Custom alerts',
    ],
  };

  // Mock data for billing history
  const billingHistory = [
    {
      id: 'inv-1023',
      date: new Date(2023, 10, 15),
      amount: 49.99,
      status: 'paid',
    },
    {
      id: 'inv-965',
      date: new Date(2023, 9, 15),
      amount: 49.99,
      status: 'paid',
    },
    {
      id: 'inv-892',
      date: new Date(2023, 8, 15),
      amount: 49.99,
      status: 'paid',
    },
  ];

  // Available plans for upgrade/downgrade
  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 0,
      priceLabel: 'Free',
      description: 'Limited access to trading signals',
      features: [
        'Limited trading pairs',
        'Basic market data',
        'Standard indicators',
        'Community support',
      ],
      current: false,
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 49.99,
      priceLabel: '$49.99/month',
      description: 'Full access to all analysis features',
      features: [
        'Unlimited trading pairs',
        'Real-time market data',
        'Advanced indicators',
        'AI pattern recognition',
        'Priority support',
        'Custom alerts',
      ],
      current: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 199.99,
      priceLabel: '$199.99/month',
      description: 'For professional traders and teams',
      features: [
        'Everything in Pro',
        'Multi-user access',
        'API integration',
        'Dedicated account manager',
        'Custom indicator development',
        'White-label options',
      ],
      current: false,
    },
  ];

  const handleCancelSubscription = () => {
    toast.info("This would initiate the cancellation process");
  };

  const handleUpgradePlan = (planId: string) => {
    toast.success(`This would upgrade to the ${planId} plan`);
  };

  const handleUpdatePayment = () => {
    toast.info("This would open payment method update form");
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    toast.success(`This would download invoice ${invoiceId}`);
  };

  return (
    <div className="container py-10 max-w-6xl">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Subscription Management</h1>
      </div>

      <Tabs defaultValue="plans" value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-4">
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="details">Current Plan</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card key={plan.id} className={plan.current ? "border-primary border-2" : ""}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <CardDescription className="mt-1.5">{plan.description}</CardDescription>
                    </div>
                    {plan.current && (
                      <Badge className="bg-primary text-primary-foreground">Current</Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{plan.priceLabel}</span>
                  </div>

                  <Separator />

                  <ul className="space-y-2.5">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  {plan.current ? (
                    <Button disabled className="w-full">Current Plan</Button>
                  ) : (
                    <Button 
                      onClick={() => handleUpgradePlan(plan.id)} 
                      className="w-full"
                      variant={plan.price > subscription.price ? "default" : "outline"}
                    >
                      {plan.price > subscription.price ? "Upgrade" : "Downgrade"}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="details">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-primary" />
                  {subscription.plan} Plan
                </CardTitle>
                <CardDescription>
                  Your current subscription details
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <Badge 
                        variant="outline" 
                        className="bg-emerald-500/10 text-emerald-500"
                      >
                        Active
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Billing Cycle</span>
                      <span className="font-medium">Monthly</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Price</span>
                      <span className="font-medium">${subscription.price}/month</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Next Billing</span>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="font-medium">
                          {subscription.nextBillingDate.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Payment Method</span>
                      <div className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="font-medium">
                          {subscription.paymentMethod.brand} •••• {subscription.paymentMethod.last4}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Card Expiry</span>
                      <span className="font-medium">{subscription.paymentMethod.expiry}</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium mb-3">Included Features</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                    {subscription.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              
              <CardFooter className="flex gap-4 flex-wrap">
                <Button variant="outline" onClick={handleUpdatePayment}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Update Payment Method
                </Button>
                <Button variant="destructive" onClick={handleCancelSubscription}>
                  Cancel Subscription
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  If you have any questions about your subscription, our support team is here to help.
                </p>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full">
                    <ShieldCheck className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                  <Button variant="ghost" className="w-full">
                    View FAQ
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>
                View and download your past invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-4 px-4 py-3 border-b bg-muted/50 text-sm font-medium">
                  <div>Invoice</div>
                  <div>Date</div>
                  <div>Amount</div>
                  <div>Status</div>
                </div>
                <div className="divide-y">
                  {billingHistory.map((invoice) => (
                    <div key={invoice.id} className="grid grid-cols-4 px-4 py-3 items-center text-sm">
                      <div>{invoice.id}</div>
                      <div>{invoice.date.toLocaleDateString()}</div>
                      <div>${invoice.amount.toFixed(2)}</div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500">
                          {invoice.status}
                        </Badge>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDownloadInvoice(invoice.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SubscriptionManagement;
