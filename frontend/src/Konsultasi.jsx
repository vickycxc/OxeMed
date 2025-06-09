import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import oxemedLogo from './assets/oxemed.jpg';
import consultationLogo from './assets/consultation.jpg';

const profilePicUrl = "https://randomuser.me/api/portraits/men/75.jpg";

const Konsultasi = () => {
  const [activeTab, setActiveTab] = useState('tab2');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'dokter', text: 'Halo, ada yang bisa saya bantu?' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();

  // Navigasi
  const goToHome = () => {
    navigate('/login');
    window.scrollTo(0, 0);
  };

  const goToConsultation = () => {
    navigate('/konsultasi');
    setActiveTab('tab2');
    window.scrollTo(0, 0);
  };

  const goToTest = () => {
    navigate('/test');
    setActiveTab('tab1');
    window.scrollTo(0, 0);
  };

  const goToHistory = () => {
    navigate('/riwayat');
    setActiveTab('tab3');
    window.scrollTo(0, 0);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleLogout = () => {
    alert("Logged out!");
    setShowProfileMenu(false);
    navigate("/");
    window.scrollTo(0, 0);
  };

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    setChatMessages(prev => [...prev, { sender: 'pasien', text: newMessage }]);

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { sender: 'dokter', text: 'Baik, saya akan pelajari lebih lanjut keluhan Anda.' }
      ]);
    }, 1000);

    setNewMessage('');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="consultation-page">
      {/* Header */}
      <header className="header d-flex align-items-center fixed-top header-home-active">
        <div className="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
          <div className="logo d-flex align-items-center me-auto me-xl-0">
            <img src={oxemedLogo} alt="Oxemed Logo" className="logo-img" />
          </div>

          <nav id="navmenu" className="navmenu">
            <ul>
              <li>
                <a href="#" className={activeTab === 'home' ? 'active' : ''} onClick={(e) => { e.preventDefault(); goToHome(); }}>
                  Home
                </a>
              </li>
              <li>
                <a href="#" className={activeTab === 'tab1' ? 'active' : ''} onClick={(e) => { e.preventDefault(); goToTest(); }}>
                  Test
                </a>
              </li>
              <li>
                <a href="#" className={activeTab === 'tab2' ? 'active' : ''} onClick={(e) => { e.preventDefault(); goToConsultation(); }}>
                  Consultation
                </a>
              </li>
              <li>
                <a href="#" className={activeTab === 'tab3' ? 'active' : ''} onClick={(e) => { e.preventDefault(); goToHistory(); }}>
                  History
                </a>
              </li>
            </ul>
          </nav>

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

      {/* Main */}
      <main className="main" style={{ paddingTop: '100px' }}>
        <section className="features section">
          <div className="container section-title">
            <h2>Chat dengan Dokter & Rangkuman Konsultasi</h2>
          </div>

          <div className="container" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {/* Chat Box */}
            <div style={{
              flex: 1,
              minWidth: '300px',
              maxWidth: '600px',
              background: '#f8f9ff',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 0 8px rgba(0,0,0,0.05)'
            }}>
              <h4 style={{ fontWeight: '700', marginBottom: '1rem' }}>Chat Konsultasi</h4>
              <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '1rem' }}>
                {chatMessages.map((msg, index) => (
                  <div key={index} style={{
                    textAlign: msg.sender === 'pasien' ? 'right' : 'left',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{
                      display: 'inline-block',
                      backgroundColor: msg.sender === 'pasien' ? '#d1e7dd' : '#e2e6ea',
                      color: '#111',
                      padding: '8px 12px',
                      borderRadius: '10px',
                      maxWidth: '80%',
                      fontSize: '0.95rem'
                    }}>
                      {msg.text}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Tulis pesan..."
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #ccc'
                  }}
                />
                <button onClick={sendMessage} style={{
                  backgroundColor: '#3b60e4',
                  color: '#fff',
                  padding: '10px 16px',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600'
                }}>
                  Kirim
                </button>
              </div>
            </div>

            {/* Rangkuman */}
            <div style={{
              flex: 1,
              minWidth: '300px',
              maxWidth: '600px',
              backgroundColor: '#fff',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 0 10px rgba(0,0,0,0.05)'
            }}>
              <h4 style={{ fontWeight: '700', color: '#1e293b' }}>Rangkuman Konsultasi Terakhir</h4>
              <p><strong>Keluhan:</strong> Pasien mengeluhkan pusing yang terkadang disertai mual.</p>
              <p><strong>Diagnosis:</strong> Pasien didiagnosa Hipertensi dengan gejala tambahan pusing berulang dan mual ringan.</p>
              <p><strong>Obat:</strong> Amlodipine 5 mg 1x sehari pagi & Vitamin B1.</p>
              <p><strong>Rangkuman:</strong> Pasien Budi Santoso (45 tahun) mengeluhkan pusing dan mual ringan. Direkomendasikan pemeriksaan tekanan darah rutin, kurangi konsumsi garam, kontrol ulang 2 minggu lagi.</p>
            </div>
          </div>

          {/* Gambar samping (opsional) */}
          <div className="container d-flex justify-content-center mt-5">
            <img
              src={consultationLogo}
              alt="Consultation"
              className="consultation-img"
              style={{ width: '420px', height: 'auto' }}
            />
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
