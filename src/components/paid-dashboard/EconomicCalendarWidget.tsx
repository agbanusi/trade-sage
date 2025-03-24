
import React, { useState, useEffect } from 'react';
import { format, parseISO, isToday, isTomorrow } from 'date-fns';
import { ChevronLeft, ChevronRight, CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { fetchEconomicCalendar, EconomicEvent } from '@/services/economicCalendarService';

type ViewType = 'list' | 'table' | 'day' | 'week';
type GroupedEvents = Record<string, EconomicEvent[]>;

interface EconomicCalendarWidgetProps {
  defaultDays?: number;
}

export const EconomicCalendarWidget: React.FC<EconomicCalendarWidgetProps> = ({
  defaultDays = 7,
}) => {
  const [events, setEvents] = useState<EconomicEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [viewType, setViewType] = useState<ViewType>('week');
  const [days, setDays] = useState(defaultDays);

  useEffect(() => {
    const loadCalendarData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchEconomicCalendar(startDate, days);
        setEvents(data);
      } catch (error) {
        console.error("Error loading economic calendar:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCalendarData();
  }, [startDate, days]);

  const handlePrevious = () => {
    const newDate = new Date(startDate);
    newDate.setDate(newDate.getDate() - days);
    setStartDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(startDate);
    newDate.setDate(newDate.getDate() + days);
    setStartDate(newDate);
  };

  const handleToday = () => {
    setStartDate(new Date());
  };

  const handleViewChange = (value: string) => {
    const view = value as ViewType;
    setViewType(view);
    
    // Adjust days shown based on view
    if (view === 'day') setDays(1);
    else if (view === 'week') setDays(7);
    else setDays(14); // for list and table views, show more data
  };

  // Group events by date for the list view
  const groupEventsByDate = (events: EconomicEvent[]): GroupedEvents => {
    return events.reduce((acc, event) => {
      const date = event.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(event);
      return acc;
    }, {} as GroupedEvents);
  };

  const getImpactBadge = (impact: 'low' | 'medium' | 'high') => {
    switch (impact) {
      case 'high':
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">High Impact</Badge>;
      case 'medium':
        return <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">Medium Impact</Badge>;
      default:
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Low Impact</Badge>;
    }
  };

  const getFormattedDate = (dateStr: string) => {
    try {
      const date = parseISO(dateStr);
      if (isToday(date)) return 'Today';
      if (isTomorrow(date)) return 'Tomorrow';
      return format(date, 'EEEE, MMMM d, yyyy');
    } catch (e) {
      return dateStr;
    }
  };

  const getBorderClass = (impact: 'low' | 'medium' | 'high') => {
    switch (impact) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-amber-500';
      default:
        return 'border-l-blue-500';
    }
  };

  const renderListView = () => {
    const groupedEvents = groupEventsByDate(events);
    
    return (
      <ScrollArea className="h-[500px]">
        <div className="space-y-4">
          {Object.keys(groupedEvents).sort().map((date) => (
            <div key={date}>
              <div className="font-medium text-sm py-2 sticky top-0 bg-background z-10">
                {getFormattedDate(date)}
              </div>
              
              <div className="space-y-2">
                {groupedEvents[date].map((event) => (
                  <Card 
                    key={event.id} 
                    className={`p-3 border-l-4 ${getBorderClass(event.impact)}`}
                  >
                    <div className="flex justify-between">
                      <div>
                        <span className="text-sm font-medium">{event.title}</span>
                        <div className="text-xs text-muted-foreground">{event.time}</div>
                      </div>
                      {getImpactBadge(event.impact)}
                    </div>
                    {(event.forecast || event.previous) && (
                      <div className="text-sm mt-2">
                        {event.forecast && `Expected: ${event.forecast}`} 
                        {event.previous && event.forecast && ' | '} 
                        {event.previous && `Previous: ${event.previous}`}
                        {event.actual && ' | Actual: ' + event.actual}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    );
  };

  const renderTableView = () => {
    return (
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Impact</TableHead>
              <TableHead>Forecast</TableHead>
              <TableHead>Previous</TableHead>
              <TableHead>Actual</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{format(parseISO(event.date), 'MMM d')}</TableCell>
                <TableCell>{event.time}</TableCell>
                <TableCell>{event.country}</TableCell>
                <TableCell>{event.title}</TableCell>
                <TableCell>{getImpactBadge(event.impact)}</TableCell>
                <TableCell>{event.forecast || '-'}</TableCell>
                <TableCell>{event.previous || '-'}</TableCell>
                <TableCell>{event.actual || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="w-full h-16" />
          ))}
        </div>
      );
    }

    if (events.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-8">
          <CalendarIcon className="h-12 w-12 text-muted-foreground opacity-50 mb-4" />
          <p className="text-muted-foreground">No economic events found for this period</p>
        </div>
      );
    }

    if (viewType === 'table') {
      return renderTableView();
    }

    return renderListView();
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-medium mb-4">Economic Calendar</h3>
      <div className="space-y-4">
        <div className="flex justify-between">
          <Select value={viewType} onValueChange={handleViewChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day View</SelectItem>
              <SelectItem value="week">Week View</SelectItem>
              <SelectItem value="list">List View</SelectItem>
              <SelectItem value="table">Table View</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrevious}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            <Button variant="outline" size="sm" onClick={handleToday}>Today</Button>
            <Button variant="outline" size="sm" onClick={handleNext}>
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
        
        {renderContent()}
      </div>
    </Card>
  );
};
