import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/app.css";
import oxemedLogo from "../assets/oxemed.jpg";
import mainLogo from "../assets/main.jpg";
import testLogo from "../assets/test.jpg";
import consultationLogo from "../assets/consultation.jpg";
import historyLogo from "../assets/history.jpg";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const tabs = [
  { id: "tab1", label: "Test" },
  { id: "tab2", label: "Consultation" },
  { id: "tab3", label: "History" },
];

const profilePicUrl = "https://randomuser.me/api/portraits/men/75.jpg";

const Login = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();

  // Handler untuk navigasi ke masing-masing halaman
  const goToTest = () => navigate("/test");
  const goToConsultation = () => navigate("/konsultasi");
  const goToHistory = () => navigate("/riwayat");

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const { user, logout } = useAuthStore();

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleLogout = () => {
    // alert("Logged out!");
    setShowProfileMenu(false);
    logout();
    // navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProfile = () => {
    setShowProfileMenu(false);
    navigate("/profile");
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
        (activeTab === "tab1" || activeTab === "tab2" || activeTab === "tab3")
      ) {
        setShowProfileMenu(false);
        setActiveSection("features");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeTab]);

  return (
    <div className="index-page">
      {/* Header */}
      <header
        id="header"
        className={`header d-flex align-items-center fixed-top ${
          activeSection === "features"
            ? "header-features-active"
            : "header-home-active"
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
                  href="#home"
                  className={activeSection === "home" ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection("home");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className={activeSection === "features" ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("tab1"); // tampilkan tab Test saat klik Features
                    document
                      .getElementById("features")
                      .scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#tab1"
                  className={activeTab === "tab1" ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("tab1");
                    document
                      .getElementById("features")
                      .scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Test
                </a>
              </li>
              <li>
                <a
                  href="#tab2"
                  className={activeTab === "tab2" ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("tab2");
                    document
                      .getElementById("features")
                      .scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Consultation
                </a>
              </li>
              <li>
                <a
                  href="#tab3"
                  className={activeTab === "tab3" ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("tab3");
                    document
                      .getElementById("features")
                      .scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  History
                </a>
              </li>
            </ul>
          </nav>

          {/* Profile Picture */}
          <div className="user-profile" style={{ position: "relative" }}>
            <img
              src={profilePicUrl}
              alt="User Profile"
              id="profile-img"
              className="profile-img"
              onClick={toggleProfileMenu}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            />

            {showProfileMenu && (
              <div
                id="profile-menu"
                className="profile-menu"
                style={{
                  position: "absolute",
                  top: "50px",
                  right: "0",
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "10px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  zIndex: 1000,
                }}
              >
                <button
                  onClick={handleProfile}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#2563eb",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#2563eb",
                    fontWeight: "600",
                    cursor: "pointer",
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
      <main className="main" style={{ paddingTop: "100px" }}>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content" style={{ paddingLeft: "2rem" }}>
            <h4
              style={{
                color: "#2563eb",
                fontWeight: "700",
                fontSize: "1.5rem",
                marginBottom: "0.5rem",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                letterSpacing: "1px",
              }}
            >
              {`Hello, ${user.fullName}!`}
            </h4>
            <h1>
              Your <span className="highlight">Real-Time</span> <br />
              Respiratory <span className="highlight">Health</span> Companion
            </h1>
            <p className="subheading">
              Monitor your respiratory health effortlessly and access your
              medical history anytime.
            </p>
            <p className="description">
              Use our features to review test results, consult with healthcare
              professionals, and track your health progress seamlessly.
            </p>
          </div>
          <div className="hero-image">
            <img src={mainLogo} alt="Main Logo" className="main-img" />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="features section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Features</h2>
            <p>
              OxeMed makes it easy to perform respiratory health tests, consult
              with specialists, and keep real-time medical history for optimal
              health monitoring.
            </p>
          </div>
          <div className="container">
            <div className="d-flex justify-content-center mb-4">
              <ul
                className="nav nav-tabs"
                role="tablist"
                style={{
                  borderRadius: "50px",
                  backgroundColor: "rgba(0,0,0,0.05)",
                  padding: "6px 10px",
                }}
              >
                {tabs.map(({ id, label }) => (
                  <li
                    key={id}
                    className="nav-item"
                    role="presentation"
                    style={{ marginRight: "10px" }}
                  >
                    <button
                      className={`nav-link ${activeTab === id ? "active" : ""}`}
                      onClick={() => setActiveTab(id)}
                      type="button"
                      role="tab"
                      style={{
                        borderRadius: "50px",
                        padding: "10px 30px",
                        fontWeight: activeTab === id ? "600" : "400",
                        color: activeTab === id ? "#2563eb" : "#374151",
                        backgroundColor:
                          activeTab === id ? "#e0f2ff" : "transparent",
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <h4 style={{ margin: 0 }}>{label}</h4>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div data-aos="fade-up" data-aos-delay="200">
              {activeTab === "tab1" && (
                <div className="row align-items-center">
                  <div
                    className="col-lg-6 d-flex flex-column justify-content-center"
                    style={{ marginLeft: "80px" }}
                  >
                    <h3 className="feature-title">Test</h3>
                    <p className="feature-description">
                      Easily perform respiratory health tests using OxeMed’s
                      intuitive and accurate monitoring tools.
                    </p>
                    <ul className="feature-list">
                      <li>Real-time oxygen saturation (SpO2) monitoring.</li>
                      <li>Track heart rate.</li>
                      <li>Simple test execution guided step-by-step.</li>
                    </ul>
                    <button
                      className="btn-login"
                      style={{ width: "fit-content", marginTop: "20px" }}
                      onClick={goToTest}
                    >
                      Start Test
                    </button>
                  </div>

                  <div className="col-lg-6 d-flex justify-content-end">
                    <img
                      src={testLogo}
                      alt="Test Logo"
                      className="test-img"
                      style={{
                        width: "450px",
                        height: "auto",
                        marginLeft: "110px",
                      }}
                    />
                  </div>
                </div>
              )}

              {activeTab === "tab2" && (
                <div className="row align-items-center">
                  <div
                    className="col-lg-6 d-flex flex-column justify-content-center"
                    style={{ marginLeft: "80px" }}
                  >
                    <h3 className="feature-title">Consultation</h3>
                    <p className="feature-description">
                      Connect instantly with healthcare specialists for advice
                      and digital prescriptions from anywhere.
                    </p>
                    <ul className="feature-list">
                      <li>Secure chat consultations.</li>
                      <li>Remote diagnosis and recommendations.</li>
                      <li>Flexible scheduling to fit your busy lifestyle.</li>
                    </ul>
                    <button
                      className="btn-login"
                      style={{ width: "fit-content", marginTop: "20px" }}
                      onClick={goToConsultation}
                    >
                      Start Consultation
                    </button>
                  </div>

                  <div className="col-lg-6 d-flex justify-content-end">
                    <img
                      src={consultationLogo}
                      alt="Consultation Logo"
                      className="consultation-img"
                      style={{
                        width: "410px",
                        height: "auto",
                        marginLeft: "129px",
                      }}
                    />
                  </div>
                </div>
              )}

              {activeTab === "tab3" && (
                <div className="row align-items-center">
                  <div
                    className="col-lg-6 d-flex flex-column justify-content-center"
                    style={{ marginLeft: "80px" }}
                  >
                    <h3 className="feature-title">History</h3>
                    <p className="feature-description">
                      Keep a comprehensive and real-time medical history to
                      monitor trends and health progress over time.
                    </p>
                    <ul className="feature-list">
                      <li>Automatically saved test results.</li>
                      <li>Visual charts to track your health over time.</li>
                      <li>Easy access to past consultation notes.</li>
                    </ul>
                    <button
                      className="btn-login"
                      style={{ width: "fit-content", marginTop: "20px" }}
                      onClick={goToHistory}
                    >
                      View History
                    </button>
                  </div>

                  <div className="col-lg-6 d-flex justify-content-end">
                    <img
                      src={historyLogo}
                      alt="History Logo"
                      className="history-img"
                      style={{
                        width: "360px",
                        height: "auto",
                        marginLeft: "146px",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="footer" className="footer" style={{ marginTop: "40px" }}>
        <div className="footer-bottom text-center mt-4">
          <p style={{ margin: 0, fontWeight: "700", fontSize: "1.25rem" }}>
            OxeMed
            <br />
            Teknologi Kedokteran - Kelompok 4
          </p>
          <p
            style={{ marginTop: "8px", fontSize: "0.9rem", fontWeight: "400" }}
          >
            © {new Date().getFullYear()}. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* Scroll Top Button */}
      <a
        href="#header"
        id="scroll-top"
        className="scroll-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </div>
  );
};

export default Login;
