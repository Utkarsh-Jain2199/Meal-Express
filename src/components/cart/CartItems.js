import React from 'react';
import Delete from '@material-ui/icons/Delete';
import './styles/CartItems.css';

export default function CartItems({ data, dispatch, onIncrementQuantity, onDecrementQuantity }) {
  return (
    <div className="cart-items-section">
      <h3 className="section-title">Your Order</h3>
      <div className="cart-table-wrapper">
        <table className="table">
          <thead className="table-header">
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
                <td>
                  <div className="quantity-controls">
                    <button 
                      className="btn-quantity" 
                      onClick={() => onDecrementQuantity(index)}
                      disabled={food.qty <= 1}
                    >
                      -
                    </button>
                    <span className="quantity-display">{food.qty}</span>
                    <button 
                      className="btn-quantity" 
                      onClick={() => onIncrementQuantity(index)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>{food.size}</td>
                <td>₹{food.price}</td>
                <td>
                  <button 
                    className="btn-delete" 
                    onClick={() => dispatch({ type: "REMOVE", index })}
                  >
                    <Delete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

