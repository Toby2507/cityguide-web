'use client';

import { useAuth } from '@/providers';
import { logout } from '@/server';

const useAuthRefresh = () => {
  const { refreshAuth } = useAuth();

  const refreshAfterAction = async (action: Function) => {
    await action();
    await refreshAuth();
  };
  const refreshAfterLogout = async () => {
    await logout();
    await refreshAuth();
  };

  return { refreshAfterAction, refreshAfterLogout };
};

export default useAuthRefresh;
