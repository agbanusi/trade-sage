
import { toast } from "sonner";

export interface EconomicEvent {
  id: string;
  title: string;
  country: string;
  date: string; // ISO date string
  time: string;
  impact: 'low' | 'medium' | 'high';
  forecast?: string;
  previous?: string;
  actual?: string;
}

// We're using the free Forex Factory API via the API-Ninjas proxy
// This is a free public API with reasonable limits
export async function fetchEconomicCalendar(
  startDate: Date = new Date(),
  days: number = 7
): Promise<EconomicEvent[]> {
  try {
    const formattedStartDate = formatDate(startDate);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + days);
    const formattedEndDate = formatDate(endDate);
    
    const url = `https://api.api-ninjas.com/v1/economiccalendar?start_date=${formattedStartDate}&end_date=${formattedEndDate}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Api-Key': 'YOUR_API_KEY', // In a real app, this should come from environment variables
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`API returned status ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform API data to our interface format
    return data.map((event: any) => ({
      id: event.event_id || String(Math.random()),
      title: event.event,
      country: event.country,
      date: event.date,
      time: event.time || 'All day',
      impact: mapImpact(event.impact),
      forecast: event.forecast,
      previous: event.previous,
      actual: event.actual
    }));
  } catch (error) {
    console.error("Failed to fetch economic calendar:", error);
    toast.error("Failed to load economic calendar data");
    
    // Return mock data as fallback
    return getMockEconomicCalendarData();
  }
}

// Helper function to map impact levels
function mapImpact(impact: string): 'low' | 'medium' | 'high' {
  if (!impact) return 'low';
  const lowerImpact = impact.toLowerCase();
  if (lowerImpact.includes('high')) return 'high';
  if (lowerImpact.includes('medium') || lowerImpact.includes('moderate')) return 'medium';
  return 'low';
}

// Helper function to format date as YYYY-MM-DD
function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

// Fallback mock data in case the API fails
function getMockEconomicCalendarData(): EconomicEvent[] {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 2);
  
  return [
    {
      id: '1',
      title: 'USD CPI Data',
      country: 'US',
      date: formatDate(today),
      time: '08:30 EST',
      impact: 'high',
      forecast: '0.4%',
      previous: '0.3%'
    },
    {
      id: '2',
      title: 'EUR Industrial Production',
      country: 'EU',
      date: formatDate(today),
      time: '10:00 EST',
      impact: 'medium',
      forecast: '0.8%',
      previous: '0.9%'
    },
    {
      id: '3',
      title: 'BOE Interest Rate Decision',
      country: 'UK',
      date: formatDate(tomorrow),
      time: '07:00 EST',
      impact: 'high',
      forecast: '5.00%',
      previous: '5.00%'
    },
    {
      id: '4',
      title: 'USD Retail Sales',
      country: 'US',
      date: formatDate(tomorrow),
      time: '08:30 EST',
      impact: 'medium',
      forecast: '0.2%',
      previous: '0.8%'
    },
    {
      id: '5',
      title: 'FOMC Member Speech',
      country: 'US',
      date: formatDate(tomorrow),
      time: '14:00 EST',
      impact: 'low'
    },
    {
      id: '6',
      title: 'JPY GDP (QoQ)',
      country: 'JP',
      date: formatDate(dayAfter),
      time: '19:50 EST',
      impact: 'high',
      forecast: '0.1%',
      previous: '-0.1%'
    }
  ];
}
