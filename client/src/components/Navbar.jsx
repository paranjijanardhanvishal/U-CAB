import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaCar } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate('/choose-role', { replace: true });
  };
  
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
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-1 gap-lg-3 align-items-lg-center">
            <li className="nav-item">
              <NavLink className="nav-link fw-medium px-3 rounded" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fw-medium px-3 rounded" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fw-medium px-3 rounded" to="/contact">Contact</NavLink>
            </li>
            
            {!user ? (
              <>
                <li className="nav-item d-flex align-items-center mt-2 mt-lg-0">
                  <Link to="/choose-role" className="btn btn-outline-light fw-bold px-4 w-100">
                    Login / Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                {user.role === 'user' && (
                  <li className="nav-item d-flex align-items-center ms-lg-2 mt-2 mt-lg-0">
                    <Link to="/book-ride" className="btn btn-light fw-bold px-4 text-primary w-100">
                      Book a Ride
                    </Link>
                  </li>
                )}
                <li className="nav-item d-flex align-items-center ms-lg-2 mt-2 mt-lg-0">
                  <Link to={`/dashboard/${user.role}`} className="btn btn-outline-light fw-bold px-4 w-100">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item d-flex align-items-center ms-lg-2 mt-2 mt-lg-0">
                  <button onClick={handleLogout} className="btn btn-danger fw-bold px-4 w-100">
                    Logout
                  </button>
                </li>
              </>
            )}
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
