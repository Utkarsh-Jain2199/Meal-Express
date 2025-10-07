import React from 'react';
import './styles/OrderSummary.css';

export default function OrderSummary({ data, totalPrice }) {
  return (
    <div className="order-summary">
      <div className="summary-row">
        <span>Subtotal ({data.length} items)</span>
        <span>₹{totalPrice}</span>
      </div>
      <div className="summary-row">
        <span>Delivery Fee</span>
        <span>FREE</span>
      </div>
      <div className="summary-row">
        <span>Total</span>
        <span>₹{totalPrice}</span>
      </div>
    </div>
  );
}

