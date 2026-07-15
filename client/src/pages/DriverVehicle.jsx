import React from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import { FaCar, FaStar } from 'react-icons/fa';

const DriverVehicle = () => {
  return (
    <div>
      <SectionHeader title="Vehicle & Ratings" description="Manage your registered vehicle and view passenger ratings." />
      
      <div className="row g-4">
        <div className="col-lg-6">
          <Card title="Vehicle Information" className="border-0 shadow-sm h-100">
            <div className="text-center mb-4 pb-4 border-bottom">
              <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{width: '80px', height: '80px'}}>
                <FaCar size={40} />
              </div>
              <h4 className="fw-bold mb-1">Toyota Camry</h4>
              <span className="badge bg-dark px-3 py-2 fs-6 mt-2">XYZ-1234</span>
            </div>
            
            <div className="d-flex justify-content-between mb-3 pb-3 border-bottom border-light">
              <span className="text-muted">Color</span>
              <span className="fw-medium">Silver</span>
            </div>
            <div className="d-flex justify-content-between mb-3 pb-3 border-bottom border-light">
              <span className="text-muted">Year</span>
              <span className="fw-medium">2023</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="text-muted">Type</span>
              <span className="fw-medium text-capitalize">Sedan</span>
            </div>
          </Card>
        </div>
        
        <div className="col-lg-6">
          <Card title="Passenger Ratings" className="border-0 shadow-sm h-100">
            <div className="text-center mb-4">
              <h1 className="display-3 fw-bold mb-0">4.9</h1>
              <div className="text-warning my-2">
                <FaStar size={24}/><FaStar size={24}/><FaStar size={24}/><FaStar size={24}/><FaStar size={24} className="opacity-50"/>
              </div>
              <p className="text-muted">Based on 124 completed trips</p>
            </div>
            
            <h6 className="fw-bold mb-3">Recent Reviews</h6>
            <div className="list-group list-group-flush">
              <div className="list-group-item px-0 py-3 border-light">
                <div className="d-flex justify-content-between mb-1">
                  <span className="fw-bold text-dark">Great driver, very polite!</span>
                  <span className="text-warning small"><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></span>
                </div>
                <small className="text-muted">- John D.</small>
              </div>
              <div className="list-group-item px-0 py-3 border-light">
                <div className="d-flex justify-content-between mb-1">
                  <span className="fw-bold text-dark">Smooth ride to the airport.</span>
                  <span className="text-warning small"><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></span>
                </div>
                <small className="text-muted">- Sarah M.</small>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DriverVehicle;
