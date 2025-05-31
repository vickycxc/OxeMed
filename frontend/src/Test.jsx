import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import oxemedLogo from './assets/oxemed.jpg';

const profilePicUrl = "https://randomuser.me/api/portraits/men/75.jpg";

const HeaderFooter = ({ activeSection, setActiveSection, activeTab, setActiveTab }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);

  const handleLogout = () => {
    alert("Logged out!");
    setShowProfileMenu(false);
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const profileMenu = document.getElementById("profile-menu");
      const profileImg = document.getElementById("profile-img");

      if (
        profileMenu &&
        !profileMenu.contains(event.target) &&
        profileImg &&
        !profileImg.contains(event.target) &&
        (activeTab === 'tab1' || activeTab === 'tab2' || activeTab === 'tab3')
      ) {
        setShowProfileMenu(false);
        setActiveSection('features');
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeTab, setActiveSection]);

  return (
    <>
      {/* Header */}
      <header
        id="header"
        className={`header d-flex align-items-center fixed-top ${
          activeSection === 'features' ? 'header-features-active' : 'header-home-active'
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
                  href="#header"
                  className={activeSection === 'home' ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setActiveSection('home');
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className={activeSection === 'features' ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab('tab1');
                    setActiveSection('features');
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#tab1"
                  className={activeTab === 'tab1' ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab('tab1');
                    setActiveSection('features');
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Test
                </a>
              </li>
              <li>
                <a
                  href="#tab2"
                  className={activeTab === 'tab2' ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab('tab2');
                    setActiveSection('features');
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Consultation
                </a>
              </li>
              <li>
                <a
                  href="#tab3"
                  className={activeTab === 'tab3' ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab('tab3');
                    setActiveSection('features');
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
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
              style={{ width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' }} 
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

export default HeaderFooter;
