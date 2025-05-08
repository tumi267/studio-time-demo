import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function ConfirmationScreen({ bookingDetails, total, onNewBooking }) {
  const calculateHours = () => {
    const hoursPerDay = parseInt(bookingDetails.dates.endTime.split(':')[0]) - 
                       parseInt(bookingDetails.dates.startTime.split(':')[0]);
    
    const days = bookingDetails.dates.endDate 
      ? (new Date(bookingDetails.dates.endDate) - new Date(bookingDetails.dates.startDate)) / (1000 * 60 * 60 * 24) + 1
      : 1;
    
    return hoursPerDay * days;
  };

  return (
    <Card className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Booking Confirmed!</h2>
      <div className="space-y-2 mb-6 text-left max-w-md mx-auto">
        <p><strong>Dates:</strong> {bookingDetails.dates.startDate} 
          {bookingDetails.dates.endDate && ` to ${bookingDetails.dates.endDate}`}
        </p>
        <p><strong>Time:</strong> {bookingDetails.dates.startTime} - {bookingDetails.dates.endTime}</p>
        <p><strong>Duration:</strong> {calculateHours()} hours</p>
        <p><strong>Room:</strong> {bookingDetails.room.name} (R{bookingDetails.room.rate}/hr)</p>
        {bookingDetails.teamMember && (
          <p><strong>Team Member:</strong> {bookingDetails.teamMember.name} (R{bookingDetails.teamMember.rate}/hr)</p>
        )}
        <p className="font-medium mt-2"><strong>Total:</strong> R{total}</p>
      </div>
      <Button onClick={onNewBooking}>
        Make Another Booking
      </Button>
    </Card>
  );
}