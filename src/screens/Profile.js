import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../components/styles/Profile.css';

export default function Profile() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    location: "",
    mobile: ""
  });
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");
  const [mobileError, setMobileError] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    const storedEmail = localStorage.getItem('userEmail');
    if (storedName) {
      setUserData(prev => ({ ...prev, name: storedName }));
    }
    if (storedEmail) {
      setUserData(prev => ({ ...prev, email: storedEmail }));
    }
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch("https://meal-express-backend-production.up.railway.app/api/auth/getuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        }
      });

      const user = await response.json();
      setUserData(user);
      setAddress(user.location || "");
      setMobile(user.mobile || "");
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleLocationClick = async (e) => {
    e.preventDefault();
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
      setAddress(location);
    } catch (error) {
      alert("Unable to get your current location. Please enter manually.");
    }
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    
    if (value === '') {
      setMobile('');
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
    setMobile(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setMessage("");
    setMobileError("");

    if (mobile && !/^\d{10}$/.test(mobile)) {
      setMobileError('Mobile number must be exactly 10 digits');
      setUpdating(false);
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
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
          name: userData.name,
          location: address.trim(),
          mobile: mobile.trim()
        })
      });

      const result = await response.json();
      if (result.success) {
        setMessage("Profile updated successfully!");
        setUserData({ ...userData, location: address.trim(), mobile: mobile.trim() });
        localStorage.setItem('userName', userData.name);
        localStorage.setItem('userMobile', mobile.trim());
      } else {
        setMessage("Failed to update profile. Please try again.");
      }
    } catch (error) {
      setMessage("Error updating profile. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    navigate('/login');
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

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <h2 className="profile-title">My Profile</h2>
            <p className="profile-subtitle">Welcome back, {userData.name || 'User'}!</p>
            <p className="profile-subtitle">Update your personal information and address</p>
          </div>

          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={userData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={userData.email}
                disabled
              />
              <small className="form-text">Email cannot be changed</small>
            </div>

            <div className="form-group">
              <label htmlFor="mobile" className="form-label">Mobile Number</label>
              <input
                type="tel"
                className={`form-control ${mobileError ? 'input-error' : ''}`}
                name="mobile"
                placeholder="Enter 10 digit mobile number"
                value={mobile}
                onChange={handleMobileChange}
                maxLength="10"
                pattern="[0-9]*"
                inputMode="numeric"
              />
              {mobileError && <span className="error-message">{mobileError}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="address" className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                placeholder="Enter your address manually or use location button below"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <button
                type="button"
                onClick={handleLocationClick}
                className="location-btn"
              >
                Get Current Location
              </button>
            </div>

            {message && (
              <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`}>
                {message}
              </div>
            )}

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={updating}
              >
                {updating ? 'Updating...' : 'Update Profile'}
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleLogout}
                style={{ marginLeft: '10px' }}
              >
                Logout
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
