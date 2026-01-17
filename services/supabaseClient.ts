import { createClient } from '@supabase/supabase-js';

const getSupabaseConfig = () => {
  // prioritize local storage for runtime overrides in the settings panel
  const localUrl = localStorage.getItem('XAVIER_SUPABASE_URL');
  const localKey = localStorage.getItem('XAVIER_SUPABASE_KEY');
  
  // fall back to build-time env vars (via process.env as defined in vite.config.ts)
  const envUrl = process.env.VITE_SUPABASE_URL;
  const envKey = process.env.VITE_SUPABASE_ANON_KEY;

  return {
    url: localUrl || envUrl,
    key: localKey || envKey
  };
};

export const getSupabaseClient = () => {
  const { url, key } = getSupabaseConfig();
  if (url && key) {
    try {
      return createClient(url, key);
    } catch (e) {
      console.error("Supabase Client Init Failed:", e);
      return null;
    }
  }
  return null;
};

export const isSupabaseConfigured = () => {
  const { url, key } = getSupabaseConfig();
  return !!(url && key);
};

// --- DATA SERVICES ---

export const getSocialFeed = async () => {
  const client = getSupabaseClient();
  if (!client) return null;
  
  const { data, error } = await client
    .from('social_feed')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    console.warn("Supabase Social Feed Fetch Error (Simulating fallback):", error.message);
    return null;
  }
  return data;
};

export const postToSocialFeed = async (post: { username: string, content: string, aura: string, intent: string }) => {
  const client = getSupabaseClient();
  if (!client) return null;

  const { data, error } = await client
    .from('social_feed')
    .insert([
      { 
        username: post.username, 
        content: post.content, 
        aura_color: post.aura, 
        intent: post.intent 
      }
    ])
    .select();

  if (error) {
    console.error("Supabase Post Error:", error);
    return null;
  }
  return data;
};