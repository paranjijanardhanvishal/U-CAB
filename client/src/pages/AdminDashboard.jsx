import React from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import StatCard from '../components/ui/StatCard';
import Card from '../components/ui/Card';
import Table from '../components/ui/Table';
import EmptyState from '../components/ui/EmptyState';
import { FaUsers, FaCar, FaMoneyBillWave, FaChartLine, FaInbox } from 'react-icons/fa';
import Button from '../components/ui/Button';

const AdminDashboard = () => {
  return (
    <div>
      <SectionHeader 
        title="Admin Overview" 
        description="Monitor platform activity and manage users."
        action={<Button variant="primary">Generate Report</Button>}
      />

      {/* Stats Row */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard title="Total Users" value="0" icon={FaUsers} color="primary" />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard title="Active Drivers" value="0" icon={FaCar} color="success" />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard title="Completed Rides" value="0" icon={FaChartLine} color="warning" />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard title="Total Revenue" value="$0.00" icon={FaMoneyBillWave} color="danger" />
        </div>
      </div>

      <div className="row g-4">
        {/* Recent Rides Table */}
        <div className="col-lg-8">
          <Card title="Recent Rides" className="h-100">
            {/* Realistically, this would be empty initially */}
            <EmptyState 
              icon={FaCar} 
              title="No recent rides" 
              description="No rides have been requested on the platform today."
              className="py-4"
            />
          </Card>
        </div>

        {/* System Alerts */}
        <div className="col-lg-4">
          <Card title="System Alerts" className="h-100">
            <EmptyState 
              icon={FaInbox} 
              title="All clear" 
              description="There are no system alerts or pending verifications at this time."
              className="py-4"
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
