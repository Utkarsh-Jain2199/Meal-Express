import React from 'react';
import './styles/Footer.css'; // New CSS file for additional styling

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <a href="/" className="text-decoration-none">
              <h5 className="footer-brand">Meal Express</h5>
            </a>
            <p className="text-muted mb-0">© 2025 Meal Express, Inc. All rights reserved. <br /> Made by Utkarsh Jain</p>
          </div>
          <div className="col-md-6 d-flex justify-content-center justify-content-md-end">
            <ul className="list-inline mb-0">
              <li className="list-inline-item me-3">
                <a className="text-light social-icon" href="/">
                  <i className="bi bi-facebook"></i>
                </a>
              </li>
              <li className="list-inline-item me-3">
                <a className="text-light social-icon" href="/">
                  <i className="bi bi-twitter"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a className="text-light social-icon" href="/">
                  <i className="bi bi-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
