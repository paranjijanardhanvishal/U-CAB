import React from 'react';
import { FaInfoCircle, FaExclamationTriangle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Alert = ({ children, variant = 'info', dismissible = false, onClose, className = '' }) => {
  const getIcon = () => {
    switch (variant) {
      case 'danger': return <FaTimesCircle />;
      case 'warning': return <FaExclamationTriangle />;
      case 'success': return <FaCheckCircle />;
      default: return <FaInfoCircle />;
    }
  };

  return (
    <div className={`alert alert-${variant} ${dismissible ? 'alert-dismissible fade show' : ''} d-flex align-items-center border-0 shadow-sm ${className}`} role="alert">
      <div className="me-3 fs-5">
        {getIcon()}
      </div>
      <div className="flex-grow-1">
        {children}
      </div>
      {dismissible && (
        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
      )}
    </div>
  );
};

export default Alert;
