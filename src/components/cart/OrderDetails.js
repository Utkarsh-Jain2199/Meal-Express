import React, { useState } from 'react';
import './styles/OrderDetails.css';

export default function OrderDetails({ 
  orderName, 
  setOrderName, 
  orderMobile, 
  setOrderMobile 
}) {
  const [editName, setEditName] = useState(false);
  const [editMobile, setEditMobile] = useState(false);
  const [mobileError, setMobileError] = useState("");

  const handleSaveOrderName = () => {
    if (orderName.trim()) {
      setEditName(false);
    }
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    
    if (value === '') {
      setOrderMobile('');
      setMobileError('');
      return;
    }
    
    if (!/^\d+$/.test(value)) {
      return;
    }
    
    if (value.length > 10) {
      return;
    }
    
    setMobileError('');
    setOrderMobile(value);
  };

  const handleSaveOrderMobile = () => {
    if (!orderMobile.trim()) {
      setMobileError('Mobile number is required');
      return;
    }
    
    if (!/^\d{10}$/.test(orderMobile)) {
      setMobileError('Mobile number must be exactly 10 digits');
      return;
    }
    
    setMobileError('');
    setEditMobile(false);
  };

  return (
    <>
      <div className="name-section">
        <div className="name-header">
          <h4>Order For</h4>
          <button
            className="btn-edit-name"
            onClick={() => setEditName(!editName)}
          >
            {editName ? 'Cancel' : 'Edit'}
          </button>
        </div>

        {editName ? (
          <div className="name-form-inline">
            <input
              type="text"
              className="form-control-inline"
              placeholder="Enter name for this order"
              value={orderName}
              onChange={(e) => setOrderName(e.target.value)}
            />
            <button
              className="btn-save-name"
              onClick={handleSaveOrderName}
            >
              Save
            </button>
          </div>
        ) : (
          <div className="order-name-display">
            <p>{orderName || "Enter name"}</p>
          </div>
        )}
      </div>

      <div className="name-section">
        <div className="name-header">
          <h4>Mobile Number</h4>
          <button
            className="btn-edit-name"
            onClick={() => setEditMobile(!editMobile)}
          >
            {editMobile ? 'Cancel' : 'Edit'}
          </button>
        </div>

        {editMobile ? (
          <div className="name-form-inline">
            <div className="mobile-input-wrapper">
              <input
                type="tel"
                className={`form-control-inline ${mobileError ? 'input-error' : ''}`}
                placeholder="Enter 10 digit mobile number"
                value={orderMobile}
                onChange={handleMobileChange}
                maxLength="10"
                pattern="[0-9]*"
                inputMode="numeric"
              />
              {mobileError && <span className="error-message">{mobileError}</span>}
            </div>
            <button
              className="btn-save-name"
              onClick={handleSaveOrderMobile}
            >
              Save
            </button>
          </div>
        ) : (
          <div className="order-name-display">
            <p>{orderMobile || "Enter mobile"}</p>
          </div>
        )}
      </div>
    </>
  );
}

