import React from 'react';

const Input = React.forwardRef(({ 
  label, 
  id, 
  error, 
  icon: Icon,
  className = '', 
  ...props 
}, ref) => {
  return (
    <div className={`mb-3 ${className}`}>
      {label && <label htmlFor={id} className="form-label text-muted fw-semibold small">{label}</label>}
      <div className="position-relative">
        {Icon && (
          <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted">
            <Icon />
          </span>
        )}
        <input
          ref={ref}
          id={id}
          className={`form-control ${Icon ? 'ps-5' : ''} ${error ? 'is-invalid' : ''}`}
          {...props}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
