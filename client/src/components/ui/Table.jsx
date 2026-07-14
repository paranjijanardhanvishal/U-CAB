import React from 'react';

const Table = ({ headers = [], children, className = '' }) => {
  return (
    <div className={`table-responsive ${className}`}>
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light text-muted small text-uppercase">
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} className="fw-semibold py-3 border-bottom-0">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
