import React from 'react';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ isOpen, onClose, title, children, footer, size = 'md' }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal-backdrop fade show" style={{ zIndex: 1050 }}></div>
      <div 
        className="modal fade show d-block" 
        tabIndex="-1" 
        style={{ zIndex: 1055 }}
        onClick={(e) => {
          if (e.target.classList.contains('modal')) onClose();
        }}
      >
        <div className={`modal-dialog modal-dialog-centered modal-${size}`}>
          <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
            <div className="modal-header border-bottom-0 pt-4 px-4 pb-0">
              <h5 className="modal-title fw-bold">{title}</h5>
              <button type="button" className="btn btn-link text-muted p-0" onClick={onClose}>
                <FaTimes size={20} />
              </button>
            </div>
            <div className="modal-body p-4">
              {children}
            </div>
            {footer && (
              <div className="modal-footer border-top-0 px-4 pb-4 pt-0">
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
