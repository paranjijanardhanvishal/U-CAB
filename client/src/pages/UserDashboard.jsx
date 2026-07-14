import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';
import { FaLocationArrow, FaHistory, FaMapMarkedAlt } from 'react-icons/fa';

const UserDashboard = () => {
  return (
    <div>
      <SectionHeader 
        title="Welcome back!" 
        description="Where would you like to go today?"
      />

      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <Card className="h-100 border-0 shadow-sm bg-primary text-white position-relative overflow-hidden">
            {/* Background pattern */}
            <div className="position-absolute top-0 end-0 opacity-25 p-4">
              <FaMapMarkedAlt size={120} />
            </div>
            <div className="position-relative z-1 p-2">
              <h4 className="fw-bold mb-2 text-white">Book a Ride</h4>
              <p className="text-white-50 mb-4 max-w-sm">
                Get a safe and reliable ride in minutes. Tap to enter your destination.
              </p>
              <Link to="/book-ride">
                <Button variant="light" className="text-primary fw-bold px-4">
                  <FaLocationArrow className="me-2" /> Book Now
                </Button>
              </Link>
            </div>
          </Card>
        </div>
        
        <div className="col-md-6">
          <Card className="h-100 border-0 shadow-sm">
            <div className="p-2">
              <h4 className="fw-bold mb-2">Ride History</h4>
              <p className="text-muted mb-4 max-w-sm">
                View your past trips, receipts, and driver ratings.
              </p>
              <Link to="/ride-history">
                <Button variant="outline-primary" className="fw-bold px-4">
                  <FaHistory className="me-2" /> View History
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>

      <Card title="Active Trip">
        <EmptyState 
          icon={FaCar} 
          title="No active trips" 
          description="You don't have any ongoing rides at the moment."
          action={
            <Link to="/book-ride">
              <Button variant="primary">Book a Ride</Button>
            </Link>
          }
          className="py-4"
        />
      </Card>
    </div>
  );
};

// Need to import FaCar since we used it in EmptyState
import { FaCar } from 'react-icons/fa';

export default UserDashboard;
