import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Test from './Test.jsx'
import Dashboard from './Dashboard.jsx'
import Riwayat from './Riwayat.jsx'
import Konsultasi from './Konsultasi.jsx'

const App = () => {
  return (
    <div>
        <Routes>              
          <Route path="/" element={<Dashboard />} />
          <Route path="/konsultasi" element={<Konsultasi />} />
          <Route path="/test" element={<Test />} />
          <Route path="/riwayat" element={<Riwayat />} />
        </Routes>
    </div>
  )
}

export default App
