import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Lead {
  contact: string;
  message: string;
  language: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer?: string;
  user_agent?: string;
}

export async function saveLead(lead: Lead): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from('leads').insert([lead]);

    if (error) {
      console.error('Supabase error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('Failed to save lead:', err);
    return { success: false, error: 'Failed to save lead' };
  }
}
