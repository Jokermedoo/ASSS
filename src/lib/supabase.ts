import { createClient } from '@supabase/supabase-js';

// Environment variables with fallbacks for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Check if we're in development mode and provide helpful warning
const isDevelopment = import.meta.env.MODE === 'development';
const hasValidConfig = supabaseUrl !== 'https://your-project.supabase.co' && supabaseAnonKey !== 'your-anon-key';

if (isDevelopment && !hasValidConfig) {
  console.warn('⚠️ Supabase not configured. Using local storage fallback for development.');
  console.warn('To connect to Supabase, create a .env file with:');
  console.warn('VITE_SUPABASE_URL=your_supabase_url');
  console.warn('VITE_SUPABASE_ANON_KEY=your_supabase_anon_key');
}

// Create client with error handling
export const supabase = hasValidConfig ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Export a flag to check if Supabase is available
export const isSupabaseConfigured = hasValidConfig;

// Types for database tables
export interface DatabaseService {
  id: string;
  name: string;
  price: string;
  order_index: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DatabasePaymentMethod {
  id: string;
  name: string;
  details: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DatabaseOrder {
  id: string;
  customer_name: string;
  service_name: string;
  notes: string;
  status: string;
  archived: boolean;
  created_at: string;
  updated_at: string;
}

export interface DatabaseSiteSettings {
  id: string;
  title: string;
  description: string;
  order_notice: string;
  created_at: string;
  updated_at: string;
}

export interface DatabaseAdminUser {
  id: string;
  email: string;
  password_hash: string;
  role: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}
