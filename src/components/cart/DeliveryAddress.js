import React, { useState } from 'react';
import './styles/DeliveryAddress.css';

export default function DeliveryAddress({ 
  userAddress, 
  checkoutAddress, 
  setCheckoutAddress,
  setUserAddress,
  setToastType,
  setToastMessage,
  setShowSuccessToast
}) {
  const [showAddressForm, setShowAddressForm] = useState(false);

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
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/getlocation`, {
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
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/updateuser`, {
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
  };

  return (
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
  );
}

