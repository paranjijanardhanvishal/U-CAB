import React from 'react';

const Loader = ({ size = 24, color = 'primary', center = true }) => {
  const content = (
    <div className={`spinner-border text-${color}`} style={{ width: size, height: size }} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );

  if (center) {
    return (
      <div className="d-flex justify-content-center align-items-center p-4">
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;
