import React from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';

const Profile = () => {
  return (
    <div>
      <SectionHeader title="Profile Settings" description="Manage your account details and preferences." />
      
      <div className="row g-4">
        <div className="col-lg-4">
          <Card className="text-center h-100">
            <div className="d-flex flex-column align-items-center mb-4">
              <Avatar name="User" size="xl" className="mb-3" />
              <h5 className="fw-bold mb-1">Jane Doe</h5>
              <p className="text-muted mb-3">jane@example.com</p>
              <Button variant="outline-primary" size="sm">Change Photo</Button>
            </div>
            
            <hr />
            
            <div className="text-start mt-4">
              <h6 className="fw-bold mb-3">Account Security</h6>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Password</span>
                <a href="#" className="text-decoration-none text-primary">Update</a>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-muted">2-Factor Auth</span>
                <span className="badge bg-light text-dark border">Disabled</span>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="col-lg-8">
          <Card title="Personal Information" className="h-100">
            <form onSubmit={e => e.preventDefault()}>
              <div className="row">
                <div className="col-md-6">
                  <Input label="First Name" defaultValue="Jane" />
                </div>
                <div className="col-md-6">
                  <Input label="Last Name" defaultValue="Doe" />
                </div>
              </div>
              
              <Input label="Email Address" type="email" defaultValue="jane@example.com" />
              <Input label="Phone Number" type="tel" defaultValue="+1 (555) 123-4567" />
              
              <div className="mt-4">
                <Button variant="primary" type="submit">Save Changes</Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
