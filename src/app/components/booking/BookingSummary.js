'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function BookingSummary({
  dates,
  room,
  teamMember,
  total,
  onBack,
  onConfirm
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Booking Summary</h2>
      
      <Card className="p-6 mb-6">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Dates:</span>
            <span>
              {dates.startDate}
              {dates.endDate && ` to ${dates.endDate}`}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Time:</span>
            <span>{dates.startTime} - {dates.endTime}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Room:</span>
            <span>{room.name} (R{room.rate}/hr)</span>
          </div>
          
          {teamMember && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Team Member:</span>
              <span>{teamMember.name} (R{teamMember.rate}/hr)</span>
            </div>
          )}
          
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Room Cost:</span>
              <span>R{room.rate * calculateHours(dates)}</span>
            </div>
            
            {teamMember && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Team Member Cost:</span>
                <span>R{teamMember.rate * calculateHours(dates)}</span>
              </div>
            )}
            
            <div className="flex justify-between font-medium mt-2">
              <span>Total:</span>
              <span>R{total}</span>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onConfirm}>
          Confirm & Pay
        </Button>
      </div>
    </div>
  );
}

// Helper function to calculate booking hours
function calculateHours(dates) {
  const hoursPerDay = parseInt(dates.endTime.split(':')[0]) - 
                     parseInt(dates.startTime.split(':')[0]);
  
  const days = dates.endDate 
    ? (new Date(dates.endDate) - new Date(dates.startDate)) / (1000 * 60 * 60 * 24) + 1
    : 1;
  
  return hoursPerDay * days;
}