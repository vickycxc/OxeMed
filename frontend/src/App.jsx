import React from "react";
import { Routes, Route } from "react-router-dom";
import Test from "./pages/Test.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Riwayat from "./pages/Riwayat.jsx";
import Konsultasi from "./pages/Konsultasi.jsx";
import Login from "./pages/Login.jsx";
import LoginDokter from "./pages/LoginDokter.jsx";
import KonsultasiDokter from "./pages/KonsultasiDokter.jsx";
import RiwayatDokter from "./pages/RiwayatDokter.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/konsultasi" element={<Konsultasi />} />
        <Route path="/test" element={<Test />} />
        <Route path="/riwayat" element={<Riwayat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logindokter" element={<LoginDokter />} />
        <Route path="/konsultasidokter" element={<KonsultasiDokter />} />
        <Route path="/riwayatdokter" element={<RiwayatDokter />} />
      </Routes>
    </div>
  );
};

export default App;
