'use client';
import { useState, useEffect } from 'react';
import { availableDates, rooms, teamMembers, bookingConfig ,existingBookings } from '../data/bookingdates.js';
import CalendarGrid from '../components/booking/BookingCalendar.js';
import RoomSelection from '../components/booking/RoomSelection.js';
import TeamMemberSelection from '../components/booking/TeamMemberSelection.js';
import BookingSummary from '../components/booking/BookingSummary.js';
import PaymentGateway from '../components/booking/PaymentGateway.js';
import ConfirmationScreen from '../components/booking/ConfirmationScreen.js';
import { Card } from '@/components/ui/card';

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({
    dates: null,
    room: null,
    teamMembers: []
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [availableTeamMembers, setAvailableTeamMembers] = useState([]);

  // Safely get available dates or return empty array
  const getMemberAvailableDates = (member) => {
    return member?.availableDates || [];
  };

  // Filter team members based on selected dates
  useEffect(() => {
    const filterMembers = () => {
      if (!bookingDetails.dates || !bookingDetails.dates.startDate) {
        return teamMembers;
      }

      return teamMembers.filter(member => {
        const memberDates = getMemberAvailableDates(member);
        if (memberDates.length === 0) return true; // Available if no dates specified

        const startDate = new Date(bookingDetails.dates.startDate);
        const endDate = bookingDetails.dates.endDate 
          ? new Date(bookingDetails.dates.endDate) 
          : startDate;

        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
          const dateStr = currentDate.toISOString().split('T')[0];
          if (!memberDates.includes(dateStr)) {
            return false;
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
        return true;
      });
    };

    setAvailableTeamMembers(filterMembers());
  }, [bookingDetails.dates]);

  // Navigation functions
  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  // Handlers for each step
  const handleDateSelect = (dates) => {
    setBookingDetails(prev => ({ ...prev, dates }));
    nextStep();
  };

  const handleRoomSelect = (room) => {
    setBookingDetails(prev => ({ ...prev, room }));
    nextStep();
  };

  const handleTeamMemberSelect = (members) => {
    setBookingDetails(prev => ({ ...prev, teamMembers: members }));
    nextStep();
  };

  const handleBookingComplete = () => {
    setBookingConfirmed(true);
    console.log('Booking completed:', bookingDetails);
  };

  // Calculate total cost with safeguards
  const calculateTotal = () => {
    if (!bookingDetails.dates || !bookingDetails.room) return 0;
    
    try {
      const startTime = bookingDetails.dates.startTime || '00:00';
      const endTime = bookingDetails.dates.endTime || '00:00';
      
      const hoursPerDay = parseInt(endTime.split(':')[0]) - 
                         parseInt(startTime.split(':')[0]);
      
      const days = bookingDetails.dates.endDate 
        ? (new Date(bookingDetails.dates.endDate) - new Date(bookingDetails.dates.startDate)) / (1000 * 60 * 60 * 24) + 1
        : 1;
      
      const roomCost = hoursPerDay * days * (bookingDetails.room?.rate || 0);
      const membersCost = (bookingDetails.teamMembers || []).reduce(
        (sum, member) => sum + (hoursPerDay * days * (member?.rate || 0)), 0);
      
      return roomCost + membersCost;
    } catch (error) {
      console.error('Error calculating total:', error);
      return 0;
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Book Studio Time</h1>
      
      <div className="max-w-6xl mx-auto">
        {!bookingConfirmed ? (
          <Card className="p-6">
            {step === 1 && (
              <CalendarGrid 
                availableDates={availableDates}
                onBookingSelect={handleDateSelect}
              />
            )}
            
            {step === 2 && (
              <RoomSelection 
                rooms={rooms} 
                onSelect={handleRoomSelect}
                onBack={prevStep}
                minHours={bookingConfig.minSessionHours}
              />
            )}
            
            {step === 3 && (
              <TeamMemberSelection
                teamMembers={availableTeamMembers}
                selectedDates={bookingDetails.dates}
                onSelect={handleTeamMemberSelect}
                onNext={nextStep}
                onBack={prevStep}
                isOptional={true}
                existingBookings={existingBookings}
              />
            )}
            
            {step === 4 && (
              <BookingSummary
                dates={bookingDetails.dates}
                room={bookingDetails.room}
                teamMembers={bookingDetails.teamMembers}
                total={calculateTotal()}
                onBack={prevStep}
                onConfirm={nextStep}
              />
            )}
            
            {step === 5 && (
              <PaymentGateway
                amount={calculateTotal()}
                bookingDetails={bookingDetails}
                onSuccess={handleBookingComplete}
                onBack={prevStep}
              />
            )}
          </Card>
        ) : (
          <ConfirmationScreen 
            bookingDetails={bookingDetails}
            total={calculateTotal()}
            onNewBooking={() => {
              setBookingConfirmed(false);
              setStep(1);
              setBookingDetails({
                dates: null,
                room: null,
                teamMembers: []
              });
            }}
          />
        )}
      </div>
    </div>
  );
}