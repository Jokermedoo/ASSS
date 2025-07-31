import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import SimpleLandingPage from './components/SimpleLandingPage';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <DataProvider>
      <div className="min-h-screen">
        <Router>
          <Routes>
            <Route path="/" element={<SimpleLandingPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              fontFamily: 'system-ui, sans-serif'
            }
          }}
        />
      </div>
    </DataProvider>
  );
}

export default App;
