import React, { useState } from 'react';
import OrderModal from './OrderModal';

const TestOrderPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }} dir="rtl">
      <h1 style={{ color: '#2563eb', marginBottom: '20px' }}>🎉 اختبار نظام الطلبات المحدث</h1>
      
      <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
        <h2>المميزات الجديدة:</h2>
        <ul style={{ marginRight: '20px' }}>
          <li>✅ رقم فودافون كاش نفس رقم الواتساب (+966501234567)</li>
          <li>✅ شاشة دفع متطورة بدلاً من حقل الملاحظات</li>
          <li>✅ عرض طرق الدفع مع إمكانية النسخ</li>
          <li>✅ خطوات واضحة للعميل</li>
          <li>✅ إرسال تفاصيل الدفع للواتساب</li>
        </ul>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>اختبار الخدمات:</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginTop: '10px' }}>
          {[
            {name: 'Payoneer', price: '30$'},
            {name: 'PayPal', price: '15$'},
            {name: 'Wise', price: '30$'}
          ].map((service) => (
            <button
              key={service.name}
              onClick={() => setIsModalOpen(true)}
              style={{
                padding: '15px',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              {service.name} - {service.price}
            </button>
          ))}
        </div>
      </div>

      <div style={{ backgroundColor: '#dbeafe', padding: '15px', borderRadius: '8px' }}>
        <h4>معلومات الدفع الحالية:</h4>
        <p><strong>فودافون كاش:</strong> +966501234567</p>
        <p><strong>USDT (TRC20):</strong> TFUt8GRpk2R8Wv3FvoCiSUghRBQo4HrmQK</p>
        <p><strong>ملاحظة:</strong> نفس رقم الواتساب للتسهيل على العملاء</p>
      </div>

      {/* Order Modal */}
      {isModalOpen && (
        <OrderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          serviceName="Payoneer"
          servicePrice="30$"
        />
      )}
    </div>
  );
};

export default TestOrderPage;
