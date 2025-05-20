'use client';

import { useState, useEffect } from 'react';
import { format, subDays, subMonths, subYears, startOfDay, endOfDay, isAfter } from 'date-fns';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  CardFooter 
} from '@/components/ui/card';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from '@/components/ui/select';
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  Bar, 
  Line, 
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Download, 
  FileSpreadsheet, 
  Calendar, 
  ChevronDown,
  User,
  Home
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import {existingBookings as bookings,teamMembers,rooms} from '../../../data/bookingdates'
import { calculateDurationInHours, calculateTotalCost } from '@/lib/utils';

export function RevenueBookingReport() {
  const [dateRange, setDateRange] = useState({
    from: startOfDay(subMonths(new Date(), 1)),
    to: endOfDay(new Date()),
  });
  
  const [timeDuration, setTimeDuration] = useState('month');
  const [loading, setLoading] = useState(true);
  const [chartView, setChartView] = useState('revenue');
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' or 'team'
  const [total,setTotal]=useState(0)
  const [avgBookingValue,setAvgBookingValue]=useState(0) 
  const [chartData, setChartData] = useState([]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(); // Or format however you'd like
  };

  const filterBookingsByDuration = (bookings, duration) => {
    const now = new Date();

    switch (duration) {
      case 'day':
        return bookings.filter(b => formatDate(b.date) === formatDate(now));
      case 'week':
        return bookings.filter(b => isAfter(new Date(b.date), subDays(now, 7)));
      case 'month':
        return bookings.filter(b => isAfter(new Date(b.date), subDays(now, 30)));
      case 'quarter':
        return bookings.filter(b => isAfter(new Date(b.date), subDays(now, 90)));
      case 'year':
        return bookings.filter(b => isAfter(new Date(b.date), subDays(now, 365)));
      default:
        return bookings; // for custom or no filter
    }
  };
  useEffect(() => {
    setLoading(true);

    const filtered = filterBookingsByDuration(bookings, timeDuration);
    const totalVal = filtered.reduce((sum, book) => {
      return sum + calculateTotalCost(book, rooms, teamMembers);
    }, 0);
    const avg = filtered.length > 0 ? totalVal / filtered.length : 0;

    const data = filtered.map((booking) => ({
      displayDate: formatDate(booking.date),
      revenue: calculateTotalCost(booking, rooms, teamMembers),
    }));

    setChartData(data);
    setTotal(totalVal);
    setAvgBookingValue(avg);
    setLoading(false);
  }, [timeDuration, bookings]);

  // Prepare team performance data
  function calculateMemberRevenueFromBooking(booking, member) {
    const duration = calculateDurationInHours(booking.startTime, booking.endTime);
    return duration * member.rate;
  }
  const prepareTeamData = () => {
    const filtered = filterBookingsByDuration(bookings, timeDuration);
  
    return teamMembers.map(member => {
      const memberBookings = filtered.filter(b => b.teamMemberIds.includes(member.id));
      const revenue = memberBookings.reduce((sum, booking) => {
        return sum + calculateMemberRevenueFromBooking(booking, member);
      }, 0);
      return {
        ...member,
        bookings: memberBookings.length,
        revenue,
        avgRevenue: memberBookings.length > 0 ? revenue / memberBookings.length : 0
      };
    });
  };
  
  const prepareRoomData = () => {
    const filtered = filterBookingsByDuration(bookings, timeDuration);
  
    return rooms.map(room => {
      const roomBookings = filtered.filter(b => b.roomId === room.id);
      return {
        ...room,
        bookings: roomBookings.length,
        percentage: filtered.length > 0 ? (roomBookings.length / filtered.length * 100) : 0
      };
    });
  };
  

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Business Performance Report</h2>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <Select 
            value={timeDuration}
            onValueChange={(value) => setTimeDuration(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">Last 7 days</SelectItem>
              <SelectItem value="month">Last 30 days</SelectItem>
              <SelectItem value="quarter">Last quarter</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
          
          {timeDuration === 'custom' && (
            <Button variant="outline" className="pl-3 text-left font-normal">
              <Calendar className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, 'LLL dd, y')} -{' '}
                    {format(dateRange.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(dateRange.from, 'LLL dd, y')
                )
              ) : (
                <span>Pick a date range</span>
              )}
              <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          )}
          
          <Button variant="outline" 
        //   onClick={handleExportCSV}
          >
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="flex gap-4 border-b pb-2">
        <Button
          variant={activeTab === 'overview' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </Button>
        <Button
          variant={activeTab === 'team' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('team')}
        >
          <User className="mr-2 h-4 w-4" />
          Team Performance
        </Button>
        <Button
          variant={activeTab === 'rooms' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('rooms')}
        >
          <Home className="mr-2 h-4 w-4" />
          Room Utilization
        </Button>
      </div>



      {/* over view */}
      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-[120px]" />
                ) : (
                  <div className="text-2xl font-bold">
                    R{total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-[120px]" />
                ) : (
                  <div className="text-2xl font-bold">{bookings.length}</div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg. Booking Value</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-[120px]" />
                ) : (
                  <div className="text-2xl font-bold">
                    R{avgBookingValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Performance Overview</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant={chartView === 'revenue' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setChartView('revenue')}
                >
                  Revenue
                </Button>
                <Button
                  variant={chartView === 'bookings' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setChartView('bookings')}
                >
                  Bookings
                </Button>
              </div>
            </CardHeader>
            <CardContent className="h-80">
              {loading ? (
                <Skeleton className="h-full w-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  {chartView === 'revenue' ? (
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="displayDate" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`$${value}`, 'Revenue']}
                        labelFormatter={(label) => `Date: ${label}`}
                      />
                      <Legend />
                      <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
                    </BarChart>
                  ) : (
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="displayDate" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [value, 'Revenue']}
                        labelFormatter={(label) => `Date: ${label}`}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#82ca9d" 
                        name="Bookings" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </>
      )}


      {/* team proformance */}
      {activeTab === 'team' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Team Member</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Bookings</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="text-right">Avg/Booking</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prepareTeamData().map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell className="text-right">{member.bookings}</TableCell>
                      <TableCell className="text-right">
                        R{member.revenue.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        R{member.avgRevenue.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue by Team Member</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={prepareTeamData()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="revenue"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {prepareTeamData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Revenue']}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}



      {/* roomperfomance */}
      {activeTab === 'rooms' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Room Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Room</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Bookings</TableHead>
                    <TableHead className="text-right">Utilization</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prepareRoomData().map((room) => (
                    <TableRow key={room.id}>
                      <TableCell className="font-medium">{room.name}</TableCell>
                      <TableCell>{room.type}</TableCell>
                      <TableCell className="text-right">{room.bookings}</TableCell>
                      <TableCell className="text-right">
                        {room.percentage.toFixed(1)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bookings by Room</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={prepareRoomData()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="bookings"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {prepareRoomData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Booking Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
               
                <TableHead>Staff</TableHead>
                <TableHead>Room</TableHead>

              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[60px] ml-auto" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                  </TableRow>
                ))
              ) : bookings.length > 0 ? (
                bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>{format(booking.date, 'MMM dd, yyyy')}</TableCell>
                    <TableCell>{booking.client?.name}</TableCell>
                    <TableCell>
                      {booking.teamMemberIds.length > 0
                      ? booking.teamMemberIds
                      .map(id => teamMembers.find(m => m.id === id)?.name || 'Unknown').join(', '): 'N/A'}
                    </TableCell>
                    <TableCell>{rooms.find(r => r.id === booking.roomId)?.name || 'N/A'}</TableCell>
                    
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No bookings found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <strong>{bookings.length}</strong> bookings
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}