import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/app.css";
import oxemedLogo from "../assets/oxemed.jpg";
import mainLogo from "../assets/main.jpg";
import consultationLogo from "../assets/consultation.jpg";
import historyLogo from "../assets/history.jpg";
import arrow from "../assets/arrow.jpg"; // Import the back arrow image
const profilePicUrl = "https://randomuser.me/api/portraits/men/75.jpg";

const RiwayatDokter = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Scroll to top when the page is first loaded
  useEffect(() => {
    window.scrollTo(0, 0); // This will scroll to the top of the page
  }, []);

  // Handler untuk navigasi ke masing-masing halaman
  const goToHome = () => navigate("/logindokter");
  const goToConsultation = () => navigate("/logindokter#consultation");

  // Fungsi untuk mengarahkan ke halaman konsultasi
  const handleOngoingClick = () => {
    navigate("/konsultasidokter");
  };

  // Fungsi untuk mengarahkan ke halaman RiwayatDokter.jsx
  const handleViewHistory = () => {
    navigate("/riwayatdokter"); // Menavigasi ke halaman RiwayatDokter
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

  // Simulasi user
  const user = {
    name: "dr. Liem Eremius, Sp.A",
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleLogout = () => {
    alert("Logged out!");
    setShowProfileMenu(false);
    navigate("/");
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
    {
      nama: "Keisha Ayu Lestari",
      umur: "3 Tahun",
      penyakit: "Diare Akut",
      status: "Selesai",
      waktu: "8 Mei 2025, 17:10",
    },
    {
      nama: "Riko Setiawan",
      umur: "8 Tahun",
      penyakit: "Konjungtivitis Bakteri",
      status: "Selesai",
      waktu: "8 Mei 2025, 12:20",
    },
  ];

  // Handle link click for smooth scroll and active section update
  const handleLinkClick = (e, section) => {
    e.preventDefault();
    setActiveSection(section); // Set active section to the clicked section
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to section
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filtered patient data based on search query
  const filteredPasien = pasienData.filter((pasien) => {
    return pasien.nama.toLowerCase().includes(searchQuery.toLowerCase());
  });

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
                  href="#"
                  onClick={goToHome} // Navigate to LoginDokter
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#consultation"
                  onClick={goToConsultation} // Navigate to LoginDokter and scroll to consultation
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
      <main
        className="main"
        style={{
          paddingTop: "100px",
          maxWidth: "1500px",
          margin: "0 auto",
          paddingLeft: "15px",
          paddingRight: "15px",
        }}
      >
        {/* Hero Section with Search Bar */}
        <section
          style={{
            backgroundColor: "#e6eeff",
            padding: "2rem 23rem",
            borderRadius: "12px",
            maxWidth: "1200px",
            margin: "0 auto",
            textAlign: "center",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            color: "#334155",
          }}
        >
          <h1
            style={{
              fontWeight: "900",
              fontSize: "3.5rem",
              lineHeight: "1.1",
              maxWidth: "2000px",
              marginBottom: "1rem",
              color: "#121828",
              textAlign: "center",
            }}
          >
            Riwayat Kesehatan Pasien
          </h1>

          <p
            style={{
              fontWeight: "500",
              fontSize: "1rem",
              lineHeight: "1.6",
              maxWidth: "1200px",
              color: "#475569",
              textAlign: "justify",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {/* Search Bar */}
            <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
              <input
                type="text"
                placeholder="Search Pasien"
                value={searchQuery}
                onChange={handleSearchChange}
                style={{
                  padding: "10px 20px",
                  fontSize: "1rem",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  width: "100%",
                  maxWidth: "600px",
                  margin: "0 auto",
                  display: "block",
                }}
              />
            </div>
          </p>
        </section>

        {/* Consultation Section */}
        <section className="consultation section" id="consultation">
          <div className="container-fluid container-xl">
            <div className="pasien-container">
              {filteredPasien.length > 0 ? (
                <div
                  className="pasien-list"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                  }}
                >
                  {filteredPasien.map((pasien, index) => (
                    <div
                      className="pasien-card"
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                      }}
                    >
                      <div className="pasien-info">
                        <h2>{pasien.nama}</h2>
                        <p>{pasien.umur}</p>
                        {pasien.penyakit && (
                          <p>
                            <strong>Penyakit:</strong> {pasien.penyakit}
                          </p>
                        )}
                        <p>
                          <strong>Waktu:</strong> {pasien.waktu}
                        </p>
                      </div>
                      <div
                        className={`status ${
                          pasien.status === "Sedang Berlangsung"
                            ? "ongoing"
                            : "finished"
                        }`}
                        onClick={
                          pasien.status === "Sedang Berlangsung"
                            ? handleOngoingClick
                            : null
                        }
                        style={{
                          padding: "5px 10px",
                          borderRadius: "20px",
                          backgroundColor:
                            pasien.status === "Sedang Berlangsung"
                              ? "green"
                              : "gray",
                          color: "#fff",
                          cursor:
                            pasien.status === "Sedang Berlangsung"
                              ? "pointer"
                              : "default",
                        }}
                      >
                        <p>{pasien.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "1.25rem",
                    fontWeight: "500",
                    color: "#FF3B30",
                  }}
                >
                  Data Tidak Ditemukan
                </p>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="footer" className="footer" style={{ marginTop: "40px" }}>
        <div className="container-fluid container-xl">
          <div className="footer-bottom text-center mt-4">
            <p style={{ margin: 0, fontWeight: "700", fontSize: "1.25rem" }}>
              OxeMed
              <br />
              Teknologi Kedokteran - Kelompok 4
            </p>
            <p
              style={{
                marginTop: "8px",
                fontSize: "0.9rem",
                fontWeight: "400",
              }}
            >
              © {new Date().getFullYear()}. All Rights Reserved.
            </p>
          </div>
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

export default RiwayatDokter;
