import React from 'react';
import './styles/SuccessToast.css';

export default function SuccessToast({ show, message, type }) {
  if (!show) return null;

  return (
    <div className={`success-toast ${type}`}>
      <div className="toast-message">{message}</div>
    </div>
  );
}

