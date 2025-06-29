import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import oxemedLogo from "../assets/oxemed.jpg";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const profilePicUrl = "https://randomuser.me/api/portraits/men/75.jpg";

const Konsultasi = () => {
  // const [chat, setChat] = useState([]); // Start with an empty chat
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  // const [selectedDoctor, setSelectedDoctor] = useState(null); // Initialize as null
  const [isDoctorSelectionVisible, setIsDoctorSelectionVisible] =
    useState(true); // Control visibility of doctor selection

  // State untuk navigasi & UI header
  const [activeSection, setActiveSection] = useState("home");
  const [activeTab, setActiveTab] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navigate = useNavigate();
  const chatBoxRef = useRef();

  const {
    doctors,
    getDoctors,
    isUsersLoading,
    isMessagesLoading,
    messages,
    sendMessage,
    consultations,
    createConsultation,
    selectedConsultation,
    setSelectedConsultation,
    getConsultations,
    endConsultation,
    selectedUser,
    setSelectedUser,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
    isUpdatingConsultation,
  } = useChatStore();

  const handleDoctorSelect = (doctor) => {
    setSelectedUser(doctor);
    console.log("Selected Doctor: ", doctor);
    setSelectedConsultation();
    setIsDoctorSelectionVisible(false); // Hide doctor selection after selection
  };

  // Toggle menu profil dropdown
  const toggleProfileMenu = () => setShowProfileMenu((prev) => !prev);
  const { logout, user } = useAuthStore(); // Assuming logout is a function in your store
  // Logout function
  const handleLogout = () => {
    logout();
  };
  const handleProfile = () => {
    setShowProfileMenu(false);
    navigate("/profile");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSend = () => {
    console.log("🚀 ~ handleSend ~ image:", image);
    if (!message && !image) return;

    sendMessage({
      message,
      image,
    });
    setMessage("");
    setImage(null);
  };

  const handleFinish = () => {
    endConsultation();
  };

  const handleStartConsultation = () => {
    createConsultation();
  };
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    getDoctors();
  }, [getDoctors]);

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser.id);
      setSelectedConsultation();
      console.log("boom");
      console.log("Selected Consultations: ", consultations);
      subscribeToMessages();
    }
    return () => unsubscribeFromMessages();
  }, [
    selectedUser,
    getMessages,
    consultations,
    setSelectedConsultation,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    getConsultations();
  }, [getConsultations]);

  if (isUsersLoading || isMessagesLoading) {
    return (
      <div className="loader">
        <img src={oxemedLogo} />
      </div>
    );
  }

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
          {isDoctorSelectionVisible ? (
            <div style={{ textAlign: "center" }}>
              <h3 style={{ marginBottom: 20 }}>
                Pilih Dokter untuk Konsultasi
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: 20,
                  justifyContent: "center",
                }}
              >
                {doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    onClick={() => handleDoctorSelect(doctor)}
                    style={{
                      border: "1px solid #eee",
                      borderRadius: 12,
                      padding: 20,
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        transform: "translateY(-5px)",
                      },
                    }}
                  >
                    <img
                      src="https://randomuser.me/api/portraits/women/65.jpg"
                      alt={doctor.fullName}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        marginBottom: 10,
                        objectFit: "cover",
                      }}
                    />
                    <h5 style={{ margin: "0 0 5px 0" }}>{doctor.fullName}</h5>
                    <p style={{ margin: 0, fontSize: "0.9em", color: "#666" }}>
                      Spesialis Penyakit Dalam
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
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
                  src="https://randomuser.me/api/portraits/women/65.jpg"
                  alt={selectedUser.fullName}
                  style={{ width: 50, borderRadius: "50%" }}
                />
                <div>
                  <h5 style={{ margin: 0 }}>{selectedUser.fullName}</h5>
                  <small>Spesialis Penyakit Dalam</small>
                </div>
                <button
                  disabled={isUpdatingConsultation}
                  onClick={
                    selectedConsultation
                      ? handleFinish
                      : handleStartConsultation
                  }
                  style={{
                    marginLeft: "auto",
                    padding: "8px 20px",
                    borderRadius: 10,
                    background: "#3b60e4",
                    color: "white",
                    border: "none",
                    cursor: !isUpdatingConsultation ? "pointer" : "auto",
                  }}
                >
                  {isUpdatingConsultation
                    ? "Loading..."
                    : selectedConsultation
                    ? "Selesai"
                    : "Mulai Konsultasi"}
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
                {messages.length > 0 ? (
                  messages.map((item, index) => {
                    return (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          justifyContent:
                            item.senderId === user.id
                              ? "flex-end"
                              : "flex-start",
                          marginBottom: 12,
                        }}
                      >
                        <div
                          style={{
                            backgroundColor:
                              item.senderId === user.id ? "#d1e7dd" : "#e2e6ea",
                            padding: 12,
                            borderRadius: 12,
                            maxWidth: "70%",
                            wordBreak: "break-word",
                          }}
                        >
                          <p style={{ margin: 0 }}>{item.message}</p>
                          {item.imageUrl && (
                            <img
                              src={item.imageUrl}
                              alt="Upload"
                              style={{
                                marginTop: 10,
                                maxWidth: 120,
                                borderRadius: 8,
                              }}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      color: "#666",
                      fontSize: "16px",
                    }}
                  >
                    Silakan Mulai Konsultasi
                  </div>
                )}
              </div>
              {/* Input */}
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={!selectedConsultation}
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
                  disabled={!selectedConsultation}
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
                  disabled={!selectedConsultation}
                  style={{
                    borderRadius: 8,
                    backgroundColor: !selectedConsultation ? "#ccc" : "#3b60e4",
                    color: "white",
                    border: "none",
                    padding: "8px 16px",
                    cursor: selectedConsultation ? "pointer" : "auto",
                  }}
                >
                  Kirim
                </button>
              </div>
            </>
          )}
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

export default Konsultasi;
