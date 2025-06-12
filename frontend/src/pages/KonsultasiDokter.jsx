import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import oxemedLogo from "../assets/oxemed.jpg";

// URL profil dokter yang sedang "login" (misal dr. Ika Dwi)
const doctorProfilePicUrl = "https://randomuser.me/api/portraits/women/65.jpg";

// Data dokter (digunakan untuk informasi dokter yang "login")
const doctors = [
  { id: 1, name: "dr. Ika Dwi", specialization: "Spesialis Penyakit Dalam", image: "https://randomuser.me/api/portraits/women/65.jpg" },
  { id: 2, name: "dr. Budi Santoso", specialization: "Spesialis Jantung", image: "https://randomuser.me/api/portraits/men/45.jpg" },
  { id: 3, name: "dr. Citra Lestari", specialization: "Spesialis Anak", image: "https://randomuser.me/api/portraits/women/70.jpg" },
  { id: 4, name: "dr. David Wijaya", specialization: "Spesialis Kulit", image: "https://randomuser.me/api/portraits/men/80.jpg" },
];

// Asumsikan dokter yang sedang 'login' adalah dr. Ika Dwi
const loggedInDoctor = doctors[0]; // Mengambil dokter pertama dari daftar sebagai contoh

// Data pasien dummy untuk simulasi chat
const dummyPatient = {
  id: 1,
  name: "Aisyah Ramadhani",
  image: "https://randomuser.me/api/portraits/men/30.jpg", // Gambar profil pasien dummy
};

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

const KonsultasiDokter = () => {
  const [chat, setChat] = useState([
    // Contoh chat awal dari pasien untuk simulasi
    { sender: "pasien", text: "Selamat pagi, Dokter. Saya merasa demam dan batuk sejak kemarin." },
    { sender: "dokter", text: "Selamat pagi, bagaimana kabarnya? Sudah minum obat apa?" },
  ]);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  // Di POV dokter, kita tidak perlu selectedDoctor dari pilihan, langsung dari loggedInDoctor
  const doctor = loggedInDoctor;

  // State untuk navigasi & UI header (sama seperti POV pasien)
  const [activeSection, setActiveSection] = useState("home");
  const [activeTab, setActiveTab] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const chatBoxRef = useRef();

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
        sender: "dokter", // Pengirimnya adalah dokter
        text: message,
        image: image,
      },
    ]);
    setMessage("");
    setImage(null);

    // Simulasi balasan pasien (opsional, bisa dihapus jika tidak perlu simulasi)
    setTimeout(() => {
      setChat((prev) => [
        ...prev,
        {
          sender: "pasien",
          text: "Baik, Dokter. Saya mengerti. Terima kasih atas sarannya.",
        },
      ]);
    }, 1500); // Balasan dari pasien setelah 1.5 detik
  };

  const handleFinish = () => {
    // Di sini, Anda bisa menyimpan riwayat chat ini ke database dokter
    // Untuk contoh, kita hanya akan mencetak ke konsol atau navigasi
    console.log("Konsultasi selesai. Riwayat chat:", chat);
    // Mungkin ada navigasi ke halaman riwayat konsultasi dokter
    navigate("/dokter/riwayat-konsultasi"); // Contoh navigasi
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
      {/* Header (Sama seperti POV pasien, hanya foto profil dokter yang diganti) */}
      <header
        id="header"
        className={`header d-flex align-items-center fixed-top ${
          activeSection === "features" ? "header-features-active" : "header-home-active"
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
                    navigate("/dokter/dashboard"); // Contoh navigasi untuk dokter
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#konsultasi"
                  className={activeTab === "tab2" ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("tab2");
                    navigate("/dokter/konsultasi"); // Contoh navigasi untuk dokter
                  }}
                >
                  Konsultasi
                </a>
              </li>

              <li>
                <a
                  href="#riwayat"
                  className={activeTab === "tab3" ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("tab3");
                    navigate("/dokter/riwayat"); // Contoh navigasi untuk dokter
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Riwayat
                </a>
              </li>
            </ul>
          </nav>

          {/* Profile Picture (Dokter) */}
          <div className="user-profile" style={{ position: "relative" }}>
            <img
              src={doctorProfilePicUrl} // Menggunakan URL profil dokter yang "login"
              alt="Doctor Profile"
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

      {/* MAIN CONTENT */}
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
          {/* Patient Info (Di sini menampilkan info pasien yang sedang diajak chat) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 24,
              borderBottom: "1px solid #eee",
              paddingBottom: 15,
            }}
          >
            <img
              src={dummyPatient.image}
              alt={dummyPatient.name}
              style={{ width: 50, height:50, borderRadius: "50%", objectFit: "cover" }}
            />
            <div>
              <h5 style={{ margin: 0 }}>{dummyPatient.name}</h5>
              <small>11 Tahun</small>
            </div>
            <button
              onClick={handleFinish}
              style={{
                marginLeft: "auto",
                padding: "8px 20px",
                borderRadius: 10,
                background: "#dc3545", // Warna merah untuk "Selesai"
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Akhiri Konsultasi
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
                    item.sender === "dokter" ? "flex-end" : "flex-start", // Dokter di kanan, pasien di kiri
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    backgroundColor:
                      item.sender === "dokter" ? "#d1e7dd" : "#e2e6ea", // Warna chat dokter hijau muda
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
              placeholder="Ketik balasan Anda..."
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
              onClick={handleSend}
              style={{
                borderRadius: 8,
                backgroundColor: "#3b60e4",
                color: "white",
                border: "none",
                padding: "8px 16px",
                cursor: "pointer",
              }}
            >
              Kirim Balasan
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

export default KonsultasiDokter;