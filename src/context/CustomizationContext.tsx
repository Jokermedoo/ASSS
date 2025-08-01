import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';

export interface HeroSection {
  title: string;
  titleGradient: string;
  subtitle: string;
  button1Text: string;
  button2Text?: string;
  badgeText: string;
  showStats: boolean;
  statsData: {
    clients: string;
    successRate: string;
    support: string;
    speed: string;
  };
}

export interface GlobalSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  borderRadius: string;
  spacing: string;
}

export interface CustomizationData {
  hero: HeroSection;
  globalSettings: GlobalSettings;
}

interface CustomizationContextType {
  customization: CustomizationData;
  loading: boolean;
  error: string | null;
  updateHeroSection: (hero: HeroSection) => Promise<void>;
  updateGlobalSettings: (settings: GlobalSettings) => Promise<void>;
  refreshCustomization: () => void;
}

// Default customization data
const defaultCustomization: CustomizationData = {
  hero: {
    title: 'مستقبل الخدمات',
    titleGradient: 'المالية الرقمية',
    subtitle: 'نحن نعيد تعريف الخدمات المالية الرقمية من خلال تقديم حلول مبتكرة وآمنة ومتطورة تلبي احتياجاتك المالية بكفاءة عالية وموثوقية استثنائية',
    button1Text: 'ابدأ رحلتك معنا',
    button2Text: 'استكشف الخدمات',
    badgeText: 'منصة رائدة في الخدمات المالية الرقمية',
    showStats: true,
    statsData: {
      clients: '15,000+',
      successRate: '99.9%',
      support: '24/7',
      speed: '< 5 دقائق'
    }
  },
  globalSettings: {
    primaryColor: '#3b82f6',
    secondaryColor: '#6366f1',
    accentColor: '#8b5cf6',
    fontFamily: 'Cairo',
    borderRadius: '1rem',
    spacing: '1.5rem'
  }
};

const CustomizationContext = createContext<CustomizationContextType | undefined>(undefined);

export const CustomizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [customization, setCustomization] = useState<CustomizationData>(defaultCustomization);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load customization from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('kyctrust_customization');
      if (saved) {
        const parsed = JSON.parse(saved);
        setCustomization({ ...defaultCustomization, ...parsed });
      }
    } catch (error) {
      console.error('Error loading customization:', error);
    }
  }, []);

  const saveToStorage = (data: CustomizationData) => {
    try {
      localStorage.setItem('kyctrust_customization', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving customization:', error);
    }
  };

  const updateHeroSection = async (hero: HeroSection): Promise<void> => {
    try {
      setLoading(true);
      const newCustomization = { ...customization, hero };
      setCustomization(newCustomization);
      saveToStorage(newCustomization);
      setError(null);
    } catch (error) {
      const errorMessage = 'فشل في حفظ إعدادات القسم الرئيسي';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateGlobalSettings = async (settings: GlobalSettings): Promise<void> => {
    try {
      setLoading(true);
      const newCustomization = { ...customization, globalSettings: settings };
      setCustomization(newCustomization);
      saveToStorage(newCustomization);
      setError(null);
    } catch (error) {
      const errorMessage = 'فشل في حفظ الإعدادات العامة';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const refreshCustomization = () => {
    try {
      const saved = localStorage.getItem('kyctrust_customization');
      if (saved) {
        const parsed = JSON.parse(saved);
        setCustomization({ ...defaultCustomization, ...parsed });
      } else {
        setCustomization(defaultCustomization);
      }
      setError(null);
    } catch (error) {
      console.error('Error refreshing customization:', error);
      setError('فشل في تحديث البيانات');
    }
  };

  const value: CustomizationContextType = {
    customization,
    loading,
    error,
    updateHeroSection,
    updateGlobalSettings,
    refreshCustomization
  };

  return (
    <CustomizationContext.Provider value={value}>
      {children}
    </CustomizationContext.Provider>
  );
};

export const useCustomization = (): CustomizationContextType => {
  const context = useContext(CustomizationContext);
  if (context === undefined) {
    throw new Error('useCustomization must be used within a CustomizationProvider');
  }
  return context;
};
