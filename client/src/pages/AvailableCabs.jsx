import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { FaCar, FaSearch } from 'react-icons/fa';
import api from '../services/api';
import { toast } from 'react-toastify';

const AvailableCabs = () => {
  const navigate = useNavigate();
  const [cabs, setCabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTermName, setSearchTermName] = useState('');
  const [searchTermType, setSearchTermType] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // Price sort

  useEffect(() => {
    fetchCabs();
  }, []);

  const fetchCabs = async () => {
    try {
      setLoading(true);
      const res = await api.get('/rides/cabs'); 
      setCabs(res.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch cabs');
    } finally {
      setLoading(false);
    }
  };

  const filteredCabs = cabs.filter(c => {
    const matchName = c.carName?.toLowerCase().includes(searchTermName.toLowerCase());
    const matchType = c.carType?.toLowerCase().includes(searchTermType.toLowerCase());
    return matchName && matchType;
  }).sort((a, b) => {
    if (sortOrder === 'asc') return a.pricePerKm - b.pricePerKm;
    return b.pricePerKm - a.pricePerKm;
  });

  const handleBookCab = (cab) => {
    navigate('/book-ride', { state: { selectedCab: cab } });
  };

  return (
    <div>
      <SectionHeader 
        title="Available Cabs" 
        description="Browse and select a cab for your next journey."
      />

      {/* Controls */}
      <div className="d-flex justify-content-between align-items-center mb-4 gap-3 flex-wrap">
        <div className="d-flex gap-3 flex-grow-1">
          <div className="position-relative" style={{ maxWidth: '300px', width: '100%' }}>
            <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
            <input 
              type="text" 
              className="form-control ps-5" 
              placeholder="Search by car name" 
              value={searchTermName}
              onChange={(e) => setSearchTermName(e.target.value)}
            />
          </div>
          <div className="position-relative" style={{ maxWidth: '300px', width: '100%' }}>
            <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
            <input 
              type="text" 
              className="form-control ps-5" 
              placeholder="Search by car type" 
              value={searchTermType}
              onChange={(e) => setSearchTermType(e.target.value)}
            />
          </div>
        </div>
        <Button 
          variant="primary" 
          className="fw-bold" 
          onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
        >
          Sort Price: {sortOrder === 'asc' ? 'Low to High ↑' : 'High to Low ↓'}
        </Button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>
      ) : filteredCabs.length === 0 ? (
        <div className="text-center py-5 text-muted">No cabs found matching your search.</div>
      ) : (
        <div className="row g-4">
          {filteredCabs.map(cab => (
            <div key={cab._id} className="col-md-6 col-lg-4 col-xl-3">
              <Card className="h-100 border-0 shadow-sm p-0 overflow-hidden d-flex flex-column">
                <div style={{ height: '180px', backgroundColor: '#f8f9fa' }} className="d-flex align-items-center justify-content-center">
                  {cab.carImage ? (
                    <img src={cab.carImage} alt={cab.carName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <FaCar size={60} className="text-muted opacity-25" />
                  )}
                </div>
                <div className="p-3 bg-white flex-grow-1 d-flex flex-column">
                  <div className="mb-2 d-flex justify-content-between align-items-start">
                    <h5 className="fw-bold mb-0 text-truncate" style={{ maxWidth: '70%' }}>{cab.carName}</h5>
                    <Badge variant="primary">{cab.carType}</Badge>
                  </div>
                  <div className="small text-muted mb-3 flex-grow-1">
                    <div><strong>Model:</strong> {cab.carName}</div>
                    <div><strong>Type:</strong> {cab.carType}</div>
                    <div><strong>Car No:</strong> {cab.carNo}</div>
                    <div><strong>Driver:</strong> {cab.driverName || 'Not Assigned'}</div>
                    <div><strong>Fare:</strong> ₹{cab.pricePerKm}/Km</div>
                  </div>
                  <Button variant="primary" className="w-100 py-2 fw-bold mt-auto" onClick={() => handleBookCab(cab)}>
                    Book Cab
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableCabs;
