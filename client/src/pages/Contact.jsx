import React from 'react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Button from '../components/ui/Button';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="bg-main min-vh-100 pb-5">
      <section className="bg-primary text-white py-5 mb-5">
        <div className="container py-4 text-center">
          <h1 className="display-5 fw-bold mb-3">Get in Touch</h1>
          <p className="lead text-white-50">We'd love to hear from you. Drop us a line!</p>
        </div>
      </section>

      <div className="container">
        <div className="row g-5">
          {/* Contact Form */}
          <div className="col-lg-7">
            <Card className="border-0 shadow-sm p-3">
              <h3 className="fw-bold mb-4">Send us a Message</h3>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="row">
                  <div className="col-md-6">
                    <Input label="First Name" placeholder="Jane" />
                  </div>
                  <div className="col-md-6">
                    <Input label="Last Name" placeholder="Doe" />
                  </div>
                </div>
                <Input label="Email Address" type="email" placeholder="jane@example.com" />
                <Input label="Subject" placeholder="How can we help?" />
                <Textarea label="Message" rows={5} placeholder="Type your message here..." />
                
                <Button variant="primary" size="lg" className="w-100 mt-2">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
          
          {/* Contact Details */}
          <div className="col-lg-5">
            <div className="d-flex flex-column gap-4">
              <Card className="border-0 shadow-sm">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-circle">
                    <FaMapMarkerAlt size={24} />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1">Our Headquarters</h5>
                    <p className="text-muted mb-0">123 Mobility Ave, San Francisco, CA 94103</p>
                  </div>
                </div>
              </Card>
              
              <Card className="border-0 shadow-sm">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-circle">
                    <FaPhoneAlt size={24} />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1">Phone Support</h5>
                    <p className="text-muted mb-0">+1 (800) 555-0199</p>
                  </div>
                </div>
              </Card>
              
              <Card className="border-0 shadow-sm">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-circle">
                    <FaEnvelope size={24} />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1">Email Us</h5>
                    <p className="text-muted mb-0">support@ucab.com</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
