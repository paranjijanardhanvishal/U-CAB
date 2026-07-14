import React from 'react';

const Avatar = ({ name, src, size = 'md', className = '' }) => {
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const sizeStyles = {
    sm: { width: '32px', height: '32px', fontSize: '14px' },
    md: { width: '48px', height: '48px', fontSize: '18px' },
    lg: { width: '64px', height: '64px', fontSize: '24px' },
    xl: { width: '96px', height: '96px', fontSize: '36px' },
  };

  const style = sizeStyles[size] || sizeStyles.md;

  if (src) {
    return (
      <img 
        src={src} 
        alt={name} 
        className={`rounded-circle object-fit-cover ${className}`}
        style={style}
      />
    );
  }

  return (
    <div 
      className={`rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold ${className}`}
      style={style}
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
