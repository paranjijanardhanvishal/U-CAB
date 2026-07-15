import React from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { FaHome, FaBriefcase, FaStar, FaEllipsisV } from 'react-icons/fa';

const Favorites = () => {
  const places = [
    { name: 'Home', address: '123 Main St, Apt 4B, San Francisco, CA', icon: FaHome, color: 'primary' },
    { name: 'Work', address: '456 Market St, Floor 10, San Francisco, CA', icon: FaBriefcase, color: 'success' },
    { name: 'Gym', address: '789 Fitness Blvd, San Francisco, CA', icon: FaStar, color: 'warning' },
  ];

  return (
    <div>
      <SectionHeader 
        title="Favorite Locations" 
        description="Save places you visit frequently for faster booking." 
        action={<Button variant="primary">Add New Place</Button>}
      />
      
      <div className="row g-4">
        {places.map((place, idx) => {
          const Icon = place.icon;
          return (
            <div key={idx} className="col-12">
              <Card className="border-0 shadow-sm p-2 hover-bg-light transition-all cursor-pointer">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-4">
                    <div className={`bg-${place.color} bg-opacity-10 text-${place.color} p-3 rounded-circle d-flex align-items-center justify-content-center`} style={{ width: '56px', height: '56px' }}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">{place.name}</h5>
                      <p className="text-muted mb-0">{place.address}</p>
                    </div>
                  </div>
                  <div>
                    <button className="btn btn-light rounded-circle p-2 text-muted">
                      <FaEllipsisV />
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          )
        })}
      </div>
      <style>{`
        .cursor-pointer { cursor: pointer; }
        .hover-bg-light:hover { background-color: #f8f9fa; }
        .transition-all { transition: all 0.2s ease; }
      `}</style>
    </div>
  );
};

export default Favorites;
