import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Do not show on Home or Choose Role
  if (location.pathname === '/' || location.pathname === '/choose-role') {
    return null;
  }

  const handleBack = () => {
    // Navigate back to the previous page in history
    navigate(-1);
  };

  return (
    <button 
      onClick={handleBack} 
      className="btn btn-light shadow-sm d-flex align-items-center gap-2 px-3 py-2 border rounded-pill"
      style={{ transition: 'all 0.2s ease', backgroundColor: 'var(--bs-body-bg)' }}
      onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f8f9fa'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
      onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'var(--bs-body-bg)'; e.currentTarget.style.transform = 'none'; }}
    >
      <FaArrowLeft size={14} className="text-primary" />
      <span className="fw-medium text-dark" style={{ fontSize: '0.9rem' }}>Back</span>
    </button>
  );
};

export default BackButton;
