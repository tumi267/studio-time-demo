'use client';
import { useState, useEffect } from 'react';
import { format, parseISO, eachDayOfInterval } from 'date-fns';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Checkbox } from '../../../components/ui/checkbox';
import { Badge } from '../../../components/ui/badge';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function TeamMemberSelection({
  teamMembers = [],
  selectedDates,
  onSelect,
  onNext,
  onBack,
  isOptional = true,
  existingBookings = []
}) {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [memberSelections, setMemberSelections] = useState({});
  const [realTimeCosts, setRealTimeCosts] = useState({});
  const [expandedDates, setExpandedDates] = useState({});

  const allDates = eachDayOfInterval({
    start: new Date(selectedDates.startDate),
    end: selectedDates.endDate ? new Date(selectedDates.endDate) : new Date(selectedDates.startDate)
  }).map(date => format(date, 'yyyy-MM-dd'));

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 20; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(time);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  useEffect(() => {
    const initialSelections = {};
    teamMembers.forEach(member => {
      initialSelections[member.id] = allDates.reduce((acc, date) => {
        acc[date] = {
          selected: false,
          startTime: selectedDates.startTime,
          endTime: selectedDates.endTime
        };
        return acc;
      }, {});
    });
    setMemberSelections(initialSelections);
  }, [teamMembers, selectedDates]);

  const toggleDateExpansion = (memberId, date) => {
    setExpandedDates(prev => ({
      ...prev,
      [`${memberId}-${date}`]: !prev[`${memberId}-${date}`]
    }));
  };

  const isTimeBooked = (memberId, date, time) => {
    return existingBookings.some(booking => {
      if (!booking.teamMemberIds.includes(memberId)) return false;
      if (format(parseISO(booking.date), 'yyyy-MM-dd') !== date) return false;

      const toMinutes = (timeStr) => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
      };

      const timeMins = toMinutes(time);
      const bookingStart = toMinutes(booking.startTime);
      const bookingEnd = toMinutes(booking.endTime);

      return timeMins >= bookingStart && timeMins < bookingEnd;
    });
  };

  const getBookedSlotsForDate = (memberId, date) => {
    return existingBookings
      .filter(booking => {
        return booking.teamMemberIds.includes(memberId) && 
               format(parseISO(booking.date), 'yyyy-MM-dd') === date;
      })
      .map(booking => ({
        start: booking.startTime,
        end: booking.endTime
      }));
  };

  const calculateAvailableDuration = (memberId, date, startTime, endTime) => {
    const bookedSlots = getBookedSlotsForDate(memberId, date);
    if (bookedSlots.length === 0) {
      return calculateDuration(startTime, endTime);
    }

    const toMinutes = (timeStr) => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const startMins = toMinutes(startTime);
    const endMins = toMinutes(endTime);
    let availableMinutes = 0;

    const sortedBookings = bookedSlots
      .map(b => ({ start: toMinutes(b.start), end: toMinutes(b.end) }))
      .sort((a, b) => a.start - b.start);

    let currentTime = startMins;
    for (const booking of sortedBookings) {
      if (booking.start > currentTime) {
        availableMinutes += Math.min(booking.start, endMins) - currentTime;
      }
      currentTime = Math.max(currentTime, booking.end);
      if (currentTime >= endMins) break;
    }

    if (currentTime < endMins) {
      availableMinutes += endMins - currentTime;
    }

    const availableHours = Math.ceil(availableMinutes / 30) * 0.5;
    return availableHours;
  };

  const calculateDuration = (start, end) => {
    const [startH, startM] = start.split(':').map(Number);
    const [endH, endM] = end.split(':').map(Number);

    let totalHours = endH - startH;
    let totalMinutes = endM - startM;

    if (totalMinutes < 0) {
      totalHours -= 1;
      totalMinutes += 60;
    }

    return totalHours + (totalMinutes / 60);
  };

  const add30Minutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    let newHours = hours;
    let newMinutes = minutes + 30;
    
    if (newMinutes >= 60) {
      newHours += 1;
      newMinutes -= 60;
    }
    
    return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
  };

  const handleTimeSlotClick = (memberId, date, time) => {
    if (isTimeBooked(memberId, date, time)) return;

    setMemberSelections(prev => {
      const currentSelection = prev[memberId]?.[date] || {
        selected: false,
        startTime: selectedDates.startTime,
        endTime: selectedDates.endTime
      };

      if (!currentSelection.selected) {
        return {
          ...prev,
          [memberId]: {
            ...prev[memberId],
            [date]: {
              selected: true,
              startTime: time,
              endTime: add30Minutes(time)
            }
          }
        };
      }

      const toMinutes = (timeStr) => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
      };

      const currentStart = toMinutes(currentSelection.startTime);
      const currentEnd = toMinutes(currentSelection.endTime);
      const clickedTime = toMinutes(time);

      if (clickedTime < currentStart) {
        return {
          ...prev,
          [memberId]: {
            ...prev[memberId],
            [date]: {
              ...currentSelection,
              startTime: time
            }
          }
        };
      }
      else if (clickedTime >= currentEnd) {
        return {
          ...prev,
          [memberId]: {
            ...prev[memberId],
            [date]: {
              ...currentSelection,
              endTime: add30Minutes(time)
            }
          }
        };
      }
      else {
        return {
          ...prev,
          [memberId]: {
            ...prev[memberId],
            [date]: {
              ...currentSelection,
              endTime: time
            }
          }
        };
      }
    });
  };

  const isTimeSelected = (memberId, date, time) => {
    const selection = memberSelections[memberId]?.[date];
    if (!selection?.selected) return false;

    const toMinutes = (timeStr) => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const timeMins = toMinutes(time);
    const startMins = toMinutes(selection.startTime);
    const endMins = toMinutes(selection.endTime);

    return timeMins >= startMins && timeMins < endMins;
  };

  useEffect(() => {
    const newCosts = {};
    teamMembers.forEach(member => {
      const memberDates = memberSelections[member.id] || {};
      let totalCost = 0;

      Object.entries(memberDates).forEach(([date, slot]) => {
        if (slot.selected) {
          const availableHours = calculateAvailableDuration(
            member.id,
            date,
            slot.startTime,
            slot.endTime
          );
          totalCost += member.rate * availableHours;
        }
      });

      newCosts[member.id] = totalCost;
    });
    setRealTimeCosts(newCosts);
  }, [memberSelections, teamMembers, existingBookings]);

  const toggleMember = (member) => {
    setSelectedMembers(prev => {
      if (prev.some(m => m.id === member.id)) {
        return prev.filter(m => m.id !== member.id);
      } else {
        const selectedDates = Object.entries(memberSelections[member.id] || {})
          .filter(([_, { selected }]) => selected)
          .map(([date, times]) => ({
            date,
            startTime: times.startTime,
            endTime: times.endTime,
            availableHours: calculateAvailableDuration(
              member.id,
              date,
              times.startTime,
              times.endTime
            )
          }));

        return [...prev, {
          ...member,
          selectedDates,
          totalCost: realTimeCosts[member.id] || 0
        }];
      }
    });
  };

  const calculateTotalCost = () => {
    return selectedMembers.reduce((total, member) => {
      return total + (realTimeCosts[member.id] || 0);
    }, 0);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">
        Select Team Members {isOptional && "(Optional)"}
      </h2>

      <div className="grid grid-cols-1 gap-4">
        {teamMembers.map(member => {
          const isSelected = selectedMembers.some(m => m.id === member.id);
          const memberCost = realTimeCosts[member.id] || 0;

          return (
            <Card
              key={member.id}
              className={`p-4 transition-all ${
                isSelected ? 'border-primary border-2 bg-primary/10' : 'hover:border-primary/50 cursor-pointer'
              }`}
            >
              <div className="flex items-start gap-4">
                <Checkbox
                  checked={isSelected}
                  className="h-5 w-5 mt-1"
                  onClick={() => toggleMember(member)}
                />
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={`/team/${member.id}.jpg`} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{member.name}</h3>
                          <p className="text-muted-foreground text-sm">{member.role}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">R{member.rate}/hour</p>
                          {memberCost > 0 && (
                            <p className="text-sm font-medium text-green-600">
                              R{memberCost.toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="space-y-3">
                      <Label>Select Dates & Times</Label>
                      <div className="space-y-2">
                        {allDates.map(date => {
                          const selection = memberSelections[member.id]?.[date] || {
                            selected: false,
                            startTime: selectedDates.startTime,
                            endTime: selectedDates.endTime
                          };
                          const isExpanded = expandedDates[`${member.id}-${date}`];
                          const bookedSlots = getBookedSlotsForDate(member.id, date);

                          return (
                            <div key={date} className="border rounded-md overflow-hidden">
                              <div 
                                className="flex items-center p-2 hover:bg-gray-50 cursor-pointer"
                                onClick={() => toggleDateExpansion(member.id, date)}
                              >
                                <Checkbox
                                  id={`${member.id}-${date}`}
                                  checked={selection.selected}
                                  onCheckedChange={(checked) => {
                                    setMemberSelections(prev => ({
                                      ...prev,
                                      [member.id]: {
                                        ...prev[member.id],
                                        [date]: {
                                          ...prev[member.id][date],
                                          selected: checked
                                        }
                                      }
                                    }));
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <Label htmlFor={`${member.id}-${date}`} className="flex-1 ml-2 cursor-pointer">
                                  {format(new Date(date), 'EEE, MMM d')}
                                  {selection.selected && (
                                    <span className="ml-2 text-sm text-muted-foreground">
                                      {selection.startTime} - {selection.endTime}
                                      {bookedSlots.length > 0 && (
                                        <span className="ml-2 text-xs text-yellow-600">
                                          (Available: {calculateAvailableDuration(
                                            member.id,
                                            date,
                                            selection.startTime,
                                            selection.endTime
                                          ).toFixed(1)}h)
                                        </span>
                                      )}
                                    </span>
                                  )}
                                </Label>
                                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                              </div>
                              
                              {isExpanded && (
                                <div className="p-2 bg-gray-50">
                                  <div className="flex flex-wrap gap-1">
                                    {timeSlots.map((time, index) => {
                                      const isBooked = isTimeBooked(member.id, date, time);
                                      const isSelected = isTimeSelected(member.id, date, time);
                                      const isStart = selection.startTime === time;
                                      const isEnd = selection.endTime === add30Minutes(time);

                                      return (
                                        <button
                                          key={index}
                                          onClick={() => handleTimeSlotClick(member.id, date, time)}
                                          disabled={isBooked}
                                          className={`h-8 px-2 text-xs rounded flex items-center justify-center ${
                                            isBooked 
                                              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                              : isSelected 
                                                ? isStart 
                                                  ? 'bg-blue-500 text-white rounded-r-none'
                                                  : isEnd 
                                                    ? 'bg-blue-500 text-white rounded-l-none'
                                                    : 'bg-blue-300 text-white'
                                                : 'bg-white hover:bg-gray-100 border border-gray-200'
                                          }`}
                                        >
                                          {time}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-between items-center pt-4 border-t">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <div className="flex items-center gap-4">
          <p className="text-sm font-medium">Total: R{calculateTotalCost().toFixed(2)}</p>
          <Button onClick={() => onSelect(selectedMembers)} disabled={selectedMembers.length === 0}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}