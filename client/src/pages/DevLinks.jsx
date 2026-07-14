import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import SectionHeader from '../components/ui/SectionHeader';

const DevLinks = () => {
  return (
    <div className="container py-5 mt-5">
      <SectionHeader 
        title="Development Navigation" 
        description="TEMP_DEV_BYPASS: This page is strictly for testing dashboard UI while authentication is bypassed."
      />
      
      <div className="row mt-4">
        <div className="col-md-4 mb-4">
          <Card title="User View" className="h-100">
            <p className="text-muted mb-4">Preview the dashboard from a standard user's perspective.</p>
            <Link to="/dashboard/user">
              <Button variant="primary" className="w-100">Go to User Dashboard</Button>
            </Link>
          </Card>
        </div>
        
        <div className="col-md-4 mb-4">
          <Card title="Driver View" className="h-100">
            <p className="text-muted mb-4">Preview the driver workspace and ride requests.</p>
            <Link to="/dashboard/driver">
              <Button variant="warning" className="w-100">Go to Driver Dashboard</Button>
            </Link>
          </Card>
        </div>
        
        <div className="col-md-4 mb-4">
          <Card title="Admin View" className="h-100">
            <p className="text-muted mb-4">Preview the platform management and analytics.</p>
            <Link to="/dashboard/admin">
              <Button variant="danger" className="w-100">Go to Admin Dashboard</Button>
            </Link>
          </Card>
        </div>
      </div>
      
      <div className="alert alert-info mt-4 border-0 shadow-sm rounded-4">
        <strong>Note:</strong> Authentication is currently bypassed. Links like Logout will not function, and API data is replaced with polished empty states.
      </div>
    </div>
  );
};

export default DevLinks;
