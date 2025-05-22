import logo from './logo.svg';
import './App.css';
import React from 'react';
import Dashboard from './pages/dashboard.jsx';
import Konsultasi from './pages/Konsultasi.jsx';
import { Routes, Route} from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Dashboard/>}
        />
        <Route
          path="/konsultasi"
          element={<Konsultasi/>}
        />
      </Routes>
    </div>
  );
}

export default App;
