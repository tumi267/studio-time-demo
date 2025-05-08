'use client'

import { useState, useMemo } from 'react'
import { existingBookings, rooms, teamMembers } from '../../../../data/bookingdates'
import { format } from 'date-fns'

const BOOKINGS_PER_PAGE = 10

// Helper functions
const calculateDurationInHours = (startTime, endTime) => {
  const startDate = new Date(`1970-01-01T${startTime}:00Z`)
  const endDate = new Date(`1970-01-01T${endTime}:00Z`)

  if (endDate < startDate) {
    endDate.setDate(endDate.getDate() + 1)
  }

  const durationMs = endDate - startDate
  const durationInHours = durationMs / (1000 * 60 * 60)
  return durationInHours + 1
}

const calculateTotalCost = (booking) => {
  const duration = calculateDurationInHours(booking.startTime, booking.endTime)
  const room = rooms.find((r) => r.id === booking.roomId)
  const roomCost = room ? room.rate * duration : 0

  const teamCost = booking.teamMemberIds.reduce((total, id) => {
    const member = teamMembers.find((m) => m.id === id)
    return total + ((member?.rate || 0) * duration)
  }, 0)

  return roomCost + teamCost
}

export default function BookingsList() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedRoom, setSelectedRoom] = useState('')

  // Add dummy client info to each booking
  const bookingsWithClient = useMemo(() => {
    return existingBookings.map((booking) => ({
      ...booking,
      client: {
        name: 'Client Name',
        email: 'client@example.com',
        phone: '+27 600 000 000',
      },
    }))
  }, [])

  // Sort by closest to now
  const sortedBookings = useMemo(() => {
    return [...bookingsWithClient].sort((a, b) => {
      const now = new Date()
      const aDate = new Date(`${a.date}T${a.startTime}`)
      const bDate = new Date(`${b.date}T${b.startTime}`)
      return Math.abs(aDate - now) - Math.abs(bDate - now)
    })
  }, [bookingsWithClient])

  // Filtered bookings by search, date, and room
  const filteredBookings = useMemo(() => {
    let result = sortedBookings
    
    if (selectedDate) {
      const formattedSelectedDate = format(new Date(selectedDate), 'yyyy-MM-dd')
      result = result.filter(booking => booking.date === formattedSelectedDate)
    }

    if (selectedRoom) {

      result = result.filter(booking => booking?.roomId
        === parseInt(selectedRoom))
        
    }

    if (search) {
      result = result.filter((booking) => {
        const teamMatch = booking.teamMemberIds.some((id) => {
          const member = teamMembers.find((m) => m.id === id)
          return member?.name.toLowerCase().includes(search.toLowerCase())
        })
        return teamMatch
      })
    }

    return result
  }, [search, sortedBookings, selectedDate, selectedRoom])

  const paginatedBookings = filteredBookings.slice(
    (page - 1) * BOOKINGS_PER_PAGE,
    page * BOOKINGS_PER_PAGE
  )

  const totalPages = Math.ceil(filteredBookings.length / BOOKINGS_PER_PAGE)

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value)
    setPage(1)
  }

  const handleRoomChange = (e) => {
    console.log(e.target.value)
    setSelectedRoom(e.target.value)
    setPage(1)
  }

  const clearFilters = () => {
    setSelectedDate('')
    setSelectedRoom('')
    setSearch('')
    setPage(1)
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Bookings</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Room</label>
          <select
            value={selectedRoom}
            onChange={handleRoomChange}
            className="border px-3 py-2 rounded w-full"
          >
            <option value="">All Rooms</option>
            {rooms.map(room => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Team Member</label>
          <input
            type="text"
            placeholder="Search team members"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            className="border px-3 py-2 rounded w-full"
          />
        </div>

        <div className="flex items-end">
          <button 
            onClick={clearFilters}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 w-full"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-600 space-y-1">
        {selectedDate && (
          <p>Date: {format(new Date(selectedDate), 'MMMM d, yyyy')}</p>
        )}
        {selectedRoom && (
          <p>Room: {rooms.find(r => r.id === selectedRoom)?.name}</p>
        )}
        <p>Total bookings: {filteredBookings.length}</p>
      </div>

      <ul className="space-y-4">
        {paginatedBookings.map((booking) => {
          const team = booking.teamMemberIds.map((id) =>
            teamMembers.find((m) => m.id === id)
          )
          const room = rooms.find((r) => r.id === booking.roomId)
          const total = calculateTotalCost(booking)

          return (
            <li
              key={booking.id}
              className="border rounded p-4 shadow-sm space-y-2"
            >
              <div className="font-semibold text-gray-700">
                Booking ID: #{booking.id}
              </div>

              <div>
                <strong>Date:</strong>{' '}
                {format(new Date(booking.date), 'yyyy-MM-dd')}
              </div>

              <div>
                <strong>Time:</strong> {booking.startTime} - {booking.endTime}
              </div>

              <div>
                <strong>Room:</strong> {room?.name} ({room?.rate}/hr)
              </div>

              <div>
                <strong>Team Members:</strong>{' '}
                {team.map((member) => member?.name).join(', ')}{' '}
                {team.map((m) => `(${m?.rate}/hr)`).join(' ')}
              </div>

              <div>
                <strong>Total:</strong> R{total.toFixed(2)}
              </div>

              <div className="text-sm text-gray-600">
                <strong>Client Contact:</strong> {booking.client.name},{' '}
                {booking.client.email}, {booking.client.phone}
              </div>

              <div className="flex gap-3 mt-2">
                <button className="px-4 py-1 bg-yellow-400 text-black rounded">
                  Edit
                </button>
                <button className="px-4 py-1 bg-red-500 text-white rounded">
                  Cancel
                </button>
              </div>
            </li>
          )
        })}
      </ul>

      {filteredBookings.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No bookings found for the selected criteria
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}