import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items = [] }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb mb-0">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li 
              key={idx} 
              className={`breadcrumb-item ${isLast ? 'active text-dark fw-medium' : ''}`}
              aria-current={isLast ? 'page' : undefined}
            >
              {isLast ? (
                item.label
              ) : (
                <Link to={item.path} className="text-muted text-decoration-none hover-primary">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      <style>{`
        .hover-primary:hover { color: var(--primary) !important; text-decoration: underline !important; }
      `}</style>
    </nav>
  );
};

export default Breadcrumb;
