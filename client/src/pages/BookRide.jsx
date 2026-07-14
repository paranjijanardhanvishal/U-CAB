import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import SectionHeader from '../components/ui/SectionHeader';
import { FaMapMarkerAlt, FaLocationArrow, FaCar } from 'react-icons/fa';

const BookRide = () => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBook = (e) => {
    e.preventDefault();
    setLoading(true);
    // TEMP_DEV_BYPASS: Simulate booking delay then redirect
    setTimeout(() => {
      setLoading(false);
      navigate('/ride-details/mock-id');
    }, 1500);
  };

  return (
    <div className="container py-4">
      <SectionHeader title="Book a Ride" />
      
      <div className="row g-4">
        <div className="col-lg-5">
          <Card className="border-0 shadow-sm h-100">
            <h4 className="fw-bold mb-4">Where to?</h4>
            <form onSubmit={handleBook}>
              <div className="position-relative">
                {/* Timeline line visual */}
                <div className="position-absolute bg-secondary opacity-25" style={{ width: '2px', height: '40px', left: '19px', top: '24px' }}></div>
                
                <Input 
                  placeholder="Pickup location" 
                  icon={FaLocationArrow} 
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  required
                />
                
                <Input 
                  placeholder="Dropoff destination" 
                  icon={FaMapMarkerAlt} 
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  required
                />
              </div>

              {pickup && dropoff && (
                <div className="card bg-light border-0 mt-4 mb-4">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-3">
                      <FaCar size={24} className="text-primary" />
                      <div>
                        <h6 className="fw-bold mb-0">Standard Ride</h6>
                        <small className="text-muted">4 seats • 5 min away</small>
                      </div>
                    </div>
                    <div className="text-end">
                      <h5 className="fw-bold mb-0">$12.50</h5>
                    </div>
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                variant="primary" 
                size="lg" 
                className="w-100 mt-2"
                isLoading={loading}
                disabled={!pickup || !dropoff}
              >
                Confirm Booking
              </Button>
            </form>
          </Card>
        </div>
        
        <div className="col-lg-7 d-none d-lg-block">
          {/* Map Placeholder */}
          <div className="bg-light rounded-4 w-100 h-100 d-flex align-items-center justify-content-center position-relative overflow-hidden border">
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-secondary bg-opacity-10" style={{
              backgroundImage: 'radial-gradient(#cbcbcb 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}></div>
            <div className="text-center position-relative z-1">
              <FaMapMarkerAlt size={48} className="text-muted opacity-50 mb-3" />
              <h5 className="text-muted fw-bold">Map View</h5>
              <p className="text-muted small">Location tracking will appear here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookRide;
