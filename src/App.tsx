import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './components/LandingPage';
import AdminPanel from './components/AdminPanel';
import TestPage from './TestPage';
import { DataProvider } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';
import { CustomizationProvider } from './context/CustomizationContext';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-300">
        <Router>
          <Routes>
            <Route path="/" element={<TestPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="*" element={<Navigate to="/test" replace />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
