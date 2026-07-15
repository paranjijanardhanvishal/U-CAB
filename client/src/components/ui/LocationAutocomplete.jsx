import React, { useState, useEffect, useRef } from 'react';
import { searchLocation } from '../../services/mapService';
import Input from './Input';
import { FaSpinner, FaMapMarkerAlt, FaCrosshairs } from 'react-icons/fa';

const LocationAutocomplete = ({ 
  placeholder, 
  icon, 
  onSelect, 
  onCurrentLocation,
  value, 
  onChange,
  className 
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);
  
  useEffect(() => {
    // Click outside to close dropdown
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (value && value.length >= 3 && showDropdown) {
        setIsLoading(true);
        const results = await searchLocation(value);
        setSuggestions(results);
        setIsLoading(false);
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [value, showDropdown]);

  const handleSelect = (item) => {
    onChange(item.name);
    setShowDropdown(false);
    onSelect(item);
  };

  const handleInput = (e) => {
    onChange(e.target.value);
    setShowDropdown(true);
  };

  return (
    <div ref={wrapperRef} className={`position-relative ${className || ''}`}>
      <div className="position-relative">
        <Input 
          placeholder={placeholder}
          icon={icon}
          value={value}
          onChange={handleInput}
          onFocus={() => setShowDropdown(true)}
          className="mb-0"
        />
        {isLoading && (
          <div className="position-absolute end-0 top-50 translate-middle-y me-3 text-muted">
            <FaSpinner className="fa-spin" />
          </div>
        )}
      </div>

      {showDropdown && (suggestions.length > 0 || onCurrentLocation) && (
        <div className="position-absolute w-100 mt-1 bg-white border rounded-3 shadow-lg z-3 overflow-hidden" style={{ zIndex: 1000, maxHeight: '250px', overflowY: 'auto' }}>
          <div className="list-group list-group-flush">
            {onCurrentLocation && (
              <button 
                type="button"
                className="list-group-item list-group-item-action d-flex align-items-center gap-3 py-3 text-primary fw-medium"
                onClick={() => {
                  setShowDropdown(false);
                  onCurrentLocation();
                }}
              >
                <div className="bg-primary bg-opacity-10 p-2 rounded-circle">
                  <FaCrosshairs />
                </div>
                Use current location
              </button>
            )}
            
            {suggestions.map((item, idx) => (
              <button
                key={idx}
                type="button"
                className="list-group-item list-group-item-action d-flex align-items-start gap-3 py-3"
                onClick={() => handleSelect(item)}
              >
                <div className="text-muted mt-1">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <div className="fw-medium text-truncate" style={{ maxWidth: '300px' }}>
                    {item.name.split(',')[0]}
                  </div>
                  <small className="text-muted text-truncate d-block" style={{ maxWidth: '300px' }}>
                    {item.name}
                  </small>
                </div>
              </button>
            ))}
            
            {!isLoading && value.length >= 3 && suggestions.length === 0 && (
              <div className="p-3 text-muted text-center small">No locations found.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationAutocomplete;
