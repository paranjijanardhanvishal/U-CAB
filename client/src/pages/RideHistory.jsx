import React, { useState, useEffect } from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Table from '../components/ui/Table';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { FaDownload } from 'react-icons/fa';
import api from '../services/api';
import { toast } from 'react-toastify';

const RideHistory = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const res = await api.get('/rides/myrides');
        setRides(res.data.data);
      } catch (error) {
        if (error.response?.status !== 404) {
          toast.error('Failed to load ride history');
        }
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRides();
  }, []);

  const renderStatus = (status) => {
    switch (status) {
      case 'completed': return <Badge variant="success">Completed</Badge>;
      case 'cancelled': return <Badge variant="danger">Cancelled</Badge>;
      case 'requested': return <Badge variant="primary">Searching Driver</Badge>;
      case 'accepted': return <Badge variant="info">Driver Assigned</Badge>;
      case 'started':
      case 'in_progress':
        return <Badge variant="warning">In Progress</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatTime = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div>
      <SectionHeader 
        title="Ride History" 
        description="View your past trips, receipts, and driver ratings."
      />
      
      <Card className="border-0 shadow-sm p-0 overflow-hidden">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary"></div>
          </div>
        ) : rides.length === 0 ? (
          <div className="text-center py-5 text-muted">
            You haven't taken any rides yet.
          </div>
        ) : (
          <Table 
            columns={['Date', 'Trip', 'Pickup', 'Drop', 'Driver', 'Car', 'Amount Paid', 'Status', 'Action']}
            data={rides.map(r => [
              <div key={r._id + 'date'} className="fw-medium text-dark">{formatDate(r.createdAt)}</div>,
              <div key={r._id + 'trip'} className="small text-muted text-truncate" style={{maxWidth: '150px'}}>
                {r.pickupLocation?.address?.split(',')[0]} &rarr; {r.dropoffLocation?.address?.split(',')[0]}
              </div>,
              <div key={r._id + 'pickup'} className="small text-dark">
                {r.pickupTime ? `${r.pickupTime}, ${r.pickupDate || formatDate(r.createdAt)}` : formatTime(r.createdAt)}
              </div>,
              <div key={r._id + 'drop'} className="small text-dark">
                {r.dropTime ? `${r.dropTime}, ${r.dropDate || ''}` : r.endTime ? formatTime(r.endTime) : '-'}
              </div>,
              <div key={r._id + 'driver'} className="small">{r.driver?.user?.fullName || 'Sneha Kapoor'}</div>,
              <div key={r._id + 'car'} className="small text-muted text-truncate" style={{maxWidth: '120px'}}>
                {r.rideType?.toUpperCase()}
              </div>,
              <span key={r._id + 'fare'} className="fw-bold">₹{r.fare}</span>,
              <span key={r._id + 'status'}>{renderStatus(r.status)}</span>,
              <Button key={r._id + 'action'} variant="outline-primary" size="sm" disabled={r.status !== 'completed'}>
                <FaDownload className="me-1" /> Receipt
              </Button>
            ])}
          />
        )}
      </Card>
    </div>
  );
};

export default RideHistory;
