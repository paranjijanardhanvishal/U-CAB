import React, { useContext } from 'react';
import { FaBars, FaBell } from 'react-icons/fa';
import Avatar from './Avatar';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import BackButton from './BackButton';

const Topbar = ({ toggleSidebar, userTitle = 'User', avatarUrl }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate('/choose-role', { replace: true });
  };
  return (
    <header className="bg-white border-bottom sticky-top z-1" style={{ height: '70px' }}>
      <div className="d-flex justify-content-between align-items-center h-100 px-4">
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-light d-md-none p-2 border-0" onClick={toggleSidebar}>
            <FaBars size={20} className="text-muted" />
          </button>
          <BackButton />
        </div>

        <div className="d-flex align-items-center gap-4">
          <button className="btn btn-link text-muted p-0 position-relative">
            <FaBell size={20} />
            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
              <span className="visually-hidden">New alerts</span>
            </span>
          </button>
          
          <div className="dropdown">
            <button className="btn btn-link text-decoration-none text-dark d-flex align-items-center gap-2 p-0 border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <Avatar name={userTitle} src={avatarUrl} size="sm" />
              <span className="d-none d-sm-inline fw-medium">{userTitle}</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0 mt-2">
              <li><Link className="dropdown-item py-2" to="/profile">Profile Settings</Link></li>
              <li><hr className="dropdown-divider" /></li>
              <li><button onClick={handleLogout} className="dropdown-item py-2 text-danger">Logout</button></li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
