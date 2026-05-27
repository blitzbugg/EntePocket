import { create } from 'zustand';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/utils/supabase';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;

  signInWithOtp: (phone: string) => Promise<{ error: Error | null }>;
  verifyOtp: (phone: string, token: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<{ error: Error | null }>;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: true,

  signInWithOtp: async (phone: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({ phone });
      if (error) throw error;
      return { error: null };
    } catch (err: any) {
      console.warn('signInWithOtp error:', err);
      return { error: err as Error };
    }
  },

  verifyOtp: async (phone: string, token: string) => {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone,
        token,
        type: 'sms',
      });
      if (error) throw error;
      
      set({ session: data.session, user: data.session?.user ?? null });
      return { error: null };
    } catch (err: any) {
      console.warn('verifyOtp error:', err);
      return { error: err as Error };
    }
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ session: null, user: null });
      return { error: null };
    } catch (err: any) {
      console.warn('signOut error:', err);
      return { error: err as Error };
    }
  },

  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setLoading: (isLoading) => set({ isLoading }),
}));
