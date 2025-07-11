import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Test from "./pages/Test.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Riwayat from "./pages/Riwayat.jsx";
import Konsultasi from "./pages/Konsultasi.jsx";
import Login from "./pages/Login.jsx";
import LoginDokter from "./pages/LoginDokter.jsx";
import KonsultasiDokter from "./pages/KonsultasiDokter.jsx";
import RiwayatDokter from "./pages/RiwayatDokter.jsx";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore.js";
import oxemedLogo from "./assets/oxemed.jpg";
import "./styles/app.css";
import Profile from "./pages/Profile.jsx";

const App = () => {
  const { user, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !user)
    return (
      <div className="loader">
        <img src={oxemedLogo} />
      </div>
    );

  if (user) {
    return (
      <>
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route
            path="/"
            element={user.role === "Pasien" ? <Login /> : <LoginDokter />}
          />
          {user.role === "Pasien" ? (
            <Route path="/konsultasi" element={<Konsultasi />} />
          ) : (
            <Route path="/konsultasi/:id" element={<KonsultasiDokter />} />
          )}
          <Route
            path="/test"
            element={user.role === "Pasien" ? <Test /> : <Navigate to="/" />}
          />
          <Route
            path="/riwayat"
            element={user.role === "Pasien" ? <Riwayat /> : <RiwayatDokter />}
          />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Toaster />
      </>
    );
  } else {
    return (
      <>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route />
        </Routes>
        <Toaster />
      </>
    );
  }
};

export default App;
