import React from 'react';

const TestPage: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '32px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb', marginBottom: '16px' }}>KYCtrust Platform Test</h1>
        <p style={{ color: '#4b5563', marginBottom: '24px' }}>الموقع يعمل بنجاح!</p>
        <div style={{ marginBottom: '16px' }}>
          <div style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '12px', borderRadius: '8px', marginBottom: '8px' }}>
            ✅ React Component Working
          </div>
          <div style={{ backgroundColor: '#dbeafe', color: '#1e40af', padding: '12px', borderRadius: '8px', marginBottom: '8px' }}>
            ✅ Inline Styles Working
          </div>
          <div style={{ backgroundColor: '#f3e8ff', color: '#7c3aed', padding: '12px', borderRadius: '8px' }}>
            ✅ Arabic Text Support
          </div>
        </div>
        <button
          onClick={() => alert('Button working!')}
          style={{ marginTop: '24px', backgroundColor: '#2563eb', color: 'white', padding: '8px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
        >
          Test Button
        </button>
      </div>
    </div>
  );
};

export default TestPage;
