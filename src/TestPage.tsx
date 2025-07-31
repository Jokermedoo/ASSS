import React from 'react';

const TestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">KYCtrust Platform Test</h1>
        <p className="text-gray-600 mb-6">الموقع يعمل بنجاح!</p>
        <div className="space-y-4">
          <div className="bg-green-100 text-green-800 p-3 rounded-lg">
            ✅ React Component Working
          </div>
          <div className="bg-blue-100 text-blue-800 p-3 rounded-lg">
            ✅ Tailwind CSS Working
          </div>
          <div className="bg-purple-100 text-purple-800 p-3 rounded-lg">
            ✅ Arabic Text Support
          </div>
        </div>
        <button 
          onClick={() => alert('Button working!')}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Test Button
        </button>
      </div>
    </div>
  );
};

export default TestPage;
