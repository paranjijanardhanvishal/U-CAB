import React from 'react';

const Badge = ({ children, variant = 'primary', className = '', rounded = true }) => {
  const roundedClass = rounded ? 'rounded-pill' : 'rounded-1';
  return (
    <span className={`badge bg-${variant} ${roundedClass} px-3 py-2 fw-medium ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
