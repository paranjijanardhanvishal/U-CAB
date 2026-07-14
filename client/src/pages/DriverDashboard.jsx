import React, { useState } from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import StatCard from '../components/ui/StatCard';
import Card from '../components/ui/Card';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { FaCarAlt, FaWallet, FaStar, FaMapMarkedAlt } from 'react-icons/fa';

const DriverDashboard = () => {
  const [isOnline, setIsOnline] = useState(false);

  return (
    <div>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <h3 className="fw-bold mb-1">Driver Dashboard</h3>
          <div className="d-flex align-items-center gap-2">
            <Badge variant={isOnline ? 'success' : 'secondary'} rounded={false}>
              {isOnline ? 'ONLINE' : 'OFFLINE'}
            </Badge>
            <span className="text-muted small">
              {isOnline ? 'You are receiving ride requests.' : 'Go online to start receiving rides.'}
            </span>
          </div>
        </div>
        <div>
          <Button 
            variant={isOnline ? 'danger' : 'success'} 
            size="lg"
            onClick={() => setIsOnline(!isOnline)}
          >
            {isOnline ? 'Go Offline' : 'Go Online'}
          </Button>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-sm-4">
          <StatCard title="Today's Earnings" value="$0.00" icon={FaWallet} color="success" />
        </div>
        <div className="col-12 col-sm-4">
          <StatCard title="Completed Rides" value="0" icon={FaCarAlt} color="primary" />
        </div>
        <div className="col-12 col-sm-4">
          <StatCard title="Driver Rating" value="0.0" icon={FaStar} color="warning" />
        </div>
      </div>

      <Card title="Available Ride Requests" className="h-100">
        {isOnline ? (
          <EmptyState 
            icon={FaMapMarkedAlt} 
            title="Searching for rides..." 
            description="Keep the app open to receive new ride requests nearby."
            className="py-5 bg-light rounded-3"
          />
        ) : (
          <EmptyState 
            icon={FaCarAlt} 
            title="You are offline" 
            description="Go online to start accepting ride requests in your area."
            className="py-5"
          />
        )}
      </Card>
    </div>
  );
};

export default DriverDashboard;
