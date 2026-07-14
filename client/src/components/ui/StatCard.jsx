import React from 'react';
import Card from './Card';

const StatCard = ({ title, value, icon: Icon, color = 'primary', className = '' }) => {
  return (
    <Card className={`border-0 shadow-sm h-100 ${className}`}>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <p className="text-muted fw-semibold small text-uppercase mb-1">{title}</p>
          <h3 className="fw-bold mb-0">{value}</h3>
        </div>
        {Icon && (
          <div 
            className={`d-flex justify-content-center align-items-center rounded-circle bg-${color} bg-opacity-10 text-${color}`}
            style={{ width: '48px', height: '48px' }}
          >
            <Icon size={24} />
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;
