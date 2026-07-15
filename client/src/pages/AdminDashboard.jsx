import React, { useState, useEffect } from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import StatCard from '../components/ui/StatCard';
import { FaUsers, FaCar, FaMoneyBillWave, FaChartLine, FaCheckCircle, FaBan, FaRegClock, FaCircle } from 'react-icons/fa';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import api from '../services/api';
import Avatar from '../components/ui/Avatar';

// -------------------------------------------------------------
// MOCK DATA GENERATORS
// -------------------------------------------------------------
const generateMockStats = () => ({
  usersCount: 1245,
  activeDrivers: 86,
  activeRides: 34,
  completedToday: 215,
  revenueToday: 45200,
  totalRevenue: 1285000,
  onlineDrivers: 42,
  cancelledRides: 12
});

const barChartData = [
  { name: 'Mon', revenue: 34000, rides: 240 },
  { name: 'Tue', revenue: 42000, rides: 290 },
  { name: 'Wed', revenue: 38000, rides: 260 },
  { name: 'Thu', revenue: 45000, rides: 310 },
  { name: 'Fri', revenue: 58000, rides: 420 },
  { name: 'Sat', revenue: 72000, rides: 510 },
  { name: 'Sun', revenue: 65000, rides: 480 },
];

const pieRideTypes = [
  { name: 'Mini', value: 45 },
  { name: 'Sedan', value: 30 },
  { name: 'SUV', value: 15 },
  { name: 'Premium', value: 10 },
];
const COLORS = ['#0d6efd', '#198754', '#ffc107', '#dc3545', '#6f42c1'];

const pieRideStatus = [
  { name: 'Completed', value: 85 },
  { name: 'Cancelled', value: 10 },
  { name: 'In Progress', value: 5 },
];
const STATUS_COLORS = ['#198754', '#dc3545', '#0d6efd'];

const MOCK_EVENTS = [
  { id: 1, type: 'user', message: 'User Vishal registered', time: 'Just now' },
  { id: 2, type: 'driver', message: 'Driver Ravi came online', time: '2 mins ago' },
  { id: 3, type: 'ride', message: 'Ride #1023 booked', time: '5 mins ago' },
  { id: 4, type: 'payment', message: 'Payment of ₹245 successful', time: '8 mins ago' },
  { id: 5, type: 'ride', message: 'Ride #1022 completed', time: '12 mins ago' },
  { id: 6, type: 'driver', message: 'Driver Amit went offline', time: '15 mins ago' },
  { id: 7, type: 'user', message: 'User Sneha updated profile', time: '22 mins ago' },
];

