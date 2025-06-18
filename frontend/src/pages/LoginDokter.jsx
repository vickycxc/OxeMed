import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/app.css";
import oxemedLogo from "../assets/oxemed.jpg";
import mainLogo from "../assets/main.jpg";
import consultationLogo from "../assets/consultation.jpg";
import historyLogo from "../assets/history.jpg";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const profilePicUrl = "https://randomuser.me/api/portraits/men/75.jpg";

const LoginDokter = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { consultations, getConsultations, isUsersLoading } = useChatStore();

  // Handler untuk navigasi ke masing-masing halaman
  const goToHome = () => navigate("#home");
  const goToConsultation = () => navigate("#consultation");

  // Fungsi untuk mengarahkan ke halaman konsultasi
  const handleOngoingClick = (patientId) => {
    navigate(`/konsultasi/${patientId}`);
  };

  // Fungsi untuk mengarahkan ke halaman RiwayatDokter.jsx
  const handleViewHistory = () => {
    navigate("/riwayat"); // Menavigasi ke halaman RiwayatDokter
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const consultationSection = document.getElementById("consultation");
      const scrollPosition = window.scrollY + 100;

      if (
        consultationSection &&
        scrollPosition >= consultationSection.offsetTop
      ) {
        setActiveSection("consultation");
      } else {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    getConsultations(true);
  }, [getConsultations]);

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

  const pasienData = [
    {
      nama: "Aisyah Ramadhani",
      umur: "11 Tahun",
      penyakit: "",
      status: "Sedang Berlangsung",
      waktu: "9 Mei 2025, 15:32",
    },
    {
      nama: "Alif Nugraha",
      umur: "10 Tahun",
      penyakit: "Cacar Air (Varisela)",
      status: "Selesai",
      waktu: "9 Mei 2025, 14:30",
    },
    {
      nama: "Lutfia Zahra",
      umur: "8 Tahun",
      penyakit: "Campak (Rubeola)",
      status: "Selesai",
      waktu: "9 Mei 2025, 13:59",
    },
  ];

  // Handle link click for smooth scroll and active section update
  const handleLinkClick = (e, section) => {
    e.preventDefault();
    setActiveSection(section); // Set active section to the clicked section
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to section
  };

  return (
    <div className="index-page">
      {/* Header */}
      <header
        id="header"
        className={`header d-flex align-items-center fixed-top ${
          activeSection === "home"
            ? "header-home-active"
            : activeSection === "consultation"
            ? "header-consultation-active"
            : "header-history-active"
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
                  onClick={(e) => handleLinkClick(e, "home")}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#consultation"
                  className={activeSection === "consultation" ? "active" : ""}
                  onClick={(e) => handleLinkClick(e, "consultation")}
                >
                  Consultation
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
      <main className="main" style={{ paddingTop: "100px" }}>
        {/* Hero Section */}
        <section className="hero-section" id="home">
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
              Effortless <span className="highlight">Medical</span> <br />
              <span className="highlight">Practice</span> Management
            </h1>
            <p className="subheading">
              Manage your patients' health records, consultations, and
              appointments seamlessly with our platform.
            </p>
            <p className="description">
              Access real-time health data, review test results, consult with
              patients, and track their progress—all in one place.
            </p>
          </div>
          <div className="hero-image">
            <img src={mainLogo} alt="Main Logo" className="main-img" />
          </div>
        </section>

        {/* Consultation Section */}
        {!isUsersLoading && (
          <section className="consultation section" id="consultation">
            <div className="pasien-container">
              <h2>Daftar Pasien Hari Ini</h2>
              <div className="pasien-list">
                {consultations.map((consultation, index) => (
                  <div className="pasien-card" key={index}>
                    <div className="pasien-info">
                      <h2>{consultation.patient.fullName}</h2>
                      <p>
                        <strong>Waktu:</strong>{" "}
                        {new Intl.DateTimeFormat("id-ID", {
                          dateStyle: "full",
                          timeStyle: "long",
                        }).format(new Date(consultation.timeStart))}
                      </p>
                    </div>
                    <div
                      className={`status ${consultation.status}`}
                      onClick={() => {
                        handleOngoingClick(consultation.patientId);
                      }}
                    >
                      <p>{consultation.status}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="lihat-lebih-banyak"
                onClick={handleViewHistory}
              >
                Lihat Riwayat Pasien
              </button>
            </div>
          </section>
        )}
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

export default LoginDokter;
