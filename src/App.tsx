import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import HomePage from './pages/HomePage';
import AdminPanel from './pages/AdminPanel';
import WinnerPage from './pages/WinnerPage';
import LoserPage from './pages/LoserPage';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/winner" element={<WinnerPage />} />
          <Route path="/loser" element={<LoserPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;