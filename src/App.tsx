import React from 'react';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#2563eb' }}>🎉 KYCtrust Platform - Working!</h1>
      <p>✅ React is working correctly</p>
      <p>✅ App is loading</p>
      <p>✅ Basic functionality confirmed</p>
      
      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h3>النص العربي يعمل بشكل صحيح</h3>
        <p>هذا اختبار للنص العربي والتأكد من أن كل شيء يعمل بشكل طبيعي</p>
      </div>

      <button 
        onClick={() => alert('Button clicked!')}
        style={{ 
          marginTop: '10px', 
          padding: '10px 20px', 
          backgroundColor: '#2563eb', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Test Button
      </button>
    </div>
  );
}

export default App;
