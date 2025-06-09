// pages/Konsultasi.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const doctors = [
  {
    id: 1,
    name: 'dr. Risma Harini Sp.D.V.E.',
    specialization: 'Dokter Kulit & Kelamin',
    image: 'https://randomuser.me/api/portraits/women/65.jpg'
  },
  {
    id: 2,
    name: 'dr. Andi Saputra Sp.P',
    specialization: 'Dokter Paru',
    image: 'https://randomuser.me/api/portraits/men/66.jpg'
  }
];

const Konsultasi = () => {
  const navigate = useNavigate();

  const handleSelectDoctor = (doctor) => {
    navigate(`/chat-dokter`, { state: { doctor } });
  };

  return (
    <div style={{ padding: '80px 40px' }}>
      <h2>Pilih Dokter untuk Konsultasi</h2>
      <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
        {doctors.map((doc) => (
          <div
            key={doc.id}
            style={{
              border: '1px solid #ccc',
              padding: '20px',
              borderRadius: '12px',
              cursor: 'pointer',
              textAlign: 'center',
              width: '240px'
            }}
            onClick={() => handleSelectDoctor(doc)}
          >
            <img
              src={doc.image}
              alt={doc.name}
              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            />
            <h4 style={{ marginTop: '1rem' }}>{doc.name}</h4>
            <p style={{ fontStyle: 'italic' }}>{doc.specialization}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Konsultasi;
