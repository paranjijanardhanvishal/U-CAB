import React from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { FaTag, FaCopy } from 'react-icons/fa';

const Coupons = () => {
  const activeCoupons = [
    { code: 'WELCOME50', desc: '50% off your next ride (Up to ₹50)', expiry: 'Oct 31, 2026' },
    { code: 'WEEKEND20', desc: '20% off all rides this weekend', expiry: 'Oct 26, 2026' },
  ];

  return (
    <div>
      <SectionHeader title="My Coupons" description="View and apply promotional offers." />
      
      <div className="row g-4">
        {activeCoupons.map((coupon, idx) => (
          <div key={idx} className="col-md-6 col-lg-4">
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
              
              <p className="text-dark fw-medium mb-1">{coupon.desc}</p>
              <p className="text-muted small mb-4">Expires: {coupon.expiry}</p>
              
              <div className="mt-auto">
                <Button variant="outline-primary" className="w-100 fw-bold">
                  <FaCopy className="me-2" /> Copy Code
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Coupons;
