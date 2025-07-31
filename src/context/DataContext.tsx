import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';

export interface Service {
  id: string;
  name: string;
  price: string;
  order: number;
  active: boolean;
}

export interface PaymentMethod {
  id: string;
  name: string;
  details: string;
  active: boolean;
}

export interface SiteSettings {
  title: string;
  description: string;
  orderNotice: string;
  whatsappNumber?: string;
}

export interface Order {
  id: string;
  customerName: string;
  serviceName: string;
  notes: string;
  timestamp: Date;
  archived: boolean;
}

interface DataContextType {
  services: Service[];
  paymentMethods: PaymentMethod[];
  siteSettings: SiteSettings;
  orders: Order[];
  loading: boolean;
  error: string | null;
  addOrder: (order: Omit<Order, 'id' | 'timestamp'>) => void;
  refreshData: () => void;
}

// Default data
const defaultServices: Service[] = [
  { id: '1', name: 'Payoneer', price: '30$', order: 1, active: true },
  { id: '2', name: 'Wise', price: '30$', order: 2, active: true },
  { id: '3', name: 'Skrill', price: '20$', order: 3, active: true },
  { id: '4', name: 'Neteller', price: '20$', order: 4, active: true },
  { id: '5', name: 'Kast', price: '20$', order: 5, active: true },
  { id: '6', name: 'Redotpay', price: '20$', order: 6, active: true },
  { id: '7', name: 'OKX', price: '20$', order: 7, active: true },
  { id: '8', name: 'World First', price: '20$', order: 8, active: true },
  { id: '9', name: 'Bybit', price: '20$', order: 9, active: true },
  { id: '10', name: 'Bitget', price: '20$', order: 10, active: true },
  { id: '11', name: 'KuCoin', price: '20$', order: 11, active: true },
  { id: '12', name: 'PayPal', price: '15$', order: 12, active: true },
  { id: '13', name: 'Mexc', price: '20$', order: 13, active: true },
  { id: '14', name: 'Exness', price: '20$', order: 14, active: true },
  { id: '15', name: 'شحن رصيد فودافون', price: '100 جنيه = 120 جنيه (متاح أي مبلغ)', order: 15, active: true },
  { id: '16', name: 'سحب من TikTok', price: 'حسب الاتفاق', order: 16, active: true },
  { id: '17', name: 'سحب من PayPal', price: 'حسب الاتفاق', order: 17, active: true },
];

const defaultPaymentMethods: PaymentMethod[] = [
  { id: '1', name: 'Vodafone Cash', details: '+966501234567', active: true },
  { id: '2', name: 'USDT (TRC20)', details: 'TFUt8GRpk2R8Wv3FvoCiSUghRBQo4HrmQK', active: true },
];

const defaultSiteSettings: SiteSettings = {
  title: 'KYCtrust - خدمات مالية رقمية موثوقة',
  description: 'نقدم خدمات مالية رقمية احترافية وآمنة لجميع المنصات العالمية مع ضمان الجودة والموثوقية',
  orderNotice: 'سيتم التواصل معك يدوياً عبر واتساب بعد إرسال الطلب.',
  whatsappNumber: '+966501234567'
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(defaultPaymentMethods);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshData = async () => {
    // For now, just use defaults - API integration can be added later
    console.log('Using default data (Supabase not configured)');
  };

  const addOrder = (order: Omit<Order, 'id' | 'timestamp'>) => {
    const newOrder: Order = {
      ...order,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setOrders(prev => [newOrder, ...prev]);
    
    toast.success('تم حفظ الطلب بنجاح!');
  };

  const value: DataContextType = {
    services,
    paymentMethods,
    siteSettings,
    orders,
    loading,
    error,
    addOrder,
    refreshData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
