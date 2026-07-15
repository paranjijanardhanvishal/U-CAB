import React, { useState, useEffect } from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { FaStar } from 'react-icons/fa';
import api from '../services/api';
import { toast } from 'react-toastify';

const AdminDrivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const res = await api.get('/admin/drivers');
        setDrivers(res.data.data);
      } catch (error) {
        toast.error('Failed to load drivers');
      } finally {
        setLoading(false);
      }
    };
    fetchDrivers();
  }, []);

  const getStatusBadge = (isAvailable) => {
    if (isAvailable) {
      return <Badge variant="success">Online</Badge>;
    } else {
      return <Badge variant="secondary">Offline</Badge>;
    }
  };

  return (
    <div>
      <SectionHeader title="Manage Drivers" description="Monitor driver performance and statuses." action={<Button variant="primary">Add Driver</Button>} />
      
      <Card className="border-0 shadow-sm p-0 overflow-hidden">
        <div className="p-3 border-bottom d-flex justify-content-between align-items-center bg-light">
          <input type="text" className="form-control w-auto" placeholder="Search drivers..." />
        </div>
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary"></div>
          </div>
        ) : (
          <Table 
            columns={['ID', 'Driver', 'Vehicle', 'Rating', 'Status', 'Actions']}
            data={drivers.map(d => [
              <span key={d._id + 'id'} className="text-muted">{d._id.substring(d._id.length - 6)}</span>,
              <div key={d._id + 'name'} className="fw-medium">{d.user?.fullName || 'Unknown'}</div>,
              <div key={d._id + 'veh'} className="small text-muted">{d.vehicle?.model || 'N/A'} ({d.vehicle?.type || 'N/A'})</div>,
              <div key={d._id + 'rat'}><FaStar className="text-warning me-1 mb-1"/>{d.rating || 'N/A'}</div>,
              <span key={d._id + 'stat'}>{getStatusBadge(d.isAvailable)}</span>,
              <Button key={d._id + 'act'} variant="outline-primary" size="sm">Manage</Button>
            ])}
          />
        )}
      </Card>
    </div>
  );
};

export default AdminDrivers;
