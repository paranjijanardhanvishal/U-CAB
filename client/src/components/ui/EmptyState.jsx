import React from 'react';
import Card from './Card';

const EmptyState = ({ 
  icon: Icon, 
  title = "No data available", 
  description, 
  action, 
  className = '' 
}) => {
  return (
    <Card className={`border-0 shadow-sm text-center py-5 ${className}`}>
      <div className="d-flex flex-column align-items-center justify-content-center h-100 py-4">
        {Icon && (
          <div className="text-muted opacity-50 mb-4">
            <Icon size={64} />
          </div>
        )}
        <h4 className="fw-bold text-dark mb-2">{title}</h4>
        {description && <p className="text-muted mb-4 px-3 max-w-md mx-auto">{description}</p>}
        {action && <div>{action}</div>}
      </div>
    </Card>
  );
};

export default EmptyState;
