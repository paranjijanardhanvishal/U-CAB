import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import SectionHeader from '../components/ui/SectionHeader';
import { FaUser, FaCar, FaUserShield } from 'react-icons/fa';

const ChooseRole = () => {
  return (
    <div className="container py-5 mt-5">
      <SectionHeader 
        title="Welcome to U-CAB" 
        description="Please select your role to continue."
      />
      
      <div className="row mt-4 justify-content-center g-4">
        <div className="col-md-4">
          <Link to="/login/user" className="text-decoration-none">
            <Card className="h-100 text-center py-5 border-0 shadow-sm hover-bg-light transition-all">
              <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{width: '80px', height: '80px'}}>
                <FaUser size={32} />
              </div>
              <h4 className="fw-bold text-dark mb-2">Passenger</h4>
              <p className="text-muted px-4 mb-0">Book rides and manage your travel history.</p>
            </Card>
          </Link>
        </div>
        
        <div className="col-md-4">
          <Link to="/login/driver" className="text-decoration-none">
            <Card className="h-100 text-center py-5 border-0 shadow-sm hover-bg-light transition-all">
              <div className="bg-success bg-opacity-10 text-success rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{width: '80px', height: '80px'}}>
                <FaCar size={32} />
              </div>
              <h4 className="fw-bold text-dark mb-2">Driver</h4>
              <p className="text-muted px-4 mb-0">Accept ride requests and manage your earnings.</p>
            </Card>
          </Link>
        </div>
        
        <div className="col-md-4">
          <Link to="/login/admin" className="text-decoration-none">
            <Card className="h-100 text-center py-5 border-0 shadow-sm hover-bg-light transition-all">
              <div className="bg-danger bg-opacity-10 text-danger rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{width: '80px', height: '80px'}}>
                <FaUserShield size={32} />
              </div>
              <h4 className="fw-bold text-dark mb-2">Admin</h4>
              <p className="text-muted px-4 mb-0">Manage the platform, users, and drivers.</p>
            </Card>
          </Link>
        </div>
      </div>
      <style>{`
        .hover-bg-light:hover { background-color: #f8f9fa; transform: translateY(-5px); }
        .transition-all { transition: all 0.3s ease; }
      `}</style>
    </div>
  );
};

export default ChooseRole;
