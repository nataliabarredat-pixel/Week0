import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Standard checks to verify if variables are configured correctly
const isValidConfig = 
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes("placeholder-supabase-url") &&
  !supabaseAnonKey.includes("placeholder-anon-key");

export const isSupabaseConfigured = !!isValidConfig;

// Initialize Supabase Client (only if env vars are present and valid)
export const supabase = isValidConfig 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// Graceful Mock Database Operations Fallback for Sandbox Mode
export const getMockDatabase = () => {
  return {
    isMock: true,
    supabaseUrl: supabaseUrl || "Not Configured",
    supabaseAnonKey: supabaseAnonKey ? `${supabaseAnonKey.substring(0, 10)}...` : "Not Configured"
  };
};
