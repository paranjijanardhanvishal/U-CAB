import React, { useState, useEffect } from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { FaTag, FaCopy } from 'react-icons/fa';
import api from '../services/api';
import { toast } from 'react-toastify';

const Coupons = () => {
  const [activeCoupons, setActiveCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const res = await api.get('/coupons');
      setActiveCoupons(res.data.data);
    } catch (error) {
      console.error('Failed to load coupons', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    toast.success(`Coupon ${code} copied to clipboard!`);
  };

  if (loading) {
    return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;
  }

  return (
    <div>
      <SectionHeader title="My Coupons" description="View and apply promotional offers." />
      
      <div className="row g-4">
        {activeCoupons.length === 0 ? (
          <div className="col-12 text-center py-5 text-muted">
            <p>No active coupons available at the moment.</p>
          </div>
        ) : (
          activeCoupons.map((coupon) => (
            <div key={coupon._id} className="col-md-6 col-lg-4">
              <Card className="border-0 shadow-sm h-100 position-relative overflow-hidden">
                <div className="position-absolute top-0 end-0 bg-primary text-white px-3 py-1 rounded-bottom-start small fw-bold">
                  ACTIVE
                </div>
                
                <div className="d-flex align-items-center gap-3 mb-3 mt-2">
                  <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-circle">
                    <FaTag size={24} />
                  </div>
                  <h4 className="fw-bold mb-0 text-primary">{coupon.code}</h4>
                </div>
                
                <p className="text-dark fw-medium mb-1">{coupon.discountPercentage}% off your next ride (Up to ₹{coupon.maxDiscountAmount})</p>
                <p className="text-muted small mb-4">Expires: {new Date(coupon.expiryDate).toLocaleDateString()}</p>
                
                <div className="mt-auto">
                  <Button variant="outline-primary" className="w-100 fw-bold" onClick={() => copyToClipboard(coupon.code)}>
                    <FaCopy className="me-2" /> Copy Code
                  </Button>
                </div>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Coupons;
