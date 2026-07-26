import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

export function useAuth() {
  const { data: session, status } = useSession();
  const { setSession, setLoading, logout: storeLogout } = useAuthStore();

  useEffect(() => {
    if (status === 'loading') {
      setLoading(true);
    } else {
      setSession(session ?? null);
      setLoading(false);
    }
  }, [session, status, setSession, setLoading]);

  const logout = async () => {
    await signOut({ redirect: false });
    storeLogout();
  };

  return {
    session,
    isAuthenticated: !!session,
    isLoading: status === 'loading',
    logout,
  };
}