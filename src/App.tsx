import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './components/LandingPage';
import SimpleLandingPage from './components/SimpleLandingPage';
import AdminPanel from './components/AdminPanel';
import TestPage from './TestPage';
import { DataProvider } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';
import { CustomizationProvider } from './context/CustomizationContext';

function App() {
  return (
    <ThemeProvider>
      <CustomizationProvider>
        <DataProvider>
          <div className="min-h-screen transition-colors duration-300">
            <Router>
              <Routes>
                <Route path="/" element={<SimpleLandingPage />} />
                <Route path="/full" element={<LandingPage />} />
                <Route path="/test" element={<TestPage />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Router>
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 4000,
                style: {
                  fontFamily: 'Cairo, system-ui, sans-serif'
                },
                className: 'dark:bg-gray-800 dark:text-white',
              }}
            />
          </div>
        </DataProvider>
      </CustomizationProvider>
    </ThemeProvider>
  );
}

export default App;
