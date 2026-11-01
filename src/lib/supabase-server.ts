import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Server-side Supabase client with elevated privileges
// Use this ONLY in API routes, never expose to client
export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Check if Supabase is configured
export const isSupabaseServerConfigured = () => {
  return supabaseUrl && supabaseServiceKey && supabaseUrl !== '' && supabaseServiceKey !== '';
};
