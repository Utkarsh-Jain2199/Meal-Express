import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../components/styles/Signup.css'; // Import the CSS file

export default function Signup() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });
  let [address, setAddress] = useState("");
  let navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
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
    const response = await fetch("https://meal-express-backend.onrender.com/api/auth/getlocation", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ latlong: { lat, long } })
    });

    const { location } = await response.json();
    setAddress(location);
    setCredentials({ ...credentials, geolocation: location });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://meal-express-backend.onrender.com/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
    });

    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      navigate("/login");
    } else {
      alert("Enter Valid Credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="signup-container">
      <div>
        <Navbar />
      </div>

      <div className="signup-form-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h3 className="signup-heading">Signup</h3> {/* Added Signup Heading */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="address" className="form-label">Address</label>
            <fieldset>
              <input type="text" className="form-control" name="address" placeholder="Click below for fetching address" value={address} onChange={(e) => setAddress(e.target.value)} />
            </fieldset>
          </div>
          <div className="form-group">
            <button type="button" onClick={handleClick} name="geolocation" className="btn btn-success">Click for current Location</button>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} />
          </div>
          <button type="submit" className="btn btn-success">Submit</button>
          <Link to="/login" className="btn btn-danger">Already a user</Link>
        </form>
      </div>
    </div>
  );
}
