import React, { useState, useEffect, useRef, useCallback } from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import api from '../services/api';
import { toast } from 'react-toastify';
import { FaEye, FaEdit, FaTrash, FaSearch, FaInfoCircle } from 'react-icons/fa';

// Generate Mock Rides
const generateMockRides = () => {
  const mockRides = [];
  const statuses = ['requested', 'accepted', 'arriving', 'started', 'completed', 'cancelled'];
  const locations = ['Airport', 'Railway Station', 'Downtown Mall', 'Tech Park', 'Hospital', 'University Campus', 'City Center', 'Bus Stand'];
  const rideTypes = ['Mini', 'Sedan', 'SUV', 'Bike', 'Premium'];
  
  for (let i = 1; i <= 50; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const isCompletedOrCancelled = status === 'completed' || status === 'cancelled';
    
    // Dates
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 30));
    const endDate = new Date(startDate);
    if (isCompletedOrCancelled) {
      endDate.setMinutes(endDate.getMinutes() + Math.floor(Math.random() * 60) + 15);
    } else {
      endDate.setMinutes(endDate.getMinutes() + Math.floor(Math.random() * 5)); // Just updated recently
    }

    mockRides.push({
      _id: `ride_mock_${8000 + i}`,
      user: { fullName: `Passenger ${i}` },
      driver: status !== 'requested' ? { user: { fullName: `Driver ${Math.floor(Math.random() * 10) + 1}` } } : null,
      pickupLocation: { address: locations[Math.floor(Math.random() * locations.length)] },
      dropoffLocation: { address: locations[Math.floor(Math.random() * locations.length)] },
      rideType: rideTypes[Math.floor(Math.random() * rideTypes.length)],
      fare: (Math.random() * 1000 + 100).toFixed(2),
      distance: (Math.random() * 20 + 2).toFixed(1),
      status: status,
      createdAt: startDate.toISOString(),
      updatedAt: endDate.toISOString(),
    });
  }
  
  return mockRides.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
};

