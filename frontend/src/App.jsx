import React, { useState } from "react";
import './App.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

// Dummy Data for IoT (SpO2 and Heart Rate)
const iotData = [
  { time: '08:00', spO2: 96, heartRate: 75 },
  { time: '08:05', spO2: 95, heartRate: 78 },
  { time: '08:10', spO2: 94, heartRate: 77 },
  { time: '08:15', spO2: 96, heartRate: 76 },
  { time: '08:20', spO2: 97, heartRate: 74 },
  { time: '08:25', spO2: 96, heartRate: 75 },
  { time: '08:30', spO2: 95, heartRate: 73 },
];

// Dummy Data for Chat Messages
const chatMessages = [
  {
    fromDoctor: true,
    text: 'Selamat Pagi Zulfikar, apakah ada yang bisa saya bantu?',
    time: '8:00 AM',
  },
  {
    fromDoctor: false,
    text: 'Selamat Pagi Dok, saya memiliki ruam di kulit, lebih tepatnya di bagian dada',
    time: '8:00 AM',
  },
  {
    fromDoctor: true,
    text: 'Sejak kapan gejala tersebut muncul? Bisa dibantu juga untuk mengirimkan foto ruam nya',
    time: '8:00 AM',
  },
  {
    fromDoctor: false,
    text: 'Sejak dua minggu yang lalu Dok, awalnya saya mengira cuma ruam biasa, sebentar dok saya foto',
    time: '8:01 AM',
  },
  {
    fromDoctor: false,
    image:
      'https://images.unsplash.com/photo-1588776814546-fcf37b8a8e94?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    time: '8:02 AM',
  },
];

// Dummy Consultation Summary
const consultationSummary = {
  keluhan: 'Pasien mengeluhkan pusing yang terkadang disertai mual.',
  diagnosis:
    'Pasien didiagnosa Hipertensi dengan gejala tambahan pusing berulang dan mual ringan. Hipertensi adalah kondisi tekanan darah tinggi yang dapat menyebabkan berbagai masalah kesehatan jika tidak ditangani.',
  obat:
    'Pasien diresepkan Amlodipine 5 mg, yang merupakan obat untuk menurunkan tekanan darah. Diminum 1 tablet setiap pagi. Selain itu, diresepkan juga Vitamin B1 untuk membantu mengatasi keluhan pusing.',
  rangkuman:
    'Pasien Budi Santoso (45 tahun) mengeluhkan pusing yang terkadang disertai mual. Dokter mendiagnosa hipertensi dan memberikan resep Amlodipine 5 mg dan Vitamin B1. Dokter menyarankan untuk periksa tekanan darah secara berkala, mengurangi konsumsi garam, dan melakukan kontrol ulang 2 minggu lagi.',
};

function App() {
  const [user] = useState('Zulfikar Satria Allam Syahputra'); // Placeholder for user name

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        {/* Logo Section */}
        <div style={styles.logoSection}>
          <img
            src="oxemed.jpg" // Ensure the logo file is in the correct path or replace with correct URL
            alt="OxeMed Logo"
            style={styles.logoImage}
          />
          <div style={styles.logo}>OxeMed</div>
        </div>

        {/* Navigation Menu */}
        <nav style={styles.nav}>
          {/* Navigation Links */}
          <a href="#home" style={styles.navLink}>
            Home
          </a>
          <a href="#contact" style={styles.navLink}>
            Contact Us
          </a>

          {/* Login Link */}
          <a href="#login" style={{ ...styles.navLink, color: "#4db6ac" }}>
            Login
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        {/* IoT Tracking Section */}
        <section style={styles.section}>
          <h2>Data Monitoring Kesehatan (SpO2 & Detak Jantung)</h2>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart
                data={iotData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis
                  yAxisId="left"
                  label={{ value: 'SpO2 (%)', angle: -90, position: 'insideLeft' }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  label={{
                    value: 'Heart Rate (bpm)',
                    angle: 90,
                    position: 'insideRight',
                  }}
                />
                <Tooltip />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="spO2"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="heartRate"
                  stroke="#82ca9d"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Konsultasi Online Section */}
        <section style={styles.sectionChat}>
          <h2>Konsultasi Online dengan dr. Risma Harini Sp.D.V.E.</h2>
          <div style={styles.chatContainer}>
            <div style={styles.chatLeft}>
              <img
                src="https://images.unsplash.com/photo-1588776814546-fcf37b8a8e94?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="dr Risma"
                style={styles.doctorAvatar}
              />
              <div style={styles.doctorInfo}>
                <strong>dr. Risma Harini Sp.D.V.E.</strong>
                <p>Sesi Konsultasi Online</p>
              </div>
            </div>

            <div style={styles.chatBox}>
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.chatMessage,
                    alignSelf: msg.fromDoctor ? 'flex-start' : 'flex-end',
                    backgroundColor: msg.fromDoctor ? '#f0f0f0' : '#0d47a1',
                    color: msg.fromDoctor ? '#000' : '#fff',
                  }}
                >
                  {msg.text && <p style={{ margin: 0 }}>{msg.text}</p>}
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="ruam kulit"
                      style={{ maxWidth: 150, borderRadius: 8, marginTop: 5 }}
                    />
                  )}
                  <span style={styles.chatTime}>{msg.time}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rangkuman Konsultasi AI Section */}
        <section style={styles.sectionSummary}>
          <h2>Rangkuman Konsultasi</h2>
          <p>
            <strong>Keluhan:</strong> {consultationSummary.keluhan}
          </p>
          <p>
            <strong>Penjelasan Diagnosis:</strong> {consultationSummary.diagnosis}
          </p>
          <p>
            <strong>Penjelasan Obat:</strong> {consultationSummary.obat}
          </p>
          <p>
            <strong>Rangkuman:</strong> {consultationSummary.rangkuman}
          </p>
        </section>
      </main>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f9fbfd',
    minHeight: '100vh',
    margin: 0,
  },
  header: {
    backgroundColor: '#0d2149',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 2rem',
    flexWrap: 'wrap',
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
  },
  logoImage: {
    width: '40px',  // Adjust size as per requirement
    height: '40px',
    marginRight: '10px',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '24px',
    color: '#4db6ac',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '0.5rem',
  },
  main: {
    maxWidth: 900,
    margin: '2rem auto',
    padding: '0 1rem',
  },
  section: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: 12,
    marginBottom: '2rem',
    boxShadow: '0 0 10px rgba(0,0,0,0.05)',
  },
  sectionChat: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: 12,
    marginBottom: '2rem',
    boxShadow: '0 0 10px rgba(0,0,0,0.05)',
    display: 'flex',
    gap: 20,
  },
  chatContainer: {
    display: 'flex',
    width: '100%',
  },
  chatLeft: {
    flex: '0 0 200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },
  doctorAvatar: {
    width: 140,
    height: 140,
    borderRadius: 20,
    objectFit: 'cover',
  },
  doctorInfo: {
    textAlign: 'center',
  },
  chatBox: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: '0.5rem 1rem',
    border: '1px solid #ccc',
    borderRadius: 12,
    maxHeight: 320,
    overflowY: 'auto',
  },
  chatMessage: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 10,
    position: 'relative',
  },
  chatTime: {
    fontSize: 10,
    marginTop: 5,
    opacity: 0.7,
  },
  sectionSummary: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: 12,
    boxShadow: '0 0 10px rgba(0,0,0,0.05)',
    marginBottom: '4rem',
  },
};

export default App;
