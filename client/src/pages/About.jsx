import React from 'react';
import Card from '../components/ui/Card';
import { FaShieldAlt, FaCar, FaClock } from 'react-icons/fa';

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-5 text-center">
        <div className="container py-5">
          <h1 className="display-4 fw-bold mb-3">About Ucab</h1>
          <p className="lead fw-normal text-white-50 max-w-lg mx-auto">
            We are revolutionizing urban mobility by providing safe, reliable, and affordable rides for everyone, everywhere.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-5 container my-4">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Our Core Values</h2>
          <p className="text-muted">What drives us forward every single day.</p>
        </div>
        
        <div className="row g-4">
          <div className="col-md-4">
            <Card className="h-100 text-center border-0 shadow-sm p-4 hover-lift">
              <div className="text-primary mb-3">
                <FaShieldAlt size={48} />
              </div>
              <h4 className="fw-bold mb-3">Safety First</h4>
              <p className="text-muted mb-0">
                Every ride is tracked. Every driver is thoroughly vetted. Your safety is our top priority.
              </p>
            </Card>
          </div>
          
          <div className="col-md-4">
            <Card className="h-100 text-center border-0 shadow-sm p-4 hover-lift">
              <div className="text-primary mb-3">
                <FaCar size={48} />
              </div>
              <h4 className="fw-bold mb-3">Reliability</h4>
              <p className="text-muted mb-0">
                Thousands of drivers are always nearby. Get a ride exactly when and where you need it.
              </p>
            </Card>
          </div>
          
          <div className="col-md-4">
            <Card className="h-100 text-center border-0 shadow-sm p-4 hover-lift">
              <div className="text-primary mb-3">
                <FaClock size={48} />
              </div>
              <h4 className="fw-bold mb-3">24/7 Support</h4>
              <p className="text-muted mb-0">
                Our dedicated support team is available around the clock to assist you with any issues.
              </p>
            </Card>
          </div>
        </div>
      </section>
      
      <style>{`
        .hover-lift { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .hover-lift:hover { transform: translateY(-5px); box-shadow: var(--shadow-md) !important; }
      `}</style>
    </div>
  );
};

export default About;
