import React from 'react';
import OrderDetails from './OrderDetails';
import DeliveryAddress from './DeliveryAddress';
import OrderSummary from './OrderSummary';
import './styles/CheckoutSection.css';

export default function CheckoutSection({ 
  orderName,
  setOrderName,
  orderMobile,
  setOrderMobile,
  userAddress,
  checkoutAddress,
  setCheckoutAddress,
  setUserAddress,
  data,
  totalPrice,
  onCheckout,
  setToastType,
  setToastMessage,
  setShowSuccessToast
}) {
  const isFormIncomplete = !userAddress || !orderName.trim() || !orderMobile.trim();

  return (
    <div className="checkout-section">
      <h3 className="section-title">Delivery & Payment</h3>

      <OrderDetails 
        orderName={orderName}
        setOrderName={setOrderName}
        orderMobile={orderMobile}
        setOrderMobile={setOrderMobile}
      />

      <DeliveryAddress 
        userAddress={userAddress}
        checkoutAddress={checkoutAddress}
        setCheckoutAddress={setCheckoutAddress}
        setUserAddress={setUserAddress}
        setToastType={setToastType}
        setToastMessage={setToastMessage}
        setShowSuccessToast={setShowSuccessToast}
      />

      <OrderSummary data={data} totalPrice={totalPrice} />

      <div className="checkout-actions">
        <button
          className={`btn-checkout ${isFormIncomplete ? 'btn-disabled' : ''}`}
          onClick={onCheckout}
          disabled={isFormIncomplete}
        >
          {isFormIncomplete ? 'Complete Details to Continue' : 'Place Order'}
        </button>
      </div>
    </div>
  );
}

