import React, { useState } from 'react';
import { Shield, Star, MessageCircle, CreditCard } from 'lucide-react';
import { useData } from '../context/DataContext';
import OrderModal from './OrderModal';

const SimpleLandingPage: React.FC = () => {
  const { services, paymentMethods, siteSettings } = useData();
  const [selectedService, setSelectedService] = useState<{name: string, price: string} | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOrderService = (serviceName: string, servicePrice: string) => {
    setSelectedService({name: serviceName, price: servicePrice});
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-reverse space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">KYCtrust</h1>
            </div>
            <button 
              onClick={() => {
                const whatsappNumber = siteSettings.whatsappNumber || '+966501234567';
                const message = 'السلام عليكم، أريد الاستفسار عن خدماتكم';
                const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
              }}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-reverse space-x-2"
            >
              <MessageCircle className="h-4 w-4" />
              <span>واتساب</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            {siteSettings.title}
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {siteSettings.description}
          </p>
          <div className="bg-blue-100 text-blue-800 px-6 py-3 rounded-full inline-block">
            <span>✅ {siteSettings.orderNotice}</span>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">خدماتنا</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((service) => (
              <div 
                key={service.id} 
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <CreditCard className="h-8 w-8 text-blue-600" />
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                    {service.price}
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h4>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <button
                  onClick={() => handleOrderService(service.name, service.price)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  اطلب الآن
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">طرق الدفع</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {paymentMethods.map((method) => (
              <div key={method.id} className="bg-white rounded-xl p-6 text-center shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{method.name}</h4>
                <p className="text-blue-600 font-mono">{method.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Modal */}
      {isModalOpen && selectedService && (
        <OrderModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedService(null);
          }}
          serviceName={selectedService.name}
          servicePrice={selectedService.price}
        />
      )}
    </div>
  );
};

export default SimpleLandingPage;
