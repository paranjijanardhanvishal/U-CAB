import React from 'react';

const SectionHeader = ({ title, description, action }) => {
  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
      <div>
        <h3 className="fw-bold mb-1">{title}</h3>
        {description && <p className="text-muted mb-0">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

export default SectionHeader;
