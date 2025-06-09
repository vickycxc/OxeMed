import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import oxemedLogo from './assets/oxemed.jpg';

const profilePicUrl = "https://randomuser.me/api/portraits/men/75.jpg";

const Test = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  // Dummy detection function simulating measurement delay
  const startDetection = () => {
    if (isDetecting) return; // Prevent double start
    setIsDetecting(true);
    setResult(null);

    // Simulate detection delay (e.g., 5 seconds)
    setTimeout(() => {
      // Simulated results (could be random or fixed)
      const simulatedSpO2 = (95 + Math.random() * 4).toFixed(1);
      const simulatedHeartRate = Math.floor(65 + Math.random() * 30);
      setResult({
        spO2: simulatedSpO2,
        heartRate: simulatedHeartRate,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      });
      setIsDetecting(false);
    }, 5000);
  };

  // Navigation handlers
  const goTo = (path, tab) => {
    setActiveTab(tab);
    navigate(path);
    window.scrollTo(0, 0);
  };

  const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);
  const handleLogout = () => {
    alert("Logged out!");
    setShowProfileMenu(false);
    navigate("/");
    window.scrollTo(0, 0);
  };

  // Scroll top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Header */}
      <header
        id="header"
        className="header d-flex align-items-center fixed-top header-home-active"
        style={{ backgroundColor: '#fff', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', zIndex: 999 }}
      >
        <div className="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
          {/* Logo */}
          <div className="logo d-flex align-items-center me-auto me-xl-0" style={{ cursor: 'pointer' }} onClick={() => goTo('/login', 'home')}>
            <img src={oxemedLogo} alt="Oxemed Logo" className="logo-img" style={{ height: 50 }} />
          </div>

          {/* Navigation Menu */}
          <nav id="navmenu" className="navmenu">
            <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
              <li>
                <a
                  href="#login"
                  className={activeTab === 'home' ? 'active' : ''}
                  onClick={e => {
                    e.preventDefault();
                    goTo('/login', 'home');
                  }}
                  style={{ textDecoration: activeTab === 'home' ? 'underline' : 'none', cursor: 'pointer' }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#test"
                  className={activeTab === 'tab1' ? 'active' : ''}
                  onClick={e => {
                    e.preventDefault();
                    goTo('/test', 'tab1');
                  }}
                  style={{ textDecoration: activeTab === 'tab1' ? 'underline' : 'none', cursor: 'pointer' }}
                >
                  Test
                </a>
              </li>
              <li>
                <a
                  href="#consultation"
                  className={activeTab === 'tab2' ? 'active' : ''}
                  onClick={e => {
                    e.preventDefault();
                    goTo('/konsultasi', 'tab2');
                  }}
                  style={{ textDecoration: activeTab === 'tab2' ? 'underline' : 'none', cursor: 'pointer' }}
                >
                  Consultation
                </a>
              </li>
              <li>
                <a
                  href="#history"
                  className={activeTab === 'tab3' ? 'active' : ''}
                  onClick={e => {
                    e.preventDefault();
                    goTo('/riwayat', 'tab3');
                  }}
                  style={{ textDecoration: activeTab === 'tab3' ? 'underline' : 'none', cursor: 'pointer' }}
                >
                  History
                </a>
              </li>
            </ul>
          </nav>

          {/* Profile Picture */}
          <div className="user-profile" style={{ position: 'relative' }}>
            <img
              src={profilePicUrl}
              alt="User Profile"
              id="profile-img"
              className="profile-img"
              onClick={toggleProfileMenu}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                cursor: 'pointer'
              }}
            />
            {showProfileMenu && (
              <div
                id="profile-menu"
                className="profile-menu"
                style={{
                  position: 'absolute',
                  top: '50px',
                  right: 0,
                  backgroundColor: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '10px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  zIndex: 1000,
                }}
              >
                <button
                  onClick={handleLogout}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#2563eb',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main
        style={{
          paddingTop: '100px',
          paddingBottom: '40px',
          minHeight: '80vh',
          maxWidth: '600px',
          margin: 'auto',
          backgroundColor: '#f9fafb',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <h1 style={{ marginBottom: '1rem', color: '#2563eb' }}>Monitoring Kesehatan</h1>
        <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
          Tempelkan jari Anda pada alat OxeMed, kemudian tunggu beberapa detik hingga hasil deteksi muncul di bawah.
        </p>

        {/* Button to start detection */}
        <button
          onClick={startDetection}
          disabled={isDetecting}
          style={{
            padding: '0.75rem 2rem',
            fontSize: '1.1rem',
            fontWeight: '600',
            backgroundColor: isDetecting ? '#9ca3af' : '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: isDetecting ? 'not-allowed' : 'pointer',
            marginBottom: '2rem',
            transition: 'background-color 0.3s ease',
          }}
          aria-live="polite"
        >
          {isDetecting ? 'Mendeteksi...' : 'Mulai Deteksi'}
        </button>

        {/* Show loading animation or results */}
        {isDetecting && (
          <div style={{ marginBottom: '1rem', color: '#6b7280' }}>
            <em>Harap tetap tenang dan jangan lepaskan jari Anda...</em>
          </div>
        )}

        {result && (
          <div
            style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              fontSize: '1.1rem',
              color: '#111827',
            }}
          >
            <h2 style={{ marginBottom: '1rem', color: '#10b981' }}>Hasil Deteksi</h2>
            <p>
              <strong>SpO2:</strong> {result.spO2}%
            </p>
            <p>
              <strong>Detak Jantung:</strong> {result.heartRate} bpm
            </p>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#6b7280' }}>
              Terakhir diperbarui pada {result.timestamp}
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        id="footer"
        className="footer"
        style={{
          marginTop: '40px',
          padding: '1.5rem 0',
          backgroundColor: '#2563eb',
          color: 'white',
          textAlign: 'center',
          fontWeight: '600',
        }}
      >
        <p style={{ margin: 0, fontSize: '1.25rem' }}>
          OxeMed<br />
          Teknologi Kedokteran - Kelompok 4
        </p>
        <p style={{ marginTop: '8px', fontSize: '0.9rem', fontWeight: '400' }}>
          © {new Date().getFullYear()}. All Rights Reserved.
        </p>
      </footer>
    </>
  );
};

export default Test;
