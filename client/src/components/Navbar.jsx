import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaCar } from 'react-icons/fa';

const Navbar = () => {
  // TEMP_DEV_BYPASS: We are ignoring the AuthContext completely for UI development.
  // The Login/Register buttons are removed from the public navbar.
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow-sm py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2" to="/">
          <FaCar /> Ucab
        </Link>
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-1 gap-lg-3">
            <li className="nav-item">
              <NavLink className="nav-link fw-medium px-3 rounded" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fw-medium px-3 rounded" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fw-medium px-3 rounded" to="/contact">Contact</NavLink>
            </li>
            
            <li className="nav-item d-flex align-items-center ms-lg-3 mt-2 mt-lg-0">
              <Link to="/book-ride" className="btn btn-light fw-bold px-4 text-primary w-100">
                Book a Ride
              </Link>
            </li>
            
            {/* TEMP_DEV_BYPASS */}
            <li className="nav-item d-flex align-items-center mt-2 mt-lg-0">
              <Link to="/dev" className="btn btn-outline-light fw-bold px-3 w-100">
                /dev
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <style>{`
        .navbar-nav .nav-link.active {
          background-color: rgba(255,255,255,0.15);
          color: white !important;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
