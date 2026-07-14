import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { FaMapMarkerAlt, FaLocationArrow } from 'react-icons/fa';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-dark text-white position-relative overflow-hidden" style={{ minHeight: '600px' }}>
        {/* We'd normally have a background image here */}
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary opacity-25"></div>
        
        <div className="container position-relative z-1 py-5 mt-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="display-3 fw-bold mb-4">Go anywhere with Ucab</h1>
              <p className="lead mb-4 text-white-50">
                Request a ride, hop in, and go. The fastest, most reliable ride booking service in your city.
              </p>
            </div>
            
            <div className="col-lg-5 offset-lg-1">
              <Card className="border-0 shadow-lg p-3">
                <h3 className="fw-bold mb-4">Request a ride</h3>
                <div className="d-flex flex-column gap-2 mb-4">
                  <Input 
                    placeholder="Enter pickup location" 
                    icon={FaLocationArrow} 
                    className="mb-0"
                  />
                  <Input 
                    placeholder="Enter destination" 
                    icon={FaMapMarkerAlt} 
                    className="mb-0"
                  />
                </div>
                <Link to="/book-ride">
                  <Button variant="primary" size="lg" className="w-100">
                    See prices
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-white">
        <div className="container py-5">
          <h2 className="fw-bold mb-5 text-center">Why ride with Ucab?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <h4 className="fw-bold">Ride on your terms</h4>
              <p className="text-muted">Choose your ride and set your location. You'll see your driver's picture and vehicle details, and can track their arrival on the map.</p>
            </div>
            <div className="col-md-4">
              <h4 className="fw-bold">Your safety first</h4>
              <p className="text-muted">You can share your trip details with loved ones. Track your trip during your ride. Our support is available 24/7.</p>
            </div>
            <div className="col-md-4">
              <h4 className="fw-bold">Affordable prices</h4>
              <p className="text-muted">No hidden fees. You'll always see an estimate of your ride before you book. Pay easily through our secure app.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
