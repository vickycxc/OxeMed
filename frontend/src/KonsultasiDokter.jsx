import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import oxemedLogo from './assets/oxemed.jpg';
import consultationLogo from './assets/consultation.jpg';  // Fixed the import for this image

const profilePicUrl = "https://randomuser.me/api/portraits/men/75.jpg";

const KonsultasiDokter = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  // Scroll to the top when the page is first loaded
  useEffect(() => {
    window.scrollTo(0, 0);  // This will scroll to the top of the page
  }, []);

  // Handle the scroll to the consultation section
  useEffect(() => {
    if (window.location.hash === '#consultation') {
      const consultationSection = document.getElementById('consultation');
      if (consultationSection) {
        consultationSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [window.location.hash]);  // Dependency on the hash to detect changes

  // Navigation functions
  const goToHome = () => {
    navigate('/logindokter');
    window.scrollTo(0, 0);  // Scroll to top when navigating
  };

  const goToConsultation = () => {
    navigate('/logindokter#consultation');  // Navigate to logindokter and scroll to the #consultation section
    setActiveTab('tab2');  // Update the active tab
    window.scrollTo(0, 0);  // Scroll to top when navigating
  };

  // Handle profile menu toggle
  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  // Handle logout functionality
  const handleLogout = () => {
    alert("Logged out!");
    setShowProfileMenu(false);
    navigate("/");
    window.scrollTo(0, 0);  // Scroll to top when logging out
  };

  return (
    <div className="container">
      {/* Header */}
      <header
        id="header"
        className={`header d-flex align-items-center fixed-top ${
          activeTab === 'tab1' ? 'header-test-active' : activeTab === 'tab2' ? 'header-consultation-active' : 'header-history-active'
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
                  href="#"
                  onClick={goToHome}  // Navigate to LoginDokter
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#consultation"
                  onClick={goToConsultation}  // Navigate to LoginDokter and scroll to consultation
                >
                  Consultation
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
                cursor: 'pointer',
                marginLeft: '20px',
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
      <main className="main" style={{ paddingTop: '100px' }}>
        <h1 className="text-center">DIBUAT MIRIP KONSULTASI, NANTI LANGSUNG POV CHATTAN DENGAN PASIEN</h1>
        <div className="text-center">
          <Link to="/konsultasi" className="btn btn-primary m-2">
            Konsultasi
          </Link>
          <Link to="/riwayat" className="btn btn-secondary m-2">
            Riwayat Konsultasi
          </Link>
        </div>
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

      {/* Scroll Top Button */}
      <a href="#header" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </div>
  );
};

export default KonsultasiDokter;
