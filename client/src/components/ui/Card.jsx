import React from 'react';

const Card = ({ children, className = '', title, subtitle, noPadding = false, ...props }) => {
  return (
    <div className={`card ${className}`} {...props}>
      {(title || subtitle) && (
        <div className="card-header bg-white border-bottom-0 pt-4 pb-0 px-4">
          {title && <h5 className="card-title fw-bold mb-1">{title}</h5>}
          {subtitle && <h6 className="card-subtitle text-muted mb-0">{subtitle}</h6>}
        </div>
      )}
      <div className={`card-body ${noPadding ? 'p-0' : 'p-4'}`}>
        {children}
      </div>
    </div>
  );
};

export default Card;
