import React, { useState } from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { useUserData } from '../hooks/useUserData';
import { usePayment } from '../hooks/usePayment';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartItems from '../components/cart/CartItems';
import CheckoutSection from '../components/cart/CheckoutSection';
import SuccessToast from '../components/cart/SuccessToast';
import '../components/styles/Cart.css';

export default function Cart() {
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const data = useCart();
  const dispatch = useDispatchCart();
  
  const {
    loading,
    orderName,
    setOrderName,
    orderMobile,
    setOrderMobile,
    userAddress,
    setUserAddress,
    checkoutAddress,
    setCheckoutAddress
  } = useUserData();

  const { handleCheckOut } = usePayment(
    data,
    dispatch,
    checkoutAddress,
    userAddress,
    orderName,
    orderMobile,
    setToastType,
    setToastMessage,
    setShowSuccessToast,
    setOrderPlaced
  );

  const handleIncrementQuantity = (index) => {
    const food = data[index];
    dispatch({
      type: "UPDATE",
      id: food.id,
      qty: 1,
      price: food.price / food.qty
    });
  };

  const handleDecrementQuantity = (index) => {
    const food = data[index];
    if (food.qty > 1) {
      dispatch({
        type: "UPDATE",
        id: food.id,
        qty: -1,
        price: -(food.price / food.qty)
      });
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (data.length === 0 && !orderPlaced) {
    return (
      <div className="cart-empty">
        <div className='empty-message'>The Cart is Empty!</div>
      </div>
    );
  }

  const totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      <Navbar />
      <div className="cart-container">
        {orderPlaced ? (
          <div className="order-success-message">
            <h2>Your order has been placed successfully! 🎉</h2>
            <p>Get ready for some delicious treats coming your way!</p>
          </div>
        ) : (
          <div className="cart-content">
            <CartItems 
              data={data}
              dispatch={dispatch}
              onIncrementQuantity={handleIncrementQuantity}
              onDecrementQuantity={handleDecrementQuantity}
            />
            
            <CheckoutSection 
              orderName={orderName}
              setOrderName={setOrderName}
              orderMobile={orderMobile}
              setOrderMobile={setOrderMobile}
              userAddress={userAddress}
              checkoutAddress={checkoutAddress}
              setCheckoutAddress={setCheckoutAddress}
              setUserAddress={setUserAddress}
              data={data}
              totalPrice={totalPrice}
              onCheckout={handleCheckOut}
              setToastType={setToastType}
              setToastMessage={setToastMessage}
              setShowSuccessToast={setShowSuccessToast}
            />
          </div>
        )}
      </div>
      <Footer />
      
      <SuccessToast 
        show={showSuccessToast}
        message={toastMessage}
        type={toastType}
      />
    </div>
  );
}
