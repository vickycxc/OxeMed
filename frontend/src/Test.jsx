import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import oxemedLogo from './assets/oxemed.jpg';
import consultationLogo from './assets/consultation.jpg';  // Fixed the import for this image

const profilePicUrl = "https://randomuser.me/api/portraits/men/75.jpg";

const Test = () => {
  const [activeTab, setActiveTab] = useState('tab1');  // default active tab for Test
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  // Navigation functions
  const goToHome = () => {
    navigate('/login');
    window.scrollTo(0, 0);  // Scroll to top when navigating
  };

  const goToConsultation = () => {
    navigate('/konsultasi');
    setActiveTab('tab2');  // Update the active tab
    window.scrollTo(0, 0);  // Scroll to top when navigating
  };

  const goToTest = () => {
    navigate('/test');  // Navigate to Test Page
    setActiveTab('tab1');  // Update the active tab
    window.scrollTo(0, 0);  // Scroll to top when navigating
  };

  const goToHistory = () => {
    navigate('/riwayat');
    setActiveTab('tab3');  // Update the active tab
    window.scrollTo(0, 0);  // Scroll to top when navigating
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleLogout = () => {
    alert("Logged out!");
    setShowProfileMenu(false);
    navigate("/");
    window.scrollTo(0, 0);  // Scroll to top when logging out
  };

  // Scroll to top on initial mount
  useEffect(() => {
    window.scrollTo(0, 0);  // Ensure scrolls to top when the page first loads
  }, []);

  return (
    <>
      {/* Header */}
      <header
        id="header"
        className={`header d-flex align-items-center fixed-top ${
          activeSection === 'features'
            ? 'header-features-active'
            : 'header-home-active'
        }`}
      >
        <div className="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
          {/* Logo */}
          <div className="logo d-flex align-items-center me-auto me-xl-0">
            <img src={oxemedLogo} alt="Oxemed Logo" className="logo-img" />
          </div>

          {/* Navigation Menu */}
          <nav id="navmenu" className="navmenu">
            <ul>
              <li>
                <a
                  href="#login"
                  className={activeSection === 'home' ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection('home');
                    navigate('/login');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#test"
                  className={activeTab === 'tab1' ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab('tab1');
                    navigate('/test');
                  }}
                >
                  Test
                </a>
              </li>

              <li>
                <a
                  href="#consultation"
                  className={activeTab === 'tab2' ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab('tab2');
                    navigate('/konsultasi');
                  }}
                >
                  Consultation
                </a>
              </li>

              <li>
                <a
                  href="#history"
                  className={activeTab === 'tab3' ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab('tab3');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
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
                  right: '0',
                  backgroundColor: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '10px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  zIndex: 1000
                }}
              >
                <button
                  onClick={handleLogout}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#2563eb',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

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
    </>
  );
};

export default Test;
