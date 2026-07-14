import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

const Sidebar = ({ links = [], isOpen, toggleSidebar, title = 'Dashboard' }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 z-2 d-md-none"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar Content */}
      <div 
        className={`bg-white border-end position-fixed top-0 start-0 h-100 z-3 transition-transform ${isOpen ? 'translate-middle-x-0' : 'translate-middle-x-n100'} d-md-block`}
        style={{ width: '260px', transform: isOpen ? 'translateX(0)' : 'translateX(-100%)' }}
      >
        <div className="d-flex justify-content-between align-items-center p-4 border-bottom">
          <h4 className="fw-bold text-primary mb-0">{title}</h4>
          <button className="btn btn-link text-dark d-md-none p-0" onClick={toggleSidebar}>
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-3">
          <ul className="nav flex-column gap-2">
            {links.map((link, idx) => (
              <li className="nav-item" key={idx}>
                <NavLink 
                  to={link.path} 
                  className={({ isActive }) => 
                    `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-2 fw-medium ${isActive ? 'bg-primary bg-opacity-10 text-primary' : 'text-muted hover-bg-light'}`
                  }
                  end={link.exact}
                >
                  {link.icon && <link.icon size={18} />}
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Desktop style overrides for the transition since Bootstrap doesn't have it built-in */}
      <style>{`
        @media (min-width: 768px) {
          .translate-middle-x-n100 { transform: translateX(0) !important; }
        }
        .hover-bg-light:hover { background-color: var(--bg-hover); color: var(--text-main) !important; }
      `}</style>
    </>
  );
};

export default Sidebar;
