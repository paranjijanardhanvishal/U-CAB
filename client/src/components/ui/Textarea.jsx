import React from 'react';

const Textarea = React.forwardRef(({ 
  label, 
  id, 
  error, 
  className = '', 
  rows = 3,
  ...props 
}, ref) => {
  return (
    <div className={`mb-3 ${className}`}>
      {label && <label htmlFor={id} className="form-label text-muted fw-semibold small">{label}</label>}
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        {...props}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
});

Textarea.displayName = 'Textarea';
export default Textarea;
