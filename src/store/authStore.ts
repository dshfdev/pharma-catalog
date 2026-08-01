import { create } from 'zustand';
import { AuthState } from '@/types/auth';

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  isAuthenticated: false,
  isLoading: true,
  setSession: (session) =>
    set({
      session,
      isAuthenticated: !!session,
      isLoading: false,
    }),
  setLoading: (loading) => set({ isLoading: loading }),
  logout: () =>
    set({
      session: null,
      isAuthenticated: false,
      isLoading: false,
    }),
}));
