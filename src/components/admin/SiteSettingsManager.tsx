import React, { useState, useRef } from 'react';
import { Save, Globe, FileText, Bell, Phone, Upload, Image, Settings, Palette, Type } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';

const SiteSettingsManager: React.FC = () => {
  const { siteSettings, updateSiteSettings, loading, error, refreshData } = useData();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'general' | 'logo' | 'colors' | 'advanced'>('general');
  const logoInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: siteSettings.title,
    description: siteSettings.description,
    orderNotice: siteSettings.orderNotice,
    whatsappNumber: siteSettings.whatsappNumber || '+201062453344',
    logoUrl: '',
    faviconUrl: '',
    primaryColor: '#3B82F6',
    secondaryColor: '#1E40AF',
    accentColor: '#F59E0B',
    fontFamily: 'Cairo',
    metaKeywords: '',
    metaDescription: '',
    maintenanceMode: false,
    maintenanceMessage: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return <LoadingSpinner size="lg" text="جاري تحميل الإعدادات..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refreshData} />;
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData({ ...formData, logoUrl: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData({ ...formData, faviconUrl: result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>إعدادات الموقع</h1>
          <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>تحكم في جميع إعدادات ومظهر الموقع</p>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-reverse space-x-2"
        >
          <Save className="h-5 w-5" />
          <span>حفظ جميع التغييرات</span>
        </button>
      </div>

      {/* Tabs */}
      <div className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <nav className="flex space-x-reverse space-x-8">
          {[
            { id: 'general', name: 'الإعدادات العامة', icon: Settings },
            { id: 'logo', name: 'اللوجو والصور', icon: Image },
            { id: 'colors', name: 'الألوان والخطوط', icon: Palette },
            { id: 'advanced', name: 'الإعدادات المتقدمة', icon: Globe }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-reverse space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : theme === 'dark'
                  ? 'border-transparent text-gray-400 hover:text-gray-300'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className={`rounded-xl shadow-sm border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
        <div className="p-6 space-y-6">

          {/* General Settings Tab */}
          {activeTab === 'general' && (
            <div className="space-y-6">
          {/* Site Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center space-x-reverse space-x-2">
                <Globe className="h-4 w-4 text-blue-600" />
                <span>عنوان الموقع الرئيسي</span>
              </div>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="عنوان جذاب للموقع"
            />
            <p className="text-xs text-gray-500 mt-1">
              سيظهر هذا العنوان في أعلى الصفحة الرئيسية
            </p>
          </div>

          {/* Site Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center space-x-reverse space-x-2">
                <FileText className="h-4 w-4 text-blue-600" />
                <span>وصف الموقع</span>
              </div>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
              placeholder="وصف تعريفي شامل عن خدمات الموقع"
            />
            <p className="text-xs text-gray-500 mt-1">
              وصف مختصر يظهر ��حت العنوان الرئيسي لتعريف العملاء بخدماتك
            </p>
          </div>

          {/* WhatsApp Number */}
          <div>
            <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center space-x-reverse space-x-2">
                <Phone className="h-4 w-4 text-green-600" />
                <span>رقم الواتس اب</span>
              </div>
            </label>
            <input
              type="tel"
              id="whatsappNumber"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="+966501234567"
              dir="ltr"
            />
            <p className="text-xs text-gray-500 mt-1">
              رقم الواتس اب الذي سيتم ��رسال الطلبات إليه (مع رمز الدولة)
            </p>
          </div>

          {/* Order Notice */}
          <div>
            <label htmlFor="orderNotice" className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center space-x-reverse space-x-2">
                <Bell className="h-4 w-4 text-blue-600" />
                <span>تنبيه الطلبات</span>
              </div>
            </label>
            <textarea
              id="orderNotice"
              name="orderNotice"
              value={formData.orderNotice}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
              placeholder="رسالة تظهر للعملاء بعد إرسال الطلب"
            />
            <p className="text-xs text-gray-500 mt-1">
              رسالة تنبيه تظهر للعملاء في نموذج الطلب وبعد الإرسال
            </p>
          </div>

            </div>
          )}

          {/* Logo & Images Tab */}
          {activeTab === 'logo' && (
            <div className="space-y-6">
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>اللوجو والصور</h2>

              {/* Logo Upload */}
              <div>
                <label className={`block text-sm font-medium mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  لوجو الموقع الرئيسي
                </label>

                <div className="flex items-center space-x-reverse space-x-6">
                  <div className={`w-32 h-32 rounded-xl border-2 border-dashed flex items-center justify-center ${theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'}`}>
                    {formData.logoUrl ? (
                      <img src={formData.logoUrl} alt="Logo" className="w-full h-full object-contain rounded-xl" />
                    ) : (
                      <div className="text-center">
                        <Image className={`h-8 w-8 mx-auto mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>لا يوجد لوجو</p>
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <input
                      type="file"
                      ref={logoInputRef}
                      onChange={handleLogoUpload}
                      accept="image/*"
                      className="hidden"
                    />

                    <button
                      type="button"
                      onClick={() => logoInputRef.current?.click()}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-reverse space-x-2 mb-3"
                    >
                      <Upload className="h-5 w-5" />
                      <span>رفع لوجو جديد</span>
                    </button>

                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      الحد الأقصى: 2MB • أشكال مدعومة: PNG, JPG, SVG
                    </p>

                    {formData.logoUrl && (
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, logoUrl: '' })}
                        className="mt-2 text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        حذف اللوجو
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Favicon Upload */}
              <div>
                <label className={`block text-sm font-medium mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  أيقونة الموقع (Favicon)
                </label>

                <div className="flex items-center space-x-reverse space-x-6">
                  <div className={`w-16 h-16 rounded-lg border-2 border-dashed flex items-center justify-center ${theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'}`}>
                    {formData.faviconUrl ? (
                      <img src={formData.faviconUrl} alt="Favicon" className="w-full h-full object-contain rounded-lg" />
                    ) : (
                      <Globe className={`h-6 w-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
                    )}
                  </div>

                  <div className="flex-1">
                    <input
                      type="file"
                      ref={faviconInputRef}
                      onChange={handleFaviconUpload}
                      accept="image/*"
                      className="hidden"
                    />

                    <button
                      type="button"
                      onClick={() => faviconInputRef.current?.click()}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-reverse space-x-2"
                    >
                      <Upload className="h-4 w-4" />
                      <span>رفع أيقونة</span>
                    </button>

                    <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      مقاس مفضل: 32x32px أو 16x16px
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Colors & Fonts Tab */}
          {activeTab === 'colors' && (
            <div className="space-y-6">
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>الألوان والخطوط</h2>

              {/* Colors */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    اللون الأساسي
                  </label>
                  <div className="flex items-center space-x-reverse space-x-3">
                    <input
                      type="color"
                      value={formData.primaryColor}
                      onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                      className="h-12 w-16 rounded-lg border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.primaryColor}
                      onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                      className={`flex-1 px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    اللون الثانوي
                  </label>
                  <div className="flex items-center space-x-reverse space-x-3">
                    <input
                      type="color"
                      value={formData.secondaryColor}
                      onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                      className="h-12 w-16 rounded-lg border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.secondaryColor}
                      onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                      className={`flex-1 px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    لون الإبراز
                  </label>
                  <div className="flex items-center space-x-reverse space-x-3">
                    <input
                      type="color"
                      value={formData.accentColor}
                      onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                      className="h-12 w-16 rounded-lg border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.accentColor}
                      onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                      className={`flex-1 px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    />
                  </div>
                </div>
              </div>

              {/* Font Selection */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  خط الموقع الأساسي
                </label>
                <select
                  value={formData.fontFamily}
                  onChange={(e) => setFormData({ ...formData, fontFamily: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                >
                  <option value="Cairo">Cairo (عربي)</option>
                  <option value="Tajawal">Tajawal (عربي)</option>
                  <option value="Inter">Inter (��نجليزي)</option>
                  <option value="Roboto">Roboto (إنجليزي)</option>
                  <option value="Poppins">Poppins (إنجليزي)</option>
                </select>
              </div>

              {/* Color Preview */}
              <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>معاينة الألوان</h3>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div
                      className="w-full h-16 rounded-xl border border-gray-300"
                      style={{ backgroundColor: formData.primaryColor }}
                    />
                    <span className="text-sm font-medium mt-2 block">أساسي</span>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-full h-16 rounded-xl border border-gray-300"
                      style={{ backgroundColor: formData.secondaryColor }}
                    />
                    <span className="text-sm font-medium mt-2 block">ثانوي</span>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-full h-16 rounded-xl border border-gray-300"
                      style={{ backgroundColor: formData.accentColor }}
                    />
                    <span className="text-sm font-medium mt-2 block">إبراز</span>
                  </div>
                </div>

                <button
                  className="w-full text-white px-6 py-3 rounded-xl font-semibold"
                  style={{ background: `linear-gradient(to right, ${formData.primaryColor}, ${formData.secondaryColor})` }}
                >
                  زر تجريبي بالألوان الجديدة
                </button>
              </div>
            </div>
          )}

          {/* Advanced Settings Tab */}
          {activeTab === 'advanced' && (
            <div className="space-y-6">
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>الإعدادات المتقدمة</h2>

              {/* SEO Settings */}
              <div className="space-y-4">
                <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>تحسين محركات البحث (SEO)</h3>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    الكلمات المفتاحية (مفصولة بفواصل)
                  </label>
                  <textarea
                    value={formData.metaKeywords}
                    onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} resize-none`}
                    placeholder="خدمات مالية, محافظ رقمية, تحويلات دولية, KYC Trust"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    وصف الموقع لمحركات البحث
                  </label>
                  <textarea
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} resize-none`}
                    placeholder="منصة KYCtrust الرائدة في تقديم الخدمات المالية الرقمية الآمنة والموثوقة"
                  />
                </div>
              </div>

              {/* Maintenance Mode */}
              <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-yellow-50 border-yellow-200'}`}>
                <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>وضع الصيانة</h3>

                <div className="flex items-center space-x-reverse space-x-3 mb-4">
                  <input
                    type="checkbox"
                    id="maintenanceMode"
                    checked={formData.maintenanceMode}
                    onChange={(e) => setFormData({ ...formData, maintenanceMode: e.target.checked })}
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                  />
                  <label htmlFor="maintenanceMode" className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    تفعيل وضع الصيانة
                  </label>
                </div>

                {formData.maintenanceMode && (
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      رسالة الصيانة
                    </label>
                    <textarea
                      value={formData.maintenanceMessage}
                      onChange={(e) => setFormData({ ...formData, maintenanceMessage: e.target.value })}
                      rows={3}
                      className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'} resize-none`}
                      placeholder="الموقع تحت الصيانة حالياً، سنعود قريباً..."
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preview Section */}
      <div className={`rounded-xl border p-6 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-blue-900/20 border-gray-700' : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100'}`}>
        <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>معاينة مباشرة</h2>

        <div className={`rounded-lg p-6 ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
          {/* Logo Preview */}
          {activeTab === 'logo' && formData.logoUrl && (
            <div className="flex items-center space-x-reverse space-x-4 mb-6">
              <img src={formData.logoUrl} alt="Logo Preview" className="h-12 w-auto" />
              <div>
                <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>KYCtrust</h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>منصة الخدمات المالية</p>
              </div>
            </div>
          )}

          {/* General Preview */}
          {activeTab === 'general' && (
            <>
              <h1 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {formData.title}
              </h1>
              <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {formData.description}
              </p>

              <div className={`border rounded-lg p-4 ${theme === 'dark' ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-200'}`}>
                <p className={`text-sm ${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-800'}`}>
                  <strong>تنبيه:</strong> {formData.orderNotice}
                </p>
              </div>
            </>
          )}

          {/* Colors Preview */}
          {activeTab === 'colors' && (
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: formData.fontFamily }}>عينة النص بالخط المحدد</h3>
              <div className="flex space-x-reverse space-x-3">
                <button
                  className="px-6 py-3 rounded-xl text-white font-semibold"
                  style={{ backgroundColor: formData.primaryColor }}
                >
                  زر ��ساسي
                </button>
                <button
                  className="px-6 py-3 rounded-xl text-white font-semibold"
                  style={{ backgroundColor: formData.secondaryColor }}
                >
                  زر ثانوي
                </button>
                <button
                  className="px-6 py-3 rounded-xl text-white font-semibold"
                  style={{ backgroundColor: formData.accentColor }}
                >
                  زر إبراز
                </button>
              </div>
            </div>
          )}

          {/* Advanced Preview */}
          {activeTab === 'advanced' && (
            <div className="space-y-4">
              {formData.maintenanceMode && (
                <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-red-900/20 border-red-700' : 'bg-red-50 border-red-200'}`}>
                  <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-red-300' : 'text-red-800'}`}>وضع الصيانة مفعل</h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
                    {formData.maintenanceMessage || 'الموقع تحت الصيانة حالياً'}
                  </p>
                </div>
              )}
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <strong>الكلمات المفتاحية:</strong> {formData.metaKeywords || 'لم يتم تحديدها'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SiteSettingsManager;
