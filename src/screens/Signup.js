import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../components/styles/Signup.css';

export default function Signup() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const googleButtonRef = useRef(null);
  let navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!credentials.name.trim() || !credentials.email.trim() || !credentials.password.trim()) {
      alert("Please fill in all fields");
      return;
    }
    
    if (credentials.password.length < 5) {
      alert("Password must be at least 5 characters long");
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/createuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          name: credentials.name, 
          email: credentials.email, 
          password: credentials.password
        })
      });

      const json = await response.json();
      if (json.success) {
        localStorage.setItem('token', json.authToken);
        localStorage.setItem('userEmail', credentials.email);
        localStorage.setItem('userName', credentials.name);
        navigate("/");
      } else {
        if (json.errors && json.errors.length > 0) {
          const errorMessage = json.errors.map(error => error.msg).join(', ');
          alert(`Validation Error: ${errorMessage}`);
        } else if (json.error) {
          if (json.error.includes("Email already exists")) {
            alert(`${json.error}\n\nIf you already have an account, please go to the Login page instead.`);
          } else {
            alert(`Error: ${json.error}`);
          }
        } else {
          alert("Failed to create account. Please try again.");
        }
      }
    } catch (error) {
      alert("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (window.google && googleButtonRef.current) {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse
      });

      window.google.accounts.id.renderButton(
        googleButtonRef.current,
        {
          theme: "filled_blue",
          size: "large",
          text: "signup_with",
          shape: "rectangular",
          width: 300
        }
      );
    }
  }, []);

  const handleGoogleResponse = async (response) => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/google-auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          credential: response.credential
        })
      });

      const json = await res.json();
      if (json.success) {
        localStorage.setItem('token', json.authToken);
        localStorage.setItem('userEmail', json.userEmail);
        localStorage.setItem('userName', json.userName);
        navigate("/");
      } else {
        alert(`Error: ${json.error}`);
      }
    } catch (error) {
      alert("Google sign-up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div>
        <Navbar />
      </div>

      <div className="signup-form-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h3 className="signup-heading">Signup</h3>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} />
          </div>
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? 'Creating Account...' : 'Submit'}
          </button>
          <Link to="/login" className="btn btn-danger">Already a user</Link>
          
          <div className="divider">
            <span>OR</span>
          </div>
          
          <div className="google-login-wrapper">
            <div ref={googleButtonRef}></div>
          </div>
        </form>
      </div>
    </div>
  );
}
