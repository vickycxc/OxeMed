import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import oxemedLogo from './assets/oxemed.jpg';

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
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [activeTab, setActiveTab] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const chatBoxRef = useRef();

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setChat([{ sender: 'dokter', text: `Selamat pagi! Saya ${doctor.name}. Apa keluhan Anda hari ini?` }]);
  };

  const handleSend = () => {
    if (!message && !image) return;
    setChat([...chat, { sender: 'pasien', text: message, image }]);
    setMessage('');
    setImage(null);

    setTimeout(() => {
      setChat(prev => [...prev, { sender: 'dokter', text: 'Terima kasih atas informasinya. Kami akan bantu segera.' }]);
    }, 1000);
  };

  const handleFinish = () => {
    localStorage.setItem('konsultasi_terakhir', JSON.stringify({ doctor: selectedDoctor, chat, timestamp: new Date().toISOString() }));
    navigate('/riwayat');
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100vw', backgroundColor: '#f3f4f6' }}>
{/* Header - Consultation Version */}
<header
  id="header"
  className="header d-flex align-items-center fixed-top header-home-active"
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
            className={false ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              navigate('/login');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Home
          </a>
        </li>

        <li>
          <a
            href="#test"
            className={false ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              navigate('/test');
            }}
          >
            Test
          </a>
        </li>

        <li>
          <a
            href="#consultation"
            className={'active'} // Selalu aktif di halaman konsultasi
            onClick={(e) => {
              e.preventDefault();
              navigate('/konsultasi');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Consultation
          </a>
        </li>

        <li>
          <a
            href="#history"
            className={false ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              navigate('/riwayat');
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
        onClick={() => setShowProfileMenu(prev => !prev)}
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


      <main style={{ flex: 1, padding: '2rem' }}>
        {!selectedDoctor ? (
          <div>
            <h3>Pilih Dokter</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {doctors.map(doc => (
                <div key={doc.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', textAlign: 'center', backgroundColor: '#fff', cursor: 'pointer' }} onClick={() => handleDoctorSelect(doc)}>
                  <img src={doc.image} alt={doc.name} width={70} height={70} style={{ borderRadius: '50%', marginBottom: '0.5rem' }} />
                  <p><strong>{doc.name}</strong><br /><small>{doc.specialization}</small></p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
              <img src={selectedDoctor.image} alt={selectedDoctor.name} width={50} height={50} style={{ borderRadius: '50%' }} />
              <div style={{ marginLeft: 16 }}>
                <h4>{selectedDoctor.name}</h4>
                <p>{selectedDoctor.specialization}</p>
              </div>
              <button style={{ marginLeft: 'auto' }} onClick={handleFinish}>Selesai</button>
            </div>

            <div ref={chatBoxRef} style={{ background: '#fff', padding: 16, borderRadius: 8, height: '300px', overflowY: 'auto', marginBottom: 16 }}>
              {chat.map((c, i) => (
                <div key={i} style={{ textAlign: c.sender === 'pasien' ? 'right' : 'left', marginBottom: 10 }}>
                  <div style={{ display: 'inline-block', background: c.sender === 'pasien' ? '#dcfce7' : '#e5e7eb', padding: 10, borderRadius: 8 }}>
                    <p style={{ margin: 0 }}>{c.text}</p>
                    {c.image && <ChatImage imageFile={c.image} />}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <input type="file" onChange={e => setImage(e.target.files[0])} />
              <input type="text" placeholder="Tulis pesan..." value={message} onChange={e => setMessage(e.target.value)} style={{ flex: 1 }} />
              <button onClick={handleSend}>Kirim</button>
            </div>
          </>
        )}
      </main>

<footer style={{
  backgroundColor: '#f9fafb',
  padding: '1.5rem 2rem',
  textAlign: 'center',
  marginTop: '2rem',
  borderTop: '1px solid #e5e7eb'
}}>
  <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold' }}>OxeMed</h3>
  <p style={{ margin: '0.25rem 0', fontSize: '1rem' }}>Teknologi Kedokteran - Kelompok 4</p>
  <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>
    &copy; {new Date().getFullYear()} All Rights Reserved.
  </p>
</footer>

    </div>
  );
};

export default Konsultasi;