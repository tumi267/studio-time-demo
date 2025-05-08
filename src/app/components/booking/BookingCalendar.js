'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format, isAfter } from 'date-fns';

export default function CalendarGrid({ availableDates, onBookingSelect }) {
  const [dateRange, setDateRange] = useState({
    from: null,
    to: null
  });
  const [timeRange, setTimeRange] = useState({
    start: null,
    end: null
  });
  const [showTimeSlots, setShowTimeSlots] = useState(false);

  // Generate time slots from 8AM to 8PM
  const timeSlots = Array.from({ length: 13 }, (_, i) => {
    const hour = i + 8;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  // Handle date range selection
  const handleDateSelect = (range) => {
    if (range?.from && range?.to) {
      setDateRange(range);
      setShowTimeSlots(true);
    } else if (range?.from) {
      // If only start date is selected, keep the range incomplete
      setDateRange({ from: range.from, to: null });
      setShowTimeSlots(false);
    } else {
      // Clear selection
      setDateRange({ from: null, to: null });
      setShowTimeSlots(false);
    }
    // Reset time selection when dates change
    setTimeRange({ start: null, end: null });
  };

  // Check if a time slot is available
  const isTimeAvailable = (time) => {
    if (!dateRange.from) return false;
    
    const dateStr = format(dateRange.from, 'yyyy-MM-dd');
    const dateData = availableDates.find(d => d.date === dateStr);
    if (!dateData) return false;
    
    return !dateData.bookedSlots.some(slot => 
      time >= slot.start && time < slot.end
    );
  };

  // Handle time selection
  const handleTimeSelect = (time) => {
    if (!timeRange.start || (timeRange.start && timeRange.end)) {
      // Starting new selection
      setTimeRange({ start: time, end: null });
    } else if (time > timeRange.start) {
      // Completing selection
      setTimeRange({ start: timeRange.start, end: time });
    } else {
      // Reselecting start time
      setTimeRange({ start: time, end: null });
    }
  };

  // Confirm booking selection
  const confirmSelection = () => {
    if (!dateRange.from || !dateRange.to || !timeRange.start || !timeRange.end) return;
    
    const bookingDetails = {
      startDate: format(dateRange.from, 'yyyy-MM-dd'),
      endDate: format(dateRange.to, 'yyyy-MM-dd'),
      startTime: timeRange.start,
      endTime: timeRange.end
    };
    
    onBookingSelect(bookingDetails);
  };

  // Check if time is selected
  const isTimeSelected = (time) => {
    if (!timeRange.start || !timeRange.end) return false;
    return time >= timeRange.start && time < timeRange.end;
  };

  // Check if time is start/end boundary
  const isTimeBoundary = (time) => {
    return time === timeRange.start || time === timeRange.end;
  };

  // Reset all selections
  const resetSelections = () => {
    setDateRange({ from: null, to: null });
    setTimeRange({ start: null, end: null });
    setShowTimeSlots(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={handleDateSelect}
            numberOfMonths={2}
            disabled={(day) => {
              const dateStr = format(day, 'yyyy-MM-dd');
              const dateData = availableDates.find(d => d.date === dateStr);
              return !dateData?.available;
            }}
          />
          
          {dateRange.from && (
            <div className="mt-4 p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Selected Date Range:</p>
                  <p>
                    {format(dateRange.from, 'MMM d, yyyy')}
                    {dateRange.to ? ` - ${format(dateRange.to, 'MMM d, yyyy')}` : ' (Select end date)'}
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={resetSelections}
                >
                  Change Dates
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {showTimeSlots && (
          <div className="w-full md:w-1/2">
            <h3 className="font-medium mb-4">
              Select time for {format(dateRange.from, 'MMM d')}
              {dateRange.to && ` - ${format(dateRange.to, 'MMM d')}`}
            </h3>
            
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time, index) => (
                <Button
                  key={index}
                  variant={
                    isTimeSelected(time) 
                      ? 'default' 
                      : isTimeAvailable(time) 
                        ? 'outline' 
                        : 'ghost'
                  }
                  disabled={!isTimeAvailable(time)}
                  onClick={() => handleTimeSelect(time)}
                  className={
                    isTimeBoundary(time) ? 'ring-2 ring-offset-2 ring-primary' : ''
                  }
                >
                  {time}
                </Button>
              ))}
            </div>
            
            {(timeRange.start || timeRange.end) && (
              <div className="mt-4 p-4 border rounded-lg">
                <p>
                  <strong>Selected Time:</strong> {timeRange.start}
                  {timeRange.end ? ` - ${timeRange.end}` : ''}
                </p>
                <p><strong>Duration:</strong> 
                  {timeRange.end 
                    ? `${parseInt(timeRange.end) - parseInt(timeRange.start)} hours` 
                    : 'Select end time'}
                </p>
                <div className="mt-2 flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setTimeRange({ start: null, end: null })}
                  >
                    Clear Time
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {timeRange.start && timeRange.end && dateRange.from && dateRange.to && (
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={resetSelections}
          >
            Start Over
          </Button>
          <Button onClick={confirmSelection}>
            Confirm Booking
          </Button>
        </div>
      )}
    </div>
  );
}