import React, { useState } from 'react';
import './app.css';
import { NavLink } from 'react-router-dom';
import oxemedLogo from './assets/oxemed.jpg';  // Sesuaikan path

const Login = () => {
  return (
    <div className="index-page">
      {/* Header */}
      <header id="header" className="header d-flex align-items-center fixed-top">
        <div className="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
          {/* Logo with image */}
          <NavLink to="/" className="logo d-flex align-items-center me-auto me-xl-0">
            <img src={oxemedLogo} alt="Oxemed Logo" className="logo-img" />
          </NavLink>

          {/* Navigation Menu */}
          <nav id="navmenu" className="navmenu">
            <ul>
              <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
              <li><NavLink to="/test" className={({ isActive }) => isActive ? 'active' : ''}>Test</NavLink></li>
              <li><NavLink to="/konsultasi" className={({ isActive }) => isActive ? 'active' : ''}>Consultation</NavLink></li>
              <li><NavLink to="/riwayat" className={({ isActive }) => isActive ? 'active' : ''}>History</NavLink></li>
            </ul>
          </nav>

          {/* Get Started Button */}
          <NavLink className="btn-getstarted" to="/login">Login</NavLink>
        </div>
      </header>

      {/* Main Content (Login form or content here) */}
      <main style={{ marginTop: '100px' }}>
        {/* Your login content */}
      </main>

      {/* Footer */}
      <footer id="footer" className="footer" style={{ marginTop: '40px' }}>
        <div className="footer-bottom text-center mt-4">
          <p style={{ margin: 0, fontWeight: '700', fontSize: '1.25rem' }}>
            OxeMed<br />
            Teknologi Kedokteran - Kelompok 4
          </p>
          <p style={{ marginTop: '8px', fontSize: '0.9rem', fontWeight: '400' }}>
            © {new Date().getFullYear()}. All Rights Reserved.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default Login;
