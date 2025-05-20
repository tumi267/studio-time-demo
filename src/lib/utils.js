import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export function calculateDurationInHours(startTime, endTime){
  const startDate = new Date(`1970-01-01T${startTime}:00Z`)
  const endDate = new Date(`1970-01-01T${endTime}:00Z`)

  if (endDate < startDate) {
    endDate.setDate(endDate.getDate() + 1)
  }

  const durationMs = endDate - startDate
  const durationInHours = durationMs / (1000 * 60 * 60)
  return durationInHours + 1
}

 export function calculateTotalCost(booking,rooms,teamMembers) {

  const duration = calculateDurationInHours(booking.startTime, booking.endTime)
  const room = rooms.find((r) => r.id === booking.roomId)
  const roomCost = room ? room.rate * duration : 0

  const teamCost = booking?.teamMemberIds?.reduce((total, id) => {
    const member = teamMembers.find((m) => m.id === id)
    return total + ((member?.rate || 0) * duration)
  }, 0)


  return roomCost + teamCost
}

