import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import SectionHeader from '../components/ui/SectionHeader';
import { FaCreditCard, FaLock, FaCheckCircle, FaCar, FaDownload } from 'react-icons/fa';
import { SocketContext } from '../context/SocketContext';
import { useContext } from 'react';

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const socket = useContext(SocketContext);
  
  // Fallback mock data
  const rideData = location.state || {
    pickup: '123 Main St, San Francisco, CA',
    dropoff: '456 Market St, San Francisco, CA',
    route: { distance: '2.5', duration: 10 },
    rideType: 'mini',
    price: '12.50'
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);
    // TEMP_DEV_BYPASS: Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      if (socket && rideData.driverId) {
        socket.emit('paymentProcessed', { driverId: rideData.driverId, amount: rideData.price });
      }
    }, 1500);
  };

  if (success) {
    return (
      <div className="container py-5 mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <Card className="border-0 shadow-lg text-center p-4">
              <div className="text-success mb-3">
                <FaCheckCircle size={80} />
              </div>
              <h2 className="fw-bold mb-2">Payment Successful!</h2>
              <p className="text-muted mb-4">Your payment of ₹{rideData.price} has been processed securely.</p>
              
              <div className="bg-light rounded-3 p-4 text-start mb-4">
                <h5 className="fw-bold border-bottom pb-2 mb-3">E-Receipt</h5>
                
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Ride ID</span>
                  <span className="fw-medium">#TRX-{Math.floor(Math.random() * 1000000)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Date</span>
                  <span className="fw-medium">{new Date().toLocaleString()}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Driver</span>
                  <span className="fw-medium">Michael (Toyota Camry)</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Distance / Time</span>
                  <span className="fw-medium">{rideData.route?.distance} km / {rideData.route?.duration} mins</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Payment Method</span>
                  <span className="fw-medium">Credit Card ending in 4242</span>
                </div>
                
                <hr />
                <div className="d-flex justify-content-between">
                  <span className="fw-bold fs-5">Total Paid</span>
                  <span className="fw-bold fs-5 text-success">₹{rideData.price}</span>
                </div>
              </div>

              <div className="d-flex gap-3 justify-content-center">
                <Button variant="outline-secondary" onClick={() => window.print()}>
                  <FaDownload className="me-2"/> Download
                </Button>
                <Button variant="primary" onClick={() => navigate('/dashboard/user')}>
                  Done
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <SectionHeader title="Complete Payment" />
      
      <div className="row g-4">
        <div className="col-lg-7">
          <Card title="Payment Method" className="border-0 shadow-sm h-100">
            <div className="d-flex align-items-center gap-2 mb-4 text-muted small bg-light p-3 rounded">
              <FaLock className="text-success" /> <span>Secure 256-bit encrypted payment</span>
            </div>
            
            <form onSubmit={handlePayment}>
              <Input 
                label="Cardholder Name" 
                placeholder="John Doe" 
                required 
              />
              <Input 
                label="Card Number" 
                placeholder="0000 0000 0000 0000" 
                icon={FaCreditCard}
                required 
              />
              <div className="row">
                <div className="col-6">
                  <Input 
                    label="Expiry Date" 
                    placeholder="MM/YY" 
                    required 
                  />
                </div>
                <div className="col-6">
                  <Input 
                    label="CVV" 
                    placeholder="123" 
                    type="password"
                    required 
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                variant="primary" 
                size="lg" 
                className="w-100 mt-4"
                isLoading={loading}
              >
                Pay ₹{rideData.price}
              </Button>
            </form>
          </Card>
        </div>
        
        <div className="col-lg-5">
          <Card title="Ride Summary" className="border-0 shadow-sm bg-light h-100">
            
            <div className="mb-4">
              <div className="d-flex align-items-start gap-3 mb-3">
                <div className="text-primary mt-1"><div style={{width: '12px', height: '12px', borderRadius: '50%', border: '2px solid currentColor'}}></div></div>
                <div>
                  <small className="text-muted d-block">Pickup</small>
                  <span className="fw-medium">{rideData.pickup}</span>
                </div>
              </div>
              
              <div className="d-flex align-items-start gap-3">
                <div className="text-danger mt-1"><div style={{width: '12px', height: '12px', backgroundColor: 'currentColor'}}></div></div>
                <div>
                  <small className="text-muted d-block">Dropoff</small>
                  <span className="fw-medium">{rideData.dropoff}</span>
                </div>
              </div>
            </div>

            <hr />

            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted"><FaCar className="me-2"/> Ride Type</span>
              <span className="fw-medium text-capitalize">{rideData.rideType}</span>
            </div>
            
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Distance Fare ({rideData.route?.distance} km)</span>
              <span className="fw-medium">₹{(parseFloat(rideData.price) * 0.8).toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Taxes & Fees</span>
              <span className="fw-medium">₹{(parseFloat(rideData.price) * 0.2).toFixed(2)}</span>
            </div>
            
            <hr />
            
            <div className="d-flex justify-content-between">
              <span className="fw-bold fs-5">Total</span>
              <span className="fw-bold fs-5">₹{rideData.price}</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Payment;
