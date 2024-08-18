import React, { useState } from 'react'
import Delete from '@material-ui/icons/Delete'
import { useCart, useDispatchCart } from '../components/ContextReducer';
import '../components/styles/Cart.css'; // Import the CSS file

export default function Cart() {
  const [orderPlaced, setOrderPlaced] = useState(false); // State to track if the order is placed
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0 && !orderPlaced) {
    return (
      <div className="cart-empty">
        <div className='empty-message'>The Cart is Empty!</div>
      </div>
    )
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("https://meal-express-backend.onrender.com/api/auth/orderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    if (response.status === 200) {
      dispatch({ type: "DROP" });
      setOrderPlaced(true); // Set the order placed state to true
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div className="cart-container">
      {orderPlaced ? (
        <div className="order-success-message">
          <h2>Your order has been placed successfully! 🎉</h2>
          <p>Get ready for some delicious treats coming your way!</p>
        </div>
      ) : (
        <div className='cart-table-wrapper'>
          <table className='table'>
            <thead className='table-header'>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Option</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((food, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{food.name}</td>
                  <td>{food.qty}</td>
                  <td>{food.size}</td>
                  <td>{food.price}</td>
                  <td><button className="btn-delete" onClick={() => dispatch({ type: "REMOVE", index })}><Delete /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total-price">
            Total Price: <span>{totalPrice}/-</span>
          </div>
          <div className="checkout-button">
            <button className='btn btn-checkout' onClick={handleCheckOut}>Check Out</button>
          </div>
        </div>
      )}
    </div>
  )
}