// -------------------------------------------------------------
// COMPONENT
// -------------------------------------------------------------
const AdminDashboard = () => {
  const [realStats, setRealStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liveEvents, setLiveEvents] = useState(MOCK_EVENTS);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/stats');
        // Check if DB is essentially empty (0 revenue and 0 rides means new)
        if (res.data.data && (res.data.data.ridesCount > 0 || res.data.data.usersCount > 1)) {
          setRealStats(res.data.data);
        }
      } catch (error) {
        console.error('Error fetching admin stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Simulate live events when in demo mode
  useEffect(() => {
    if (!realStats) {
      const interval = setInterval(() => {
        const newEventTypes = ['user', 'driver', 'ride', 'payment'];
        const type = newEventTypes[Math.floor(Math.random() * newEventTypes.length)];
        const names = ['Rahul', 'Priya', 'Karan', 'Neha', 'Vikram'];
        const randomName = names[Math.floor(Math.random() * names.length)];
        let message = '';
        
        if (type === 'user') message = `User ${randomName} logged in`;
        else if (type === 'driver') message = `Driver ${randomName} accepted a ride`;
        else if (type === 'ride') message = `Ride #${Math.floor(1000 + Math.random() * 9000)} started`;
        else if (type === 'payment') message = `Payment of ₹${Math.floor(100 + Math.random() * 500)} received`;

        const newEvent = {
          id: Date.now(),
          type,
          message,
          time: 'Just now'
        };

        setLiveEvents(prev => [newEvent, ...prev].slice(0, 15)); // Keep last 15
      }, 8000);
      
      return () => clearInterval(interval);
    }
  }, [realStats]);

  const activeStats = realStats || generateMockStats();
  const isDemo = !realStats;

  const renderEventIcon = (type) => {
    switch (type) {
      case 'user': return <FaUsers className="text-primary" />;
      case 'driver': return <FaCar className="text-success" />;
      case 'ride': return <FaChartLine className="text-info" />;
      case 'payment': return <FaMoneyBillWave className="text-warning" />;
      default: return <FaCircle className="text-secondary" />;
    }
  };

  return (
    <div>
      <SectionHeader title="Admin Overview" description="Enterprise platform analytics and live monitoring." />
      
      {isDemo && !loading && (
        <div className="alert alert-warning border-warning d-flex align-items-center mb-4 shadow-sm py-2">
          <FaRegClock className="me-2 text-warning fs-5" />
          <span className="fw-medium text-dark">Showing advanced demo analytics until real production data is generated.</span>
        </div>
      )}

      {/* 8 Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard title="Total Users" value={activeStats.usersCount.toLocaleString()} icon={FaUsers} color="primary" />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard title="Active Drivers" value={activeStats.activeDrivers?.toLocaleString() || activeStats.driversCount?.toLocaleString() || 0} icon={FaCar} color="success" />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard title="Active Rides" value={activeStats.activeRides?.toLocaleString() || 0} icon={FaChartLine} color="info" />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard title="Total Revenue" value={`₹${activeStats.totalRevenue.toLocaleString()}`} icon={FaMoneyBillWave} color="warning" />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard title="Completed Today" value={activeStats.completedToday?.toLocaleString() || 0} icon={FaCheckCircle} color="success" />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard title="Revenue Today" value={`₹${activeStats.revenueToday?.toLocaleString() || 0}`} icon={FaMoneyBillWave} color="primary" />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard title="Online Drivers" value={activeStats.onlineDrivers?.toLocaleString() || 0} icon={FaCar} color="info" />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard title="Cancelled Rides" value={activeStats.cancelledRides?.toLocaleString() || 0} icon={FaBan} color="danger" />
        </div>
      </div>

      <div className="row g-4 mb-4">
        {/* Main Chart */}
        <div className="col-xl-8">
          <Card title="Revenue & Bookings Trend (7 Days)" className="border-0 shadow-sm h-100">
            <div style={{ width: '100%', height: 350 }}>
              <ResponsiveContainer>
                <LineChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6c757d'}} />
                  <YAxis yAxisId="left" orientation="left" stroke="#198754" axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
                  <YAxis yAxisId="right" orientation="right" stroke="#0d6efd" axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#198754" strokeWidth={3} name="Revenue (₹)" dot={{r: 4}} activeDot={{r: 8}} />
                  <Line yAxisId="right" type="monotone" dataKey="rides" stroke="#0d6efd" strokeWidth={3} name="Total Rides" dot={{r: 4}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Live Activity Panel */}
        <div className="col-xl-4">
          <Card title={
            <div className="d-flex justify-content-between align-items-center">
              <span>Live Activity</span>
              <div className="d-flex align-items-center gap-2">
                <span className="spinner-grow spinner-grow-sm text-success" role="status"></span>
                <span className="small text-success fw-bold">Live</span>
              </div>
            </div>
          } className="border-0 shadow-sm h-100">
            <div className="overflow-auto custom-scrollbar pe-2" style={{ height: '350px' }}>
              <div className="list-group list-group-flush">
                {liveEvents.map((event, index) => (
                  <div key={event.id} className="list-group-item px-0 py-3 border-light d-flex gap-3 align-items-start" style={{ animation: index === 0 && isDemo ? 'fadeIn 0.5s ease' : 'none' }}>
                    <div className="bg-light rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                      {renderEventIcon(event.type)}
                    </div>
                    <div>
                      <p className="mb-1 fw-medium text-dark lh-sm">{event.message}</p>
                      <small className="text-muted">{event.time}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="row g-4">
        {/* Pie Chart 1 */}
        <div className="col-md-6">
          <Card title="Ride Type Distribution" className="border-0 shadow-sm h-100">
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieRideTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieRideTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Pie Chart 2 */}
        <div className="col-md-6">
          <Card title="Ride Status Breakdown" className="border-0 shadow-sm h-100">
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieRideStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={100}
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieRideStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #dee2e6; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
