import React, { useState } from 'react';
import { X, Send, User, CreditCard, Shield, Clock, MessageCircle, Copy, CheckCircle, ArrowRight, ArrowLeft, Smartphone, DollarSign } from 'lucide-react';
import { useData } from '../context/DataContext';
import toast from 'react-hot-toast';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  servicePrice: string;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, serviceName, servicePrice }) => {
  const { addOrder, siteSettings, paymentMethods } = useData();
  const [currentStep, setCurrentStep] = useState<'info' | 'payment'>('info');
  const [formData, setFormData] = useState({
    customerName: '',
    selectedPaymentMethod: '',
  });
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const selectedPayment = paymentMethods.find(pm => pm.id === formData.selectedPaymentMethod);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.customerName.trim()) {
      if (currentStep === 'info') {
        setCurrentStep('payment');
      } else {
        // إرسال الطلب للواتس اب مع معلومات الدفع
        sendOrderToWhatsApp();
        
        // حفظ الطلب في قاعدة البيانات
        addOrder({
          customerName: formData.customerName.trim(),
          serviceName,
          notes: `طريقة الدفع: ${selectedPayment?.name || 'غير محدد'}`,
          archived: false
        });

        resetForm();
        toast.success('تم إرسال طلبك مع تفاصيل الدفع بنجاح!');
        onClose();
      }
    }
  };

  const sendOrderToWhatsApp = () => {
    const whatsappNumber = siteSettings?.whatsappNumber || '+966501234567';
    const message = `🔔 *طلب خدمة جديد*\n\n` +
                   `👤 *العميل:* ${formData.customerName.trim()}\n` +
                   `🛍️ *الخدمة:* ${serviceName}\n` +
                   `💰 *السعر:* ${servicePrice}\n` +
                   `💳 *طريقة الدفع المختارة:* ${selectedPayment?.name || 'غير محدد'}\n` +
                   `📱 *تفاصيل الدفع:* ${selectedPayment?.details || 'غير محدد'}\n\n` +
                   `📅 *التاريخ:* ${new Date().toLocaleString('ar-EG')}\n` +
                   `💻 *من خلال:* منصة KYCtrust\n\n` +
                   `✅ *العميل مستعد للدفع وإرفاق إثبات التحويل*`;

    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      toast.success('تم نسخ المعلومات بنجاح!');
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  const resetForm = () => {
    setFormData({ customerName: '', selectedPaymentMethod: '' });
    setCurrentStep('info');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const goBack = () => {
    setCurrentStep('info');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-reverse space-x-3">
              {currentStep === 'payment' && (
                <button
                  onClick={goBack}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ArrowRight className="h-5 w-5 text-gray-600" />
                </button>
              )}
              <div className="p-2 bg-blue-100 rounded-lg">
                {currentStep === 'info' ? <Send className="h-5 w-5 text-blue-600" /> : <CreditCard className="h-5 w-5 text-blue-600" />}
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {currentStep === 'info' ? 'طلب خدمة' : 'تفاصيل الدفع'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
            >
              <X className="h-5 w-5 text-gray-500 group-hover:text-gray-700" />
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-reverse space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${currentStep === 'info' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'}`}>
                {currentStep === 'info' ? '1' : <CheckCircle className="h-5 w-5" />}
              </div>
              <div className={`w-16 h-1 ${currentStep === 'payment' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${currentStep === 'payment' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                2
              </div>
            </div>
          </div>

          {/* Service Info */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">الخدمة المطلوبة:</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-reverse space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <p className="text-blue-700 font-medium">{serviceName}</p>
              </div>
              <div className="flex items-center space-x-reverse space-x-1 bg-green-100 px-3 py-1 rounded-full">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="text-green-700 font-bold">{servicePrice}</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 'info' && (
              <>
                <div>
                  <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center space-x-reverse space-x-2">
                      <User className="h-4 w-4 text-blue-600" />
                      <span>اسم العميل *</span>
                    </div>
                  </label>
                  <input
                    type="text"
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>

                {/* Security Notice */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center space-x-reverse space-x-2 mb-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">ضمان الأمان</span>
                  </div>
                  <p className="text-xs text-green-700">
                    جميع بياناتك محمية ومشفرة. نحن نحترم خصوصيتك ولا نشارك معلوماتك مع أطراف ثالثة.
                  </p>
                </div>
              </>
            )}

            {currentStep === 'payment' && (
              <>
                {/* Payment Methods */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    <div className="flex items-center space-x-reverse space-x-2">
                      <CreditCard className="h-4 w-4 text-blue-600" />
                      <span>اختر طريقة الدفع *</span>
                    </div>
                  </label>
                  <div className="space-y-3">
                    {paymentMethods.filter(pm => pm.active).map((method) => (
                      <div
                        key={method.id}
                        className={`border rounded-xl p-4 cursor-pointer transition-all ${
                          formData.selectedPaymentMethod === method.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onClick={() => setFormData({ ...formData, selectedPaymentMethod: method.id })}
                      >
                        <div className="flex items-center space-x-reverse space-x-3">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.id}
                            checked={formData.selectedPaymentMethod === method.id}
                            onChange={() => setFormData({ ...formData, selectedPaymentMethod: method.id })}
                            className="text-blue-600"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{method.name}</h4>
                            <div className="flex items-center justify-between mt-1">
                              <p className="text-gray-600 text-sm">{method.details}</p>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyToClipboard(method.details, method.id);
                                }}
                                className="text-blue-600 hover:text-blue-800 transition-colors text-xs flex items-center space-x-reverse space-x-1"
                              >
                                {copiedField === method.id ? (
                                  <CheckCircle className="h-3 w-3" />
                                ) : (
                                  <Copy className="h-3 w-3" />
                                )}
                                <span>{copiedField === method.id ? 'تم النسخ' : 'نسخ'}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selected Payment Instructions */}
                {selectedPayment && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <div className="flex items-center space-x-reverse space-x-2 mb-2">
                      <Smartphone className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-800">تعليمات الدفع</span>
                    </div>
                    <p className="text-sm text-yellow-700 mb-3">
                      {selectedPayment.instructions || `قم بتحويل المبلغ إلى ${selectedPayment.details} وأرفق إثبات التحويل`}
                    </p>
                    <div className="bg-white rounded-lg p-3 border">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-600">المبلغ المطلوب:</p>
                          <p className="font-bold text-green-600">{servicePrice}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">حول إلى:</p>
                          <p className="font-bold text-blue-600">{selectedPayment.details}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* WhatsApp Notice */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center space-x-reverse space-x-2 mb-2">
                    <MessageCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">خطوات مهمة</span>
                  </div>
                  <ol className="text-sm text-green-700 space-y-1">
                    <li>1. قم بتحويل المبلغ المطلوب</li>
                    <li>2. احتفظ بإثبات التحويل (لقطة شاشة)</li>
                    <li>3. اضغط "إرسال للواتس اب" أدناه</li>
                    <li>4. أرفق صورة إثبات التحويل في الواتس اب</li>
                  </ol>
                </div>
              </>
            )}

            {/* Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center space-x-reverse space-x-2 mb-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">معلومات مهمة</span>
              </div>
              <p className="text-sm text-blue-700">
                <strong>تنبيه:</strong> {siteSettings.orderNotice}
              </p>
            </div>

            {/* Buttons */}
            <div className="space-y-3 pt-4">
              {currentStep === 'info' && (
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-reverse space-x-2 hover:scale-105 transform"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>التالي - اختيار طريقة الدفع</span>
                </button>
              )}

              {currentStep === 'payment' && (
                <button
                  type="submit"
                  disabled={!formData.selectedPaymentMethod}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center space-x-reverse space-x-2 hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>إرسال للواتس اب مع تفاصيل الدفع</span>
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors hover:border-gray-400"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
