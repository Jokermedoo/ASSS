import React, { useState } from 'react';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('vodafone');

  const paymentMethods = [
    { id: 'vodafone', name: 'Vodafone Cash', details: '+201062453344' },
    { id: 'usdt', name: 'USDT (TRC20)', details: 'TFUt8GRpk2R8Wv3FvoCiSUghRBQo4HrmQK' }
  ];

  const handleSubmit = () => {
    const payment = paymentMethods.find(p => p.id === selectedPayment);
    const whatsappNumber = '+201062453344';
    const message = `🔔 طلب خدمة جديد

👤 العميل: ${customerName}
🛍️ الخدمة: Payoneer
💰 السعر: 30$
💳 طريقة الدفع: ${payment?.name}
📱 التفاصيل: ${payment?.details}

✅ العميل مستعد للدفع وإرفاق إثبات التحويل`;

    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setShowModal(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }} dir="rtl">
      <h1 style={{ color: '#2563eb', marginBottom: '20px' }}>🎉 KYCtrust - نظام الطلبات المحدث</h1>
      
      <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
        <h2>✅ التحديثات المكتملة:</h2>
        <ul style={{ marginRight: '20px' }}>
          <li>رقم فودافون كاش نفس رقم الواتساب: <strong>+201062453344</strong></li>
          <li>شاشة دفع بدلاً من حقل الملاحظات</li>
          <li>عرض طرق الدفع مع إمكانية النسخ</li>
          <li>إرسال تفاصيل الدفع للواتساب</li>
          <li>خطوات واضحة للعميل</li>
        </ul>
      </div>

      <button
        onClick={() => setShowModal(true)}
        style={{
          padding: '15px 30px',
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          marginBottom: '20px'
        }}
      >
        اختبار طلب خدمة Payoneer - 30$
      </button>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '15px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <h3 style={{ marginBottom: '20px', color: '#1f2937' }}>طلب خدمة Payoneer - 30$</h3>
            
            {/* Customer Name */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>اسم العميل:</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="أدخل اسمك الكامل"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  fontSize: '16px'
                }}
              />
            </div>

            {/* Payment Methods */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>اختر طريقة الدفع:</label>
              {paymentMethods.map((method) => (
                <div key={method.id} style={{
                  border: selectedPayment === method.id ? '2px solid #2563eb' : '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '15px',
                  marginBottom: '10px',
                  cursor: 'pointer',
                  backgroundColor: selectedPayment === method.id ? '#eff6ff' : 'white'
                }} onClick={() => setSelectedPayment(method.id)}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                    <input
                      type="radio"
                      checked={selectedPayment === method.id}
                      onChange={() => setSelectedPayment(method.id)}
                      style={{ marginLeft: '10px' }}
                    />
                    <strong>{method.name}</strong>
                  </div>
                  <div style={{ color: '#666', fontSize: '14px' }}>{method.details}</div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(method.details);
                      alert('تم نسخ التفاصيل!');
                    }}
                    style={{
                      backgroundColor: '#10b981',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      marginTop: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    نسخ
                  </button>
                </div>
              ))}
            </div>

            {/* Instructions */}
            <div style={{ backgroundColor: '#fef3c7', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
              <h4 style={{ color: '#92400e', marginBottom: '10px' }}>خطوات الدفع:</h4>
              <ol style={{ color: '#92400e', fontSize: '14px' }}>
                <li>قم بتحويل المبلغ المطلوب (30$)</li>
                <li>احتفظ بإثبات التحويل (لقطة شاشة)</li>
                <li>اضغط "إرسال للواتساب" أدناه</li>
                <li>أرفق صورة إثبات التحويل في الواتساب</li>
              </ol>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleSubmit}
                disabled={!customerName.trim()}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: customerName.trim() ? '#10b981' : '#ccc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: customerName.trim() ? 'pointer' : 'not-allowed',
                  fontSize: '16px'
                }}
              >
                إرسال للواتساب مع تفاصيل الدفع
              </button>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: '12px 20px',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info Section */}
      <div style={{ backgroundColor: '#dbeafe', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
        <h3>معلومات الدفع المحدثة:</h3>
        <p><strong>فودافون كاش:</strong> +201062453344 (نفس رقم الواتساب)</p>
        <p><strong>USDT (TRC20):</strong> TFUt8GRpk2R8Wv3FvoCiSUghRBQo4HrmQK</p>
        <p style={{ color: '#1d4ed8', fontWeight: 'bold' }}>✅ تم توحيد الأرقام لتسهيل التواصل</p>
      </div>
    </div>
  );
}

export default App;
