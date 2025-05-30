import React, { useState, useEffect } from 'react';
import './app.css'; 
import oxemedLogo from './assets/oxemed.jpg';
import mainLogo from './assets/main.jpg';
import testLogo from './assets/test.jpg';
import consultationLogo from './assets/consultation.jpg';
import historyLogo from './assets/history.jpg';

const tabs = [
  { id: 'tab1', label: 'Test' },
  { id: 'tab2', label: 'Consultation' },
  { id: 'tab3', label: 'History' },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [activeSection, setActiveSection] = useState('home');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const featuresSection = document.getElementById('features');
      const scrollPosition = window.scrollY + 100; 

      if (featuresSection && scrollPosition >= featuresSection.offsetTop) {
        setActiveSection('features');
      } else {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openLoginModal = () => {
    setShowLoginModal(true);
    setShowSignupModal(false);
  };

  const openSignupModal = () => {
    setShowSignupModal(true);
    setShowLoginModal(false);
  };

  const closeModals = () => {
    setShowLoginModal(false);
    setShowSignupModal(false);
  };

  return (
    <div className="index-page">
      {/* Header */}
      <header
        id="header"
        className={`header d-flex align-items-center fixed-top ${
          activeSection === 'features' ? 'header-features-active' : 'header-home-active'
        }`}
      >
        <div className="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
          <div className="logo d-flex align-items-center me-auto me-xl-0">
            <img src={oxemedLogo} alt="Oxemed Logo" className="logo-img" />
          </div>

          <nav id="navmenu" className="navmenu">
            <ul>
              <li>
                <a
                  href="#header"
                  className={activeSection === 'home' ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
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
                    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Features
                </a>
              </li>
            </ul>
          </nav>

          {/* Login Button trigger modal */}
          <button className="btn-getstarted" onClick={openLoginModal}>Login</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>
              Stay Connected to <br />
              Your <span className="highlight">Respiratory</span> <br />
              <span className="highlight">Health </span>and <span className="highlight">Care</span>
            </h1>
            <p className="subheading">
              Track your respiratory health instantly and connect with medical experts anytime.
            </p>
            <p className="description">
              OxeMed offers real-time health tracking, enabling you to monitor your respiratory health and connect instantly with medical professionals for timely consultations. Take control of your health today and prevent complications before they arise.
            </p>
            <button className="btn-login" onClick={openLoginModal}>Login</button>
          </div>
          <div className="hero-image">
            <img src={mainLogo} alt="Main Logo" className="main-img" />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="features section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Features</h2>
            <p>OxeMed makes it easy to perform respiratory health tests, consult with specialists, and keep real-time medical history for optimal health monitoring.</p>
          </div>
          <div className="container">
            <div className="d-flex justify-content-center mb-4">
              <ul className="nav nav-tabs" role="tablist" style={{ borderRadius: '50px', backgroundColor: 'rgba(0,0,0,0.05)', padding: '6px 10px' }}>
                {tabs.map(({ id, label }) => (
                  <li key={id} className="nav-item" role="presentation" style={{ marginRight: '10px' }}>
                    <button
                      className={`nav-link ${activeTab === id ? 'active' : ''}`}
                      onClick={() => setActiveTab(id)}
                      type="button"
                      role="tab"
                      style={{
                        borderRadius: '50px',
                        padding: '10px 30px',
                        fontWeight: activeTab === id ? '600' : '400',
                        color: activeTab === id ? '#2563eb' : '#374151',
                        backgroundColor: activeTab === id ? '#e0f2ff' : 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <h4 style={{ margin: 0 }}>{label}</h4>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div data-aos="fade-up" data-aos-delay="200">
              {activeTab === 'tab1' && (
                <div className="row align-items-center">
                  <div className="col-lg-6 d-flex flex-column justify-content-center" style={{ marginLeft: '80px' }}>
                    <h3 className="feature-title">Test</h3>
                    <p className="feature-description">
                      Easily perform respiratory health tests using OxeMed’s intuitive and accurate monitoring tools.
                    </p>
                    <ul className="feature-list">
                      <li>Real-time oxygen saturation (SpO2) monitoring.</li>
                      <li>Track heart rate.</li>
                      <li>Simple test execution guided step-by-step.</li>
                    </ul>
                  </div>

                  <div className="col-lg-6 d-flex justify-content-end">
                    <img
                      src={testLogo}
                      alt="Test Logo"
                      className="test-img"
                      style={{ width: '450px', height: 'auto', marginLeft: '110px' }}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'tab2' && (
                <div className="row align-items-center">
                  <div className="col-lg-6 d-flex flex-column justify-content-center" style={{ marginLeft: '80px' }}>
                    <h3 className="feature-title">Consultation</h3>
                    <p className="feature-description">
                      Connect instantly with healthcare specialists for advice and digital prescriptions from anywhere.
                    </p>
                    <ul className="feature-list">
                      <li>Secure chat consultations.</li>
                      <li>Remote diagnosis and recommendations.</li>
                      <li>Flexible scheduling to fit your busy lifestyle.</li>
                    </ul>
                  </div>

                  <div className="col-lg-6 d-flex justify-content-end">
                    <img
                      src={consultationLogo}
                      alt="Consultation Logo"
                      className="consultation-img"
                      style={{ width: '410px', height: 'auto', marginLeft: '129px' }}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'tab3' && (
                <div className="row align-items-center">
                  <div className="col-lg-6 d-flex flex-column justify-content-center" style={{ marginLeft: '80px' }}>
                    <h3 className="feature-title">History</h3>
                    <p className="feature-description">
                      Keep a comprehensive and real-time medical history to monitor trends and health progress over time.
                    </p>
                    <ul className="feature-list">
                      <li>Automatically saved test results.</li>
                      <li>Easy access to past consultation notes.</li>
                      <li>Visual charts to track your health over time.</li>
                    </ul>
                  </div>

                  <div className="col-lg-6 d-flex justify-content-end">
                    <img
                      src={historyLogo}
                      alt="History Logo"
                      className="history-img"
                      style={{ width: '360px', height: 'auto', marginLeft: '146px' }}
                    />
                  </div>
                </div>
              )}
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

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Login to OxeMed</h2>
            <form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="Your email" required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" placeholder="Your password" required />
              </div>
              <button type="submit" className="btn-login">Login</button>
            </form>
            <p className="signup-text" style={{ textAlign: 'center', marginTop: '1rem' }}>
              Don't have an account?{' '}
              <button className="link-button" onClick={openSignupModal}>Sign Up</button>
            </p>
            <button className="modal-close-btn" onClick={closeModals}>×</button>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Sign Up for OxeMed</h2>
            <form>
              <div className="form-group">
                <label htmlFor="signup-email">Email</label>
                <input id="signup-email" type="email" placeholder="Your email" required />
              </div>
              <div className="form-group">
                <label htmlFor="signup-password">Password</label>
                <input id="signup-password" type="password" placeholder="Create a password" required />
              </div>
              <div className="form-group">
                <label htmlFor="signup-confirm-password">Confirm Password</label>
                <input id="signup-confirm-password" type="password" placeholder="Confirm password" required />
              </div>
              <button type="submit" className="btn-login">Sign Up</button>
            </form>
            <p className="signup-text" style={{ textAlign: 'center', marginTop: '1rem' }}>
              Already have an account?{' '}
              <button className="link-button" onClick={openLoginModal}>Login</button>
            </p>
            <button className="modal-close-btn" onClick={closeModals}>×</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
