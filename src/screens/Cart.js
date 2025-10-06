import React, { useState, useEffect } from 'react'
import Delete from '@material-ui/icons/Delete'
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../components/styles/Cart.css';

export default function Cart() {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [checkoutAddress, setCheckoutAddress] = useState("");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [userName, setUserName] = useState("");
  const [orderName, setOrderName] = useState("");
  const [editName, setEditName] = useState(false);
  const [userMobile, setUserMobile] = useState("");
  const [orderMobile, setOrderMobile] = useState("");
  const [editMobile, setEditMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  let navigate = useNavigate();
  let data = useCart();
  let dispatch = useDispatchCart();

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    const storedMobile = localStorage.getItem('userMobile');
    if (storedName) {
      setUserName(storedName);
      setOrderName(storedName);
    }
    if (storedMobile) {
      setUserMobile(storedMobile);
      setOrderMobile(storedMobile);
    }
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch("https://meal-express-backend-production.up.railway.app/api/auth/getuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        }
      });

      const user = await response.json();
      setUserAddress(user.location || "");
      setCheckoutAddress(user.location || "");
      setUserName(user.name || "");
      setOrderName(user.name || "");
      setUserMobile(user.mobile || "");
      setOrderMobile(user.mobile || "");
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSaveOrderName = () => {
    if (orderName.trim()) {
      setEditName(false);
    }
  };

  const handleSaveOrderMobile = () => {
    if (orderMobile.trim()) {
      setEditMobile(false);
    }
  };

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

  const handleLocationClick = async () => {
    try {
      let navLocation = () => {
        return new Promise((res, rej) => {
          navigator.geolocation.getCurrentPosition(res, rej);
        });
      }
      
      let latlong = await navLocation().then(res => {
        let latitude = res.coords.latitude;
        let longitude = res.coords.longitude;
        return [latitude, longitude];
      });

      let [lat, long] = latlong;
      const response = await fetch("https://meal-express-backend-production.up.railway.app/api/auth/getlocation", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ latlong: { lat, long } })
      });

      const { location } = await response.json();
      setCheckoutAddress(location);
    } catch (error) {
      alert("Unable to get your current location. Please enter manually.");
    }
  };

  if (data.length === 0 && !orderPlaced) {
    return (
      <div className="cart-empty">
        <div className='empty-message'>The Cart is Empty!</div>
      </div>
    )
  }

  const handleCheckOut = async () => {
    const addressToUse = checkoutAddress || userAddress;
    
    if (!addressToUse || addressToUse.trim() === "") {
      setShowAddressForm(true);
      alert("Please enter a delivery address");
      return;
    }

    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem("userEmail");

    try {
      const keyResponse = await fetch("https://meal-express-backend-production.up.railway.app/api/auth/razorpay-key");
      const { key } = await keyResponse.json();

      const requestData = { 
        cartItems: items,
        deliveryAddress: checkoutAddress || userAddress,
        orderName: orderName,
        orderMobile: orderMobile
      };

      const orderResponse = await fetch("https://meal-express-backend-production.up.railway.app/api/auth/create-order", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
        body: JSON.stringify(requestData)
      });

      const orderData = await orderResponse.json();
      
      if (!orderData.success) {
        setToastType("error");
        setToastMessage(orderData.error || 'Failed to create payment order');
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 3000);
        return;
      }
      
      const { order } = orderData;

      const options = {
        key: key,
        amount: order.amount,
        currency: order.currency,
        name: 'Meal Express',
        description: 'Food Order Payment',
        order_id: order.id,
        handler: async function (response) {
          try {
            const verifyResponse = await fetch("https://meal-express-backend-production.up.railway.app/api/auth/verify-payment", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'auth-token': token
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                cartItems: items,
                deliveryAddress: checkoutAddress || userAddress,
                orderName: orderName,
                orderMobile: orderMobile
              })
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              const orderDataResponse = await fetch("https://meal-express-backend-production.up.railway.app/api/auth/orderData", {
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

              if (orderDataResponse.status === 200) {
                dispatch({ type: "DROP" });
                setOrderPlaced(true);
                setTimeout(() => {
                  navigate('/myorder');
                }, 1600);
              }
            } else {
              setToastType("error");
              setToastMessage("Payment verification failed! Please try again.");
              setShowSuccessToast(true);
              setTimeout(() => setShowSuccessToast(false), 3000);
            }
          } catch (error) {
            setToastType("error");
            setToastMessage("Payment verification failed! Please try again.");
            setShowSuccessToast(true);
            setTimeout(() => setShowSuccessToast(false), 3000);
          }
        },
        modal: {
          ondismiss: function() {
            setToastType("warning");
            setToastMessage("Payment cancelled. Your cart items are saved.");
            setShowSuccessToast(true);
            setTimeout(() => setShowSuccessToast(false), 3000);
          }
        },
        prefill: {
          email: userEmail,
          contact: '9999999999'
        },
        theme: {
          color: '#ff6f00'
        }
      };

      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', function (response) {
        setToastType("error");
        setToastMessage(`Payment failed: ${response.error.description || 'Please try again'}`);
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 4000);
      });

      rzp.open();
    } catch (error) {
      setToastType("error");
      setToastMessage('Failed to initiate payment. Please try again.');
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    }
  }

  const handleAddressSubmit = async () => {
    if (!checkoutAddress || checkoutAddress.trim() === "") {
      alert("Please enter a delivery address");
      return;
    }

    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    
    if (!token) {
      alert("Please login to save address");
      return;
    }

    if (!userName) {
      alert("User name not found. Please refresh and try again.");
      return;
    }

    try {
      const response = await fetch("https://meal-express-backend-production.up.railway.app/api/auth/updateuser", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
        body: JSON.stringify({
          name: userName,
          location: checkoutAddress.trim()
        })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setUserAddress(checkoutAddress.trim());
        setShowAddressForm(false);
        setToastType("success");
        setToastMessage("Address saved successfully!");
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 3000);
      } else {
        alert(data.error || "Failed to save address. Please try again.");
      }
    } catch (error) {
      alert("Network error: " + error.message + ". Make sure the backend server is running on port 5000.");
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  if (loading) {
    return (
      <div className="cart-loading">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

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
          {/* Cart Items Section */}
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
                            onClick={() => handleDecrementQuantity(index)}
                            disabled={food.qty <= 1}
                          >
                            -
                          </button>
                          <span className="quantity-display">{food.qty}</span>
                          <button 
                            className="btn-quantity" 
                            onClick={() => handleIncrementQuantity(index)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>{food.size}</td>
                      <td>₹{food.price}</td>
                      <td><button className="btn-delete" onClick={() => dispatch({ type: "REMOVE", index })}><Delete /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="checkout-section">
            <h3 className="section-title">Delivery & Payment</h3>

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
                  <input
                    type="tel"
                    className="form-control-inline"
                    placeholder="Enter mobile for this order"
                    value={orderMobile}
                    onChange={(e) => setOrderMobile(e.target.value)}
                    maxLength="10"
                  />
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

            <div className="address-section">
              <div className="address-header">
                <h4>Delivery Address</h4>
                {userAddress && (
                  <button
                    className="btn-change-address"
                    onClick={() => setShowAddressForm(!showAddressForm)}
                  >
                    {showAddressForm ? 'Cancel' : 'Change'}
                  </button>
                )}
              </div>

              {showAddressForm ? (
                <div className="address-form-inline">
                  <div className="form-group-inline">
                    <input
                      type="text"
                      className="form-control-inline"
                      placeholder="Enter your delivery address"
                      value={checkoutAddress}
                      onChange={(e) => setCheckoutAddress(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={handleLocationClick}
                      className="btn-location-inline"
                    >
                    Get Location
                    </button>
                  </div>
                  <div className="address-form-actions">
                    <button
                      className="btn-save-address"
                      onClick={handleAddressSubmit}
                    >
                      Save & Continue
                    </button>
                  </div>
                </div>
              ) : userAddress ? (
                <div className="saved-address">
                  <p>{userAddress}</p>
                </div>
              ) : (
                <div className="no-address">
                  <p>No delivery address set. Please add one to continue.</p>
                  <button
                    className="btn-add-address"
                    onClick={() => setShowAddressForm(true)}
                  >
                    + Add Address
                  </button>
                </div>
              )}
            </div>

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

            <div className="checkout-actions">
              <button
                className={`btn-checkout ${(!userAddress || showAddressForm || !orderName.trim() || !orderMobile.trim()) ? 'btn-disabled' : ''}`}
                onClick={handleCheckOut}
                disabled={!userAddress || showAddressForm || !orderName.trim() || !orderMobile.trim()}
              >
                {(!userAddress || showAddressForm || !orderName.trim() || !orderMobile.trim()) ? 'Complete Details to Continue' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
      <Footer />
      
      {showSuccessToast && (
        <div className={`success-toast ${toastType}`}>
          <div className="toast-message">{toastMessage}</div>
        </div>
      )}
    </div>
  )
}
