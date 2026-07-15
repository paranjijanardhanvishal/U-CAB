import React, { useState, useEffect } from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import StatCard from '../components/ui/StatCard';
import { FaMoneyBillWave, FaChartLine, FaChartBar } from 'react-icons/fa';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../services/api';

const data = [
  { name: 'Mon', earnings: 45 },
  { name: 'Tue', earnings: 85 },
  { name: 'Wed', earnings: 60 },
  { name: 'Thu', earnings: 110 },
  { name: 'Fri', earnings: 150 },
  { name: 'Sat', earnings: 210 },
  { name: 'Sun', earnings: 180 },
];

const DriverEarnings = () => {
  const [earningsData, setEarningsData] = useState({ totalEarnings: 0, todayEarnings: 0, ridesCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const res = await api.get('/drivers/earnings');
        if (res.data.data) {
          setEarningsData(res.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch earnings', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEarnings();
  }, []);

  if (loading) {
    return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;
  }

  return (
    <div>
      <SectionHeader title="Earnings" description="Track your daily and weekly earnings." />
      
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <StatCard title="Today's Earnings" value={`₹${earningsData.todayEarnings.toFixed(2)}`} icon={FaMoneyBillWave} color="success" />
        </div>
        <div className="col-md-4">
          <StatCard title="Total Earnings" value={`₹${earningsData.totalEarnings.toFixed(2)}`} icon={FaChartLine} color="primary" />
        </div>
        <div className="col-md-4">
          <StatCard title="Total Trips" value={earningsData.ridesCount} icon={FaChartBar} color="warning" />
        </div>
      </div>

      <Card title="Weekly Overview" className="border-0 shadow-sm">
        <div style={{ width: '100%', height: 350 }}>
          <ResponsiveContainer>
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#198754" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#198754" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6c757d'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#6c757d'}} tickFormatter={(value) => `₹${value}`} />
              <Tooltip 
                contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                formatter={(value) => [`₹${value}`, 'Earnings']}
              />
              <Area type="monotone" dataKey="earnings" stroke="#198754" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default DriverEarnings;
