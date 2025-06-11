import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import oxemedLogo from "../assets/oxemed.jpg";

const profilePicUrl = "https://randomuser.me/api/portraits/men/75.jpg";
const doctors = [
  { id: 1, name: 'dr. Ika Dwi', specialization: 'Spesialis Penyakit Dalam', image: 'https://randomuser.me/api/portraits/women/65.jpg' },
  { id: 2, name: 'dr. Budi Santoso', specialization: 'Spesialis Jantung', image: 'https://randomuser.me/api/portraits/men/45.jpg' },
];

function useObjectURL(file) {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);
  return url;
}

const ChatImage = ({ imageFile }) => {
  const url = useObjectURL(imageFile);
  if (!url) return null;
  return (
    <img
      src={url}
      alt="Upload"
      style={{ marginTop: 10, maxWidth: 120, borderRadius: 8 }}
    />
  );
};

const Konsultasi = () => {
  const [chat, setChat] = useState([
    {
      sender: "dokter",
      text: "Selamat pagi! Apakah ada yang bisa saya bantu? Apa keluhan Anda hari ini?",
    },
  ]);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  // State untuk navigasi & UI header
  const [activeSection, setActiveSection] = useState("home");
  const [activeTab, setActiveTab] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const chatBoxRef = useRef();

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setChat([{ sender: 'dokter', text: `Selamat pagi! Saya ${doctor.name}. Apa keluhan Anda hari ini?` }]);
  // Toggle menu profil dropdown
  const toggleProfileMenu = () => setShowProfileMenu((prev) => !prev);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("userToken"); // Contoh logout: hapus token
    navigate("/login");
  };

  const handleSend = () => {
    if (!message && !image) return;

    setChat((prev) => [
      ...prev,
      {
        sender: "pasien",
        text: message,
        image: image,
      },
    ]);
    setMessage("");
    setImage(null);

    setTimeout(() => {
      setChat((prev) => [
        ...prev,
        {
          sender: "dokter",
          text: "Terima kasih atas informasinya. Kami akan pelajari dan bantu segera.",
        },
      ]);
    }, 1000);
  };

  const handleFinish = () => {
    const summary = {
      doctor,
      chat,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("konsultasi_terakhir", JSON.stringify(summary));
    navigate("/riwayat");
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chat]);

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

      {/* MAIN */}
      <main
        style={{
          flex: 1,
          marginTop: 80,
          padding: "2rem 1rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <section
          style={{
            backgroundColor: "#fff",
            borderRadius: 16,
            padding: "2rem",
            boxShadow: "0 0 12px rgba(0,0,0,0.05)",
            width: "100%",
            maxWidth: "900px",
          }}
        >
          {/* Doctor Info */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 24,
            }}
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              style={{ width: 50, borderRadius: "50%" }}
            />
            <div>
              <h5 style={{ margin: 0 }}>{doctor.name}</h5>
              <small>{doctor.specialization}</small>
            </div>
            <button
              onClick={handleFinish}
              style={{
                marginLeft: "auto",
                padding: "8px 20px",
                borderRadius: 10,
                background: "#3b60e4",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Selesai
            </button>
          </div>

          {/* Chat Box */}
          <div
            ref={chatBoxRef}
            style={{
              backgroundColor: "#f8fafc",
              padding: 16,
              borderRadius: 12,
              height: "50vh",
              overflowY: "auto",
              border: "1px solid #eee",
              marginBottom: 16,
            }}
          >
            {chat.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent:
                    item.sender === "pasien" ? "flex-end" : "flex-start",
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    backgroundColor:
                      item.sender === "pasien" ? "#d1e7dd" : "#e2e6ea",
                    padding: 12,
                    borderRadius: 12,
                    maxWidth: "70%",
                    wordBreak: "break-word",
                  }}
                >
                  <p style={{ margin: 0 }}>{item.text}</p>
                  {item.image && <ChatImage imageFile={item.image} />}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{ display: "flex", gap: 10 }}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              style={{
                flexBasis: "30%",
                borderRadius: 8,
                border: "1px solid #ccc",
                padding: "6px",
              }}
            />

            <input
              type="text"
              placeholder="Tulis pesan..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                flex: 1,
                borderRadius: 8,
                border: "1px solid #ccc",
                padding: "6px 12px",
              }}
            />

            <button
              onClick={sendMessage}
              style={{
                borderRadius: 8,
                backgroundColor: "#3b60e4",
                color: "white",
                border: "none",
                padding: "8px 16px",
                cursor: "pointer",
              }}
            >
              Kirim
            </button>
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
    </div>
  );
};
}

export default Konsultasi;