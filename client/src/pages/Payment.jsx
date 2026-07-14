import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import SectionHeader from '../components/ui/SectionHeader';
import { FaCreditCard, FaLock, FaCheckCircle } from 'react-icons/fa';

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);
    // TEMP_DEV_BYPASS: Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <div className="container py-5 mt-5 max-w-md mx-auto text-center">
        <div className="text-success mb-4">
          <FaCheckCircle size={80} />
        </div>
        <h2 className="fw-bold mb-3">Payment Successful!</h2>
        <p className="text-muted mb-4">Your payment of $12.50 has been processed securely. A receipt has been sent to your email.</p>
        <Button variant="primary" onClick={() => navigate('/dashboard/user')}>
          Return to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <SectionHeader title="Checkout" />
      
      <div className="row g-4">
        <div className="col-lg-7">
          <Card title="Payment Method" className="border-0 shadow-sm h-100">
            <div className="d-flex align-items-center gap-2 mb-4 text-muted small">
              <FaLock /> <span>Secure encrypted payment</span>
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
                Pay $12.50
              </Button>
            </form>
          </Card>
        </div>
        
        <div className="col-lg-5">
          <Card title="Order Summary" className="border-0 shadow-sm bg-light">
            <div className="d-flex justify-content-between mb-3">
              <span className="text-muted">Standard Ride</span>
              <span className="fw-medium">$12.50</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span className="text-muted">Taxes & Fees</span>
              <span className="fw-medium">$0.00</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <span className="fw-bold fs-5">Total</span>
              <span className="fw-bold fs-5">$12.50</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Payment;
