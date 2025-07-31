import { supabase, isSupabaseConfigured, DatabaseService, DatabasePaymentMethod, DatabaseOrder, DatabaseSiteSettings } from '../lib/supabase';
import { Service, PaymentMethod, Order, SiteSettings } from '../context/DataContext';

// Helper function to make API calls as fallback
const makeApiCall = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`/api/${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
};

// Helper function to check if we can use Supabase
const checkSupabaseAvailable = () => {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase not configured. Using API fallback.');
  }
  return supabase;
};

// خدمات قاعدة البيانات للخدمات
export const servicesService = {
  async getAll(): Promise<Service[]> {
    try {
      const client = checkSupabaseAvailable();
      const { data, error } = await client
        .from('services')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;

      return data.map((item: DatabaseService) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        order: item.order_index,
        active: item.active
      }));
    } catch (error) {
      // Fallback to API
      try {
        const response = await makeApiCall('services');
        return response.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          order: item.order_index || 0,
          active: item.active
        }));
      } catch (apiError) {
        console.warn('Both Supabase and API unavailable, returning empty services array');
        return [];
      }
    }
  },

  async create(service: Omit<Service, 'id'>): Promise<Service> {
    try {
      const client = checkSupabaseAvailable();
      const { data, error } = await client
        .from('services')
        .insert({
          name: service.name,
          price: service.price,
          order_index: service.order,
          active: service.active
        })
        .select()
        .single();

      if (error) throw error;

      return {
        id: data.id,
        name: data.name,
        price: data.price,
        order: data.order_index,
        active: data.active
      };
    } catch (error) {
      // Fallback to API
      try {
        const response = await makeApiCall('services', {
          method: 'POST',
          body: JSON.stringify({
            name: service.name,
            price: service.price,
            order_index: service.order,
          }),
        });
        return {
          id: response.data.id,
          name: response.data.name,
          price: response.data.price,
          order: response.data.order_index,
          active: response.data.active
        };
      } catch (apiError) {
        console.warn('Service creation failed on both Supabase and API');
        throw new Error('Database operation not available');
      }
    }
  },

  async update(id: string, updates: Partial<Service>): Promise<Service> {
    try {
      const client = checkSupabaseAvailable();
      const updateData: any = {};
      if (updates.name !== undefined) updateData.name = updates.name;
      if (updates.price !== undefined) updateData.price = updates.price;
      if (updates.order !== undefined) updateData.order_index = updates.order;
      if (updates.active !== undefined) updateData.active = updates.active;

      const { data, error } = await client
        .from('services')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return {
        id: data.id,
        name: data.name,
        price: data.price,
        order: data.order_index,
        active: data.active
      };
    } catch (error) {
      // Fallback to API
      try {
        const updateData: any = {};
        if (updates.name !== undefined) updateData.name = updates.name;
        if (updates.price !== undefined) updateData.price = updates.price;
        if (updates.order !== undefined) updateData.order_index = updates.order;
        if (updates.active !== undefined) updateData.active = updates.active;

        const response = await makeApiCall(`services?id=${id}`, {
          method: 'PUT',
          body: JSON.stringify(updateData),
        });
        return {
          id: response.data.id,
          name: response.data.name,
          price: response.data.price,
          order: response.data.order_index,
          active: response.data.active
        };
      } catch (apiError) {
        throw new Error('Service update failed');
      }
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const client = checkSupabaseAvailable();
      const { error } = await client
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      // Fallback to API
      try {
        await makeApiCall(`services?id=${id}`, { method: 'DELETE' });
      } catch (apiError) {
        throw new Error('Service deletion failed');
      }
    }
  }
};

// خدمات قاعدة البيانات لطرق الدفع
export const paymentMethodsService = {
  async getAll(): Promise<PaymentMethod[]> {
    try {
      const client = checkSupabaseAvailable();
      const { data, error } = await client
        .from('payment_methods')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      return data.map((item: DatabasePaymentMethod) => ({
        id: item.id,
        name: item.name,
        details: item.details,
        active: item.active
      }));
    } catch (error) {
      // Fallback to API
      try {
        const response = await makeApiCall('payment-methods');
        return response.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          details: item.details,
          active: item.active
        }));
      } catch (apiError) {
        console.warn('Both Supabase and API unavailable, returning empty payment methods array');
        return [];
      }
    }
  },

  async create(method: Omit<PaymentMethod, 'id'>): Promise<PaymentMethod> {
    try {
      const client = checkSupabaseAvailable();
      const { data, error } = await client
        .from('payment_methods')
        .insert({
          name: method.name,
          details: method.details,
          active: method.active
        })
        .select()
        .single();

      if (error) throw error;

      return {
        id: data.id,
        name: data.name,
        details: data.details,
        active: data.active
      };
    } catch (error) {
      // Fallback to API
      try {
        const response = await makeApiCall('payment-methods', {
          method: 'POST',
          body: JSON.stringify(method),
        });
        return response.data;
      } catch (apiError) {
        throw new Error('Payment method creation failed');
      }
    }
  },

  async update(id: string, updates: Partial<PaymentMethod>): Promise<PaymentMethod> {
    try {
      const client = checkSupabaseAvailable();
      const { data, error } = await client
        .from('payment_methods')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return {
        id: data.id,
        name: data.name,
        details: data.details,
        active: data.active
      };
    } catch (error) {
      // Fallback to API
      try {
        const response = await makeApiCall(`payment-methods?id=${id}`, {
          method: 'PUT',
          body: JSON.stringify(updates),
        });
        return response.data;
      } catch (apiError) {
        throw new Error('Payment method update failed');
      }
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const client = checkSupabaseAvailable();
      const { error } = await client
        .from('payment_methods')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      // Fallback to API
      try {
        await makeApiCall(`payment-methods?id=${id}`, { method: 'DELETE' });
      } catch (apiError) {
        throw new Error('Payment method deletion failed');
      }
    }
  }
};

// خدمات قاعدة البيانات للطلبات
export const ordersService = {
  async getAll(): Promise<Order[]> {
    try {
      const client = checkSupabaseAvailable();
      const { data, error } = await client
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map((item: DatabaseOrder) => ({
        id: item.id,
        customerName: item.customer_name,
        serviceName: item.service_name,
        notes: item.notes,
        timestamp: new Date(item.created_at),
        archived: item.archived
      }));
    } catch (error) {
      // Fallback to API
      try {
        const response = await makeApiCall('orders');
        return response.data.map((item: any) => ({
          id: item.id,
          customerName: item.customer_name,
          serviceName: item.service_name,
          notes: item.notes,
          timestamp: new Date(item.created_at),
          archived: item.archived
        }));
      } catch (apiError) {
        console.warn('Both Supabase and API unavailable, returning empty orders array');
        return [];
      }
    }
  },

  async create(order: Omit<Order, 'id' | 'timestamp'>): Promise<Order> {
    try {
      const client = checkSupabaseAvailable();
      const { data, error } = await client
        .from('orders')
        .insert({
          customer_name: order.customerName,
          service_name: order.serviceName,
          notes: order.notes,
          archived: order.archived
        })
        .select()
        .single();

      if (error) throw error;

      return {
        id: data.id,
        customerName: data.customer_name,
        serviceName: data.service_name,
        notes: data.notes,
        timestamp: new Date(data.created_at),
        archived: data.archived
      };
    } catch (error) {
      // Fallback to API
      try {
        const response = await makeApiCall('orders', {
          method: 'POST',
          body: JSON.stringify({
            customer_name: order.customerName,
            service_name: order.serviceName,
            notes: order.notes,
          }),
        });
        return {
          id: response.data.id,
          customerName: response.data.customer_name,
          serviceName: response.data.service_name,
          notes: response.data.notes,
          timestamp: new Date(response.data.created_at),
          archived: response.data.archived || false
        };
      } catch (apiError) {
        throw new Error('Order creation failed');
      }
    }
  },

  async update(id: string, updates: Partial<Order>): Promise<Order> {
    try {
      const client = checkSupabaseAvailable();
      const updateData: any = {};
      if (updates.customerName !== undefined) updateData.customer_name = updates.customerName;
      if (updates.serviceName !== undefined) updateData.service_name = updates.serviceName;
      if (updates.notes !== undefined) updateData.notes = updates.notes;
      if (updates.archived !== undefined) updateData.archived = updates.archived;

      const { data, error } = await client
        .from('orders')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return {
        id: data.id,
        customerName: data.customer_name,
        serviceName: data.service_name,
        notes: data.notes,
        timestamp: new Date(data.created_at),
        archived: data.archived
      };
    } catch (error) {
      // Fallback to API
      try {
        const updateData: any = {};
        if (updates.customerName !== undefined) updateData.customer_name = updates.customerName;
        if (updates.serviceName !== undefined) updateData.service_name = updates.serviceName;
        if (updates.notes !== undefined) updateData.notes = updates.notes;
        if (updates.archived !== undefined) updateData.archived = updates.archived;

        const response = await makeApiCall(`orders?id=${id}`, {
          method: 'PUT',
          body: JSON.stringify(updateData),
        });
        return {
          id: response.data.id,
          customerName: response.data.customer_name,
          serviceName: response.data.service_name,
          notes: response.data.notes,
          timestamp: new Date(response.data.created_at),
          archived: response.data.archived
        };
      } catch (apiError) {
        throw new Error('Order update failed');
      }
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const client = checkSupabaseAvailable();
      const { error } = await client
        .from('orders')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      // Fallback to API
      try {
        await makeApiCall(`orders?id=${id}`, { method: 'DELETE' });
      } catch (apiError) {
        throw new Error('Order deletion failed');
      }
    }
  }
};

// خدمات قاعدة البيانات لإعدادات الموقع
export const siteSettingsService = {
  async get(): Promise<SiteSettings> {
    try {
      const client = checkSupabaseAvailable();
      const { data, error } = await client
        .from('site_settings')
        .select('*')
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        return {
          title: data.title,
          description: data.description,
          orderNotice: data.order_notice
        };
      }

      // Return default settings if none found
      return {
        title: 'KYCtrust - خدمات مالية رقمية موثوقة',
        description: 'نقدم خدمات مالية رقمية احترافية وآمنة لجميع المنصات العالمية مع ضمان الجودة والموثوقية',
        orderNotice: 'سيتم التواصل معك يدويًا عبر واتساب بعد إرسال الطلب.'
      };
    } catch (error) {
      // Fallback to API
      try {
        const response = await makeApiCall('site-settings');
        return {
          title: response.data.title,
          description: response.data.description,
          orderNotice: response.data.order_notice
        };
      } catch (apiError) {
        // Return default settings if all else fails
        return {
          title: 'KYCtrust - خدمات مالية رقمية موثوقة',
          description: 'نقدم خدمات مالية رقمية احترافية وآمنة لجميع المنصات العالمية مع ضمان الجودة والموثوقية',
          orderNotice: 'سيتم التواصل معك يدويًا عبر واتساب بعد إرسال الطلب.'
        };
      }
    }
  },

  async update(settings: SiteSettings): Promise<SiteSettings> {
    try {
      const client = checkSupabaseAvailable();
      // أولاً نحاول الحصول على الإعدادات الحالية
      const { data: existing } = await client
        .from('site_settings')
        .select('id')
        .limit(1)
        .single();

      let result;
      if (existing) {
        // تحديث الإعدادات الموجودة
        const { data, error } = await client
          .from('site_settings')
          .update({
            title: settings.title,
            description: settings.description,
            order_notice: settings.orderNotice
          })
          .eq('id', existing.id)
          .select()
          .single();

        if (error) throw error;
        result = data;
      } else {
        // إنشاء إعدادات جديدة
        const { data, error } = await client
          .from('site_settings')
          .insert({
            title: settings.title,
            description: settings.description,
            order_notice: settings.orderNotice
          })
          .select()
          .single();

        if (error) throw error;
        result = data;
      }

      return {
        title: result.title,
        description: result.description,
        orderNotice: result.order_notice
      };
    } catch (error) {
      // Fallback to API
      try {
        const response = await makeApiCall('site-settings', {
          method: 'PUT',
          body: JSON.stringify({
            title: settings.title,
            description: settings.description,
            order_notice: settings.orderNotice
          }),
        });
        return {
          title: response.data.title,
          description: response.data.description,
          orderNotice: response.data.order_notice
        };
      } catch (apiError) {
        throw new Error('Site settings update failed');
      }
    }
  }
};

// خدمات قوالب الصفحات للبناء المرئي
export const pageTemplatesService = {
  async getAll(pageType?: string): Promise<any[]> {
    try {
      const client = checkSupabaseAvailable();
      let query = client.from('page_templates').select('*');
      
      if (pageType) {
        query = query.eq('page_type', pageType);
      }
      
      const { data, error } = await query.order('updated_at', { ascending: false });

      if (error) throw error;

      return data.map((item: any) => ({
        ...item,
        template_data: JSON.parse(item.template_data || '{}'),
        theme_config: JSON.parse(item.theme_config || '{}')
      }));
    } catch (error) {
      // Fallback to API
      try {
        const url = pageType ? `page-templates?page_type=${pageType}` : 'page-templates';
        const response = await makeApiCall(url);
        return response.data.map((item: any) => ({
          ...item,
          template_data: typeof item.template_data === 'string' ? JSON.parse(item.template_data) : item.template_data,
          theme_config: typeof item.theme_config === 'string' ? JSON.parse(item.theme_config) : item.theme_config
        }));
      } catch (apiError) {
        console.warn('Both Supabase and API unavailable, returning empty templates array');
        return [];
      }
    }
  },

  async save(template: any): Promise<any> {
    try {
      const client = checkSupabaseAvailable();
      const { data, error } = await client
        .from('page_templates')
        .insert({
          ...template,
          template_data: JSON.stringify(template.template_data),
          theme_config: JSON.stringify(template.theme_config || {})
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      // Fallback to API
      try {
        const response = await makeApiCall('page-templates', {
          method: 'POST',
          body: JSON.stringify(template),
        });
        return response.data;
      } catch (apiError) {
        throw new Error('Template save failed');
      }
    }
  },

  async update(id: string, updates: any): Promise<any> {
    try {
      const client = checkSupabaseAvailable();
      const updateData = { ...updates };
      if (updateData.template_data) {
        updateData.template_data = JSON.stringify(updateData.template_data);
      }
      if (updateData.theme_config) {
        updateData.theme_config = JSON.stringify(updateData.theme_config);
      }

      const { data, error } = await client
        .from('page_templates')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      // Fallback to API
      try {
        const response = await makeApiCall(`page-templates?id=${id}`, {
          method: 'PUT',
          body: JSON.stringify(updates),
        });
        return response.data;
      } catch (apiError) {
        throw new Error('Template update failed');
      }
    }
  }
};

// خدمات الثيمات
export const themesService = {
  async getAll(): Promise<any[]> {
    try {
      const client = checkSupabaseAvailable();
      const { data, error } = await client
        .from('themes')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;

      return data.map((item: any) => ({
        ...item,
        theme_config: JSON.parse(item.theme_config || '{}')
      }));
    } catch (error) {
      // Fallback to API
      try {
        const response = await makeApiCall('themes');
        return response.data.map((item: any) => ({
          ...item,
          theme_config: typeof item.theme_config === 'string' ? JSON.parse(item.theme_config) : item.theme_config
        }));
      } catch (apiError) {
        console.warn('Both Supabase and API unavailable, returning empty themes array');
        return [];
      }
    }
  },

  async save(theme: any): Promise<any> {
    try {
      const client = checkSupabaseAvailable();
      const { data, error } = await client
        .from('themes')
        .insert({
          ...theme,
          theme_config: JSON.stringify(theme.theme_config)
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      // Fallback to API
      try {
        const response = await makeApiCall('themes', {
          method: 'POST',
          body: JSON.stringify(theme),
        });
        return response.data;
      } catch (apiError) {
        throw new Error('Theme save failed');
      }
    }
  },

  async update(id: string, updates: any): Promise<any> {
    try {
      const client = checkSupabaseAvailable();
      const updateData = { ...updates };
      if (updateData.theme_config) {
        updateData.theme_config = JSON.stringify(updateData.theme_config);
      }

      const { data, error } = await client
        .from('themes')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      // Fallback to API
      try {
        const response = await makeApiCall(`themes?id=${id}`, {
          method: 'PUT',
          body: JSON.stringify(updates),
        });
        return response.data;
      } catch (apiError) {
        throw new Error('Theme update failed');
      }
    }
  }
};
