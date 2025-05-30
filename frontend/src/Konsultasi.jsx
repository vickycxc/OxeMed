// konsultasi.jsx
import React from 'react';
import './app.css';
import oxemedLogo from './assets/oxemed.jpg';
import consultationLogo from './assets/consultation.jpg';

const Konsultasi = () => {
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
              <li><a href="/">Home</a></li>
              <li><a href="/#features">Features</a></li>
            </ul>
          </nav>
          <button className="btn-getstarted" onClick={() => alert("Redirect ke login...")}>Login</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="main" style={{ paddingTop: '100px' }}>
        <section className="features section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Consultation</h2>
            <p>OxeMed memungkinkan kamu untuk terhubung langsung dengan tenaga kesehatan profesional dari mana saja.</p>
          </div>

          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 d-flex flex-column justify-content-center" style={{ marginLeft: '80px' }}>
                <h3 className="feature-title">Konsultasi Kesehatan Online</h3>
                <p className="feature-description">
                  Dapatkan saran medis langsung dari dokter spesialis pernapasan melalui layanan konsultasi OxeMed.
                </p>
                <ul className="feature-list">
                  <li>Chat atau video call aman dengan dokter.</li>
                  <li>Rekomendasi dan diagnosis jarak jauh.</li>
                  <li>Jadwal fleksibel sesuai waktu luangmu.</li>
                  <li>Resep digital & rekam medis otomatis tersimpan.</li>
                </ul>
                <button className="btn-login" style={{ width: 'fit-content', marginTop: '20px' }}>
                  Mulai Konsultasi
                </button>
              </div>

              <div className="col-lg-6 d-flex justify-content-end">
                <img
                  src={consultationLogo}
                  alt="Consultation"
                  className="consultation-img"
                  style={{ width: '420px', height: 'auto', marginLeft: '100px' }}
                />
              </div>
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
    </div>
  );
};

export default Konsultasi;
