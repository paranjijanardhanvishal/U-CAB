import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, className = '' }) => {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Page navigation" className={className}>
      <ul className="pagination mb-0">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button 
            className="page-link" 
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        
        {Array.from({ length: totalPages }).map((_, idx) => {
          const page = idx + 1;
          return (
            <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
              <button className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </button>
            </li>
          );
        })}
        
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button 
            className="page-link" 
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
