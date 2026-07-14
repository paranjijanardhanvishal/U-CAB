import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false, 
  className = '', 
  disabled, 
  ...props 
}) => {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = size !== 'md' ? `btn-${size}` : '';
  const loadingClass = isLoading ? 'disabled' : '';

  return (
    <button 
      className={`${baseClass} ${variantClass} ${sizeClass} ${loadingClass} fw-medium ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Loading...
        </>
      ) : children}
    </button>
  );
};

export default Button;
