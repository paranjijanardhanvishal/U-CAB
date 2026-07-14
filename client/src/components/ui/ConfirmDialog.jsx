import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { FaExclamationTriangle } from 'react-icons/fa';

const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action", 
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  isLoading = false
}) => {
  const footer = (
    <div className="d-flex justify-content-end gap-2 w-100">
      <Button variant="light" onClick={onClose} disabled={isLoading}>
        {cancelText}
      </Button>
      <Button variant={variant} onClick={onConfirm} isLoading={isLoading}>
        {confirmText}
      </Button>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} footer={footer} size="sm">
      <div className="d-flex align-items-start gap-3">
        <div className={`text-${variant} mt-1`}>
          <FaExclamationTriangle size={24} />
        </div>
        <p className="mb-0 text-muted">{message}</p>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
