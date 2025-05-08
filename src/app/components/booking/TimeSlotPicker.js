'use client'
import { useState, useEffect } from 'react'
import { format, addDays, parseISO, isWithinInterval, addHours } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export const TimeSlotPicker = ({ 
  selectedDate,
  onDateChange,
  selectedTime,
  onTimeChange,
  bookedSlots = [],
  durationHours = 2 // Default 2 hour slots
}) => {
  const [timeSlots, setTimeSlots] = useState([])
  const [tempSelectedTime, setTempSelectedTime] = useState(null)

  // Generate time slots for the selected date
  useEffect(() => {
    if (!selectedDate) {
      setTimeSlots([])
      return
    }

    const slots = []
    const startHour = 9 // 9am
    const endHour = 18 // 6pm
    const dateStr = format(selectedDate, 'yyyy-MM-dd')

    for (let hour = startHour; hour <= endHour - durationHours; hour++) {
      const startTime = `${hour.toString().padStart(2, '0')}:00`
      const endTime = `${(hour + durationHours).toString().padStart(2, '0')}:00`
      
      // Check if this slot conflicts with any bookings
      const isBooked = bookedSlots.some(booking => {
        if (booking.date !== dateStr) return false
        
        const bookingStart = new Date(`${dateStr}T${booking.startTime}`)
        const bookingEnd = new Date(`${dateStr}T${booking.endTime}`)
        const slotStart = new Date(`${dateStr}T${startTime}`)
        const slotEnd = new Date(`${dateStr}T${endTime}`)
        
        return (
          (slotStart < bookingEnd && slotEnd > bookingStart) || // Overlapping
          (bookingStart < slotEnd && bookingEnd > slotStart)    // Overlapping
        )
      })

      slots.push({
        startTime,
        endTime,
        isBooked,
        isSelected: selectedTime === startTime
      })
    }

    setTimeSlots(slots)
  }, [selectedDate, bookedSlots, durationHours, selectedTime])

  const handleTimeSelect = (slot) => {
    if (slot.isBooked) return
    
    setTempSelectedTime(slot.startTime)
    onTimeChange(slot.startTime)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full">
              {selectedDate ? format(selectedDate, 'PPP') : 'Select date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={onDateChange}
              disabled={(date) => {
                // Disable dates with full-day bookings
                const dateStr = format(date, 'yyyy-MM-dd')
                return bookedSlots.some(
                  b => b.date === dateStr && 
                       b.startTime === '00:00' && 
                       b.endTime === '23:59'
                )
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {selectedDate && (
        <div className="grid grid-cols-3 gap-2">
          {timeSlots.map((slot, index) => (
            <Button
              key={index}
              variant={
                slot.isSelected ? 'default' : 
                slot.isBooked ? 'ghost' : 'outline'
              }
              disabled={slot.isBooked}
              className={
                slot.isBooked ? 'line-through text-muted-foreground' : ''
              }
              onClick={() => handleTimeSelect(slot)}
            >
              {slot.startTime} - {slot.endTime}
              {slot.isBooked && ' (Booked)'}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}