const AdminRides = () => {
  const [realRides, setRealRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [displayedCount, setDisplayedCount] = useState(15);
  const observer = useRef();

  const [mockRides] = useState(generateMockRides());
  // Determine if we should use demo mode (e.g. 0 real rides)
  const isDemoMode = realRides.length === 0;
  const activeRides = isDemoMode ? mockRides : realRides;

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const res = await api.get('/admin/rides');
        setRealRides(res.data.data || []);
      } catch (error) {
        toast.error('Failed to load rides');
      } finally {
        setLoading(false);
      }
    };
    fetchRides();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed': return <Badge variant="success">Completed</Badge>;
      case 'requested': return <Badge variant="warning text-dark">Requested</Badge>;
      case 'accepted': return <Badge variant="info text-dark">Driver Assigned</Badge>;
      case 'arriving': return <Badge variant="secondary">Arriving</Badge>;
      case 'started':
      case 'in_progress':
        return <Badge variant="primary">Started</Badge>;
      case 'cancelled': return <Badge variant="danger">Cancelled</Badge>;
      default: return <Badge variant="light text-dark text-capitalize">{status}</Badge>;
    }
  };

  const filteredRides = activeRides.filter(r => {
    // Status Filter
    let statusMatch = true;
    if (filter !== 'All') {
      if (filter === 'Completed') statusMatch = r.status === 'completed';
      if (filter === 'In Progress') statusMatch = ['started', 'in_progress', 'accepted', 'arriving'].includes(r.status);
      if (filter === 'Requested') statusMatch = r.status === 'requested';
      if (filter === 'Cancelled') statusMatch = r.status === 'cancelled';
    }

    // Search Filter
    const searchString = searchTerm.toLowerCase();
    const searchMatch = 
      r._id.toLowerCase().includes(searchString) ||
      r.user?.fullName?.toLowerCase().includes(searchString) ||
      r.driver?.user?.fullName?.toLowerCase().includes(searchString) ||
      r.pickupLocation?.address?.toLowerCase().includes(searchString) ||
      r.dropoffLocation?.address?.toLowerCase().includes(searchString) ||
      (r.rideType || '').toLowerCase().includes(searchString);

    return statusMatch && searchMatch;
  });

  const paginatedRides = filteredRides.slice(0, displayedCount);

  const lastElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && displayedCount < filteredRides.length) {
        setDisplayedCount(prev => prev + 15);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, displayedCount, filteredRides.length]);

  return (
    <div>
      <SectionHeader title="Live Rides Monitor" description="Track all platform rides in real-time." />
      
      {isDemoMode && !loading && (
        <div className="alert alert-info border-info d-flex align-items-center mb-4 shadow-sm py-2">
          <FaInfoCircle className="me-2 text-info fs-5" />
          <span className="fw-medium text-dark">Showing realistic demo data until real rides are requested in the platform.</span>
        </div>
      )}

      <Card className="border-0 shadow-sm p-0 overflow-hidden">
        <div className="p-3 border-bottom d-flex flex-wrap justify-content-between align-items-center bg-light gap-3">
          
          <div className="d-flex gap-2 align-items-center flex-grow-1">
            <div className="position-relative" style={{ maxWidth: '300px', width: '100%' }}>
              <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
              <input 
                type="text" 
                className="form-control ps-5" 
                placeholder="Search Ride ID, Passenger..." 
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setDisplayedCount(15);
                }}
              />
            </div>
            
            <select 
              className="form-select w-auto fw-medium" 
              value={filter} 
              onChange={(e) => {
                setFilter(e.target.value);
                setDisplayedCount(15);
              }}
            >
              <option value="All">All Statuses</option>
              <option value="Requested">Requested</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="text-muted small fw-medium">
            Total Records: {filteredRides.length}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-3 text-muted">Loading rides database...</p>
          </div>
        ) : filteredRides.length === 0 ? (
          <div className="text-center py-5 text-muted">
            No rides match your criteria.
          </div>
        ) : (
          <div className="table-responsive">
            <Table headers={['Date', 'Trip', 'Pickup', 'Drop', 'Driver', 'Car Details', 'Amount', 'Status', 'Actions']}>
              {paginatedRides.map((r, index) => (
                <tr key={r._id} ref={index === paginatedRides.length - 1 ? lastElementRef : null}>
                  <td>
                    <div className="fw-medium text-dark">{new Date(r.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td style={{ minWidth: '150px' }}>
                    <div className="text-dark small text-truncate" style={{maxWidth: '180px'}}>
                      {r.pickupLocation?.address?.split(',')[0]} &rarr; {r.dropoffLocation?.address?.split(',')[0]}
                    </div>
                  </td>
                  <td>
                    <div className="small text-muted">{r.pickupTime ? `${r.pickupTime}, ${r.pickupDate || ''}` : new Date(r.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                  </td>
                  <td>
                    <div className="small text-muted">{r.dropTime ? `${r.dropTime}, ${r.dropDate || ''}` : r.endTime ? new Date(r.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '-'}</div>
                  </td>
                  <td>
                    <div className="fw-medium text-dark small">{r.driver?.user?.fullName || 'Pending'}</div>
                  </td>
                  <td>
                    <div className="small text-muted">{r.rideType || 'Standard'}</div>
                  </td>
                  <td>
                    <div className="fw-bold text-dark">₹{r.fare}</div>
                  </td>
                  <td>
                    {getStatusBadge(r.status)}
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button variant="light" size="sm" className="text-danger p-2"><FaTrash /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </Table>
            {displayedCount < filteredRides.length && (
              <div className="text-center py-3">
                <span className="spinner-border spinner-border-sm text-primary" role="status"></span>
                <span className="ms-2 text-muted small">Loading more...</span>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminRides;
