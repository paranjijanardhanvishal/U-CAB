import React from 'react';

const Select = React.forwardRef(({ 
  label, 
  id, 
  options = [], 
  error, 
  className = '', 
  ...props 
}, ref) => {
  return (
    <div className={`mb-3 ${className}`}>
      {label && <label htmlFor={id} className="form-label text-muted fw-semibold small">{label}</label>}
      <select
        ref={ref}
        id={id}
        className={`form-select ${error ? 'is-invalid' : ''}`}
        {...props}
      >
        <option value="" disabled>Select an option</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value || opt}>{opt.label || opt}</option>
        ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
});

Select.displayName = 'Select';
export default Select;
