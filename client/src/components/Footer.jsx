import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6 pe-lg-5">
            <h4 className="fw-bold mb-3 text-white">Ucab</h4>
            <p className="text-muted">
              The premier cab booking platform. Fast, safe, and reliable rides at your fingertips.
            </p>
            <div className="d-flex gap-3 mt-4">
              <a href="#" className="text-muted text-decoration-none hover-white"><FaFacebook size={20} /></a>
              <a href="#" className="text-muted text-decoration-none hover-white"><FaTwitter size={20} /></a>
              <a href="#" className="text-muted text-decoration-none hover-white"><FaInstagram size={20} /></a>
              <a href="#" className="text-muted text-decoration-none hover-white"><FaLinkedin size={20} /></a>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6">
            <h5 className="fw-bold mb-3 text-white">Company</h5>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><Link to="/about" className="text-muted text-decoration-none hover-white">About Us</Link></li>
              <li><Link to="/contact" className="text-muted text-decoration-none hover-white">Contact</Link></li>
              <li><Link to="/careers" className="text-muted text-decoration-none hover-white">Careers</Link></li>
            </ul>
          </div>
          
          <div className="col-lg-2 col-md-6">
            <h5 className="fw-bold mb-3 text-white">Product</h5>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><Link to="/book-ride" className="text-muted text-decoration-none hover-white">Ride</Link></li>
              <li><Link to="/drive" className="text-muted text-decoration-none hover-white">Drive</Link></li>
              <li><Link to="/cities" className="text-muted text-decoration-none hover-white">Cities</Link></li>
            </ul>
          </div>
          
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold mb-3 text-white">Subscribe</h5>
            <p className="text-muted">Get updates on our latest features and offers.</p>
            <div className="d-flex flex-column flex-sm-row gap-2">
              <input type="email" className="form-control bg-secondary bg-opacity-25 border-0 text-white placeholder-light" placeholder="Email address" />
              <button className="btn btn-primary fw-medium px-4 text-nowrap">Subscribe</button>
            </div>
          </div>
        </div>
        
        <hr className="my-4 border-secondary" />
        
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-muted small">
          <p className="mb-md-0">&copy; {new Date().getFullYear()} Ucab Platform. All rights reserved.</p>
          <div className="d-flex gap-3">
            <a href="#" className="text-muted text-decoration-none hover-white">Terms of Service</a>
            <a href="#" className="text-muted text-decoration-none hover-white">Privacy Policy</a>
          </div>
        </div>
      </div>
      <style>{`
        .hover-white:hover { color: white !important; }
        .placeholder-light::placeholder { color: rgba(255,255,255,0.5); }
      `}</style>
    </footer>
  );
};

export default Footer;
