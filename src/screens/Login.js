import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate, Link } from 'react-router-dom';
import '../components/styles/Login.css';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const googleButtonRef = useRef(null);
  let navigate = useNavigate();

  const fetchUserName = async (email) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/getuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        }
      });
      const user = await response.json();
      if (user && user.name) {
        localStorage.setItem('userName', user.name);
      }
    } catch (error) {
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!credentials.email.trim() || !credentials.password.trim()) {
      alert("Please fill in all fields");
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
      });

      const json = await response.json();
      if (json.success) {
        localStorage.setItem('userEmail', credentials.email);
        localStorage.setItem('token', json.authToken);
        fetchUserName(credentials.email);
        navigate("/");
      } else {
        if (json.errors && json.errors.length > 0) {
          const errorMessage = json.errors.map(error => error.msg).join(', ');
          alert(`Validation Error: ${errorMessage}`);
        } else if (json.error) {
          alert(`Error: ${json.error}`);
        } else {
          alert("Login failed. Please check your credentials and try again.");
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
          text: "signin_with",
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
      alert("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div>
        <Navbar />
      </div>
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h3 className="login-heading">Login</h3>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone.</div>
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} />
          </div>
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? 'Logging in...' : 'Submit'}
          </button>
          <Link to="/signup" className="btn btn-danger">New User</Link>
          
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
