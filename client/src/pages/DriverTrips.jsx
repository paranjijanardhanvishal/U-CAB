import React, { useState, useEffect } from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Table from '../components/ui/Table';
import api from '../services/api';
import { toast } from 'react-toastify';
import Badge from '../components/ui/Badge';

const DriverTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await api.get('/rides/driver');
        setTrips(res.data.data);
      } catch (error) {
        console.error('Failed to fetch trips', error);
        if (error.response?.status !== 404) {
          toast.error('Failed to load trip history');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatTime = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const renderStatus = (status) => {
    switch (status) {
      case 'completed': return <Badge variant="success">Completed</Badge>;
      case 'cancelled': return <Badge variant="danger">Cancelled</Badge>;
      case 'requested': return <Badge variant="primary">Requested</Badge>;
      case 'accepted': return <Badge variant="info">Assigned</Badge>;
      case 'started':
      case 'in_progress':
        return <Badge variant="warning">In Progress</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div>
      <SectionHeader title="Trip History" description="View your past completed trips." />
      
      <Card className="border-0 shadow-sm p-0 overflow-hidden">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary"></div>
          </div>
        ) : trips.length === 0 ? (
          <div className="text-center py-5 text-muted">
            You haven't completed any trips yet.
          </div>
        ) : (
          <Table headers={['Date & Time', 'Locations', 'Status', 'Earnings']}>
            {trips.map(t => (
              <tr key={t._id}>
                <td>
                  <div className="fw-medium">{formatDate(t.createdAt)}</div>
                  <small className="text-muted">{formatTime(t.createdAt)}</small>
                </td>
                <td>
                  <div className="text-dark small"><strong className="text-primary">•</strong> {t.pickupLocation?.address}</div>
                  <div className="text-dark small mt-1"><strong className="text-danger">•</strong> {t.dropoffLocation?.address}</div>
                </td>
                <td>{renderStatus(t.status)}</td>
                <td className="fw-bold text-success">₹{t.fare}</td>
              </tr>
            ))}
          </Table>
        )}
      </Card>
    </div>
  );
};

export default DriverTrips;
