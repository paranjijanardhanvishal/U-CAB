import React from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchBar = ({ value, onChange, onClear, placeholder = 'Search...', className = '' }) => {
  return (
    <div className={`position-relative ${className}`}>
      <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted">
        <FaSearch size={14} />
      </span>
      <input
        type="text"
        className="form-control ps-5 pe-5"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {value && onClear && (
        <button 
          className="btn btn-link position-absolute top-50 end-0 translate-middle-y me-1 text-muted p-1"
          onClick={onClear}
        >
          <FaTimes size={14} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
