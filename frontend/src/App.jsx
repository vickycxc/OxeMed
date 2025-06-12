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

const App = () => {
  const { user, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ user });

  if (isCheckingAuth && !user)
    return (
      <div className="loader">
        <img src={oxemedLogo} />
      </div>
    );

  if (user) {
    console.log("🚀 ~ App ~ role:", user);
    return (
      <>
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route
            path="/"
            element={user.role === "Pasien" ? <Login /> : <LoginDokter />}
          />
          <Route
            path="/konsultasi"
            element={
              user.role === "Pasien" ? <Konsultasi /> : <KonsultasiDokter />
            }
          />
          <Route
            path="/test"
            element={user.role === "Pasien" ? <Test /> : <Navigate to="/" />}
          />
          <Route
            path="/riwayat"
            element={user.role === "Pasien" ? <Riwayat /> : <RiwayatDokter />}
          />
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
