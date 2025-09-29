import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatchCart, useCart } from './ContextReducer';
import './styles/Card.css'; // New CSS file for styling

export default function Card(props) {
  const data = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  const priceRef = useRef();
  const options = props.options;
  const priceOptions = Object.keys(options);
  const foodItem = props.item;
  const dispatch = useDispatchCart();

  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  const handleQty = (e) => {
    setQty(e.target.value);
  };

  const handleOptions = (e) => {
    setSize(e.target.value);
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      alert('Please log in to add items to your cart.');
      navigate('/login');
      return;
    }

    let food = data.find(item => item.id === foodItem._id);

    if (food) {
      if (food.size === size) {
        await dispatch({ type: 'UPDATE', id: foodItem._id, price: finalPrice, qty: qty });
      } else {
        await dispatch({
          type: 'ADD',
          id: foodItem._id,
          name: foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.ImgSrc,
        });
      }
    } else {
      await dispatch({
        type: 'ADD',
        id: foodItem._id,
        name: foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
      });
    }
  };

  let finalPrice = qty * parseInt(options[size]);

  return (
    <div className="food-card-container">
      <div className="card mt-3 shadow-sm food-card">
        <img
          src={props.ImgSrc}
          className="card-img-top food-card-img"
          alt={props.foodName}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodName}</h5>
          <div className="container p-0">
            <div className="d-flex align-items-center justify-content-between">
              <select
                className="form-select m-2 qty-select"
                onChange={handleQty}
                disabled={!isLoggedIn}
                aria-label="Select quantity"
              >
                {Array.from(Array(6), (e, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select
                className="form-select m-2 size-select"
                ref={priceRef}
                onChange={handleOptions}
                disabled={!isLoggedIn}
                aria-label="Select size"
              >
                {priceOptions.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
              <div className="price-tag">₹{finalPrice}/-</div>
            </div>
          </div>
          <hr />
          <button
            className="btn btn-success w-100 add-to-cart-btn"
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
