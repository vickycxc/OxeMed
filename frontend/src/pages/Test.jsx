import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import oxemedLogo from "../assets/oxemed.jpg";
import { useAuthStore } from "../store/useAuthStore";

const profilePicUrl = "https://randomuser.me/api/portraits/men/75.jpg";

const Test = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [activeSection, setActiveSection] = useState("home");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const startDetection = () => {
    if (isDetecting) return;
    setIsDetecting(true);
    setResult(null);
    setTimeout(() => {
      const simulatedSpO2 = (95 + Math.random() * 4).toFixed(1);
      const simulatedHeartRate = Math.floor(65 + Math.random() * 30);
      setResult({
        spO2: simulatedSpO2,
        heartRate: simulatedHeartRate,
        timestamp: new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      });
      setIsDetecting(false);
    }, 5000);
  };

  const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);
  const handleLogout = () => {
    // alert("Logged out!");
    setShowProfileMenu(false);
    logout();
    // navigate("/login");
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#f3f4f6",
      }}
    >
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
                  href="#login"
                  className={activeSection === "home" ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection("home");
                    navigate("/login");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#test"
                  className={activeTab === "tab1" ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("tab1");
                    navigate("/test");
                  }}
                >
                  Test
                </a>
              </li>

              <li>
                <a
                  href="#consultation"
                  className={activeTab === "tab2" ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("tab2");
                    navigate("/konsultasi");
                  }}
                >
                  Consultation
                </a>
              </li>

              <li>
                <a
                  href="#history"
                  className={activeTab === "tab3" ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("tab3");
                    window.scrollTo({ top: 0, behavior: "smooth" });
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
      <main
        style={{
          flex: 1,
          marginTop: 80,
          padding: "2rem 1rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            maxWidth: 600,
            width: "100%",
            padding: "2.5rem",
            textAlign: "center",
          }}
        >
          <h1 style={{ marginBottom: "1rem", color: "#2563eb" }}>
            Monitoring Kesehatan
          </h1>
          <p
            style={{
              marginBottom: "2rem",
              fontSize: "1.1rem",
              color: "#374151",
            }}
          >
            Tempelkan jari Anda pada alat OxeMed, kemudian tunggu beberapa detik
            hingga hasil deteksi muncul di bawah.
          </p>

          <button
            onClick={startDetection}
            disabled={isDetecting}
            style={{
              padding: "0.75rem 2rem",
              fontSize: "1.1rem",
              fontWeight: "600",
              backgroundColor: isDetecting ? "#9ca3af" : "#2563eb",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: isDetecting ? "not-allowed" : "pointer",
              marginBottom: "2rem",
              transition: "background-color 0.3s ease",
              userSelect: "none",
            }}
            aria-live="polite"
          >
            {isDetecting ? "Mendeteksi..." : "Hasil test"}
          </button>

          {isDetecting && (
            <div
              style={{
                marginBottom: "1rem",
                color: "#6b7280",
                fontStyle: "italic",
              }}
            >
              Harap tetap tenang dan jangan lepaskan jari Anda...
            </div>
          )}

          {result && (
            <div
              style={{
                backgroundColor: "#f9fafb",
                padding: "1.5rem",
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                fontSize: "1.1rem",
                color: "#111827",
              }}
            >
              <h2 style={{ marginBottom: "1rem", color: "#10b981" }}>
                Hasil Deteksi
              </h2>
              <p>
                <strong>SpO2:</strong> {result.spO2}%
              </p>
              <p>
                <strong>Detak Jantung:</strong> {result.heartRate} bpm
              </p>
              <p
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.9rem",
                  color: "#6b7280",
                }}
              >
                Terakhir diperbarui pada {result.timestamp}
              </p>
            </div>
          )}
        </div>
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
    </div>
  );
};

export default Test;
