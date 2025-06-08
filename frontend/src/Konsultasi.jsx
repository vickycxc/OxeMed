import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import oxemedLogo from './assets/oxemed.jpg';
import consultationLogo from './assets/consultation.jpg';  // Fixed the import for this image

const profilePicUrl = "https://randomuser.me/api/portraits/men/75.jpg";

const Konsultasi = () => {
  const [activeTab, setActiveTab] = useState('tab2');  // default active tab for Consultation
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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
    <div className="consultation-page">
      {/* Header */}
      <header className="header d-flex align-items-center fixed-top header-home-active">
        <div className="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
          <div className="logo d-flex align-items-center me-auto me-xl-0">
            <img src={oxemedLogo} alt="Oxemed Logo" className="logo-img" />
          </div>

          {/* Navigation Menu */}
          <nav id="navmenu" className="navmenu">
            <ul>
              <li>
                <a
                  href="#"
                  className={activeTab === 'home' ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    goToHome();  // Navigate to Home Page
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={activeTab === 'tab1' ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    goToTest();  // Navigate to Test Page
                  }}
                >
                  Test
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className={activeTab === 'tab2' ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    goToConsultation();  // Navigate to Consultation Page
                  }}
                >
                  Consultation
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className={activeTab === 'tab3' ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    goToHistory();  // Navigate to History Page
                  }}
                >
                  History
                </a>
              </li>
            </ul>
          </nav>

          {/* Profile Icon */}
          <div className="user-profile" style={{ position: 'relative' }}>
            <img
              src={profilePicUrl}
              alt="Profile"
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
        <section className="features section">
          <div className="container section-title" data-aos="fade-up">
            <h2>DIBUAT LANGSUNG PILIHAN DOKTER BARU CHAT DENGAN DOKTER</h2>
          </div>

          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 d-flex flex-column justify-content-center" style={{ marginLeft: '80px' }}>
                <h3 className="feature-title">Konsultasi Kesehatan Online</h3>
                <p className="feature-description">
                  Dapatkan saran medis langsung dari dokter spesialis pernapasan melalui layanan konsultasi OxeMed.
                </p>
              </div>

              <div className="col-lg-6 d-flex justify-content-end">
                <img
                  src={consultationLogo}
                  alt="Consultation"
                  className="consultation-img"
                  style={{ width: '420px', height: 'auto', marginLeft: '100px' }}
                />
              </div>
            </div>
          </div>
        </section>
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

export default Konsultasi;
