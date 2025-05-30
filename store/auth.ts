import { create } from 'zustand';
import { supabase } from '~/utils/supabase';
import type { Session, User } from '@supabase/supabase-js';

type AuthStore = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  didRestore: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  restore: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  session: null,
  loading: false,
  error: null,
  didRestore: false,

  async signIn(email, password) {
    set({ loading: true, error: null });
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      set({ error: error.message, loading: false });
    } else {
      set({ session: data.session, user: data.user, loading: false });
    }
  },

  async signOut() {
    await supabase.auth.signOut();
    set({ user: null, session: null });
  },

  async restore() {
    const { data } = await supabase.auth.getSession();
    set({
      session: data.session ?? null,
      user: data.session?.user ?? null,
      loading: false,
      didRestore: true,
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      set({
        session: session ?? null,
        user: session?.user ?? null,
        loading: false,
      });
    });
  },
}));
